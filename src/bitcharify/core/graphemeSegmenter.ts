// Segments a string into grapheme clusters.
export const graphemeSegmenter = (s: unknown): string[] => {
  const str = String(s);
  if (typeof Intl?.Segmenter !== 'function') {
    return [...str];
  }
  const segmenter = new Intl.Segmenter();
  return [...segmenter.segment(str)].map((x) => x.segment);
};
