import { clx } from "@medusajs/ui";

const statusColors: Record<string, string> = {
  healthy: "bg-emerald-500",
  active: "bg-emerald-500",
  running: "bg-blue-500",
  completed: "bg-emerald-500",
  ready: "bg-emerald-500",
  degraded: "bg-amber-500",
  warning: "bg-amber-500",
  processing: "bg-blue-500",
  queued: "bg-amber-500",
  deploying: "bg-blue-500",
  draft: "bg-gray-400",
  archived: "bg-gray-400",
  failed: "bg-rose-500",
  error: "bg-rose-500",
  down: "bg-rose-500",
};

interface StatusDotProps {
  status: string;
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ status, pulse, className }: StatusDotProps) {
  const color = statusColors[status.toLowerCase()] || "bg-gray-400";

  return (
    <span className={clx("relative inline-flex h-2.5 w-2.5", className)}>
      {pulse && (
        <span
          className={clx(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            color
          )}
        />
      )}
      <span className={clx("relative inline-flex h-2.5 w-2.5 rounded-full", color)} />
    </span>
  );
}
