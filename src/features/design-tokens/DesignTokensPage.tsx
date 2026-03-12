import { useState, useEffect, useMemo } from "react";
import { Badge, Input, Select } from "@medusajs/ui";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { PageShell } from "@/components/layout/PageShell";
import { ForgeGrid } from "@/components/data-grid/ForgeGrid";
import {
  type DesignToken,
  type DesignTokensResponse,
  formatTokenValue,
  getColorHex,
} from "@/lib/design-tokens.types";

const TYPE_COLORS: Record<string, "green" | "blue" | "orange" | "red" | "grey" | "purple"> = {
  color: "blue",
  dimension: "purple",
  gradient: "red",
  shadow: "orange",
  transition: "green",
  fontFamily: "grey",
  fontWeight: "grey",
  duration: "orange",
  cubicBezier: "red",
};

function TypeCellRenderer(params: ICellRendererParams) {
  const type = params.value as string;
  if (!type) return null;
  return (
    <Badge color={TYPE_COLORS[type] || "grey"} size="small">
      {type}
    </Badge>
  );
}

function ColorSwatch({ value }: { value: unknown }) {
  const hex = getColorHex(value);
  if (!hex) return null;
  return (
    <div
      className="w-4 h-4 rounded border border-ui-border-base shrink-0"
      style={{ backgroundColor: hex }}
    />
  );
}

function ValueCellRenderer(params: ICellRendererParams<DesignToken>) {
  const token = params.data;
  if (!token) return null;
  const formatted = formatTokenValue(token.$value);
  return (
    <div className="flex items-center gap-2">
      {token.$type === "color" && <ColorSwatch value={token.$value} />}
      <code className="text-xs truncate" title={formatted}>
        {formatted.length > 24 ? `${formatted.slice(0, 24)}...` : formatted}
      </code>
    </div>
  );
}

function makeThemeValueRenderer(themeName: string) {
  return function ThemeValueRenderer(params: ICellRendererParams<DesignToken>) {
    const token = params.data;
    if (!token) return null;
    const tv = token.themeValues.find((t) => t.themeName === themeName);
    if (!tv) return <span className="text-ui-fg-muted">-</span>;
    const formatted = formatTokenValue(tv.$value);
    const hex = getColorHex(tv.$value);
    return (
      <div className="flex items-center gap-2">
        {hex && (
          <div
            className="w-4 h-4 rounded border border-ui-border-base shrink-0"
            style={{ backgroundColor: hex }}
          />
        )}
        <code className="text-xs truncate" title={formatted}>
          {formatted.length > 20 ? `${formatted.slice(0, 20)}...` : formatted}
        </code>
      </div>
    );
  };
}

function PrimitiveCellRenderer(params: ICellRendererParams) {
  return params.value ? (
    <Badge color="grey" size="small">Yes</Badge>
  ) : (
    <span className="text-ui-fg-muted text-xs">-</span>
  );
}

function buildColumns(themeNames: string[]): ColDef<DesignToken>[] {
  const themeColumns: ColDef<DesignToken>[] = themeNames.map((name) => ({
    headerName: name.charAt(0).toUpperCase() + name.slice(1),
    colId: `theme_${name}`,
    valueGetter: (p: { data?: DesignToken }) => {
      const tv = p.data?.themeValues.find((t) => t.themeName === name);
      return tv ? formatTokenValue(tv.$value) : "";
    },
    cellRenderer: makeThemeValueRenderer(name),
    width: 160,
  }));

  return [
    {
      field: "id",
      headerName: "#",
      width: 70,
      filter: "agNumberColumnFilter",
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
    {
      field: "path",
      headerName: "Path",
      flex: 1.5,
      minWidth: 180,
      cellRenderer: (p: ICellRendererParams) => (
        <code className="text-xs text-ui-fg-muted">{p.value}</code>
      ),
    },
    {
      field: "$type",
      headerName: "Type",
      width: 120,
      cellRenderer: TypeCellRenderer,
    },
    {
      colId: "baseValue",
      headerName: "Base Value",
      width: 180,
      valueGetter: (p) => formatTokenValue(p.data?.$value),
      cellRenderer: ValueCellRenderer,
    },
    ...themeColumns,
    {
      field: "sourceFile",
      headerName: "Source",
      width: 150,
      cellRenderer: (p: ICellRendererParams) =>
        p.value ? (
          <code className="text-xs text-ui-fg-muted">{p.value}</code>
        ) : (
          <span className="text-ui-fg-muted">-</span>
        ),
    },
    {
      field: "isPrimitive",
      headerName: "Prim",
      width: 80,
      cellRenderer: PrimitiveCellRenderer,
    },
  ];
}

export function DesignTokensPage() {
  const [tokens, setTokens] = useState<DesignToken[]>([]);
  const [themeNames, setThemeNames] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/forge-design-tokens.json")
      .then((r) => r.json())
      .then((data: DesignTokensResponse) => {
        setTokens(data.tokens);
        setThemeNames(data.themes.map((t) => t.name));
      })
      .finally(() => setLoading(false));
  }, []);

  const tokenTypes = useMemo(
    () => [...new Set(tokens.map((t) => t.$type))].sort(),
    [tokens]
  );

  const columnDefs = useMemo(() => buildColumns(themeNames), [themeNames]);

  const filteredTokens = useMemo(
    () =>
      typeFilter === "all"
        ? tokens
        : tokens.filter((t) => t.$type === typeFilter),
    [typeFilter, tokens]
  );

  if (loading) {
    return (
      <AnimatedPage>
        <PageShell title="Design Tokens" description="Loading...">
          <div className="flex items-center justify-center h-64 text-ui-fg-muted">
            Loading tokens...
          </div>
        </PageShell>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <PageShell
        title="Design Tokens"
        description={`${tokens.length} tokens across ${themeNames.length} themes`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              type="search"
              placeholder="Search tokens..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select size="small" value={typeFilter} onValueChange={setTypeFilter}>
            <Select.Trigger>
              <Select.Value placeholder="Filter by type" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">All ({tokens.length})</Select.Item>
              {tokenTypes.map((type) => (
                <Select.Item key={type} value={type}>
                  {type} ({tokens.filter((t) => t.$type === type).length})
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        <ForgeGrid<DesignToken>
          rowData={filteredTokens}
          columnDefs={columnDefs}
          height={700}
          pageSize={25}
          quickFilterText={search}
        />
      </PageShell>
    </AnimatedPage>
  );
}
