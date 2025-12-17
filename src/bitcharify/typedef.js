export const TYPE_CHECKING = true;

/**
 * @typedef {object} FontStyle
 * @property {number} fontSize - The font size in pixels.
 * @property {number} leading - The leading (line spacing) in pixels.
 * @property {number} letterSpacing - The letter spacing in pixels.
 * @property {number} lineHeight - The line height in pixels.
 * @property {number} miterLimit - The miter limit for stroke joins.
 * @property {number} padding - The padding around the text in pixels.
 * @property {number} strokeThickness - The thickness of the text stroke in pixels.
 * @property {string | string[]} fontFamily - The font family or families to use.
 * @property {string} fontStyle - The style of the font (e.g., 'normal', 'italic').
 * @property {string} fontVariant - The variant of the font (e.g., 'normal', 'small-caps').
 * @property {string} fontWeight - The weight of the font (e.g., 'normal', 'bold').
 * @property {string} [fill] - The fill color of the text.
 * @property {string} [stroke] - The stroke color of the text.
 * @property {CanvasTextBaseline} [textBaseline] - The baseline alignment of the text.
 * @property {CanvasLineJoin} [lineJoin] - The line join style for strokes.
 * @property {boolean} [wordWrap] - Whether to enable word wrapping.
 * @property {string} [dropShadow] - The color of the drop shadow.
 * @property {number} [dropShadowDistance] - The distance of the drop shadow in pixels.
 */

/**
 * @typedef {object} FontProperties
 * @property {number} fontSize - The font size in pixels.
 * @property {number} ascent - The ascent of the font in pixels.
 * @property {number} descent - The descent of the font in pixels.
 */

/**
 * @typedef {object} FontData
 * @property {{face: string | string[], size: number}[]} info - The font metadata information.
 * @property {{lineHeight: number}[]} common - The common font properties.
 * @property {{id: number, file: string}[]} page - The font page information.
 * @property {{id: number, page: number, x: number, y: number, width: number, height: number, xoffset: number, yoffset: number, xadvance: number}[]} char - The character data for each glyph.
 * @property {{first: number, second: number, amount: number}[]} kerning - The kerning pairs for character spacing.
 * @property {number[]} distanceField - The distance field data for the font.
 */

/**
 * @typedef {object} TextMetrics
 * @property {string} text - The text content.
 * @property {FontStyle} style - The font style used for the text.
 * @property {number} width - The width of the text in pixels.
 * @property {number} height - The height of the text in pixels.
 * @property {string[]} lines - The text broken into lines.
 * @property {number[]} lineWidths - The width of each line in pixels.
 * @property {number} lineHeight - The height of each line in pixels.
 * @property {number} maxLineWidth - The maximum width of any line in pixels.
 * @property {FontProperties} fontProperties - The properties of the font used.
 */

/**
 * @typedef {object} BitmapFontConfig
 * @property {number} [resolution] - The resolution of the bitmap font.
 * @property {number} [width] - The width of the bitmap font texture in pixels.
 * @property {number} [height] - The height of the bitmap font texture in pixels.
 * @property {number} [padding] - The padding around characters in pixels.
 * @property {(string | string[])[]} [chars] - The characters to include in the bitmap font.
 */

/**
 * @typedef {object} BitmapFontData
 * @property {FontStyle} fontStyle - The font style used for the bitmap font.
 * @property {FontData} fontData - The raw font data.
 * @property {string} imageData - The base64 encoded image data of the bitmap font.
 */
