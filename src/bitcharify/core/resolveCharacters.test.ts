import { expect, test, describe } from 'vitest';
import { resolveCharacters } from './resolveCharacters.js';

describe('resolveCharacters', () => {
  test('resolves single string to array of characters', () => {
    expect(resolveCharacters('abc')).toStrictEqual(['a', 'b', 'c']);
  });

  test('resolves array of strings to flat array of characters', () => {
    expect(resolveCharacters(['abc', 'def'])).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('resolves character ranges', () => {
    expect(resolveCharacters([['a', 'c']])).toStrictEqual(['a', 'b', 'c']);
  });

  test('resolves mixed strings and ranges', () => {
    expect(resolveCharacters(['ab', ['c', 'e'], 'f'])).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('handles empty string input', () => {
    // An empty string becomes [''] which, when processed, causes an empty set error
    expect(() => resolveCharacters('')).toThrow('Empty set when resolving characters.');
  });

  test('throws error for invalid character range (end < start)', () => {
    expect(() => resolveCharacters([['z', 'a']])).toThrow('Invalid character range.');
  });

  test('throws error for invalid range length', () => {
    expect(() => resolveCharacters([['a']])).toThrow('Invalid character range length, expecting 2 got 1.');
  });

  test('throws error for empty set', () => {
    expect(() => resolveCharacters([])).toThrow('Empty set when resolving characters.');
  });

  test('handles single character range', () => {
    expect(resolveCharacters([['x', 'x']])).toStrictEqual(['x']);
  });

  test('handles unicode characters in ranges', () => {
    expect(resolveCharacters([['A', 'C']])).toStrictEqual(['A', 'B', 'C']);
  });
});
