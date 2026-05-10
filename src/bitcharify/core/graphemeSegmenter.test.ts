import { graphemeSegmenter } from './graphemeSegmenter.js';

describe('graphemeSegmenter', () => {
  test('returns array of grapheme clusters for basic text', () => {
    expect(graphemeSegmenter('hello')).toEqual(['h', 'e', 'l', 'l', 'o']);
  });

  test('returns array of grapheme clusters for emoji', () => {
    expect(graphemeSegmenter('😀😃😄')).toEqual(['😀', '😃', '😄']);
  });

  test('returns array of grapheme clusters for combined characters', () => {
    expect(graphemeSegmenter('café')).toEqual(['c', 'a', 'f', 'é']);
  });

  test('returns array of grapheme clusters for empty string', () => {
    expect(graphemeSegmenter('')).toEqual([]);
  });

  test('returns array of grapheme clusters for space', () => {
    expect(graphemeSegmenter(' ')).toEqual([' ']);
  });

  test('returns array of grapheme clusters for mixed content', () => {
    expect(graphemeSegmenter('Hello 😀')).toEqual(['H', 'e', 'l', 'l', 'o', ' ', '😀']);
  });

  test('handles non-string input gracefully', () => {
    // When null/undefined are converted to strings, they become "null"/"undefined"
    // But the function should still handle them properly
    expect(graphemeSegmenter(null)).toEqual(['n', 'u', 'l', 'l']);
    expect(graphemeSegmenter(undefined)).toEqual(['u', 'n', 'd', 'e', 'f', 'i', 'n', 'e', 'd']);
    expect(graphemeSegmenter(123)).toEqual(['1', '2', '3']);
  });
});
