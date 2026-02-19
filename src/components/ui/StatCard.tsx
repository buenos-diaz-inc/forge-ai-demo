import { clx, IconBadge } from "@medusajs/ui";
import { ArrowUpRightMini, ArrowDownRightMini } from "@medusajs/icons";
import type { ComponentType } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ComponentType;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ui-fg-muted">{title}</p>
        <IconBadge size="large" color="grey">
          <Icon />
        </IconBadge>
      </div>
      <p className="mt-2 text-3xl font-bold text-ui-fg-base">{value}</p>
      {change !== undefined && (
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={clx(
              "flex items-center gap-0.5 text-xs font-medium",
              isPositive ? "text-emerald-600" : "text-rose-600"
            )}
          >
            {isPositive ? (
              <ArrowUpRightMini className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRightMini className="h-3.5 w-3.5" />
            )}
            {Math.abs(change)}%
          </span>
          {changeLabel && (
            <span className="text-xs text-ui-fg-muted">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
