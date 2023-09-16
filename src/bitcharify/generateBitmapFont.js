import { getConfig } from './core/getConfig.js';
import { resolveCharacters } from './core/resolveCharacters.js';
import { getFontData } from './core/getFontData.js';
import { generateKernings } from './core/generateKernings.js';
import { generateChars } from './core/generateChars.js';

/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {object} style - TBD.
 * @param {object} options - TBD.
 * @returns {object} TBD.
 */
export function generateBitmapFont(canvas, style, options = {}) {
  // init config
  const defaultConfig = getConfig();
  const config = { ...defaultConfig, ...options };
  // normalize style
  style.strokeThickness = style.strokeThickness || 0;
  style.fontStyle = style.fontStyle || 'normal';
  style.fontVariant = style.fontVariant || 'normal';
  style.fontWeight = style.fontWeight || 'normal';
  style.leading = style.leading || 0;
  style.letterSpacing = style.letterSpacing || 0;
  style.lineHeight = style.lineHeight || 0;
  style.miterLimit = style.miterLimit || 10;
  style.padding = style.padding || 0;
  // init canvas
  canvas.width = config.width;
  canvas.height = config.height;
  // init context
  const context = canvas.getContext('2d', { willReadFrequently: true });
  // context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = 'high';
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // generate font data
  const charList = resolveCharacters(config.chars);
  // const lineWidth = config.width;
  const data = getFontData();
  data.info[0] = {
    face: style.fontFamily,
    size: style.fontSize,
  };
  data.common[0] = {
    lineHeight: style.fontSize,
  };
  data.page[0] = {
    id: 0,
    file: '',
  };
  // generators
  generateChars(canvas, context, config, style, data, charList);
  generateKernings(context, data, charList);
  // process completed
  return data;
}
