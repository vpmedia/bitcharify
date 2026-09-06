// Segments a string into grapheme clusters.
export const graphemeSegmenter = (s: unknown): string[] => {
  const str = String(s);
  if (typeof Intl?.Segmenter !== 'function') {
    // oxlint-disable-next-line typescript/no-misused-spread -- code points are the best a runtime without Intl.Segmenter can do
    return [...str];
  }
  const segmenter = new Intl.Segmenter();
  return [...segmenter.segment(str)].map((x) => x.segment);
};
