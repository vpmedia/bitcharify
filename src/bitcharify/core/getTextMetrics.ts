import type { FontProperties, FontStyle, TextMetrics } from '../typedef.js';

// Gets text metrics for a given set of parameters.
export const getTextMetrics = (
  text: string,
  style: FontStyle,
  width: number,
  height: number,
  lines: string[],
  lineWidths: number[],
  lineHeight: number,
  maxLineWidth: number,
  fontProperties: FontProperties
): TextMetrics => {
  return {
    text,
    style,
    width,
    height,
    lines,
    lineWidths,
    lineHeight,
    maxLineWidth,
    fontProperties,
  };
};
