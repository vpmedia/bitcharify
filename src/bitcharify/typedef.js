export const TYPE_CHECKING = true;

/**
 * @typedef {object} FontStyle
 * @property {number} fontSize - TBD.
 * @property {number} leading - TBD.
 * @property {number} letterSpacing - TBD.
 * @property {number} lineHeight - TBD.
 * @property {number} miterLimit - TBD.
 * @property {number} padding - TBD.
 * @property {number} strokeThickness - TBD.
 * @property {string | string[]} fontFamily - TBD.
 * @property {string} fontStyle - TBD.
 * @property {string} fontVariant - TBD.
 * @property {string} fontWeight - TBD.
 * @property {string} [fill] - TBD.
 * @property {string} [stroke] - TBD.
 * @property {CanvasTextBaseline} [textBaseline] - TBD.
 * @property {CanvasLineJoin} [lineJoin] - TBD.
 * @property {boolean} [wordWrap] - TBD.
 * @property {string} [dropShadow] - TBD.
 * @property {number} [dropShadowDistance] - TBD.
 */

/**
 * @typedef {object} FontProperties
 * @property {number} fontSize - TBD.
 * @property {number} ascent - TBD.
 * @property {number} descent - TBD.
 */

/**
 * @typedef {object} FontData
 * @property {{face: string | string[], size: number}[]} info - TBD.
 * @property {{lineHeight: number}[]} common - TBD.
 * @property {{id: number, file: string}[]} page - TBD.
 * @property {{id: number, page: number, x: number, y: number, width: number, height: number, xoffset: number, yoffset: number, xadvance: number}[]} char - TBD.
 * @property {{first: number, second: number, amount: number}[]} kerning - TBD.
 * @property {number[]} distanceField - TBD.
 */

/**
 * @typedef {object} TextMetrics
 * @property {string} text - TBD.
 * @property {FontStyle} style - TBD.
 * @property {number} width - TBD.
 * @property {number} height - TBD.
 * @property {string[]} lines - TBD.
 * @property {number[]} lineWidths - TBD.
 * @property {number} lineHeight - TBD.
 * @property {number} maxLineWidth - TBD.
 * @property {FontProperties} fontProperties - TBD.
 */

/**
 * @typedef {object} BitmapFontConfig
 * @property {number} [resolution] - TBD.
 * @property {number} [width] - TBD.
 * @property {number} [height] - TBD.
 * @property {number} [padding] - TBD.
 * @property {(string | string[])[]} [chars] - TBD.
 */

/**
 * @typedef {object} BitmapFontData
 * @property {FontStyle} fontStyle - TBD.
 * @property {FontData} fontData - TBD.
 * @property {string} imageData - TBD.
 */
