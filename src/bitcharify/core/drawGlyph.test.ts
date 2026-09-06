import { describe, expect, test } from 'vitest';
import type { FontStyle, TextMetrics } from '../typedef.js';
import { drawGlyph } from './drawGlyph.js';

interface DrawCall {
  name: string;
  args: unknown[];
}

/** Records what was drawn, and keeps the assignable state so a style can be read back off it. */
const createContext = (): { context: CanvasRenderingContext2D; calls: DrawCall[] } => {
  const calls: DrawCall[] = [];
  const record =
    (name: string) =>
    (...args: unknown[]): void => {
      calls.push({ name, args });
    };
  const context = {
    translate: record('translate'),
    scale: record('scale'),
    setTransform: record('setTransform'),
    strokeText: record('strokeText'),
    fillText: record('fillText'),
  } as unknown as CanvasRenderingContext2D;
  return { context, calls };
};

const style = (overrides: Partial<FontStyle> = {}): FontStyle => ({
  fontSize: 20,
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  strokeThickness: 0,
  miterLimit: 10,
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  padding: 0,
  ...overrides,
});

const metrics = (text: string): TextMetrics =>
  ({
    text,
    lineHeight: 24,
    fontProperties: { ascent: 16, descent: 4, fontSize: 20 },
  }) as TextMetrics;

describe('drawGlyph', () => {
  test('places the glyph at the position it was given and restores the transform', () => {
    const { context, calls } = createContext();

    drawGlyph(document.createElement('canvas'), context, metrics('A'), 12, 34, 2, style({ fill: '#fff' }));

    expect(calls.filter((call) => call.name === 'translate')).toStrictEqual([{ name: 'translate', args: [12, 34] }]);
    expect(calls.filter((call) => call.name === 'scale')).toStrictEqual([{ name: 'scale', args: [2, 2] }]);
    expect(calls.at(-1)).toStrictEqual({ name: 'setTransform', args: [1, 0, 0, 1, 0, 0] });
  });

  test('fills the glyph on the baseline the metrics describe', () => {
    const { context, calls } = createContext();

    drawGlyph(document.createElement('canvas'), context, metrics('A'), 0, 0, 1, style({ fill: '#fff' }));

    expect(calls.filter((call) => call.name === 'fillText')).toStrictEqual([{ name: 'fillText', args: ['A', 0, 20] }]);
  });

  test('strokes before filling when the style asks for both', () => {
    const { context, calls } = createContext();

    drawGlyph(
      document.createElement('canvas'),
      context,
      metrics('A'),
      0,
      0,
      1,
      style({ fill: '#fff', stroke: '#000', strokeThickness: 4 })
    );

    const drawn = calls.filter((call) => call.name === 'strokeText' || call.name === 'fillText');
    expect(drawn.map((call) => call.name)).toStrictEqual(['strokeText', 'fillText']);
    // Half the stroke on each side, so the glyph keeps its centre.
    expect(drawn.map((call) => call.args)).toStrictEqual([
      ['A', 2, 18],
      ['A', 2, 18],
    ]);
  });

  test('a stroke colour with no thickness draws nothing', () => {
    const { context, calls } = createContext();

    drawGlyph(document.createElement('canvas'), context, metrics('A'), 0, 0, 1, style({ stroke: '#000' }));

    expect(calls.some((call) => call.name === 'strokeText')).toBe(false);
    expect(calls.some((call) => call.name === 'fillText')).toBe(false);
  });

  test('carries the optional baseline and line join onto the context', () => {
    const { context } = createContext();

    drawGlyph(
      document.createElement('canvas'),
      context,
      metrics('A'),
      0,
      0,
      1,
      style({ textBaseline: 'middle', lineJoin: 'round', fill: '#fff' })
    );

    expect(context.textBaseline).toBe('middle');
    expect(context.lineJoin).toBe('round');
  });

  test('leaves the baseline and line join alone when the style omits them', () => {
    const { context } = createContext();

    drawGlyph(document.createElement('canvas'), context, metrics('A'), 0, 0, 1, style({ fill: '#fff' }));

    expect(context.textBaseline).toBeUndefined();
    expect(context.lineJoin).toBeUndefined();
  });

  test('leaves the context transparent so the next glyph starts clean', () => {
    const { context } = createContext();

    drawGlyph(document.createElement('canvas'), context, metrics('A'), 0, 0, 1, style({ fill: '#fff' }));

    expect(context.fillStyle).toBe('rgba(0, 0, 0, 0)');
    expect(context.shadowBlur).toBe(0);
  });
});
