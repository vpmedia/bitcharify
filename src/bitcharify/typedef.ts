export const TYPE_CHECKING = true;

export interface FontStyle {
  /** The font size in pixels. */
  fontSize: number;
  /** The leading (line spacing) in pixels. */
  leading: number;
  /** The letter spacing in pixels. */
  letterSpacing: number;
  /** The line height in pixels. */
  lineHeight: number;
  /** The miter limit for stroke joins. */
  miterLimit: number;
  /** The padding around the text in pixels. */
  padding: number;
  /** The thickness of the text stroke in pixels. */
  strokeThickness: number;
  /** The font family or families to use. */
  fontFamily: string | string[];
  /** The style of the font (e.g., 'normal', 'italic'). */
  fontStyle: string;
  /** The variant of the font (e.g., 'normal', 'small-caps'). */
  fontVariant: string;
  /** The weight of the font (e.g., 'normal', 'bold'). */
  fontWeight: string | number;
  /** The fill color of the text. */
  fill?: string;
  /** The stroke color of the text. */
  stroke?: string;
  /** The baseline alignment of the text. */
  textBaseline?: CanvasTextBaseline;
  /** The line join style for strokes. */
  lineJoin?: CanvasLineJoin;
  /** Whether to enable word wrapping. */
  wordWrap?: boolean;
  /** The color of the drop shadow. */
  dropShadow?: string;
  /** The distance of the drop shadow in pixels. */
  dropShadowDistance?: number;
}

export interface FontProperties {
  /** The font size in pixels. */
  fontSize: number;
  /** The ascent of the font in pixels. */
  ascent: number;
  /** The descent of the font in pixels. */
  descent: number;
}

export interface FontInfo {
  face: string | string[];
  size: number;
}

export interface FontCommon {
  lineHeight: number;
}

export interface FontPage {
  id: number;
  file: string;
}

export interface FontChar {
  id: number;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  xoffset: number;
  yoffset: number;
  xadvance: number;
}

export interface FontKerning {
  first: number;
  second: number;
  amount: number;
}

export interface FontData {
  /** The font metadata information. */
  info: FontInfo[];
  /** The common font properties. */
  common: FontCommon[];
  /** The font page information. */
  page: FontPage[];
  /** The character data for each glyph. */
  char: FontChar[];
  /** The kerning pairs for character spacing. */
  kerning: FontKerning[];
  /** The distance field data for the font. */
  distanceField: number[];
  /** Font X spacing. */
  xSpacing?: number;
  /** Font Y spacing. */
  ySpacing?: number;
}

export interface TextMetrics {
  /** The text content. */
  text: string;
  /** The font style used for the text. */
  style: FontStyle;
  /** The width of the text in pixels. */
  width: number;
  /** The height of the text in pixels. */
  height: number;
  /** The text broken into lines. */
  lines: string[];
  /** The width of each line in pixels. */
  lineWidths: number[];
  /** The height of each line in pixels. */
  lineHeight: number;
  /** The maximum width of any line in pixels. */
  maxLineWidth: number;
  /** The properties of the font used. */
  fontProperties: FontProperties;
}

export type CharRange = [string, string];
export type CharsInput = string | (string | string[])[];

export interface BitmapFontConfig {
  /** The resolution of the bitmap font. */
  resolution: number;
  /** The width of the bitmap font texture in pixels. */
  width: number;
  /** The height of the bitmap font texture in pixels. */
  height: number;
  /** The padding around characters in pixels. */
  padding: number;
  /** The characters to include in the bitmap font. */
  chars: CharsInput;
}

export type BitmapFontConfigInput = Partial<BitmapFontConfig>;

export interface BitmapFontData {
  /** The font style used for the bitmap font. */
  fontStyle: FontStyle;
  /** The raw font data. */
  fontData: FontData;
  /** The base64 encoded image data of the bitmap font. */
  imageData: string;
}
