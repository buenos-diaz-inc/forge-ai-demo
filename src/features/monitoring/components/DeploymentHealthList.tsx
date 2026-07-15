import { AnimatedList } from "@/components/ui/AnimatedList";
import { StatusDot } from "@/components/ui/StatusDot";
import { clx } from "@/lib/utils";
import { deploymentHealth, type DeploymentHealth } from "../data/monitoring-data";

const sparkColors: Record<string, string> = {
  healthy: "#2B6B4F",
  warning: "#C48E2A",
  degraded: "#C0593A",
};

function Sparkline({ points, status }: { points: number[]; status: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 64;
  const h = 18;
  const step = w / (points.length - 1);
  const coords = points
    .map((p, i) => `${i * step},${h - ((p - min) / range) * (h - 2) - 1}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={coords}
        fill="none"
        stroke={sparkColors[status] || "#6B7280"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HealthRow({ row }: { row: DeploymentHealth }) {
  const latencyBad = row.status === "degraded" && row.p95Latency > 200;
  const errorBad = row.errorRate > 1;
  const errorWarn = row.errorRate > 0.4;

  return (
    <div className="flex items-center gap-3 border-b border-ui-border-base py-2.5 last:border-b-0">
      <StatusDot status={row.status} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-ui-fg-base">
        {row.name}
        <span className="ml-1.5 text-xs font-normal text-ui-fg-subtle">{row.env}</span>
      </span>
      <span
        className={clx(
          "w-14 shrink-0 text-right font-mono text-xs",
          latencyBad ? "text-rose-600" : "text-ui-fg-muted"
        )}
      >
        {row.p95Latency}ms
      </span>
      <span
        className={clx(
          "w-10 shrink-0 text-right font-mono text-xs",
          errorBad ? "text-rose-600" : errorWarn ? "text-amber-600" : "text-emerald-600"
        )}
      >
        {row.errorRate}%
      </span>
      <Sparkline points={row.sparkline} status={row.status} />
    </div>
  );
}

export function DeploymentHealthList() {
  return (
    <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-5">
      <h3 className="mb-0.5 text-sm font-semibold text-ui-fg-base">Deployment Health</h3>
      <p className="mb-4 text-xs text-ui-fg-muted">
        {deploymentHealth.length} deployments · sorted by severity
      </p>
      <AnimatedList className="divide-y-0">
        {deploymentHealth.map((row) => (
          <HealthRow key={row.id} row={row} />
        ))}
      </AnimatedList>
    </div>
  );
}
