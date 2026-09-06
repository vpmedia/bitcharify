// @vitest-environment happy-dom
import { beforeEach, describe, expect, test } from 'vitest';
import { installCanvasContext2D } from '../../testing/canvas.js';
import type { BitmapFontConfig, FontChar, FontData, FontStyle } from '../typedef.js';
import { getFontData } from './getFontData.js';
import { generateChars } from './generateChars.js';

const config = (overrides: Partial<BitmapFontConfig> = {}): BitmapFontConfig => ({
  resolution: 1,
  width: 512,
  height: 512,
  padding: 4,
  chars: '',
  ...overrides,
});

const style = (overrides: Partial<FontStyle> = {}): FontStyle => ({
  fontSize: 16,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  strokeThickness: 0,
  miterLimit: 10,
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  padding: 0,
  ...overrides,
});

const generate = (
  charList: string[],
  overrides: { config?: Partial<BitmapFontConfig>; style?: Partial<FontStyle> } = {}
): FontData => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const fontData = getFontData();
  generateChars(canvas, context!, config(overrides.config), style(overrides.style), fontData, charList);
  return fontData;
};

const placements = (chars: FontChar[]): { id: number; x: number; y: number }[] =>
  chars.map(({ id, x, y }) => ({ id, x, y }));

describe('generateChars', () => {
  beforeEach(() => {
    installCanvasContext2D();
  });

  test('lays the glyphs out left to right, a padding gap apart', () => {
    const fontData = generate(['A', 'B']);

    expect(placements(fontData.char)).toStrictEqual([
      { id: 65, x: 0, y: 0 },
      { id: 66, x: 16, y: 0 },
    ]);
  });

  test('records the measured size of each glyph', () => {
    const fontData = generate(['A']);

    expect(fontData.char[0]).toStrictEqual({
      id: 65,
      page: 0,
      x: 0,
      y: 0,
      width: 8,
      height: 16,
      xoffset: 0,
      yoffset: 0,
      xadvance: 8,
    });
  });

  test('wraps to a new row when the next glyph would run off the texture', () => {
    const fontData = generate(['A', 'B'], { config: { width: 20 } });

    expect(placements(fontData.char)).toStrictEqual([
      { id: 65, x: 0, y: 0 },
      { id: 66, x: 0, y: 20 },
    ]);
  });

  test('gives an italic glyph twice the width so the slant does not overlap', () => {
    const fontData = generate(['A'], { style: { fontStyle: 'italic' } });

    expect(fontData.char[0]?.width).toBe(16);
  });

  test('discounts the drop shadow from the advance it reports', () => {
    const fontData = generate(['A'], { style: { dropShadow: '#000', dropShadowDistance: 3 } });

    expect(fontData.char[0]?.xadvance).toBe(8);
  });

  test('a drop shadow without a distance leaves the advance alone', () => {
    const fontData = generate(['A'], { style: { dropShadow: '#000' } });

    expect(fontData.char[0]?.xadvance).toBe(8);
  });

  test('discounts the stroke from the advance it reports', () => {
    const fontData = generate(['A'], { style: { stroke: '#000', strokeThickness: 4 } });

    expect(fontData.char[0]?.xadvance).toBe(8);
  });

  test('skips a hole in the character list', () => {
    const sparse: string[] = ['A'];
    sparse.length = 2;

    expect(generate(sparse).char).toHaveLength(1);
  });

  test('an empty character list produces no glyphs', () => {
    expect(generate([]).char).toStrictEqual([]);
  });

  test('throws naming the glyph that will not fit the texture height', () => {
    expect(() => generate(['A'], { config: { height: 10 } })).toThrow(
      "textureHeight 10px is too small (fontFamily: 'Roboto', fontSize: 16px, char: 'A')"
    );
  });
});
