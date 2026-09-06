import { describe, expect, test } from 'vitest';
import { getFontData } from './getFontData.js';
import { generateKernings } from './generateKernings.js';

/** Widths come from a table, so a pair either kerns by a known amount or not at all. */
const createContext = (widths: Record<string, number>): CanvasRenderingContext2D =>
  ({
    measureText: (text: string): TextMetrics => ({ width: widths[text] ?? text.length }) as TextMetrics,
  }) as CanvasRenderingContext2D;

describe('generateKernings', () => {
  test('records the pair whose measured width differs from its parts', () => {
    const fontData = getFontData();
    const context = createContext({ A: 10, V: 10, AV: 17, AA: 20, VV: 20, VA: 20 });

    generateKernings(context, fontData, ['A', 'V']);

    expect(fontData.kerning).toStrictEqual([{ first: 65, second: 86, amount: -3 }]);
  });

  test('leaves out a pair that measures exactly as wide as its parts', () => {
    const fontData = getFontData();
    const context = createContext({ A: 10, B: 10, AB: 20, AA: 20, BB: 20, BA: 20 });

    generateKernings(context, fontData, ['A', 'B']);

    expect(fontData.kerning).toStrictEqual([]);
  });

  test('measures every ordered pair including a character against itself', () => {
    const fontData = getFontData();
    const context = createContext({ A: 10, B: 10, AA: 19, AB: 19, BA: 19, BB: 19 });

    generateKernings(context, fontData, ['A', 'B']);

    expect(fontData.kerning).toHaveLength(4);
  });

  test('an empty character list records nothing', () => {
    const fontData = getFontData();

    generateKernings(createContext({}), fontData, []);

    expect(fontData.kerning).toStrictEqual([]);
  });
});
