# Design Tokens Types

W3C DTCG-compliant TypeScript types with extensions.

**Spec:** https://www.designtokens.org/tr/drafts/format/

## Token Types

### Primitives (W3C DTCG Section 8)
| Type | Interface | Example |
|------|-----------|---------|
| `color` | `ColorValue` | `{ value: "#3b82f6", colorSpace: "srgb" }` |
| `dimension` | `DimensionValue` | `{ value: 16, unit: "px" }` |
| `fontFamily` | `FontFamilyValue` | `["Inter", "sans-serif"]` |
| `fontWeight` | `FontWeightValue` | `500` or `"medium"` |
| `duration` | `DurationValue` | `{ value: 200, unit: "ms" }` |
| `cubicBezier` | `CubicBezierValue` | `[0.4, 0, 0.2, 1]` |
| `number` | `NumberValue` | `1.5` |

### Composites (W3C DTCG Section 9)
| Type | Interface | Notes |
|------|-----------|-------|
| `shadow` | `ShadowValue` | `inset` is extension |
| `gradient` | `GradientValue` | `type`, `angle` are extensions |
| `typography` | `TypographyValue` | OpenType features are extensions |
| `border` | `BorderValue` | Radius is separate per spec |
| `transition` | `TransitionValue` | `property` is extension |
| `strokeStyle` | `StrokeStyleValue` | String or dash array |

### Extensions (not in W3C spec)
| Type | Interface |
|------|-----------|
| `filter` | `FilterValue` |
| `transform` | `TransformValue` |
| `animation` | `AnimationValue` |

## References

```ts
// Alias syntax
type TokenAlias = `{${string}}`  // "{colors.primary.500}"

// Reference object
interface TokenReference {
  $value: TokenAlias;
  $resolved?: string | number | object;  // cached
}

// JSON Pointer (RFC 6901)
interface JSONPointerReference {
  $ref: string;  // "#/colors/primary/$value"
}
```

**Helpers:**
- `alias("colors.primary")` → `"{colors.primary}"`
- `ref("colors.primary", "#3b82f6")` → `{ $value: "{colors.primary}", $resolved: "#3b82f6" }`
- `isTokenAlias(v)`, `isTokenReference(v)`, `isJSONPointerReference(v)`

## Token Structure

```ts
// W3C DTCG Token
interface DTCGToken {
  $value: TokenValue;      // required
  $type?: TokenType;       // required or inherited
  $description?: string;
  $deprecated?: boolean | string;
  $extensions?: Record<string, unknown>;
}

// Extended Token (internal)
interface FullDesignToken extends DTCGToken {
  id: number;
  name: string;
  path: string;            // "/" separator (DTCG compliant)
  isPrimitive: boolean;
  isAlias: boolean;
  aliasPath?: string;
  sourceFile: string;
  baseValue: ThemedTokenValue;
  themeValues: ThemedTokenValue[];
  references: number[];
  referencedBy: number[];
  // ... timestamps, workspace, usage
}
```

## Theming

```ts
interface DesignTokenTheme {
  id: number;
  name: string;           // "light", "dark"
  displayName: string;
  isDefault: boolean;
  position: number;
}

interface ThemedTokenValue {
  id: number;
  themeId: number | null;  // null = base value
  themeName?: string;
  $value: TokenValue;
  rawValue?: string;       // pre-resolution CSS
}
```

## Conversion Utils

```ts
parseDimension("16px")           // { value: 16, unit: "px" }
parseDuration("200ms")           // { value: 200, unit: "ms" }
parseCubicBezier("cubic-bezier(0.4, 0, 0.2, 1)")  // [0.4, 0, 0.2, 1]
parseFontFamily("Inter, sans-serif")  // ["Inter", "sans-serif"]

toCompliantPath("colors.primary")     // "colors/primary"
toCSSPath("colors/primary")           // "colors.primary"

toDTCGToken(fullToken)     // FullDesignToken → DTCGToken
toDTCGDocument(tokens)     // FullDesignToken[] → DTCGDocument
```

## Extensions Namespace

Non-spec fields use reverse domain notation in `$extensions`:
```json
{
  "$extensions": {
    "ai.soffi.isPrimitive": true,
    "ai.soffi.usageCount": 42,
    "ai.soffi.sourceFile": "src/index.css"
  }
}
```
