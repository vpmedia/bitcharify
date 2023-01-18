import { generateBitmapFont } from "./generateBitmapFont";
/**
 * TBD
 *
 * @param {HTMLCanvasElement} canvas TBD
 * @param {object[]} styles TBD
 * @param {object} options TBD
 * @returns {object[]} TBD
 */
export function generateBitmapFonts(canvas, styles, options) {
  const results = [];
  styles.forEach((style) => {
    const result = generateBitmapFont(canvas, style, options);
    results.push({ imageData: canvas.toDataURL(), fontData: result.data, fontStyle: style });
  });
  return results;
}
