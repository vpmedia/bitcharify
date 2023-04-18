import { isBreakingSpace } from "./isBreakingSpace";
import { isNewline } from "./isNewLine";

/**
 * TBD.
 * @param {string} text - TBD.
 * @returns {string[]} TBD.
 */
export function tokenize(text) {
  const tokens = [];
  let token = "";
  if (typeof text !== "string") {
    return tokens;
  }
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (isBreakingSpace(char, nextChar) || isNewline(char)) {
      if (token !== "") {
        tokens.push(token);
        token = "";
      }
      tokens.push(char);
      continue;
    }
    token += char;
  }
  if (token !== "") {
    tokens.push(token);
  }
  return tokens;
}
