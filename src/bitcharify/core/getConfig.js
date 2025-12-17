import { CHARS_ALPHANUMERIC } from './const.js';

/**
 * Gets the default bitmap font configuration.
 * @returns {import('../typedef.js').BitmapFontConfig} The default bitmap font configuration.
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
