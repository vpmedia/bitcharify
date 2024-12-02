export const TYPE_CHECKING: true;
export type FontStyle = {
    /**
     * - TBD.
     */
    fontSize: number;
    /**
     * - TBD.
     */
    leading: number;
    /**
     * - TBD.
     */
    letterSpacing: number;
    /**
     * - TBD.
     */
    lineHeight: number;
    /**
     * - TBD.
     */
    miterLimit: number;
    /**
     * - TBD.
     */
    padding: number;
    /**
     * - TBD.
     */
    strokeThickness: number;
    /**
     * - TBD.
     */
    fontFamily: string | string[];
    /**
     * - TBD.
     */
    fontStyle: string;
    /**
     * - TBD.
     */
    fontVariant: string;
    /**
     * - TBD.
     */
    fontWeight: string;
    /**
     * - TBD.
     */
    fill?: string;
    /**
     * - TBD.
     */
    stroke?: string;
    /**
     * - TBD.
     */
    textBaseline?: CanvasTextBaseline;
    /**
     * - TBD.
     */
    lineJoin?: CanvasLineJoin;
    /**
     * - TBD.
     */
    wordWrap?: boolean;
    /**
     * - TBD.
     */
    dropShadow?: string;
    /**
     * - TBD.
     */
    dropShadowDistance?: number;
};
export type FontProperties = {
    /**
     * - TBD.
     */
    fontSize: number;
    /**
     * - TBD.
     */
    ascent: number;
    /**
     * - TBD.
     */
    descent: number;
};
export type FontData = {
    /**
     * - TBD.
     */
    info: {
        face: string | string[];
        size: number;
    }[];
    /**
     * - TBD.
     */
    common: {
        lineHeight: number;
    }[];
    /**
     * - TBD.
     */
    page: {
        id: number;
        file: string;
    }[];
    /**
     * - TBD.
     */
    char: {
        id: number;
        page: number;
        x: number;
        y: number;
        width: number;
        height: number;
        xoffset: number;
        yoffset: number;
        xadvance: number;
    }[];
    /**
     * - TBD.
     */
    kerning: {
        first: number;
        second: number;
        amount: number;
    }[];
    /**
     * - TBD.
     */
    distanceField: number[];
};
export type TextMetrics = {
    /**
     * - TBD.
     */
    text: string;
    /**
     * - TBD.
     */
    style: FontStyle;
    /**
     * - TBD.
     */
    width: number;
    /**
     * - TBD.
     */
    height: number;
    /**
     * - TBD.
     */
    lines: string[];
    /**
     * - TBD.
     */
    lineWidths: number[];
    /**
     * - TBD.
     */
    lineHeight: number;
    /**
     * - TBD.
     */
    maxLineWidth: number;
    /**
     * - TBD.
     */
    fontProperties: FontProperties;
};
export type BitmapFontConfig = {
    /**
     * - TBD.
     */
    resolution?: number;
    /**
     * - TBD.
     */
    width?: number;
    /**
     * - TBD.
     */
    height?: number;
    /**
     * - TBD.
     */
    padding?: number;
    /**
     * - TBD.
     */
    chars?: (string | string[])[];
};
export type BitmapFontData = {
    /**
     * - TBD.
     */
    fontStyle: FontStyle;
    /**
     * - TBD.
     */
    fontData: FontData;
    /**
     * - TBD.
     */
    imageData: string;
};
//# sourceMappingURL=typedef.d.ts.map