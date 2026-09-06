import { graphemeSegmenter } from './graphemeSegmenter.js';

// Resolves character arrays to a flat array of characters.
// Throws an error if a character range is invalid or empty set is found.
export const resolveCharacters = (chars: string | (string | string[])[]): string[] => {
  const list: (string | string[])[] = typeof chars === 'string' ? [chars] : chars;
  const result: string[] = [];
  for (const item of list) {
    if (Array.isArray(item)) {
      const [startChar, endChar] = item;
      if (item.length !== 2 || startChar === undefined || endChar === undefined) {
        throw new Error(`Invalid character range length, expecting 2 got ${item.length}.`);
      }
      const startCode = startChar.codePointAt(0);
      const endCode = endChar.codePointAt(0);
      if (startCode === undefined || endCode === undefined || endCode < startCode) {
        throw new Error('Invalid character range.');
      }
      for (let code = startCode; code <= endCode; code += 1) {
        result.push(String.fromCodePoint(code));
      }
    } else {
      result.push(...graphemeSegmenter(item));
    }
  }
  if (result.length === 0) {
    throw new Error('Empty set when resolving characters.');
  }
  return result;
};
