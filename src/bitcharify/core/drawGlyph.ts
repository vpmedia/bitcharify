import type { FontStyle, TextMetrics } from '../typedef.js';
import { toFontString } from './toFontString.js';

// Draws a glyph on the canvas.
export const drawGlyph = (
  _canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  metrics: TextMetrics,
  x: number,
  y: number,
  resolution: number,
  style: FontStyle
): void => {
  // canvas is currently unused but kept for API parity with future fill-style generation
  const char = metrics.text;
  const fontProperties = metrics.fontProperties;
  context.translate(x, y);
  context.scale(resolution, resolution);
  const tx = style.strokeThickness / 2;
  const ty = -(style.strokeThickness / 2);
  context.font = toFontString(style);
  context.lineWidth = style.strokeThickness;
  if (style.textBaseline) {
    context.textBaseline = style.textBaseline;
  }
  if (style.lineJoin) {
    context.lineJoin = style.lineJoin;
  }
  context.miterLimit = style.miterLimit;
  // TODO
  // context.fillStyle = generateFillStyle(canvas, context, style, resolution, [char], metrics);
  if (style.fill) {
    context.fillStyle = style.fill;
  }
  if (style.stroke) {
    context.strokeStyle = style.stroke;
  }
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
