import { generateBitmapFont } from "./generateBitmapFont";
/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {object[]} styles - TBD.
 * @param {object} options - TBD.
 * @returns {object[]} TBD.
 */
export function generateBitmapFonts(canvas, styles, options = {}) {
  const results = [];
  styles.forEach((fontStyle) => {
    const fontData = generateBitmapFont(canvas, fontStyle, options);
    results.push({ imageData: canvas.toDataURL(), fontData, fontStyle });
  });
  return results;
}
