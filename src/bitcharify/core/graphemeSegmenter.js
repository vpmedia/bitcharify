/**
 * Segments a string into grapheme clusters.
 * @param {string} s - The string to segment.
 * @returns {string[]} The array of grapheme clusters.
 */
export const graphemeSegmenter = (s) => {
  if (typeof Intl?.Segmenter !== 'function') {
    return [...s];
  }
  const segmenter = new Intl.Segmenter();
  return [...segmenter.segment(s)].map((x) => x.segment);
};
