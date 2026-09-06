// @vitest-environment happy-dom
import { beforeEach, describe, expect, test } from 'vitest';
import { installCanvasContext2D } from '../testing/canvas.js';
import { generateBitmapFonts } from './generateBitmapFonts.js';
import type { FontStyle } from './typedef.js';

const style = (overrides: Partial<FontStyle> = {}): FontStyle =>
  ({ fontSize: 16, fontFamily: 'Roboto', ...overrides }) as FontStyle;

describe('generateBitmapFonts', () => {
  beforeEach(() => {
    installCanvasContext2D();
  });

  test('returns one entry per style, each carrying its own font data', () => {
    const styles = [style({ fontSize: 16 }), style({ fontSize: 32 })];

    const results = generateBitmapFonts(document.createElement('canvas'), styles, { chars: 'A' });

    expect(results.map((result) => result.fontStyle)).toStrictEqual(styles);
    expect(results.map((result) => result.fontData.info[0]?.size)).toStrictEqual([16, 32]);
  });

  test('captures the rendered texture alongside the data', () => {
    const [result] = generateBitmapFonts(document.createElement('canvas'), [style()], { chars: 'A' });

    expect(result?.imageData).toMatch(/^data:image\/png;base64,/u);
  });

  test('no styles produce no fonts', () => {
    expect(generateBitmapFonts(document.createElement('canvas'), [], { chars: 'A' })).toStrictEqual([]);
  });
});
