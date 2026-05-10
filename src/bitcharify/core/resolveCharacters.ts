// Resolves character arrays to a flat array of characters.
// Throws an error if a character range is invalid or empty set is found.
export const resolveCharacters = (chars: string | (string | string[])[]): string[] => {
  const list: (string | string[])[] = typeof chars === 'string' ? [chars] : chars;
  const result: string[] = [];
  for (let i = 0, j = list.length; i < j; i++) {
    const item = list[i];
    if (Array.isArray(item)) {
      if (item.length !== 2) {
        throw new Error(`Invalid character range length, expecting 2 got ${item.length}.`);
      }
      const startCode = item[0].charCodeAt(0);
      const endCode = item[1].charCodeAt(0);
      if (endCode < startCode) {
        throw new Error('Invalid character range.');
      }
      for (let code = startCode, end = endCode; code <= end; code++) {
        result.push(String.fromCharCode(code));
      }
    } else {
      result.push(...item);
    }
  }
  if (result.length === 0) {
    throw new Error('Empty set when resolving characters.');
  }
  return result;
};
