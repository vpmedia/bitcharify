const CHARACTER_WIDTH = 8;
const ASCENT_RATIO = 0.8;
const DESCENT_RATIO = 0.2;

const getFontSize = (font: string): number =>
  Number(/(?<size>\d+(?:\.\d+)?)px/u.exec(font || '')?.groups?.size ?? '16');

const noop = (): void => {};

/** happy-dom ships no canvas implementation, and a bitmap font generator is nothing but canvas work, so without one there is nothing here a test can reach. Metrics are deterministic and deliberately not browser-accurate. */
const createContext2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const context: Partial<CanvasRenderingContext2D> & { font: string } = {
    canvas,
    font: '10px sans-serif',
    fillStyle: '#000000',
    strokeStyle: '#000000',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    imageSmoothingEnabled: true,
    measureText(text: string): TextMetrics {
      const fontSize = getFontSize(this.font);
      return {
        // oxlint-disable-next-line typescript/no-misused-spread -- code points are the unit a text-width stub measures
        width: [...(text ?? '')].length * (fontSize / 16) * CHARACTER_WIDTH,
        actualBoundingBoxAscent: fontSize * ASCENT_RATIO,
        actualBoundingBoxDescent: fontSize * DESCENT_RATIO,
      } as TextMetrics;
    },
    getImageData(_x: number, _y: number, width: number, height: number): ImageData {
      return {
        width,
        height,
        colorSpace: 'srgb',
        data: new Uint8ClampedArray(Math.max(width, 0) * Math.max(height, 0) * 4),
      };
    },
  };
  for (const name of [
    'arc',
    'beginPath',
    'clearRect',
    'clip',
    'closePath',
    'drawImage',
    'fill',
    'fillRect',
    'fillText',
    'lineTo',
    'moveTo',
    'putImageData',
    'rect',
    'restore',
    'rotate',
    'save',
    'scale',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeRect',
    'strokeText',
    'transform',
    'translate',
  ]) {
    (context as unknown as Record<string, () => void>)[name] = noop;
  }
  return context as CanvasRenderingContext2D;
};

/** Safe to call repeatedly; the first call wins and later ones are ignored. */
export const installCanvasContext2D = (): void => {
  const prototype = globalThis.HTMLCanvasElement?.prototype as
    | (HTMLCanvasElement & { isFixtureContext?: boolean })
    | undefined;
  if (!prototype || prototype.isFixtureContext) {
    return;
  }
  const contexts = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
  prototype.isFixtureContext = true;
  prototype.getContext = function getContext(
    this: HTMLCanvasElement,
    contextId: string
  ): CanvasRenderingContext2D | null {
    if (contextId !== '2d') {
      return null;
    }
    let context = contexts.get(this);
    if (!context) {
      context = createContext2D(this);
      contexts.set(this, context);
    }
    return context;
  } as HTMLCanvasElement['getContext'];
};
