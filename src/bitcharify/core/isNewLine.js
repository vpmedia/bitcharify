const NEW_LINES = [
  0x000a, // line feed
  0x000d, // carriage return
];

export function isNewline(char) {
  if (typeof char !== "string") {
    return false;
  }
  return NEW_LINES.includes(char.charCodeAt(0));
}
