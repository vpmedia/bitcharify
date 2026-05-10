import { generateChars } from './core/generateChars.js';
import { generateKernings } from './core/generateKernings.js';
import { getConfig } from './core/getConfig.js';
import { getFontData } from './core/getFontData.js';
import { resolveCharacters } from './core/resolveCharacters.js';
import type { BitmapFontConfigInput, FontData, FontStyle } from './typedef.js';

// Generates a bitmap font from a font style.
export const generateBitmapFont = (
  canvas: HTMLCanvasElement,
  style: FontStyle,
  options: BitmapFontConfigInput = {}
): FontData => {
  // init config
  const defaultConfig = getConfig();
  const config = { ...defaultConfig, ...options };
  // normalize style
  style.strokeThickness ||= 0;
  style.fontStyle ||= 'normal';
  style.fontVariant ||= 'normal';
  style.fontWeight ||= 'normal';
  style.leading ||= 0;
  style.letterSpacing ||= 0;
  style.lineHeight ||= 0;
  style.miterLimit ||= 10;
  style.padding ||= 0;
  // init canvas
  canvas.width = config.width;
  canvas.height = config.height;
  // init context
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    throw new Error('Unable to get a 2D rendering context.');
  }
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
};
