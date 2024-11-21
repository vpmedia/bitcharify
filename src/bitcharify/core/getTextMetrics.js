/**
 * TBD.
 * @param {string} text - TBD.
 * @param {object} style - TBD.
 * @param {number} width - TBD.
 * @param {number} height - TBD.
 * @param {object} lines - TBD.
 * @param {number[]} lineWidths - TBD.
 * @param {number} lineHeight - TBD.
 * @param {number} maxLineWidth - TBD.
 * @param {object} fontProperties - TBD.
 * @returns {object} TBD.
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
