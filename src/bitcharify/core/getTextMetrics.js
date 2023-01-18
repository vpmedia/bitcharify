/**
 *
 * @param text
 * @param style
 * @param width
 * @param height
 * @param lines
 * @param lineWidths
 * @param lineHeight
 * @param maxLineWidth
 * @param fontProperties
 */
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
