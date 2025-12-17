const NEW_LINES = [
  0x000a, // line feed
  0x000d, // carriage return
];

/**
 * Checks if a character is a new line character.
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a new line character, false otherwise.
 */
export const isNewline = (char) => {
  if (typeof char !== 'string') {
    return false;
  }
  return NEW_LINES.includes(char.charCodeAt(0));
};
