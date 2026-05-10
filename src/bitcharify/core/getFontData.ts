import type { FontData } from '../typedef.js';

// Gets the font data for a given font.
export const getFontData = (): FontData => {
  return {
    info: [],
    common: [],
    page: [],
    char: [],
    kerning: [],
    distanceField: [],
  };
};
