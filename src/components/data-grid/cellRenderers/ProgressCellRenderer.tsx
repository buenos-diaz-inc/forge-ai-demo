import type { ICellRendererParams } from "ag-grid-community";

export function ProgressCellRenderer(params: ICellRendererParams) {
  const value = params.value as number;
  if (value === undefined || value === null) return null;

  const percent = Math.min(100, Math.max(0, value));

  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="flex-1 h-1.5 rounded-full bg-ui-bg-subtle overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-forge-500 to-forge-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-ui-fg-muted w-9 text-right">{percent}%</span>
    </div>
  );
}
