import type { FontData } from '../typedef.js';

// Generates kerning data for a set of characters.
export const generateKernings = (context: CanvasRenderingContext2D, fontData: FontData, charList: string[]): void => {
  for (const first of charList) {
    for (const second of charList) {
      const c1 = context.measureText(first).width;
      const c2 = context.measureText(second).width;
      const total = context.measureText(first + second).width;
      const amount = total - (c1 + c2);
      if (amount) {
        fontData.kerning.push({
          first: first.codePointAt(0) ?? 0,
          second: second.codePointAt(0) ?? 0,
          amount,
        });
      }
    }
  }
};
