import { drawGlyph } from "./drawGlyph";
import { measureText } from "./measureText";

/**
 *
 * @param canvas
 * @param context
 * @param config
 * @param style
 * @param fontData
 * @param charList
 */
export function generateChars(canvas, context, config, style, fontData, charList) {
  const resolution = config.resolution;
  const textureWidth = config.width;
  const textureHeight = config.height;
  const padding = config.padding;
  const lineWidth = textureWidth;
  let positionX = 0;
  let positionY = 0;
  let maxCharHeight = 0;
  for (let i = 0; i < charList.length; i++) {
    // Measure glyph dimensions
    const character = charList[i];
    const metrics = measureText(character, style, false, canvas);
    const width = metrics.width;
    const height = Math.ceil(metrics.height);
    // This is ugly - but italics are given more space so they don't overlap
    const textureGlyphWidth = Math.ceil((style.fontStyle === "italic" ? 2 : 1) * width);
    // Can't fit char anymore: next canvas please!
    if (positionY >= textureHeight - height * resolution) {
      throw new Error(
        `textureHeight ${textureHeight}px is too small ` +
          `(fontFamily: '${style.fontFamily}', fontSize: ${style.fontSize}px, char: '${character}')`
      );
    }
    maxCharHeight = Math.max(height + metrics.fontProperties.descent, maxCharHeight);
    // Wrap line once full row has been rendered
    if (textureGlyphWidth * resolution + positionX >= lineWidth) {
      --i;
      positionY += maxCharHeight * resolution;
      positionY = Math.ceil(positionY);
      positionX = 0;
      maxCharHeight = 0;
      continue;
    }
    drawGlyph(canvas, context, metrics, positionX, positionY, resolution, style);
    // Unique (numeric) ID mapping to this glyph
    const id = metrics.text.codePointAt(0);
    // Create a texture holding just the glyph
    fontData.char.push({
      id,
      page: 0,
      x: positionX / resolution,
      y: positionY / resolution,
      width: textureGlyphWidth,
      height,
      xoffset: 0,
      yoffset: 0,
      xadvance: width - (style.dropShadow ? style.dropShadowDistance : 0) - (style.stroke ? style.strokeThickness : 0),
      xadvanceRounded: Math.ceil(
        width - (style.dropShadow ? style.dropShadowDistance : 0) - (style.stroke ? style.strokeThickness : 0)
      ), // TODO: does xadvance need to be rounded?
    });
    positionX += (textureGlyphWidth + 2 * padding) * resolution;
    positionX = Math.ceil(positionX);
  }
}
