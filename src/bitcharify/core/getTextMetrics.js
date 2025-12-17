/**
 * Gets text metrics for a given set of parameters.
 * @param {string} text - The text content.
 * @param {import('../typedef.js').FontStyle} style - The font style used for the text.
 * @param {number} width - The width of the text in pixels.
 * @param {number} height - The height of the text in pixels.
 * @param {string[]} lines - The text broken into lines.
 * @param {number[]} lineWidths - The width of each line in pixels.
 * @param {number} lineHeight - The height of each line in pixels.
 * @param {number} maxLineWidth - The maximum width of any line in pixels.
 * @param {import('../typedef.js').FontProperties} fontProperties - The properties of the font used.
 * @returns {import('../typedef.js').TextMetrics} The text metrics object.
 */
export const getTextMetrics = (
  text,
  style,
  width,
  height,
  lines,
  lineWidths,
  lineHeight,
  maxLineWidth,
  fontProperties
) => {
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
