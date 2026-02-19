import { Badge } from "@medusajs/ui";
import { StatusDot } from "@/components/ui/StatusDot";
import type { ICellRendererParams } from "ag-grid-community";

const badgeColors: Record<string, "green" | "blue" | "orange" | "red" | "grey" | "purple"> = {
  active: "green",
  healthy: "green",
  completed: "green",
  ready: "green",
  running: "blue",
  deploying: "blue",
  processing: "blue",
  queued: "orange",
  degraded: "orange",
  warning: "orange",
  draft: "grey",
  archived: "grey",
  failed: "red",
  error: "red",
  down: "red",
};

export function StatusCellRenderer(params: ICellRendererParams) {
  const value = params.value as string;
  if (!value) return null;

  const color = badgeColors[value.toLowerCase()] || "grey";
  const isActive = ["running", "deploying", "processing"].includes(value.toLowerCase());

  return (
    <div className="flex items-center gap-2">
      <StatusDot status={value} pulse={isActive} />
      <Badge color={color} size="small">
        {value}
      </Badge>
    </div>
  );
}
