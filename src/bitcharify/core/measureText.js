import { graphemeSegmenter } from "./graphemeSegmenter";
import { getTextMetrics } from "./getTextMetrics";
import { toFontString } from "./toFontString";

export const METRICS_STRING = "|ÉqÅ";
export const BASELINE_SYMBOL = "M";
export const BASELINE_MULTIPLIER = 1.4;
export const HEIGHT_MULTIPLIER = 2.0;

export function _measureText(text, letterSpacing, context) {
  let width = context.measureText(text).width;
  if (width > 0) {
    width += (graphemeSegmenter(text).length - 1) * letterSpacing;
  }
  return width;
}

export function _measureFont() {
  // console.log(font);
  // TODO
  return { fontSize: 0 };
}

export function _wordWrap(text, style, canvas) {
  console.log(text, style, canvas);
}

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
  height += fontProperties.fontSize * 0.25; // TODO
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
