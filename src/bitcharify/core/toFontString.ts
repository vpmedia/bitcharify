import type { FontStyle } from '../typedef.js';

export type FontStringStyle = Pick<FontStyle, 'fontStyle' | 'fontVariant' | 'fontWeight' | 'fontFamily'> & {
  /** Pixels, or a CSS length the caller has already written out. */
  fontSize: number | string;
};

// Converts a font style to a CSS font string.
export const toFontString = (style: FontStringStyle): string => {
  const fontSizeString = typeof style.fontSize === 'number' ? `${style.fontSize}px` : style.fontSize;
  const fontFamilies = (Array.isArray(style.fontFamily) ? [...style.fontFamily] : style.fontFamily.split(',')).map(
    (entry) => {
      const fontFamily = entry.trim();
      return fontFamily.includes('"') ? fontFamily : `"${fontFamily}"`;
    }
  );
  return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${fontSizeString} ${fontFamilies.join(',')}`;
};
