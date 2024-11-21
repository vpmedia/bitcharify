import { isBreakingSpace } from './isBreakingSpace.js';
import { isNewline } from './isNewLine.js';

/**
 * TBD.
 * @param {string} text - TBD.
 * @returns {string[]} TBD.
 */
export const tokenize = (text) => {
  const tokens = [];
  let token = '';
  if (typeof text !== 'string') {
    return tokens;
  }
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // const nextChar = text[i + 1];
    if (isBreakingSpace(char) || isNewline(char)) {
      if (token !== '') {
        tokens.push(token);
        token = '';
      }
      tokens.push(char);
      continue;
    }
    token += char;
  }
  if (token !== '') {
    tokens.push(token);
  }
  return tokens;
};
