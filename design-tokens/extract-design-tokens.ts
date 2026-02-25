#!/usr/bin/env npx tsx
/**
 * Extract design tokens from CSS variables and output in W3C DTCG format
 * Usage: npx tsx scripts/extract-design-tokens.ts > design-tokens.tokens.json
 *
 * Output: W3C DTCG compliant format
 * - Extension: .tokens.json
 * - Media Type: application/design-tokens+json
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type {
  TokenType,
  DTCGTokenType,
  ColorValue,
  DimensionValue,
  DurationValue,
  CubicBezierValue,
  FontFamilyValue,
  ShadowValue,
  GradientValue,
  GradientStop,
  TokenValue,
  DesignTokenTheme,
  ThemedTokenValue,
  DesignTokensResponse,
  FullDesignToken,
  RawToken,
  DTCGDocument,
} from "./design-tokens.types";
import {
  parseDimension,
  parseDuration,
  parseCubicBezier,
  parseFontFamily,
  toCompliantPath,
  toDTCGDocument,
} from "./design-tokens.types";

/**
 * Extraction Status:
 * ✅ color - with colorSpace
 * ✅ dimension - as { value, unit }
 * ✅ duration - as { value, unit }
 * ✅ cubicBezier - as [n, n, n, n]
 * ✅ fontFamily - as string[]
 * ✅ fontWeight - as number
 * ✅ shadow - with DimensionValue sub-properties
 * ✅ gradient (linear) - with stops array
 * ⚠️ gradient (radial) - basic support
 * ❌ typography - no parser
 * ❌ border - no parser
 * ❌ transition - detected but no structured parser
 * ❌ filter - no parser
 * ❌ transform - no parser
 * ❌ animation - no parser
 * ❌ strokeStyle - no parser
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ============================================================================
// CSS Parsing
// ============================================================================

interface CSSBlock {
  selector: string;
  vars: { name: string; value: string }[];
}

interface ParsedCSS {
  light: RawToken[];
  dark: RawToken[];
  scoped: Map<string, RawToken[]>;
}

/** Extract all CSS rule blocks with their selectors */
function extractCSSBlocks(css: string): CSSBlock[] {
  const blocks: CSSBlock[] = [];
  // Match selector { ... } — handles values containing parens like rgb(var(...))
  const regex = /([^{}]+?)\s*\{([^}]*)\}/g;
  let match;
  while ((match = regex.exec(css))) {
    const selector = match[1].trim();
    // Skip @-rules and sub-selectors inside .ag-theme blocks (no -- vars)
    const vars = extractVars(match[2]);
    if (vars.length > 0) {
      blocks.push({ selector, vars });
    }
  }
  return blocks;
}

const LIGHT_SELECTORS = [":root"];
const DARK_SELECTORS = [".dark", '[data-theme="dark"]'];

/** Derive a scope name from an arbitrary selector */
function selectorToScope(selector: string): string {
  // .ag-theme-quartz.ag-theme-forge → "ag-theme-forge"
  // Pick the last class in a compound selector
  const classes = selector.match(/\.([\w-]+)/g);
  if (classes?.length) return classes[classes.length - 1].slice(1);
  return selector.replace(/[^a-zA-Z0-9-]/g, "-").replace(/-+/g, "-");
}

function parseCSS(css: string): ParsedCSS {
  const light: RawToken[] = [];
  const dark: RawToken[] = [];
  const scoped = new Map<string, RawToken[]>();

  for (const block of extractCSSBlocks(css)) {
    const sel = block.selector;

    if (LIGHT_SELECTORS.some((s) => sel === s)) {
      block.vars.forEach((v) => light.push({ ...v, theme: "light" }));
    } else if (DARK_SELECTORS.some((s) => sel.includes(s))) {
      block.vars.forEach((v) => dark.push({ ...v, theme: "dark" }));
    } else {
      // Scoped block (component themes, etc.)
      const scope = selectorToScope(sel);
      if (!scoped.has(scope)) scoped.set(scope, []);
      block.vars.forEach((v) =>
        scoped.get(scope)!.push({ ...v, theme: "light" })
      );
    }
  }

  return { light, dark, scoped };
}

function extractVars(block: string): { name: string; value: string }[] {
  const vars: { name: string; value: string }[] = [];
  const regex = /--([\w-]+):\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(block)) !== null) {
    vars.push({ name: match[1], value: match[2].trim() });
  }
  return vars;
}

// ============================================================================
// Color Conversion
// ============================================================================

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function parseHSL(value: string): { h: number; s: number; l: number } | null {
  // Match "217 91% 60%" format (no commas, % only on s and l)
  const match = value.match(/^([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?$/);
  if (match) {
    return {
      h: parseFloat(match[1]),
      s: parseFloat(match[2]),
      l: parseFloat(match[3]),
    };
  }
  return null;
}

function resolveColorValue(
  value: string,
  allVars: Map<string, string>
): ColorValue {
  // Handle hsl(var(--xxx))
  const varRefMatch = value.match(/hsl\(var\(--([^)]+)\)\)/);
  if (varRefMatch) {
    const refName = varRefMatch[1];
    const refValue = allVars.get(refName);
    if (refValue) {
      const hsl = parseHSL(refValue);
      if (hsl) {
        return { value: hslToHex(hsl.h, hsl.s, hsl.l), colorSpace: "srgb" };
      }
    }
    return { value, colorSpace: "srgb" };
  }

  // Handle direct HSL values
  const hsl = parseHSL(value);
  if (hsl) {
    return { value: hslToHex(hsl.h, hsl.s, hsl.l), colorSpace: "srgb" };
  }

  // Already hex or other format
  return { value, colorSpace: "srgb" };
}

// ============================================================================
// Token Classification
// ============================================================================

function getTokenType(name: string, value: string): DTCGTokenType {
  if (name === "radius") return "dimension";
  if (name.includes("shadow")) return "shadow";
  if (name.includes("gradient")) return "gradient";
  if (name.includes("transition")) return "transition";
  if (name.includes("font-family")) return "fontFamily";
  if (name.includes("font-weight")) return "fontWeight";
  if (name.includes("duration")) return "duration";
  if (name.includes("font-size") || name.includes("row-height") ||
      name.includes("header-height") || name.includes("grid-size") ||
      name.includes("padding") || name.includes("radius") ||
      name.includes("border-width")) return "dimension";

  // Check value patterns
  if (value.includes("linear-gradient") || value.includes("radial-gradient"))
    return "gradient";
  if (value.includes("cubic-bezier")) return "cubicBezier";
  if (value.match(/^\d+(\.\d+)?(px|rem|em|%)$/)) return "dimension";
  if (value.match(/^\d+(\.\d+)?(ms|s)$/)) return "duration";
  if (value === "none" || value === "transparent") return "color";

  // Font family heuristic
  if (value.includes(",") && (value.includes("sans-serif") || value.includes("monospace") || value.includes("serif")))
    return "fontFamily";

  // Color references: var(--fg-*), var(--bg-*), var(--border-*), rgb(...)
  if (value.match(/var\(--(fg|bg|border|forge)/)) return "color";
  if (value.match(/^rgb\(/)) return "color";

  // Default to color for HSL values
  const hsl = parseHSL(value);
  if (hsl) return "color";

  return "color";
}

function isPrimitive(name: string, hasMultipleThemes: boolean): boolean {
  if (hasMultipleThemes) return false;
  if (name.match(/-(50|100|200|300|400|500|600|700|800|900)$/)) return true;
  if (name === "radius") return true;
  return false;
}

function isAlias(value: string, hasMultipleThemes: boolean): boolean {
  return value.includes("var(--") || hasMultipleThemes;
}

function getAliasPath(value: string): string | undefined {
  const match = value.match(/var\(--([^)]+)\)/);
  if (match) {
    // Convert to DTCG compliant path with / separator
    return `{${match[1].replace(/-/g, "/")}}`;
  }
  return undefined;
}

function tokenPath(name: string, scope?: string): string {
  // Scoped tokens get a prefix
  if (scope) {
    // Strip common prefix from var name if it matches scope convention
    // e.g. scope="ag-theme-forge", name="ag-background-color" → "ag-theme-forge/background-color"
    const stripped = name.startsWith("ag-") ? name.slice(3) : name;
    return `${scope}/${stripped}`;
  }

  // Convert kebab-case to slash notation (DTCG compliant)
  const parts = name.split("-");

  // Group by common prefixes
  if (parts[0] === "fitness") return `colors/fitness/${parts.slice(1).join("-")}`;
  if (parts[0] === "sidebar") return `colors/sidebar/${parts.slice(1).join("-")}`;
  if (["gradient", "shadow", "transition"].includes(parts[0]))
    return `${parts[0]}s/${parts.slice(1).join("-")}`;
  if (
    ["background", "foreground", "primary", "secondary", "accent", "muted", "destructive", "card", "popover", "border", "input", "ring"].includes(parts[0])
  )
    return `colors/${parts.join("-")}`;

  return name.replace(/-/g, "/");
}

// ============================================================================
// Value Parsers (DTCG Compliant)
// ============================================================================

function parseColorValue(value: string, allVars: Map<string, string>): ColorValue {
  return resolveColorValue(value, allVars);
}

function parseDimensionValue(value: string): DimensionValue | null {
  return parseDimension(value);
}

function parseDurationValue(value: string): DurationValue | null {
  return parseDuration(value);
}

function parseCubicBezierValue(value: string): CubicBezierValue | null {
  return parseCubicBezier(value);
}

function parseFontFamilyValue(value: string): FontFamilyValue {
  return parseFontFamily(value);
}

function parseFontWeightValue(value: string): number | null {
  const num = parseInt(value);
  if (!isNaN(num) && num >= 1 && num <= 1000) return num;
  return null;
}

// ============================================================================
// Shadow Parsing (DTCG Compliant)
// ============================================================================

function parseShadowValue(value: string): ShadowValue[] {
  const shadows: ShadowValue[] = [];

  // Split multiple shadows by comma (but not inside rgb())
  const parts = value.split(/,(?![^(]*\))/);

  for (const part of parts) {
    const trimmed = part.trim();
    // Match: inset? offsetX offsetY blur spread? color
    const match = trimmed.match(
      /^(inset\s+)?(-?[\d.]+)(px)?\s+(-?[\d.]+)(px)?\s+([\d.]+)(px)?\s*(-?[\d.]+)?(px)?\s*(.*?)$/
    );
    if (match) {
      const offsetX = parseFloat(match[2]);
      const offsetY = parseFloat(match[4]);
      const blur = parseFloat(match[6]);
      const spread = match[8] ? parseFloat(match[8]) : 0;
      const color = match[10] || "rgba(0, 0, 0, 0.1)";

      shadows.push({
        offsetX: { value: offsetX, unit: "px" },
        offsetY: { value: offsetY, unit: "px" },
        blur: { value: blur, unit: "px" },
        spread: { value: spread, unit: "px" },
        color: { value: color, colorSpace: "srgb" },
        inset: !!match[1],
      });
    }
  }
  return shadows;
}

// ============================================================================
// Gradient Parsing (DTCG Compliant)
// ============================================================================

function parseGradientValue(
  value: string,
  allVars: Map<string, string>
): GradientValue | null {
  // Linear gradient
  const linearMatch = value.match(/linear-gradient\(([^)]+)\)/);
  if (linearMatch) {
    const content = linearMatch[1];
    const parts = content.split(",").map((p) => p.trim());

    let angle = 180;
    let colorStartIdx = 0;

    // Check if first part is angle
    const angleMatch = parts[0].match(/^(\d+)deg$/);
    if (angleMatch) {
      angle = parseInt(angleMatch[1]);
      colorStartIdx = 1;
    }

    const stops: GradientStop[] = [];
    const colorParts = parts.slice(colorStartIdx);
    colorParts.forEach((stop, idx) => {
      const colorMatch = stop.match(/(hsl\([^)]+\)|#[a-f0-9]+|rgba?\([^)]+\))\s*(\d+%)?/i);
      if (colorMatch) {
        const colorValue = resolveColorValue(colorMatch[1], allVars);
        const position = colorMatch[2]
          ? parseInt(colorMatch[2]) / 100
          : idx / (colorParts.length - 1);
        stops.push({ color: colorValue, position });
      }
    });

    return { stops, type: "linear", angle };
  }

  // Radial gradient
  const radialMatch = value.match(/radial-gradient\(([^)]+)\)/);
  if (radialMatch) {
    const content = radialMatch[1];
    const parts = content.split(",").map((p) => p.trim());

    const stops: GradientStop[] = [];
    let shape: "circle" | "ellipse" | undefined;
    let colorStartIdx = 0;

    // Check for shape
    if (parts[0].includes("circle")) {
      shape = "circle";
      colorStartIdx = 1;
    } else if (parts[0].includes("ellipse")) {
      shape = "ellipse";
      colorStartIdx = 1;
    }

    const colorParts = parts.slice(colorStartIdx);
    colorParts.forEach((stop, idx) => {
      const colorMatch = stop.match(/(hsl\([^)]+\)|#[a-f0-9]+|rgba?\([^)]+\))\s*(\d+%)?/i);
      if (colorMatch) {
        const colorValue = resolveColorValue(colorMatch[1], allVars);
        const position = colorMatch[2]
          ? parseInt(colorMatch[2]) / 100
          : idx / (colorParts.length - 1);
        stops.push({ color: colorValue, position });
      }
    });

    return { stops, type: "radial", shape };
  }

  return null;
}

// ============================================================================
// Tailwind Spacing Scale
// ============================================================================

const SPACING_SCALE: Record<string, DimensionValue> = {
  '0': { value: 0, unit: 'px' },
  'px': { value: 1, unit: 'px' },
  '0.5': { value: 0.125, unit: 'rem' },
  '1': { value: 0.25, unit: 'rem' },
  '1.5': { value: 0.375, unit: 'rem' },
  '2': { value: 0.5, unit: 'rem' },
  '2.5': { value: 0.625, unit: 'rem' },
  '3': { value: 0.75, unit: 'rem' },
  '3.5': { value: 0.875, unit: 'rem' },
  '4': { value: 1, unit: 'rem' },
  '5': { value: 1.25, unit: 'rem' },
  '6': { value: 1.5, unit: 'rem' },
  '7': { value: 1.75, unit: 'rem' },
  '8': { value: 2, unit: 'rem' },
  '9': { value: 2.25, unit: 'rem' },
  '10': { value: 2.5, unit: 'rem' },
  '11': { value: 2.75, unit: 'rem' },
  '12': { value: 3, unit: 'rem' },
  '14': { value: 3.5, unit: 'rem' },
  '16': { value: 4, unit: 'rem' },
  '20': { value: 5, unit: 'rem' },
  '24': { value: 6, unit: 'rem' },
  '28': { value: 7, unit: 'rem' },
  '32': { value: 8, unit: 'rem' },
  '36': { value: 9, unit: 'rem' },
  '40': { value: 10, unit: 'rem' },
  '44': { value: 11, unit: 'rem' },
  '48': { value: 12, unit: 'rem' },
  '52': { value: 13, unit: 'rem' },
  '56': { value: 14, unit: 'rem' },
  '60': { value: 15, unit: 'rem' },
  '64': { value: 16, unit: 'rem' },
  '72': { value: 18, unit: 'rem' },
  '80': { value: 20, unit: 'rem' },
  '96': { value: 24, unit: 'rem' },
};

const SPACING_UTILITIES = [
  'w', 'h', 'size', 'min-w', 'max-w', 'min-h', 'max-h',
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'ps', 'pe',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me',
  'gap', 'gap-x', 'gap-y',
  'space-x', 'space-y',
  'inset', 'inset-x', 'inset-y', 'top', 'right', 'bottom', 'left', 'start', 'end',
  'basis', 'scroll-m', 'scroll-p'
];

function generateSpacingTokens(startId: number, startValueId: number, now: string): {
  tokens: FullDesignToken[];
  nextId: number;
  nextValueId: number;
} {
  const spacingTokens: FullDesignToken[] = [];
  let tokenId = startId;
  let valueId = startValueId;

  for (const [key, dimensionValue] of Object.entries(SPACING_SCALE)) {
    const baseValue: ThemedTokenValue = {
      id: valueId++,
      themeId: null,
      $value: dimensionValue,
      rawValue: `${dimensionValue.value}${dimensionValue.unit}`,
    };

    spacingTokens.push({
      id: tokenId++,
      name: key,
      path: `spacing/${key}`,
      $type: 'dimension',
      $value: dimensionValue,
      $description: `Applies to: ${SPACING_UTILITIES.join(', ')}`,
      isPrimitive: true,
      isAlias: false,
      sourceFile: 'tailwind.config.ts',
      baseValue,
      themeValues: [],
      references: [],
      referencedBy: [],
      workspaceId: 1,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  return { tokens: spacingTokens, nextId: tokenId, nextValueId: valueId };
}

// ============================================================================
// Token Value Resolution
// ============================================================================

function resolveTokenValue(
  tokenType: DTCGTokenType,
  rawValue: string,
  allVars: Map<string, string>
): TokenValue {
  switch (tokenType) {
    case "color":
      return parseColorValue(rawValue, allVars);

    case "dimension": {
      const dim = parseDimensionValue(rawValue);
      return dim || rawValue;
    }

    case "duration": {
      const dur = parseDurationValue(rawValue);
      return dur || rawValue;
    }

    case "cubicBezier": {
      const bezier = parseCubicBezierValue(rawValue);
      return bezier || rawValue;
    }

    case "fontFamily":
      return parseFontFamilyValue(rawValue);

    case "fontWeight": {
      const weight = parseFontWeightValue(rawValue);
      return weight || rawValue;
    }

    case "shadow": {
      const shadows = parseShadowValue(rawValue);
      return shadows.length === 1 ? shadows[0] : shadows.length > 0 ? shadows : rawValue;
    }

    case "gradient": {
      const gradient = parseGradientValue(rawValue, allVars);
      return gradient || rawValue;
    }

    default:
      return rawValue;
  }
}

// ============================================================================
// Main Extraction
// ============================================================================

function extractTokens(): DesignTokensResponse {
  const cssPath = join(ROOT, "src/index.css");
  const css = readFileSync(cssPath, "utf-8");
  const { light, dark, scoped } = parseCSS(css);

  // Build variable maps for resolution
  const lightVars = new Map(light.map((t) => [t.name, t.value]));
  const darkVars = new Map(dark.map((t) => [t.name, t.value]));
  // Scoped vars also available for resolution
  for (const vars of scoped.values()) {
    for (const v of vars) lightVars.set(v.name, v.value);
  }

  const themes: DesignTokenTheme[] = [
    { id: 1, name: "light", displayName: "Light", isDefault: true, position: 0 },
    { id: 2, name: "dark", displayName: "Dark", isDefault: false, position: 1 },
  ];

  const now = new Date().toISOString();
  const tokens: FullDesignToken[] = [];

  // Add spacing tokens first
  const { tokens: spacingTokens, nextId: startTokenId, nextValueId: startValueId } = generateSpacingTokens(1, 1, now);
  tokens.push(...spacingTokens);

  let tokenId = startTokenId;
  let valueId = startValueId;

  // Create dark theme lookup
  const darkByName = new Map(dark.map((t) => [t.name, t.value]));

  // Helper: build a FullDesignToken from a raw var
  function buildToken(raw: RawToken, scope?: string): void {
    const tokenType = getTokenType(raw.name, raw.value);
    const hasMultipleThemes = darkByName.has(raw.name);
    const primitive = isPrimitive(raw.name, hasMultipleThemes);
    const alias = isAlias(raw.value, hasMultipleThemes);
    const resolvedValue = resolveTokenValue(tokenType, raw.value, lightVars);

    const baseValue: ThemedTokenValue = {
      id: valueId++,
      themeId: null,
      $value: resolvedValue,
      rawValue: raw.value,
    };

    const themeValues: ThemedTokenValue[] = [];

    themeValues.push({
      id: valueId++,
      themeId: 1,
      themeName: "light",
      $value: resolvedValue,
      rawValue: raw.value,
    });

    const darkValue = darkByName.get(raw.name);
    if (darkValue) {
      const darkResolved = resolveTokenValue(tokenType, darkValue, darkVars);
      themeValues.push({
        id: valueId++,
        themeId: 2,
        themeName: "dark",
        $value: darkResolved,
        rawValue: darkValue,
      });
    }

    tokens.push({
      id: tokenId,
      name: raw.name,
      path: tokenPath(raw.name, scope),
      $type: tokenType,
      $value: resolvedValue,
      isPrimitive: primitive,
      isAlias: alias,
      aliasPath: alias ? getAliasPath(raw.value) : undefined,
      sourceFile: "src/index.css",
      baseValue,
      themeValues,
      references: [],
      referencedBy: [],
      workspaceId: 1,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    tokenId++;
  }

  // Process light (root) tokens
  for (const raw of light) {
    buildToken(raw);
  }

  // Process scoped tokens (ag-grid theme, etc.)
  for (const [scope, vars] of scoped) {
    for (const raw of vars) {
      buildToken(raw, scope);
    }
  }

  return { themes, tokens };
}

// ============================================================================
// CLI Output Options
// ============================================================================

type OutputFormat = "extended" | "dtcg";

function main() {
  const args = process.argv.slice(2);
  const format: OutputFormat = args.includes("--dtcg") ? "dtcg" : "extended";

  const result = extractTokens();

  if (format === "dtcg") {
    // Output W3C DTCG compliant format (nested groups)
    const dtcgDoc: DTCGDocument = toDTCGDocument(result.tokens);
    // Add themes as extension
    dtcgDoc.$extensions = {
      "ai.soffi.themes": result.themes,
    };
    console.log(JSON.stringify(dtcgDoc, null, 2));
  } else {
    // Output extended format (flat array with metadata)
    console.log(JSON.stringify(result, null, 2));
  }
}

main();
