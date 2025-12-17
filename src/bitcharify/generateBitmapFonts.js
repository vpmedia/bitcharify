import { generateBitmapFont } from './generateBitmapFont.js';
/**
 * Generates multiple bitmap fonts from font styles.
 * @param {HTMLCanvasElement} canvas - The canvas to render the bitmap fonts on.
 * @param {import('./typedef.js').FontStyle[]} styles - The font styles to generate bitmap fonts for.
 * @param {import('./typedef.js').BitmapFontConfig} options - The configuration options for the bitmap fonts.
 * @returns {import('./typedef.js').BitmapFontData[]} The generated bitmap font data.
 */
export const generateBitmapFonts = (canvas, styles, options = {}) => {
  const results = [];
  for (const fontStyle of styles) {
    const fontData = generateBitmapFont(canvas, fontStyle, options);
    results.push({ imageData: canvas.toDataURL(), fontData, fontStyle });
  }
  return results;
};
