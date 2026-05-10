type ImageHandler = (event: Event) => void;

// Loads an image from a URL.
export const loadImage = (url: string): Promise<Event> => {
  return new Promise<Event>((resolve, reject) => {
    const image = new Image();
    const handlers: { load?: ImageHandler; error?: ImageHandler } = {};
    const cleanup = (): void => {
      if (handlers.load) {
        image.removeEventListener('load', handlers.load);
      }
      if (handlers.error) {
        image.removeEventListener('error', handlers.error);
      }
    };
    handlers.load = (event: Event): void => {
      cleanup();
      resolve(event);
    };
    handlers.error = (event: Event): void => {
      cleanup();
      reject(event);
    };
    image.addEventListener('load', handlers.load);
    image.addEventListener('error', handlers.error);
    image.src = url;
  });
};
