// @vitest-environment happy-dom
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { installCanvasContext2D } from '../testing/canvas.js';
import { generateBitmapFont } from './generateBitmapFont.js';
import type { FontStyle } from './typedef.js';

const style = (overrides: Partial<FontStyle> = {}): FontStyle =>
  ({ fontSize: 16, fontFamily: 'Roboto', ...overrides }) as FontStyle;

describe('generateBitmapFont', () => {
  beforeEach(() => {
    installCanvasContext2D();
  });

  test('describes the font it was asked for in the info and common blocks', () => {
    const fontData = generateBitmapFont(document.createElement('canvas'), style({ fontSize: 24 }), { chars: 'AB' });

    expect(fontData.info).toStrictEqual([{ face: 'Roboto', size: 24 }]);
    expect(fontData.common).toStrictEqual([{ lineHeight: 24 }]);
    expect(fontData.page).toStrictEqual([{ id: 0, file: '' }]);
  });

  test('generates a glyph for every character the options list', () => {
    const fontData = generateBitmapFont(document.createElement('canvas'), style(), { chars: 'AB' });

    expect(fontData.char.map((char) => char.id)).toStrictEqual([65, 66]);
  });

  test('fills in the style properties the caller left out', () => {
    const bareStyle = style();

    generateBitmapFont(document.createElement('canvas'), bareStyle, { chars: 'A' });

    expect(bareStyle).toStrictEqual({
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
    });
  });

  test('sizes the canvas to the texture the config asks for', () => {
    const canvas = document.createElement('canvas');

    generateBitmapFont(canvas, style(), { chars: 'A', width: 256, height: 128 });

    expect([canvas.width, canvas.height]).toStrictEqual([256, 128]);
  });

  test('falls back to the default alphanumeric character set', () => {
    const fontData = generateBitmapFont(document.createElement('canvas'), style());

    expect(fontData.char.length).toBeGreaterThan(60);
  });

  test('throws when the canvas has no 2D context', () => {
    const canvas = document.createElement('canvas');
    vi.spyOn(canvas, 'getContext').mockReturnValue(null);

    expect(() => generateBitmapFont(canvas, style(), { chars: 'A' })).toThrow('Unable to get a 2D rendering context.');

    vi.restoreAllMocks();
  });
});
