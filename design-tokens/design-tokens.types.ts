/**
 * W3C Design Tokens Community Group (DTCG) Format
 * Specification: https://www.designtokens.org/tr/drafts/format/
 *
 * File Format:
 * - Extension: .tokens or .tokens.json
 * - Media Type: application/design-tokens+json
 *
 * This schema aligns with W3C DTCG spec while providing extensions
 * for additional capabilities. Extensions use $extensions with
 * reverse domain notation.
 */

// ============================================================================
// W3C DTCG Token Types (Section 8)
// ============================================================================

/** W3C DTCG defined token types */
export type DTCGTokenType =
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontWeight"
  | "duration"
  | "cubicBezier"
  | "number"
  | "typography"
  | "shadow"
  | "border"
  | "transition"
  | "gradient"
  | "strokeStyle";

/**
 * Extended token types (non-W3C)
 * These should be placed in $extensions when exporting to DTCG format
 */
export type ExtendedTokenType =
  | "filter"
  | "transform"
  | "animation";

export type TokenType = DTCGTokenType | ExtendedTokenType;

// ============================================================================
// W3C DTCG Reference Syntax (Section 5)
// ============================================================================

/**
 * Token Reference using W3C DTCG alias syntax
 * Spec: {group.subgroup.token}
 *
 * Extended with $resolved for caching resolved values
 */
export type TokenAlias = `{${string}}`;

export interface TokenReference {
  $value: TokenAlias;
  /** Extension: cached resolved value */
  $resolved?: string | number | object;
}

/**
 * JSON Pointer Reference (RFC 6901)
 * Spec: $ref with JSON Pointer for property-level references
 * Example: "#/colors/primary/$value"
 */
export interface JSONPointerReference {
  $ref: string;
  /** Extension: cached resolved value */
  $resolved?: string | number | object;
}

/** Value that can be direct, alias reference, or JSON pointer */
export type Resolvable<T> = T | TokenAlias | TokenReference | JSONPointerReference;

/** Type guard: check if value is a token alias string */
export function isTokenAlias(value: unknown): value is TokenAlias {
  return typeof value === "string" && value.startsWith("{") && value.endsWith("}");
}

/** Type guard: check if value is a token reference object */
export function isTokenReference(value: unknown): value is TokenReference {
  return typeof value === "object" && value !== null && "$value" in value &&
    typeof (value as TokenReference).$value === "string" &&
    (value as TokenReference).$value.startsWith("{");
}

/** Type guard: check if value is a JSON pointer reference */
export function isJSONPointerReference(value: unknown): value is JSONPointerReference {
  return typeof value === "object" && value !== null && "$ref" in value;
}

/** Create a token alias */
export function alias(path: string): TokenAlias {
  return `{${path}}` as TokenAlias;
}

/** Create a token reference with optional resolved value */
export function ref(path: string, resolved?: string | number | object): TokenReference {
  const r: TokenReference = { $value: `{${path}}` as TokenAlias };
  if (resolved !== undefined) r.$resolved = resolved;
  return r;
}

/** Create a JSON pointer reference */
export function jsonRef(pointer: string, resolved?: string | number | object): JSONPointerReference {
  const r: JSONPointerReference = { $ref: pointer };
  if (resolved !== undefined) r.$resolved = resolved;
  return r;
}

// ============================================================================
// W3C DTCG Primitive Value Types (Section 8.1-8.7)
// ============================================================================

/**
 * Color Value (Section 8.1)
 * Spec: RGB/RGBA with color space
 */
export interface ColorValue {
  /** Color in hex, rgb(), rgba(), hsl(), or other format */
  value: string;
  /** Color space - sRGB is default per spec */
  colorSpace?: "srgb" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020" | "lab" | "oklab" | "lch" | "oklch";
}

/**
 * Dimension Value (Section 8.2)
 * Spec: Object with numeric value and unit
 */
export interface DimensionValue {
  value: number;
  unit: "px" | "rem" | "em" | "%";
}

/**
 * Font Family Value (Section 8.3)
 * Spec: Array of font family strings
 */
export type FontFamilyValue = string[];

/**
 * Font Weight Value (Section 8.4)
 * Spec: Number 1-1000 or predefined string
 */
export type FontWeightNumber = number; // 1-1000
export type FontWeightKeyword =
  | "thin"       // 100
  | "hairline"   // 100
  | "extra-light"// 200
  | "ultra-light"// 200
  | "light"      // 300
  | "normal"     // 400
  | "regular"    // 400
  | "medium"     // 500
  | "semi-bold"  // 600
  | "demi-bold"  // 600
  | "bold"       // 700
  | "extra-bold" // 800
  | "ultra-bold" // 800
  | "black"      // 900
  | "heavy";     // 900
export type FontWeightValue = FontWeightNumber | FontWeightKeyword;

/**
 * Duration Value (Section 8.5)
 * Spec: Object with numeric value and unit
 */
export interface DurationValue {
  value: number;
  unit: "ms" | "s";
}

/**
 * Cubic Bézier Value (Section 8.6)
 * Spec: Array of exactly 4 numbers [P1x, P1y, P2x, P2y]
 */
export type CubicBezierValue = [number, number, number, number];

/**
 * Number Value (Section 8.7)
 * Spec: Unitless numeric value
 */
export type NumberValue = number;

// ============================================================================
// W3C DTCG Composite Value Types (Section 9)
// ============================================================================

/**
 * Shadow Value (Section 9.1)
 * Spec: color, offsetX, offsetY, blur, spread
 *
 * Extension: inset property (not in W3C spec)
 */
export interface ShadowValue {
  color: Resolvable<ColorValue | string>;
  offsetX: Resolvable<DimensionValue>;
  offsetY: Resolvable<DimensionValue>;
  blur: Resolvable<DimensionValue>;
  spread?: Resolvable<DimensionValue>;
  /** @extension Not in W3C DTCG spec */
  inset?: boolean;
}

/**
 * Gradient Value (Section 9.2)
 * Spec: Array of color stops with position
 *
 * Extensions: type, angle, shape, size, position (not in W3C spec)
 */
export interface GradientStop {
  color: Resolvable<ColorValue | string>;
  position: Resolvable<NumberValue>;
}

export interface GradientValue {
  stops: GradientStop[];
  /** @extension Not in W3C DTCG spec - gradient type */
  type?: "linear" | "radial" | "conic";
  /** @extension Not in W3C DTCG spec - angle for linear gradients */
  angle?: Resolvable<NumberValue>;
  /** @extension Not in W3C DTCG spec - shape for radial gradients */
  shape?: Resolvable<"circle" | "ellipse">;
  /** @extension Not in W3C DTCG spec - size for radial gradients */
  size?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec - position for radial gradients */
  position?: Resolvable<string>;
}

/**
 * Typography Value (Section 9.3)
 * Spec: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
 *
 * Extensions: fontStyle, OpenType features, text decoration, layout (not in W3C spec)
 */
export interface TypographyValue {
  // W3C DTCG spec properties
  fontFamily: Resolvable<FontFamilyValue>;
  fontSize: Resolvable<DimensionValue>;
  fontWeight: Resolvable<FontWeightValue>;
  lineHeight?: Resolvable<DimensionValue | NumberValue>;
  letterSpacing?: Resolvable<DimensionValue>;

  /** @extension Not in W3C DTCG spec */
  fontStyle?: Resolvable<"normal" | "italic" | "oblique">;

  // @extension OpenType features (not in W3C spec)
  /** @extension Not in W3C DTCG spec */
  fontVariantNumeric?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  fontFeatureSettings?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  fontVariantLigatures?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  fontVariantCaps?: Resolvable<string>;

  // @extension Text decoration (not in W3C spec)
  /** @extension Not in W3C DTCG spec */
  textDecorationLine?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  textDecorationStyle?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  textDecorationColor?: Resolvable<ColorValue | string>;
  /** @extension Not in W3C DTCG spec */
  textDecorationSkipInk?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  textDecorationThickness?: Resolvable<DimensionValue>;
  /** @extension Not in W3C DTCG spec */
  textUnderlineOffset?: Resolvable<DimensionValue>;
  /** @extension Not in W3C DTCG spec */
  textUnderlinePosition?: Resolvable<string>;

  // @extension Text layout (not in W3C spec)
  /** @extension Not in W3C DTCG spec */
  textTransform?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  textAlign?: Resolvable<string>;
  /** @extension Not in W3C DTCG spec */
  textIndent?: Resolvable<DimensionValue>;
  /** @extension Not in W3C DTCG spec */
  wordSpacing?: Resolvable<DimensionValue>;
  /** @extension Not in W3C DTCG spec */
  paragraphSpacing?: Resolvable<DimensionValue>;
}

/**
 * Border Value (Section 9.4)
 * Spec: width, style, color
 * Note: radius is NOT part of border in W3C spec - use separate dimension token
 */
export interface BorderValue {
  width: Resolvable<DimensionValue>;
  style: Resolvable<"solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset" | "none">;
  color: Resolvable<ColorValue | string>;
}

/**
 * Border Radius Value
 * Separate from border per W3C spec recommendation
 */
export type BorderRadiusValue = Resolvable<DimensionValue>;

/**
 * Transition Value (Section 9.5)
 * Spec: duration, delay, timingFunction
 *
 * Extension: property (not in W3C spec)
 */
export interface TransitionValue {
  duration: Resolvable<DurationValue>;
  delay?: Resolvable<DurationValue>;
  timingFunction: Resolvable<CubicBezierValue | string>;
  /** @extension Not in W3C DTCG spec - CSS property to transition */
  property?: Resolvable<string>;
}

/**
 * Stroke Style Value (Section 9.6)
 * Spec: string or object for line appearance
 */
export type StrokeStyleKeyword = "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset" | "none";
export interface StrokeStyleObject {
  dashArray: Resolvable<DimensionValue>[];
  lineCap: "butt" | "round" | "square";
}
export type StrokeStyleValue = StrokeStyleKeyword | StrokeStyleObject;

// ============================================================================
// Extended Composite Types (NOT in W3C DTCG spec)
// ============================================================================

/**
 * Filter Value
 * @extension Not in W3C DTCG spec - use $extensions when exporting
 */
export type FilterFunction =
  | "blur"
  | "brightness"
  | "contrast"
  | "grayscale"
  | "hue-rotate"
  | "invert"
  | "opacity"
  | "saturate"
  | "sepia"
  | "drop-shadow";

export interface FilterEffect {
  function: FilterFunction;
  value: Resolvable<DimensionValue | NumberValue | string>;
}

export interface FilterValue {
  effects: FilterEffect[];
  /** Distinguishes backdrop-filter from filter */
  backdrop?: boolean;
}

/**
 * Transform Value
 * @extension Not in W3C DTCG spec - use $extensions when exporting
 */
export type TransformFunction =
  | "translate" | "translateX" | "translateY" | "translateZ" | "translate3d"
  | "rotate" | "rotateX" | "rotateY" | "rotateZ" | "rotate3d"
  | "scale" | "scaleX" | "scaleY" | "scaleZ" | "scale3d"
  | "skew" | "skewX" | "skewY"
  | "matrix" | "matrix3d"
  | "perspective";

export interface TransformEffect {
  function: TransformFunction;
  value: Resolvable<DimensionValue | NumberValue | (DimensionValue | NumberValue)[]>;
}

export interface TransformValue {
  effects: TransformEffect[];
  origin?: Resolvable<string>;
}

/**
 * Animation Value
 * @extension Not in W3C DTCG spec - use $extensions when exporting
 */
export interface KeyframeStep {
  offset: Resolvable<NumberValue>; // 0-1
  properties: Record<string, Resolvable<unknown>>;
  easing?: Resolvable<CubicBezierValue | string>;
}

export interface AnimationValue {
  name?: string;
  keyframes?: KeyframeStep[];
  duration: Resolvable<DurationValue>;
  timingFunction?: Resolvable<CubicBezierValue | string>;
  delay?: Resolvable<DurationValue>;
  iterationCount?: Resolvable<NumberValue | "infinite">;
  direction?: Resolvable<"normal" | "reverse" | "alternate" | "alternate-reverse">;
  fillMode?: Resolvable<"none" | "forwards" | "backwards" | "both">;
  playState?: Resolvable<"running" | "paused">;
}

// ============================================================================
// W3C DTCG Token Value Union
// ============================================================================

export type DTCGPrimitiveValue =
  | ColorValue
  | DimensionValue
  | FontFamilyValue
  | FontWeightValue
  | DurationValue
  | CubicBezierValue
  | NumberValue;

export type DTCGCompositeValue =
  | ShadowValue
  | ShadowValue[]
  | GradientValue
  | TypographyValue
  | BorderValue
  | TransitionValue
  | StrokeStyleValue;

export type ExtendedCompositeValue =
  | FilterValue
  | TransformValue
  | AnimationValue;

export type TokenValue =
  | DTCGPrimitiveValue
  | DTCGCompositeValue
  | ExtendedCompositeValue
  | TokenAlias
  | string;  // For simple alias strings

// ============================================================================
// W3C DTCG Extensions Object (Section 4.5)
// ============================================================================

/**
 * Extensions use reverse domain notation
 * Example: "com.figma.hiddenFromPublishing": true
 */
export interface DTCGExtensions {
  [reverseDomainKey: string]: unknown;
}

// ============================================================================
// W3C DTCG Token Structure (Section 4)
// ============================================================================

/**
 * W3C DTCG Token
 * Spec-compliant token structure
 */
export interface DTCGToken {
  /** Required: The token's value */
  $value: TokenValue;
  /** Required (or inherited): Token type */
  $type?: TokenType;
  /** Optional: Human-readable description */
  $description?: string;
  /** Optional: Deprecation notice (true or explanation string) */
  $deprecated?: boolean | string;
  /** Optional: Vendor-specific extensions */
  $extensions?: DTCGExtensions;
}

/**
 * W3C DTCG Group
 * Groups organize tokens hierarchically
 * Objects WITHOUT $value are groups
 */
export interface DTCGGroup {
  /** Type inherited by child tokens */
  $type?: TokenType;
  /** Group description */
  $description?: string;
  /** Deprecation notice for entire group */
  $deprecated?: boolean | string;
  /** Inherit from another group (deep merge) */
  $extends?: string;
  /** Vendor-specific extensions */
  $extensions?: DTCGExtensions;
  /** Child tokens and groups */
  [name: string]: DTCGToken | DTCGGroup | TokenType | string | boolean | DTCGExtensions | undefined;
}

/**
 * W3C DTCG Root Document
 * Top-level structure of a .tokens file
 */
export interface DTCGDocument extends DTCGGroup {
  /** Special $root token for group base value */
  $root?: DTCGToken;
}

// ============================================================================
// Extended Token Structure (for internal use)
// ============================================================================

/**
 * Theme definition
 * @extension Not in W3C DTCG spec
 */
export interface DesignTokenTheme {
  id: number;
  name: string;
  displayName: string;
  isDefault: boolean;
  position: number;
}

/**
 * Token value with theme association
 * @extension Not in W3C DTCG spec
 */
export interface ThemedTokenValue {
  id: number;
  themeId: number | null;
  themeName?: string;
  $value: TokenValue;
  /** Raw CSS value before resolution */
  rawValue?: string;
}

/**
 * Full token with extended metadata
 * Combines W3C DTCG spec with additional tracking fields
 */
export interface FullDesignToken extends DTCGToken {
  /** @extension Unique identifier */
  id: number;
  /**
   * @extension Token name (no forbidden chars: { } .)
   * Use / as path separator instead of .
   */
  name: string;
  /**
   * @extension Hierarchical path using / separator
   * Example: "colors/primary/500"
   */
  path: string;
  /** Required: Explicit type (not relying on inheritance for storage) */
  $type: TokenType;
  /** @extension Is this a primitive/base token? */
  isPrimitive: boolean;
  /** @extension Does this token reference another? */
  isAlias: boolean;
  /** @extension Path to aliased token */
  aliasPath?: string;
  /** @extension Source file */
  sourceFile: string;
  /** @extension Base/default value */
  baseValue: ThemedTokenValue;
  /** @extension Theme-specific values */
  themeValues: ThemedTokenValue[];
  /** @extension IDs of tokens this references */
  references: number[];
  /** @extension IDs of tokens that reference this */
  referencedBy: number[];
  /** @extension Workspace identifier */
  workspaceId: number;
  /** @extension Usage analytics */
  usageCount: number;
  /** @extension Creation timestamp */
  createdAt: string;
  /** @extension Last update timestamp */
  updatedAt: string;
}

/**
 * Response containing themes and tokens
 * @extension Not in W3C DTCG spec
 */
export interface DesignTokensResponse {
  /** @extension Theme definitions */
  themes: DesignTokenTheme[];
  /** Tokens (extended format) */
  tokens: FullDesignToken[];
}

// ============================================================================
// Raw Token (for CSS parsing)
// ============================================================================

export interface RawToken {
  name: string;
  value: string;
  theme: "light" | "dark";
}

// ============================================================================
// Conversion Utilities
// ============================================================================

/** Convert string dimension to DTCG DimensionValue */
export function parseDimension(str: string): DimensionValue | null {
  const match = str.match(/^(-?[\d.]+)(px|rem|em|%)$/);
  if (match) {
    return { value: parseFloat(match[1]), unit: match[2] as DimensionValue["unit"] };
  }
  return null;
}

/** Convert string duration to DTCG DurationValue */
export function parseDuration(str: string): DurationValue | null {
  const match = str.match(/^([\d.]+)(ms|s)$/);
  if (match) {
    return { value: parseFloat(match[1]), unit: match[2] as DurationValue["unit"] };
  }
  return null;
}

/** Convert cubic-bezier string to DTCG array */
export function parseCubicBezier(str: string): CubicBezierValue | null {
  const match = str.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4])];
  }
  return null;
}

/** Convert font family string to DTCG array */
export function parseFontFamily(str: string): FontFamilyValue {
  return str.split(",").map(f => f.trim().replace(/^["']|["']$/g, ""));
}

/** Convert path with dots to path with slashes (DTCG compliant) */
export function toCompliantPath(dotPath: string): string {
  return dotPath.replace(/\./g, "/");
}

/** Convert path with slashes back to dots (for CSS variables) */
export function toCSSPath(slashPath: string): string {
  return slashPath.replace(/\//g, ".");
}

/**
 * Convert internal token format to W3C DTCG format
 */
export function toDTCGToken(token: FullDesignToken): DTCGToken {
  const dtcg: DTCGToken = {
    $value: token.$value,
    $type: token.$type,
  };

  if (token.$description) dtcg.$description = token.$description;
  if (token.$deprecated) dtcg.$deprecated = token.$deprecated;

  // Move non-spec fields to $extensions
  const extensions: DTCGExtensions = {};
  if (token.isPrimitive !== undefined) extensions["ai.soffi.isPrimitive"] = token.isPrimitive;
  if (token.usageCount !== undefined) extensions["ai.soffi.usageCount"] = token.usageCount;
  if (token.sourceFile) extensions["ai.soffi.sourceFile"] = token.sourceFile;
  if (token.themeValues?.length) extensions["ai.soffi.themeValues"] = token.themeValues;

  if (Object.keys(extensions).length > 0) {
    dtcg.$extensions = { ...token.$extensions, ...extensions };
  }

  return dtcg;
}

/**
 * Build W3C DTCG document from flat token array
 */
export function toDTCGDocument(tokens: FullDesignToken[]): DTCGDocument {
  const doc: DTCGDocument = {};

  for (const token of tokens) {
    const pathParts = token.path.split("/");
    let current: DTCGGroup = doc;

    // Create nested groups
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as DTCGGroup;
    }

    // Add token
    const tokenName = pathParts[pathParts.length - 1];
    current[tokenName] = toDTCGToken(token);
  }

  return doc;
}
