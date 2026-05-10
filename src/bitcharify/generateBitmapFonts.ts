import { generateBitmapFont } from './generateBitmapFont.js';
import type { BitmapFontConfigInput, BitmapFontData, FontStyle } from './typedef.js';

// Generates multiple bitmap fonts from font styles.
export const generateBitmapFonts = (
  canvas: HTMLCanvasElement,
  styles: FontStyle[],
  options: BitmapFontConfigInput = {}
): BitmapFontData[] => {
  const results: BitmapFontData[] = [];
  for (const fontStyle of styles) {
    const fontData = generateBitmapFont(canvas, fontStyle, options);
    results.push({ imageData: canvas.toDataURL(), fontData, fontStyle });
  }
  return results;
};
