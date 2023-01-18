/**
 * TBD
 *
 * @param {object} fontData TBD
 * @param {object} frame TBD
 * @param {object} texture TBD
 */
function getBitmapFontData(fontData, frame, texture) {
  const xSpacing = 0;
  const ySpacing = 0;
  const textureX = frame.cutX;
  const textureY = frame.cutY;
  const textureWidth = frame.source.width;
  const textureHeight = frame.source.height;
  const sourceIndex = frame.sourceIndex;
  const data = {};
  data.font = fontData.info[0].face;
  data.size = fontData.info[0].size;
  data.lineHeight = fontData.common[0].lineHeight + ySpacing;
  data.chars = {};
  const adjustForTrim = frame !== undefined && frame.trimmed;
  let top = frame.height;
  let left = frame.width;
  for (let i = 0; i < fontData.char.length; i += 1) {
    const char = fontData.char[i];
    const charCode = char.id;
    const letter = String.fromCharCode(charCode);
    let gx = char.x;
    let gy = char.y;
    const gw = char.width;
    const gh = char.height;
    //  Handle frame trim issues
    if (adjustForTrim) {
      if (gx < left) {
        left = gx;
      }
      if (gy < top) {
        top = gy;
      }
    }
    if (adjustForTrim && top !== 0 && left !== 0) {
      //  Now we know the top and left coordinates of the glyphs in the original data
      //  so we can work out how much to adjust the glyphs by
      gx -= frame.x;
      gy -= frame.y;
    }
    const u0 = (textureX + gx) / textureWidth;
    const v0 = (textureY + gy) / textureHeight;
    const u1 = (textureX + gx + gw) / textureWidth;
    const v1 = (textureY + gy + gh) / textureHeight;
    data.chars[charCode] = {
      x: gx,
      y: gy,
      width: gw,
      height: gh,
      centerX: Math.floor(gw / 2),
      centerY: Math.floor(gh / 2),
      xOffset: char.xoffset,
      yOffset: char.yoffset,
      xAdvance: char.xadvance + xSpacing,
      data: {},
      kerning: {},
      u0: u0,
      v0: v0,
      u1: u1,
      v1: v1,
    };
    if (texture && gw !== 0 && gh !== 0) {
      const charFrame = texture.add(letter, sourceIndex, gx, gy, gw, gh);
      if (charFrame) {
        charFrame.setUVs(gw, gh, u0, v0, u1, v1);
      }
    }
  }
  for (let i = 0; i < fontData.kerning.length; i += 1) {
    const kerning = fontData.kerning[i];
    const first = kerning.first;
    const second = kerning.second;
    const amount = kerning.amount;
    data.chars[second].kerning[first] = amount;
  }
  return data;
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
  game.textures.addImage(key, textureSource);
  const texture = game.textures.get(key);
  const frame = game.textures.getFrame(key);
  const cacheData = getBitmapFontData(fontData, frame, texture);
  game.cache.bitmapFont.add(key, { data: cacheData, texture: key, frame: null });
}
