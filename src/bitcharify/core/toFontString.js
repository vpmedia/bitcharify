/**
 * Converts a font style to a CSS font string.
 * @param {import('../typedef.js').FontStyle} style - The font style to convert.
 * @returns {string} The CSS font string representation.
 */
export const toFontString = (style) => {
  const fontSizeString = typeof style.fontSize === 'number' ? `${style.fontSize}px` : style.fontSize;
  const fontFamilies = Array.isArray(style.fontFamily) ? style.fontFamily : style.fontFamily.split(',');
  for (let i = fontFamilies.length - 1; i >= 0; i--) {
    let fontFamily = fontFamilies[i].trim();
    if (!fontFamily.includes('"')) {
      fontFamily = `"${fontFamily}"`;
    }
    fontFamilies[i] = fontFamily;
  }
  return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${fontSizeString} ${fontFamilies.join(',')}`;
};
