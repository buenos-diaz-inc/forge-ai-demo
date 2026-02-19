import type { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  height?: number;
  children: ReactNode;
}

export function ChartContainer({
  title,
  description,
  actions,
  height = 300,
  children,
}: ChartContainerProps) {
  return (
    <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-ui-fg-base">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-ui-fg-muted">{description}</p>
          )}
        </div>
        {actions}
      </div>
      <div style={{ height, width: "100%", position: "relative" }}>{children}</div>
    </div>
  );
}
