import type { FontProperties, FontStyle, TextMetrics } from '../typedef.js';
import { getTextMetrics } from './getTextMetrics.js';
import { graphemeSegmenter } from './graphemeSegmenter.js';
import { toFontString } from './toFontString.js';

type AnyCanvas2dContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;

const METRICS_STRING = '|ÉqÅ';
const BASELINE_SYMBOL = 'M';
const BASELINE_MULTIPLIER = 1.4;
const HEIGHT_MULTIPLIER = 2;

// Measures the width of text with letter spacing applied.
function _measureText(text: string, letterSpacing: number, context: AnyCanvas2dContext): number {
  let width = context.measureText(text).width;
  if (width > 0) {
    width += (graphemeSegmenter(text).length - 1) * letterSpacing;
  }
  return width;
}

function _ensureMeasureCanvas(): void {
  if (!window.__BITCHARIFY_CANVAS__) {
    let canvas: AnyCanvas | undefined;
    let context: AnyCanvas2dContext | null | undefined;
    try {
      canvas = new OffscreenCanvas(0, 0);
      context = canvas.getContext('2d', { willReadFrequently: true }) as OffscreenCanvasRenderingContext2D | null;
    } catch {
      // pass
    }
    if (!canvas || !context?.measureText) {
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d', { willReadFrequently: true });
    }
    if (!context) {
      throw new Error('Unable to get a 2D rendering context.');
    }
    canvas.width = 10;
    canvas.height = 10;
    window.__BITCHARIFY_CANVAS__ = canvas;
    window.__BITCHARIFY_CONTEXT__ = context;
  }
}

// Measures font properties by creating a test canvas and measuring a sample string.
function _measureFont(font: string): FontProperties {
  _ensureMeasureCanvas();
  const context = window.__BITCHARIFY_CONTEXT__;
  context.font = font;
  const metrics = context.measureText(METRICS_STRING + BASELINE_SYMBOL);
  const properties: FontProperties = {
    ascent: Math.ceil(metrics.actualBoundingBoxAscent),
    descent: Math.ceil(metrics.actualBoundingBoxDescent),
    fontSize: Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
  };
  return properties;
}

// Fallback method to measure font properties when the primary method fails.
function _measureFontFallback(font: string): FontProperties {
  const properties: FontProperties = {
    ascent: 0,
    descent: 0,
    fontSize: 0,
  };
  _ensureMeasureCanvas();
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
    if (stop) {
      break;
    } else {
      idx += line;
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
    if (stop) {
      break;
    } else {
      idx -= line;
    }
  }
  properties.descent = i - baseline;
  properties.fontSize = properties.ascent + properties.descent;
  return properties;
}

// Applies word wrapping to text based on the font style configuration.
function _wordWrap(text: string, style: FontStyle, canvas: HTMLCanvasElement): string {
  console.log(text, style, canvas);
  return text;
}

// Measures text and calculates its metrics including width, height, lines, and more.
export const measureText = (
  text: string,
  style: FontStyle,
  wordWrap: boolean | undefined | null,
  canvas: HTMLCanvasElement
): TextMetrics => {
  const useWordWrap = wordWrap === undefined || wordWrap === null ? Boolean(style.wordWrap) : wordWrap;
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
  if (!context) {
    throw new Error('Unable to get a 2D rendering context.');
  }
  context.font = font;
  const outputText = useWordWrap ? _wordWrap(text, style, canvas) : text;
  const lines = outputText.split(/(?:\r\n|\r|\n)/u);
  const lineWidths: number[] = new Array(lines.length);
  let maxLineWidth = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineWidth = _measureText(lines[i], style.letterSpacing, context);
    lineWidths[i] = lineWidth;
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }
  let width = maxLineWidth + style.strokeThickness;
  if (style.dropShadow) {
    width += style.dropShadowDistance ?? 0;
  }
  const lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
  let height =
    Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness * 2) +
    (lines.length - 1) * (lineHeight + style.leading);
  if (style.dropShadow) {
    height += style.dropShadowDistance ?? 0;
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
