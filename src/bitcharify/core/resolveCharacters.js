/**
 * TBD.
 * @param {string|string[]} chars - TBD.
 * @returns {string[]} TBD.
 * @throws Error.
 */
export function resolveCharacters(chars) {
  if (typeof chars === 'string') {
    chars = [chars];
  }
  const result = [];
  for (let i = 0, j = chars.length; i < j; i++) {
    const item = chars[i];
    if (Array.isArray(item)) {
      if (item.length !== 2) {
        throw new Error(`Invalid character range length, expecting 2 got ${item.length}.`);
      }
      const startCode = item[0].charCodeAt(0);
      const endCode = item[1].charCodeAt(0);
      if (endCode < startCode) {
        throw new Error('Invalid character range.');
      }
      for (let i = startCode, j = endCode; i <= j; i++) {
        result.push(String.fromCharCode(i));
      }
    } else {
      result.push(...Array.from(item));
    }
  }
  if (result.length === 0) {
    throw new Error('Empty set when resolving characters.');
  }
  return result;
}
