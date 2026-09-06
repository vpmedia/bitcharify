/** Cache of breaking spaces. */
const BREAKING_SPACES = new Set([
  0x0009, // character tabulation
  0x0020, // space
  0x2000, // en quad
  0x2001, // em quad
  0x2002, // en space
  0x2003, // em space
  0x2004, // three-per-em space
  0x2005, // four-per-em space
  0x2006, // six-per-em space
  0x2008, // punctuation space
  0x2009, // thin space
  0x200a, // hair space
  0x205f, // medium mathematical space
  0x3000, // ideographic space
]);

// Checks if a character is a breaking space.
export const isBreakingSpace = (char: unknown): boolean => {
  if (typeof char !== 'string') {
    return false;
  }
  const codePoint = char.codePointAt(0);
  return codePoint !== undefined && BREAKING_SPACES.has(codePoint);
};
