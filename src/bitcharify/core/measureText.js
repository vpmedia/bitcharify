import { getTextMetrics } from './getTextMetrics.js';
import { graphemeSegmenter } from './graphemeSegmenter.js';
import { toFontString } from './toFontString.js';

const METRICS_STRING = '|ÉqÅ';
const BASELINE_SYMBOL = 'M';
const BASELINE_MULTIPLIER = 1.4;
const HEIGHT_MULTIPLIER = 2;

/**
 * Measures the width of text with letter spacing applied.
 * @param {string} text - The text to measure.
 * @param {number} letterSpacing - The letter spacing in pixels.
 * @param {CanvasRenderingContext2D} context - The canvas 2d rendering context to use for measurement.
 * @returns {number} The measured width of the text in pixels.
 */
function _measureText(text, letterSpacing, context) {
  let width = context.measureText(text).width;
  if (width > 0) {
    width += (graphemeSegmenter(text).length - 1) * letterSpacing;
  }
  return width;
}

/**
 * Measures font properties by creating a test canvas and measuring a sample string.
 * @param {string} font - The CSS font string to measure properties for.
 * @returns {import('../typedef.js').FontProperties} The measured font properties (ascent, descent, fontSize).
 */
function _measureFont(font) {
  if (!window.__BITCHARIFY_CANVAS__) {
    let canvas = undefined;
    let context = undefined;
    try {
      canvas = new OffscreenCanvas(0, 0);
      context = canvas.getContext('2d', { willReadFrequently: true });
    } catch (e) {
      // pass
    }
    if (!canvas || !context?.measureText) {
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d', { willReadFrequently: true });
    }
    canvas.width = canvas.height = 10;
    window.__BITCHARIFY_CANVAS__ = canvas;
    window.__BITCHARIFY_CONTEXT__ = context;
  }
  /** @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} */
  const context = window.__BITCHARIFY_CONTEXT__;
  context.font = font;
  const metrics = context.measureText(METRICS_STRING + BASELINE_SYMBOL);
  const properties = {
    ascent: Math.ceil(metrics.actualBoundingBoxAscent),
    descent: Math.ceil(metrics.actualBoundingBoxDescent),
    fontSize: Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
  };
  return properties;
}

/**
 * Fallback method to measure font properties when the primary method fails.
 * @param {string} font - The CSS font string to measure properties for.
 * @returns {import('../typedef.js').FontProperties} The measured font properties (ascent, descent, fontSize).
 */
function _measureFontFallback(font) {
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
      context = canvas.getContext('2d', { willReadFrequently: true });
    } catch (e) {
      // pass
    }
    if (!canvas || !context?.measureText) {
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d', { willReadFrequently: true });
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
  let baseline = Math.ceil(context.measureText(BASELINE_SYMBOL).width);
  const height = Math.ceil(HEIGHT_MULTIPLIER * baseline);
  baseline = (baseline * BASELINE_MULTIPLIER) | 0;
  if (width === 0 || height === 0) {
    return properties;
  }
  canvas.width = width;
  canvas.height = height;
  context.fillStyle = '#f00';
  context.fillRect(0, 0, width, height);
  context.font = font;
  context.textBaseline = 'alphabetic';
  context.fillStyle = '#000';
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
      // issue: firefox returns 253 and not 255 for the red pixel value
      if (imagedata[idx + j] < 253) {
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
      // issue: firefox returns 253 and not 255 for the red pixel value
      if (imagedata[idx + j] < 253) {
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
 * Applies word wrapping to text based on the font style configuration.
 * @param {string} text - The text to wrap.
 * @param {import('../typedef.js').FontStyle} style - The font style configuration to use for word wrapping.
 * @param {HTMLCanvasElement} canvas - The canvas element to use for measurements.
 * @returns {string} The word-wrapped text.
 */
function _wordWrap(text, style, canvas) {
  console.log(text, style, canvas);
  return text;
}

/**
 * Measures text and calculates its metrics including width, height, lines, and more.
 * @param {string} text - The text to measure.
 * @param {import('../typedef.js').FontStyle} style - The font style configuration to use for measurement.
 * @param {boolean} wordWrap - Whether to enable word wrapping.
 * @param {HTMLCanvasElement} canvas - The canvas element to use for measurements.
 * @returns {import('../typedef.js').TextMetrics} The calculated text metrics.
 */
export const measureText = (text, style, wordWrap, canvas) => {
  wordWrap = wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap;
  const font = toFontString(style);
  let fontProperties = _measureFont(font);
  if (!fontProperties.fontSize) {
    fontProperties = _measureFontFallback(font);
  }
  // fallback in case UA disallow canvas data extraction
  // (toDataURI, getImageData functions)
  if (fontProperties.fontSize === 0) {
    fontProperties.fontSize = style.fontSize;
    fontProperties.ascent = style.fontSize;
    fontProperties.descent = 0;
  }
  const context = canvas.getContext('2d', { willReadFrequently: true });
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
};
