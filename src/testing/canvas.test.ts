import { describe, expect, it } from 'vitest';
import { installCanvasContext2D } from './canvas.js';

const context2D = (): CanvasRenderingContext2D => {
  installCanvasContext2D();
  const context = globalThis.document.createElement('canvas').getContext('2d');
  if (!context) {
    throw new Error('No 2d context');
  }
  return context;
};

describe('installCanvasContext2D', () => {
  it('measures text in proportion to the font size', (): void => {
    const context = context2D();
    context.font = '16px sans-serif';
    const single = context.measureText('a');
    expect(single.width).toBeGreaterThan(0);
    expect(context.measureText('aa').width).toBe(single.width * 2);
    context.font = '32px sans-serif';
    expect(context.measureText('a').width).toBe(single.width * 2);
  });

  it('reports an ascent and a descent so text can lay itself out', (): void => {
    const context = context2D();
    context.font = '20px sans-serif';
    const metrics = context.measureText('a');
    expect(metrics.actualBoundingBoxAscent).toBe(16);
    expect(metrics.actualBoundingBoxDescent).toBe(4);
  });

  it('falls back to a default size for a font it cannot parse', (): void => {
    const context = context2D();
    context.font = 'inherit';
    expect(context.measureText('a').width).toBe(8);
  });

  it('returns transparent pixels of the requested size', (): void => {
    const image = context2D().getImageData(0, 0, 4, 3);
    expect(image.width).toBe(4);
    expect(image.height).toBe(3);
    expect(image.data).toHaveLength(4 * 3 * 4);
  });

  it('accepts the drawing calls a component makes', (): void => {
    const context = context2D();
    expect((): void => {
      context.save();
      context.beginPath();
      context.fillRect(0, 0, 1, 1);
      context.fillText('a', 0, 0);
      context.restore();
    }).not.toThrow();
  });

  it('hands the same context back for the same canvas and refuses any other kind', (): void => {
    installCanvasContext2D();
    const canvas = globalThis.document.createElement('canvas');
    expect(canvas.getContext('2d')).toBe(canvas.getContext('2d'));
    expect(canvas.getContext('webgl')).toBeNull();
  });

  it('is safe to call repeatedly', (): void => {
    installCanvasContext2D();
    const first = globalThis.document.createElement('canvas').getContext('2d');
    installCanvasContext2D();
    expect(globalThis.document.createElement('canvas').getContext('2d')).not.toBe(first);
  });
});
