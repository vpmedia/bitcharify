/**
 * Generates kerning data for a set of characters.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 * @param {import('../typedef.js').FontData} fontData - The font data to populate with kerning information.
 * @param {string[]} charList - The list of characters to generate kerning for.
 */
export const generateKernings = (context, fontData, charList) => {
  for (let i = 0, len = charList.length; i < len; i++) {
    const first = charList[i];
    for (let j = 0; j < len; j++) {
      const second = charList[j];
      const c1 = context.measureText(first).width;
      const c2 = context.measureText(second).width;
      const total = context.measureText(first + second).width;
      const amount = total - (c1 + c2);
      if (amount) {
        fontData.kerning.push({
          first: first.codePointAt(0),
          second: second.codePointAt(0),
          amount,
        });
      }
    }
  }
};
