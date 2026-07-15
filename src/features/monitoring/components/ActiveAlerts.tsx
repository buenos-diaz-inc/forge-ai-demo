import { useState } from "react";
import { Badge, Button } from "@medusajs/ui";
import { clx } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { activeAlerts, type Alert } from "../data/monitoring-data";

function AlertRow({ alert, onAck }: { alert: Alert; onAck: () => void }) {
  return (
    <div
      className={clx(
        "flex items-start gap-3 rounded-lg border border-l-4 p-3 transition-opacity",
        alert.acknowledged
          ? "border-ui-border-base border-l-ui-fg-subtle bg-ui-bg-subtle opacity-50"
          : alert.severity === "critical"
          ? "border-rose-200 border-l-rose-500 bg-rose-50"
          : "border-amber-200 border-l-amber-500 bg-amber-50"
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ui-fg-base">{alert.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ui-fg-muted">
          <Badge
            color={alert.severity === "critical" ? "red" : "orange"}
            size="small"
          >
            {alert.severity}
          </Badge>
          <span>{alert.deployment}</span>
          <code className="rounded border border-ui-border-base bg-ui-bg-base px-1.5 py-0.5 font-mono text-xs text-ui-fg-base">
            {alert.metric}
          </code>
          <span>· {formatRelativeTime(alert.timestamp)}</span>
        </div>
      </div>
      <Button
        variant="secondary"
        size="small"
        onClick={onAck}
        disabled={alert.acknowledged}
        className="shrink-0"
      >
        {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
      </Button>
    </div>
  );
}

export function ActiveAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(activeAlerts);

  function acknowledge(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  }

  const firingCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ui-fg-base">Active Alerts</h3>
          <p className="mt-0.5 text-xs text-ui-fg-muted">Firing rules requiring attention</p>
        </div>
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
          {firingCount} firing
        </span>
      </div>
      <div className="space-y-2.5">
        {alerts.map((alert) => (
          <AlertRow key={alert.id} alert={alert} onAck={() => acknowledge(alert.id)} />
        ))}
      </div>
    </div>
  );
}
