// import { generateFillStyle } from "./generateFillStyle";
import { toFontString } from './toFontString.js';

/**
 * Draws a glyph on the canvas.
 * @param {HTMLCanvasElement} canvas - The canvas to draw on.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 * @param {import('../typedef.js').TextMetrics} metrics - The text metrics for the glyph.
 * @param {number} x - The x position to draw the glyph at.
 * @param {number} y - The y position to draw the glyph at.
 * @param {number} resolution - The resolution of the canvas.
 * @param {import('../typedef.js').FontStyle} style - The font style to use for drawing.
 */
export const drawGlyph = (canvas, context, metrics, x, y, resolution, style) => {
  const char = metrics.text;
  const fontProperties = metrics.fontProperties;
  context.translate(x, y);
  context.scale(resolution, resolution);
  const tx = style.strokeThickness / 2;
  const ty = -(style.strokeThickness / 2);
  context.font = toFontString(style);
  context.lineWidth = style.strokeThickness;
  context.textBaseline = style.textBaseline;
  context.lineJoin = style.lineJoin;
  context.miterLimit = style.miterLimit;
  // TODO
  // context.fillStyle = generateFillStyle(canvas, context, style, resolution, [char], metrics);
  context.fillStyle = style.fill;
  context.strokeStyle = style.stroke;
  context.shadowColor = 'black';
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  if (style.stroke && style.strokeThickness) {
    context.strokeText(char, tx, ty + metrics.lineHeight - fontProperties.descent);
  }
  if (style.fill) {
    context.fillText(char, tx, ty + metrics.lineHeight - fontProperties.descent);
  }
  context.setTransform(1, 0, 0, 1, 0, 0); // defaults needed for older browsers (e.g. Opera 29)
  context.fillStyle = 'rgba(0, 0, 0, 0)';
};
