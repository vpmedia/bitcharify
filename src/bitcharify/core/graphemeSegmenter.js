export function graphemeSegmenter() {
  if (typeof Intl?.Segmenter !== "function") {
    return (s) => [...s];
  }
  const segmenter = new Intl.Segmenter();
  return (s) => [...segmenter.segment(s)].map((x) => x.segment);
}
