import { describe, expect, test } from 'vitest';
import { getFontData } from './getFontData.js';

describe('getFontData', () => {
  test('starts every block empty', () => {
    expect(getFontData()).toStrictEqual({
      info: [],
      common: [],
      page: [],
      char: [],
      kerning: [],
      distanceField: [],
    });
  });

  test('hands back a fresh object each call', () => {
    const first = getFontData();
    const second = getFontData();

    first.char.push({ id: 65, page: 0, x: 0, y: 0, width: 1, height: 1, xoffset: 0, yoffset: 0, xadvance: 1 });

    expect(second.char).toStrictEqual([]);
  });
});
