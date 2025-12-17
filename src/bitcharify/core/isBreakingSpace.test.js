import { isBreakingSpace } from './isBreakingSpace.js';

describe('isBreakingSpace', () => {
  test('returns true for tab character', () => {
    expect(isBreakingSpace('\t')).toBe(true);
  });

  test('returns true for space character', () => {
    expect(isBreakingSpace(' ')).toBe(true);
  });

  test('returns true for various breaking spaces', () => {
    // en quad
    expect(isBreakingSpace('\u2000')).toBe(true);
    // em quad
    expect(isBreakingSpace('\u2001')).toBe(true);
    // en space
    expect(isBreakingSpace('\u2002')).toBe(true);
    // em space
    expect(isBreakingSpace('\u2003')).toBe(true);
    // three-per-em space
    expect(isBreakingSpace('\u2004')).toBe(true);
    // four-per-em space
    expect(isBreakingSpace('\u2005')).toBe(true);
    // six-per-em space
    expect(isBreakingSpace('\u2006')).toBe(true);
    // punctuation space
    expect(isBreakingSpace('\u2008')).toBe(true);
    // thin space
    expect(isBreakingSpace('\u2009')).toBe(true);
    // hair space
    expect(isBreakingSpace('\u200A')).toBe(true);
    // medium mathematical space
    expect(isBreakingSpace('\u205F')).toBe(true);
    // ideographic space
    expect(isBreakingSpace('\u3000')).toBe(true);
  });

  test('returns false for regular text', () => {
    expect(isBreakingSpace('text')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isBreakingSpace('')).toBe(false);
  });

  test('returns false for null', () => {
    expect(isBreakingSpace(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(isBreakingSpace(undefined)).toBe(false);
  });

  test('returns false for non-string input', () => {
    expect(isBreakingSpace(123)).toBe(false);
    expect(isBreakingSpace({})).toBe(false);
    expect(isBreakingSpace([])).toBe(false);
  });

  test('returns false for newline characters', () => {
    expect(isBreakingSpace('\n')).toBe(false);
    expect(isBreakingSpace('\r')).toBe(false);
  });

  test('returns false for other special characters', () => {
    expect(isBreakingSpace('\r\n')).toBe(false); // This checks only first character which is \r (not a breaking space)
    expect(isBreakingSpace('a')).toBe(false);
  });
});
