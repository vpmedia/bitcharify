import { isNewline } from './isNewLine.js';

describe('isNewline', () => {
  test('returns false for regular text', () => {
    expect(isNewline('text')).toBe(false);
  });

  test('returns true for line feed character', () => {
    expect(isNewline('\n')).toBe(true);
  });

  test('returns true for carriage return character', () => {
    expect(isNewline('\r')).toBe(true);
  });

  test('returns false for empty string', () => {
    expect(isNewline('')).toBe(false);
  });

  test('returns false for null', () => {
    expect(isNewline(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(isNewline(undefined)).toBe(false);
  });

  test('returns false for non-string input', () => {
    expect(isNewline(123)).toBe(false);
    expect(isNewline({})).toBe(false);
    expect(isNewline([])).toBe(false);
  });

  test('returns false for space character', () => {
    expect(isNewline(' ')).toBe(false);
  });

  test('returns false for tab character', () => {
    expect(isNewline('\t')).toBe(false);
  });

  test('returns true for multi-character string with newline as first char', () => {
    expect(isNewline('\r\n')).toBe(true); // First character is \r
    expect(isNewline('\nabc')).toBe(true); // First character is \n
  });

  test('returns false for multi-character string with non-newline as first char', () => {
    expect(isNewline('abc\n')).toBe(false); // First character is 'a'
    expect(isNewline('hello')).toBe(false);
  });
});
