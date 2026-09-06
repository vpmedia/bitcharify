// @vitest-environment happy-dom
import { afterEach, describe, expect, test, vi } from 'vitest';
import { loadImage } from './loadImage.js';

const PIXEL = 'data:image/png;base64,iVBORw0KGgo=';

/**
 * `new Image()` needs a constructible stand-in, and a returned object wins over the instance, so a
 * function declaration is what lets the test hand back an element it still holds a reference to.
 */
const stubImage = (prepare: (image: HTMLImageElement) => void): void => {
  function FakeImage(): HTMLImageElement {
    const image = document.createElement('img');
    prepare(image);
    return image;
  }
  vi.stubGlobal('Image', FakeImage);
};

describe('loadImage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('resolves with the load event once the image arrives', async () => {
    const event = await loadImage(PIXEL);

    expect(event.type).toBe('load');
  });

  test('rejects with an error naming the url, keeping the event as its cause', async () => {
    const failure = new Event('error');
    stubImage((image) => {
      queueMicrotask((): void => {
        image.dispatchEvent(failure);
      });
    });

    await expect(loadImage('missing.png')).rejects.toThrow('Image failed to load: missing.png');
    await expect(loadImage('missing.png')).rejects.toHaveProperty('cause', failure);
  });

  test('drops both listeners once the image has settled', async () => {
    const removed: string[] = [];
    stubImage((image) => {
      const remove = image.removeEventListener.bind(image);
      image.removeEventListener = (type: string, listener: EventListenerOrEventListenerObject): void => {
        removed.push(type);
        remove(type, listener);
      };
      queueMicrotask((): void => {
        image.dispatchEvent(new Event('load'));
      });
    });

    await loadImage(PIXEL);

    expect(removed).toStrictEqual(['load', 'error']);
  });
});
