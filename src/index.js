// core
import { generateBitmapFont } from "./bitcharify/generateBitmapFont";
import { CHARS_ALPHA, CHARS_ALPHANUMERIC, CHARS_ASCII, CHARS_NUMERIC } from "./bitcharify/core/const";
import { loadImage } from "./bitcharify/core/loadImage";
import { addToCache as addToCachePhaser2 } from "./bitcharify/integration/phaser2/addToCache";
import { addToCache as addToCachePhaser3 } from "./bitcharify/integration/phaser3/addToCache";
// exports
export {
  generateBitmapFont,
  CHARS_ALPHA,
  CHARS_ALPHANUMERIC,
  CHARS_ASCII,
  CHARS_NUMERIC,
  loadImage,
  addToCachePhaser2,
  addToCachePhaser3,
};
