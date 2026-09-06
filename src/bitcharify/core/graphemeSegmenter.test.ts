import { afterEach, describe, expect, test, vi } from 'vitest';
import { graphemeSegmenter } from './graphemeSegmenter.js';

describe('graphemeSegmenter', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('returns array of grapheme clusters for basic text', () => {
    expect(graphemeSegmenter('hello')).toStrictEqual(['h', 'e', 'l', 'l', 'o']);
  });

  test('returns array of grapheme clusters for emoji', () => {
    expect(graphemeSegmenter('😀😃😄')).toStrictEqual(['😀', '😃', '😄']);
  });

  test('returns array of grapheme clusters for combined characters', () => {
    expect(graphemeSegmenter('café')).toStrictEqual(['c', 'a', 'f', 'é']);
  });

  test('returns array of grapheme clusters for empty string', () => {
    expect(graphemeSegmenter('')).toStrictEqual([]);
  });

  test('returns array of grapheme clusters for space', () => {
    expect(graphemeSegmenter(' ')).toStrictEqual([' ']);
  });

  test('returns array of grapheme clusters for mixed content', () => {
    expect(graphemeSegmenter('Hello 😀')).toStrictEqual(['H', 'e', 'l', 'l', 'o', ' ', '😀']);
  });

  test('falls back to code points on a runtime without Intl.Segmenter', () => {
    const segmenter = Intl.Segmenter;
    Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: undefined });

    try {
      expect(graphemeSegmenter('hi')).toStrictEqual(['h', 'i']);
      // One code point per entry is all the fallback can offer, so a joined emoji comes apart.
      expect(graphemeSegmenter('👩‍🚀')).toStrictEqual(['👩', '‍', '🚀']);
    } finally {
      Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: segmenter });
    }
  });

  test('handles non-string input gracefully', () => {
    // When null/undefined are converted to strings, they become "null"/"undefined"
    // But the function should still handle them properly
    expect(graphemeSegmenter(null)).toStrictEqual(['n', 'u', 'l', 'l']);
    expect(graphemeSegmenter(undefined)).toStrictEqual(['u', 'n', 'd', 'e', 'f', 'i', 'n', 'e', 'd']);
    expect(graphemeSegmenter(123)).toStrictEqual(['1', '2', '3']);
  });
});
