import { CHARS_ALPHANUMERIC } from './const.js';

/**
 * TBD.
 * @returns {import('../typedef.js').BitmapFontConfig} TBD.
 */
export const getConfig = () => {
  return {
    resolution: 1,
    width: 512,
    height: 512,
    padding: 4,
    chars: CHARS_ALPHANUMERIC,
  };
};
