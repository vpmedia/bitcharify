/**
 * TBD.
 * @param {string} s - TBD.
 * @returns {string[]} TBD.
 */
export function graphemeSegmenter(s) {
  if (typeof Intl?.Segmenter !== 'function') {
    return [...s];
  }
  const segmenter = new Intl.Segmenter();
  return [...segmenter.segment(s)].map((x) => x.segment);
}
