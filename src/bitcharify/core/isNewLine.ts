const NEW_LINES: number[] = [
  0x000a, // line feed
  0x000d, // carriage return
];

// Checks if a character is a new line character.
export const isNewline = (char: unknown): boolean => {
  if (typeof char !== 'string') {
    return false;
  }
  return NEW_LINES.includes(char.charCodeAt(0));
};
