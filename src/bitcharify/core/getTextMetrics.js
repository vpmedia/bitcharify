/**
 * TBD.
 * @param {string} text - TBD.
 * @param {import('../typedef.js').FontStyle} style - TBD.
 * @param {number} width - TBD.
 * @param {number} height - TBD.
 * @param {string[]} lines - TBD.
 * @param {number[]} lineWidths - TBD.
 * @param {number} lineHeight - TBD.
 * @param {number} maxLineWidth - TBD.
 * @param {import('../typedef.js').FontProperties} fontProperties - TBD.
 * @returns {import('../typedef.js').TextMetrics} TBD.
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
