import { describe, expect, test } from 'vitest';
import { tokenize } from './tokenize.js';

describe('tokenize', () => {
  test('splits words on spaces and keeps the spaces', () => {
    expect(tokenize('ab cd')).toStrictEqual(['ab', ' ', 'cd']);
  });

  test('keeps a newline as its own token', () => {
    expect(tokenize('ab\ncd')).toStrictEqual(['ab', '\n', 'cd']);
  });

  test('emits a separator that opens the text with no word before it', () => {
    expect(tokenize(' ab')).toStrictEqual([' ', 'ab']);
  });

  test('emits consecutive separators one by one', () => {
    expect(tokenize('a \n b')).toStrictEqual(['a', ' ', '\n', ' ', 'b']);
  });

  test('a text without separators is one token', () => {
    expect(tokenize('word')).toStrictEqual(['word']);
  });

  test('an empty string yields nothing', () => {
    expect(tokenize('')).toStrictEqual([]);
  });

  test('anything that is not a string yields nothing', () => {
    expect(tokenize(null)).toStrictEqual([]);
    expect(tokenize(undefined)).toStrictEqual([]);
    expect(tokenize(42)).toStrictEqual([]);
  });
});
