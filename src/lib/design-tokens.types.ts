export interface ColorValue {
  value: string;
  colorSpace?: string;
}

export interface DimensionValue {
  value: number;
  unit: "px" | "rem" | "em" | "%";
}

export interface ThemedTokenValue {
  id: number;
  themeId: number | null;
  themeName?: string;
  $value: unknown;
  rawValue?: string;
}

export interface DesignTokenTheme {
  id: number;
  name: string;
  displayName: string;
  isDefault: boolean;
  position: number;
}

export interface DesignToken {
  id: number;
  name: string;
  path: string;
  $type: string;
  $value: unknown;
  $description?: string;
  isPrimitive: boolean;
  isAlias: boolean;
  aliasPath?: string;
  sourceFile: string;
  baseValue: ThemedTokenValue;
  themeValues: ThemedTokenValue[];
}

export interface DesignTokensResponse {
  themes: DesignTokenTheme[];
  tokens: DesignToken[];
}

function isColorValue(value: unknown): value is ColorValue {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    typeof (value as ColorValue).value === "string" &&
    (value as ColorValue).value.startsWith("#")
  );
}

function isDimensionValue(value: unknown): value is DimensionValue {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "unit" in value &&
    typeof (value as DimensionValue).value === "number"
  );
}

export function getColorHex(value: unknown): string | null {
  if (isColorValue(value)) return value.value;
  if (typeof value === "string" && value.startsWith("#")) return value;
  return null;
}

export function formatTokenValue(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "object") {
    if (isColorValue(value)) return value.value;
    if (isDimensionValue(value)) return `${value.value}${value.unit}`;
    if (Array.isArray(value)) return value.map(formatTokenValue).join(", ");
    return JSON.stringify(value);
  }
  return String(value);
}
