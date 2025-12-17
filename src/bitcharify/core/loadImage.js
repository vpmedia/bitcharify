/**
 * Loads an image from a URL.
 * @param {string} url - The URL of the image to load.
 * @returns {Promise} A promise that resolves to the loaded image.
 */
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const createListeners = () => {
      image.addEventListener('load', onLoadHandler);
      image.addEventListener('error', onErrorHandler);
    };
    const removeListeners = () => {
      image.removeEventListener('load', onLoadHandler);
      image.removeEventListener('error', onErrorHandler);
    };
    const onLoadHandler = (event) => {
      removeListeners();
      resolve(event);
    };
    const onErrorHandler = (event) => {
      removeListeners();
      reject(event);
    };
    createListeners();
    image.src = url;
  });
};
