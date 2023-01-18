import { BaseTexture, Rectangle, Texture } from "@vpmedia/phaser";

/**
 * TBD
 *
 * @param {object} fontData TBD
 * @param {BaseTexture} baseTexture TBD
 * @returns {object} TBD
 */
function getBitmapFontData(fontData, baseTexture) {
  const xSpacing = fontData.xSpacing || 0;
  const ySpacing = fontData.ySpacing || 0;
  const bitmapFontData = {
    font: fontData.info[0].face,
    size: fontData.info[0].size,
    lineHeight: fontData.common[0].lineHeight + ySpacing,
    chars: {},
  };
  for (let i = 0; i < fontData.char.length; i += 1) {
    const char = fontData.char[i];
    const charCode = char.id;
    bitmapFontData.chars[charCode] = {
      x: char.x,
      y: char.y,
      width: char.width,
      height: char.height,
      xOffset: char.xoffset,
      yOffset: char.yoffset,
      xAdvance: char.xadvance + xSpacing,
      kerning: {},
    };
    const letter = bitmapFontData.chars[charCode];
    letter.texture = new Texture(baseTexture, new Rectangle(letter.x, letter.y, letter.width, letter.height));
  }
  for (let i = 0; i < fontData.kerning.length; i += 1) {
    const kerning = fontData.kerning[i];
    const first = kerning.first;
    const second = kerning.second;
    const amount = kerning.amount;
    bitmapFontData.chars[second].kerning[first] = amount;
  }
  return bitmapFontData;
}

/**
 * TBD
 *
 * @param {object} game TBD
 * @param {string} key TBD
 * @param {object} fontData TBD
 * @param {HTMLImageElement|HTMLCanvasElement} textureSource TBD
 */
export function addToCache(game, key, fontData, textureSource) {
  const baseTexture = new BaseTexture(textureSource);
  const cacheData = {
    url: null,
    data: null,
    font: null,
    base: baseTexture,
  };
  cacheData.font = getBitmapFontData(fontData, baseTexture);
  game.cache._cache.bitmapFont[key] = cacheData;
}
