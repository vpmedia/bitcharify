const NEW_LINES = new Set([
  0x000a, // line feed
  0x000d, // carriage return
]);

// Checks if a character is a new line character.
export const isNewline = (char: unknown): boolean => {
  if (typeof char !== 'string') {
    return false;
  }
  const codePoint = char.codePointAt(0);
  return codePoint !== undefined && NEW_LINES.has(codePoint);
};
