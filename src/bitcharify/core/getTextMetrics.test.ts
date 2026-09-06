import { describe, expect, test } from 'vitest';
import type { FontProperties, FontStyle } from '../typedef.js';
import { getTextMetrics } from './getTextMetrics.js';

const STYLE = { fontSize: 16, fontFamily: 'Roboto' } as FontStyle;
const FONT_PROPERTIES: FontProperties = { ascent: 12, descent: 4, fontSize: 16 };

describe('getTextMetrics', () => {
  test('carries every measurement it was handed', () => {
    const metrics = getTextMetrics('two\nlines', STYLE, 80, 40, ['two', 'lines'], [24, 40], 20, 40, FONT_PROPERTIES);

    expect(metrics).toStrictEqual({
      text: 'two\nlines',
      style: STYLE,
      width: 80,
      height: 40,
      lines: ['two', 'lines'],
      lineWidths: [24, 40],
      lineHeight: 20,
      maxLineWidth: 40,
      fontProperties: FONT_PROPERTIES,
    });
  });
});
