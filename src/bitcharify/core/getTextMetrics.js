export function getTextMetrics(
  text,
  style,
  width,
  height,
  lines,
  lineWidths,
  lineHeight,
  maxLineWidth,
  fontProperties
) {
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
}
