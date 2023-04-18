declare global {
  interface Window {
    __BITCHARIFY_CANVAS__: HTMLCanvasElement|OffscreenCanvas;
    __BITCHARIFY_CONTEXT__: CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D;
  }
}

export {};
