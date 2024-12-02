import { generateBitmapFont } from './generateBitmapFont.js';
/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {import('./typedef.js').FontStyle[]} styles - TBD.
 * @param {import('./typedef.js').BitmapFontConfig} options - TBD.
 * @returns {import('./typedef.js').BitmapFontData[]} TBD.
 */
export const generateBitmapFonts = (canvas, styles, options = {}) => {
  const results = [];
  for (const fontStyle of styles) {
    const fontData = generateBitmapFont(canvas, fontStyle, options);
    results.push({ imageData: canvas.toDataURL(), fontData, fontStyle });
  }
  return results;
};
