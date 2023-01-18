// core
import { generateBitmapFont } from "./bitcharify/generateBitmapFont";
import { generateBitmapFonts } from "./bitcharify/generateBitmapFonts";
import { CHARS_ALPHA, CHARS_ALPHANUMERIC, CHARS_ASCII, CHARS_NUMERIC } from "./bitcharify/core/const";
import { loadImage } from "./bitcharify/core/loadImage";
import { addToCache as addToCachePhaser2 } from "./bitcharify/integration/phaser2/addToCache";
import { addToCache as addToCachePhaser3 } from "./bitcharify/integration/phaser3/addToCache";
// exports
export {
  generateBitmapFont,
  generateBitmapFonts,
  CHARS_ALPHA,
  CHARS_ALPHANUMERIC,
  CHARS_ASCII,
  CHARS_NUMERIC,
  loadImage,
  addToCachePhaser2,
  addToCachePhaser3,
};
