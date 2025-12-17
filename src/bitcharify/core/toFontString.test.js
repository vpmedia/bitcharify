import { toFontString } from './toFontString.js';

describe('toFontString', () => {
  test('converts basic font style to CSS string', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: 'Arial',
    };

    expect(toFontString(style)).toBe('normal normal normal 16px "Arial"');
  });

  test('handles numeric font size', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 20,
      fontFamily: 'Helvetica',
    };

    expect(toFontString(style)).toBe('normal normal normal 20px "Helvetica"');
  });

  test('handles string font size', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      fontFamily: 'Times New Roman',
    };

    expect(toFontString(style)).toBe('normal normal normal 24px "Times New Roman"');
  });

  test('handles array of font families', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
    };

    expect(toFontString(style)).toBe('normal normal normal 16px "Arial","Helvetica","sans-serif"');
  });

  test('handles single font family as string', () => {
    const style = {
      fontStyle: 'italic',
      fontVariant: 'normal',
      fontWeight: 'bold',
      fontSize: 14,
      fontFamily: 'Courier New',
    };

    expect(toFontString(style)).toBe('italic normal bold 14px "Courier New"');
  });

  test('trims font family names', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: '  Arial  ',
    };

    expect(toFontString(style)).toBe('normal normal normal 16px "Arial"');
  });

  test('handles font families with quotes', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: '"Arial Black"',
    };

    expect(toFontString(style)).toBe('normal normal normal 16px "Arial Black"');
  });

  test('handles various font weight values', () => {
    const style = {
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 700,
      fontSize: 16,
      fontFamily: 'Arial',
    };

    expect(toFontString(style)).toBe('normal normal 700 16px "Arial"');
  });
});
