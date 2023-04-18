/**
 * TBD.
 * @param {string} url - TBD.
 * @returns {Promise} TBD.
 */
export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const createListeners = () => {
      image.addEventListener("load", onLoadHandler);
      image.addEventListener("error", onErrorHandler);
    };
    const removeListeners = () => {
      image.removeEventListener("load", onLoadHandler);
      image.removeEventListener("error", onErrorHandler);
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
}
