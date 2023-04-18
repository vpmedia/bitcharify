import { CHARS_ALPHANUMERIC } from "./const";

/**
 * TBD.
 * @returns {object} TBD.
 */
export function getConfig() {
  return {
    resolution: 1,
    width: 512,
    height: 512,
    padding: 4,
    chars: CHARS_ALPHANUMERIC,
  };
}
