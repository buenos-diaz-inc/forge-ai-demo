import { CheckCircleSolid, BellAlertSolid, ClockSolid, CircleWarningSolid } from "@medusajs/icons";
import { StatCard } from "@/components/ui/StatCard";
import { monitoringStats } from "../data/monitoring-data";

export function MonitoringStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Healthy Deployments"
        value={monitoringStats.healthyDeployments.value}
        change={monitoringStats.healthyDeployments.change}
        changeLabel={monitoringStats.healthyDeployments.changeLabel}
        icon={CheckCircleSolid}
      />
      <StatCard
        title="Firing Alerts"
        value={monitoringStats.firingAlerts.value}
        changeLabel={monitoringStats.firingAlerts.changeLabel}
        icon={BellAlertSolid}
      />
      <StatCard
        title="Avg p95 Latency"
        value={monitoringStats.avgP95Latency.value}
        change={monitoringStats.avgP95Latency.change}
        changeLabel={monitoringStats.avgP95Latency.changeLabel}
        icon={ClockSolid}
      />
      <StatCard
        title="Error Rate"
        value={monitoringStats.errorRate.value}
        changeLabel={monitoringStats.errorRate.changeLabel}
        icon={CircleWarningSolid}
      />
    </div>
  );
}
