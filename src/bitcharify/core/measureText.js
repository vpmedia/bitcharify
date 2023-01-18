import { graphemeSegmenter } from "./graphemeSegmenter";
import { getTextMetrics } from "./getTextMetrics";
import { toFontString } from "./toFontString";

const METRICS_STRING = "|ÉqÅ";
const BASELINE_SYMBOL = "M";
const BASELINE_MULTIPLIER = 1.4;
const HEIGHT_MULTIPLIER = 2.0;

/**
 * TBD
 *
 * @param {string} text TBD
 * @param {number} letterSpacing TBD
 * @param {CanvasRenderingContext2D} context TBD
 * @returns {number} TBD
 */
function _measureText(text, letterSpacing, context) {
  let width = context.measureText(text).width;
  if (width > 0) {
    width += (graphemeSegmenter(text).length - 1) * letterSpacing;
  }
  return width;
}

/**
 * TBD
 *
 * @param {string} font TBD
 * @returns {object} TBD
 */
function _measureFont(font) {
  const properties = {
    ascent: 0,
    descent: 0,
    fontSize: 0,
  };
  if (!window.__BITCHARIFY_CANVAS__) {
    let canvas = undefined;
    let context = undefined;
    try {
      canvas = new OffscreenCanvas(0, 0);
      context = canvas.getContext("2d", { willReadFrequently: true });
    } catch (e) {
      // pass
    }
    if (!canvas || !context?.measureText) {
      canvas = document.createElement("canvas");
      context = canvas.getContext("2d", { willReadFrequently: true });
    }
    canvas.width = canvas.height = 10;
    window.__BITCHARIFY_CANVAS__ = canvas;
    window.__BITCHARIFY_CONTEXT__ = context;
  }
  const canvas = window.__BITCHARIFY_CANVAS__;
  const context = window.__BITCHARIFY_CONTEXT__;
  context.font = font;
  const metricsString = METRICS_STRING + BASELINE_SYMBOL;
  const width = Math.ceil(context.measureText(metricsString).width);
  let baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width);
  const height = Math.ceil(HEIGHT_MULTIPLIER * baseline);
  baseline = (baseline * BASELINE_MULTIPLIER) | 0;
  if (width === 0 || height === 0) {
    return properties;
  }
  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#f00";
  context.fillRect(0, 0, width, height);
  context.font = font;
  context.textBaseline = "alphabetic";
  context.fillStyle = "#000";
  context.fillText(metricsString, 0, baseline);
  const imagedata = context.getImageData(0, 0, width, height).data;
  const pixels = imagedata.length;
  const line = width * 4;
  let i = 0;
  let idx = 0;
  let stop = false;
  // ascent. scan from top to bottom until we find a non red pixel
  for (i = 0; i < baseline; ++i) {
    for (let j = 0; j < line; j += 4) {
      if (imagedata[idx + j] !== 255) {
        stop = true;
        break;
      }
    }
    if (!stop) {
      idx += line;
    } else {
      break;
    }
  }
  properties.ascent = baseline - i;
  idx = pixels - line;
  stop = false;
  // descent. scan from bottom to top until we find a non red pixel
  for (i = height; i > baseline; --i) {
    for (let j = 0; j < line; j += 4) {
      if (imagedata[idx + j] !== 255) {
        stop = true;
        break;
      }
    }
    if (!stop) {
      idx -= line;
    } else {
      break;
    }
  }
  properties.descent = i - baseline;
  properties.fontSize = properties.ascent + properties.descent;
  return properties;
}

/**
 * TBD
 *
 * @param {string} text TBD
 * @param {object} style TBD
 * @param {HTMLCanvasElement} canvas TBD
 */
function _wordWrap(text, style, canvas) {
  console.log(text, style, canvas);
}

/**
 * TBD
 *
 * @param {string} text TBD
 * @param {object} style TBD
 * @param {string} wordWrap TBD
 * @param {HTMLCanvasElement} canvas TBD
 * @returns {object} TBD
 */
export function measureText(text, style, wordWrap, canvas) {
  wordWrap = wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap;
  const font = toFontString(style);
  const fontProperties = _measureFont(font);
  // fallback in case UA disallow canvas data extraction
  // (toDataURI, getImageData functions)
  if (fontProperties.fontSize === 0) {
    fontProperties.fontSize = style.fontSize;
    fontProperties.ascent = style.fontSize;
    fontProperties.descent = 0;
  }
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.font = font;
  const outputText = wordWrap ? _wordWrap(text, style, canvas) : text;
  const lines = outputText.split(/(?:\r\n|\r|\n)/);
  const lineWidths = new Array(lines.length);
  let maxLineWidth = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineWidth = _measureText(lines[i], style.letterSpacing, context);
    lineWidths[i] = lineWidth;
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }
  let width = maxLineWidth + style.strokeThickness;
  if (style.dropShadow) {
    width += style.dropShadowDistance;
  }
  const lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
  let height =
    Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness * 2) +
    (lines.length - 1) * (lineHeight + style.leading);
  if (style.dropShadow) {
    height += style.dropShadowDistance;
  }
  return getTextMetrics(
    text,
    style,
    width,
    height,
    lines,
    lineWidths,
    lineHeight + style.leading,
    maxLineWidth,
    fontProperties
  );
}
