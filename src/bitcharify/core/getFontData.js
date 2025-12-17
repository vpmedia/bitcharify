/**
 * Gets the font data for a given font.
 * @returns {import('../typedef.js').FontData} The font data object.
 */
export const getFontData = () => {
  return {
    info: [],
    common: [],
    page: [],
    char: [],
    kerning: [],
    distanceField: [],
  };
};
