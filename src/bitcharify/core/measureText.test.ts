// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { installCanvasContext2D } from '../../testing/canvas.js';
import type { FontStyle, TextMetrics as FontTextMetrics } from '../typedef.js';

type MeasureText = (text: string, style: FontStyle, canvas: HTMLCanvasElement) => FontTextMetrics;

/**
 * The measuring surface is cached in module scope, so a test that wants a different one has to
 * import a fresh copy of the module.
 */
const importMeasureText = async (): Promise<MeasureText> => {
  vi.resetModules();
  const module = await import('./measureText.js');
  return module.measureText;
};

const style = (overrides: Partial<FontStyle> = {}): FontStyle => ({
  fontSize: 16,
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

describe('measureText', () => {
  beforeEach(() => {
    installCanvasContext2D();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('measures one line against the font the style describes', async () => {
    const measureText = await importMeasureText();

    const metrics = measureText('abc', style(), document.createElement('canvas'));

    expect(metrics.text).toBe('abc');
    expect(metrics.lines).toStrictEqual(['abc']);
    // Three characters at the fixture's 8px per character, scaled to the 16px font.
    expect(metrics.lineWidths).toStrictEqual([24]);
    expect(metrics.maxLineWidth).toBe(24);
    expect(metrics.width).toBe(24);
  });

  test('splits on every newline flavour and takes the widest line', async () => {
    const measureText = await importMeasureText();

    const metrics = measureText('a\r\nbb\rccc\ndddd', style(), document.createElement('canvas'));

    expect(metrics.lines).toStrictEqual(['a', 'bb', 'ccc', 'dddd']);
    expect(metrics.maxLineWidth).toBe(32);
  });

  test('an empty text still measures one line of no width', async () => {
    const measureText = await importMeasureText();

    const metrics = measureText('', style(), document.createElement('canvas'));

    expect(metrics.lines).toStrictEqual(['']);
    expect(metrics.maxLineWidth).toBe(0);
  });

  test('letter spacing widens a line by one gap less than its characters', async () => {
    const measureText = await importMeasureText();

    const spaced = measureText('abc', style({ letterSpacing: 5 }), document.createElement('canvas'));

    expect(spaced.lineWidths).toStrictEqual([34]);
  });

  test('the stroke widens the measurement on both sides of the glyph', async () => {
    const measureText = await importMeasureText();

    const metrics = measureText('abc', style({ strokeThickness: 6 }), document.createElement('canvas'));

    expect(metrics.width).toBe(30);
    expect(metrics.height).toBe(28);
  });

  test('a drop shadow adds its distance to both dimensions', async () => {
    const measureText = await importMeasureText();

    const plain = measureText('abc', style(), document.createElement('canvas'));
    const shadowed = measureText(
      'abc',
      style({ dropShadow: '#000', dropShadowDistance: 7 }),
      document.createElement('canvas')
    );

    expect(shadowed.width - plain.width).toBe(7);
    expect(shadowed.height - plain.height).toBe(7);
  });

  test('a drop shadow without a distance adds nothing', async () => {
    const measureText = await importMeasureText();

    const plain = measureText('abc', style(), document.createElement('canvas'));
    const shadowed = measureText('abc', style({ dropShadow: '#000' }), document.createElement('canvas'));

    expect(shadowed.width).toBe(plain.width);
    expect(shadowed.height).toBe(plain.height);
  });

  test('an explicit line height wins over the measured font size', async () => {
    const measureText = await importMeasureText();

    const metrics = measureText('a\nb', style({ lineHeight: 40 }), document.createElement('canvas'));

    expect(metrics.lineHeight).toBe(40);
    expect(metrics.height).toBe(80);
  });

  test('leading spaces the lines apart on top of the line height', async () => {
    const measureText = await importMeasureText();

    const metrics = measureText('a\nb', style({ lineHeight: 40, leading: 5 }), document.createElement('canvas'));

    expect(metrics.height).toBe(85);
  });

  test('throws when the canvas it was handed has no 2D context', async () => {
    const measureText = await importMeasureText();
    const canvas = document.createElement('canvas');
    vi.spyOn(canvas, 'getContext').mockReturnValue(null);

    expect(() => measureText('abc', style(), canvas)).toThrow('Unable to get a 2D rendering context.');
  });

  test('reuses the measuring surface it built the first time', async () => {
    const measureText = await importMeasureText();
    const createElement = vi.spyOn(document, 'createElement');

    measureText('a', style(), document.createElement('canvas'));
    const afterFirst = createElement.mock.calls.length;
    measureText('b', style(), document.createElement('canvas'));

    // One canvas per call is the one the test passes in; the surface is not rebuilt.
    expect(createElement.mock.calls.length - afterFirst).toBe(1);
  });
});

interface SurfaceOptions {
  width: number;
  imageData?: Uint8ClampedArray;
}

/**
 * `_ensureMeasureCanvas` prefers an OffscreenCanvas, so a stub global is enough to hand the module
 * a surface whose numbers the test controls.
 */
const stubMeasureSurface = ({ width, imageData }: SurfaceOptions): void => {
  const context = {
    font: '',
    fillStyle: '',
    textBaseline: '',
    fillRect: (): void => {},
    fillText: (): void => {},
    measureText: (): TextMetrics => ({ width, actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0 }) as TextMetrics,
    getImageData: (): ImageData => ({ data: imageData ?? new Uint8ClampedArray(0) }) as ImageData,
  };
  vi.stubGlobal(
    'OffscreenCanvas',
    class {
      public width = 0;
      public height = 0;
      public getContext(): unknown {
        return context;
      }
    }
  );
};

describe('measureText without usable font metrics', () => {
  beforeEach(() => {
    installCanvasContext2D();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  test('scans the rendered pixels when the font reports no size', async () => {
    // A red band at the top and the bottom, ink in between, is what the scan looks for.
    const pixels = new Uint8ClampedArray(10 * 20 * 4).fill(255);
    pixels.fill(0, 3 * 40, 17 * 40);
    stubMeasureSurface({ width: 10, imageData: pixels });
    const measureText = await importMeasureText();

    const metrics = measureText('abc', style(), document.createElement('canvas'));

    expect(metrics.fontProperties).toStrictEqual({ ascent: 11, descent: 3, fontSize: 14 });
  });

  test('takes the style font size when the surface yields nothing measurable', async () => {
    stubMeasureSurface({ width: 0 });
    const measureText = await importMeasureText();

    const metrics = measureText('abc', style({ fontSize: 22 }), document.createElement('canvas'));

    expect(metrics.fontProperties).toStrictEqual({ ascent: 22, descent: 0, fontSize: 22 });
  });

  test('throws when no surface at all can provide a context', async () => {
    vi.stubGlobal('OffscreenCanvas', undefined);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    const measureText = await importMeasureText();

    expect(() => measureText('abc', style(), document.createElement('canvas'))).toThrow(
      'Unable to get a 2D rendering context.'
    );
  });
});
