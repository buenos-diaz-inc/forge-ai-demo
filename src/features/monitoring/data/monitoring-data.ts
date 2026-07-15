export type AlertSeverity = "critical" | "warning" | "info";

export type DeploymentStatus = "healthy" | "warning" | "degraded";

export interface Alert {
  id: string;
  title: string;
  severity: AlertSeverity;
  deployment: string;
  metric: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface DeploymentHealth {
  id: string;
  name: string;
  env: string;
  status: DeploymentStatus;
  p95Latency: number;
  errorRate: number;
  sparkline: number[];
}

export interface IncidentEvent {
  id: string;
  message: string;
  severity: AlertSeverity | "resolved";
  deployment: string;
  timestamp: string;
}

export interface MonitoringKpi {
  value: string | number;
  change?: number;
  changeLabel?: string;
}

export interface MonitoringStatsShape {
  healthyDeployments: MonitoringKpi;
  firingAlerts: MonitoringKpi;
  avgP95Latency: MonitoringKpi;
  errorRate: MonitoringKpi;
}

export const monitoringStats: MonitoringStatsShape = {
  healthyDeployments: { value: "18/20", change: 2, changeLabel: "vs last week" },
  firingAlerts: { value: 3, changeLabel: "2 critical · 1 warning" },
  avgP95Latency: { value: "142ms", change: -8, changeLabel: "vs prior 24h" },
  errorRate: { value: "0.42%", changeLabel: "▲ 0.1% vs prior 24h" },
};

export const activeAlerts: Alert[] = [
  {
    id: "al1",
    title: "High p95 latency",
    severity: "critical",
    deployment: "recs-api",
    metric: "p95 512ms > 500ms",
    timestamp: "2026-07-15T15:31:00Z",
    acknowledged: false,
  },
  {
    id: "al2",
    title: "Error rate spike",
    severity: "critical",
    deployment: "fraud-v3",
    metric: "err 4.1% > 2%",
    timestamp: "2026-07-15T15:23:00Z",
    acknowledged: false,
  },
  {
    id: "al3",
    title: "Feature drift detected",
    severity: "warning",
    deployment: "nlp-embed",
    metric: "PSI 0.21 > 0.2",
    timestamp: "2026-07-15T14:59:00Z",
    acknowledged: false,
  },
];

// 24 hourly data points for the latency/error chart
function hourLabel(hoursAgo: number): string {
  const h = (hoursAgo === 0) ? "now" : `${String(23 - hoursAgo).padStart(2, "0")}:00`;
  return h;
}

const rawLatency = [180, 175, 162, 158, 170, 185, 190, 178, 165, 155, 148, 142, 138, 145, 152, 160, 155, 148, 138, 128, 118, 110, 120, 142];
const rawErrorRate = [0.38, 0.35, 0.32, 0.30, 0.35, 0.40, 0.42, 0.38, 0.34, 0.30, 0.28, 0.27, 0.26, 0.28, 0.30, 0.35, 0.36, 0.34, 0.32, 0.30, 0.28, 0.25, 0.30, 0.42];

export const latencyErrorSeries = [
  {
    id: "p95 latency (ms)",
    color: "#2B6B4F",
    data: rawLatency.map((y, i) => ({ x: hourLabel(23 - i), y })),
  },
  {
    id: "error rate (%)",
    color: "#C0593A",
    data: rawErrorRate.map((y, i) => ({ x: hourLabel(23 - i), y })),
  },
];

export const deploymentHealth: DeploymentHealth[] = [
  { id: "dh1", name: "recs-api", env: "prod", status: "degraded", p95Latency: 512, errorRate: 1.2, sparkline: [14, 12, 13, 6, 9, 2] },
  { id: "dh2", name: "fraud-v3", env: "prod", status: "degraded", p95Latency: 96, errorRate: 4.1, sparkline: [13, 12, 10, 11, 6, 3] },
  { id: "dh3", name: "nlp-embed", env: "prod", status: "warning", p95Latency: 210, errorRate: 0.5, sparkline: [9, 8, 10, 7, 9, 7] },
  { id: "dh4", name: "billing-clf", env: "prod", status: "healthy", p95Latency: 88, errorRate: 0.1, sparkline: [10, 11, 9, 10, 8, 9] },
  { id: "dh5", name: "vision-tag", env: "prod", status: "healthy", p95Latency: 120, errorRate: 0.2, sparkline: [9, 10, 8, 9, 7, 8] },
  { id: "dh6", name: "checkout-rank", env: "prod", status: "healthy", p95Latency: 104, errorRate: 0.15, sparkline: [10, 9, 11, 8, 10, 9] },
  { id: "dh7", name: "search-v2", env: "prod", status: "healthy", p95Latency: 78, errorRate: 0.08, sparkline: [8, 9, 7, 8, 6, 7] },
];

export const incidentFeed: IncidentEvent[] = [
  { id: "if1", message: "<b>recs-api</b> entered <b>degraded</b> — p95 latency crossed 500ms.", severity: "critical", deployment: "recs-api", timestamp: "2026-07-15T15:31:00Z" },
  { id: "if2", message: "Alert <b>Error rate spike</b> fired on <b>fraud-v3</b>.", severity: "critical", deployment: "fraud-v3", timestamp: "2026-07-15T15:23:00Z" },
  { id: "if3", message: "Feature drift warning raised on <b>nlp-embed</b>.", severity: "warning", deployment: "nlp-embed", timestamp: "2026-07-15T14:59:00Z" },
  { id: "if4", message: "<b>checkout-rank</b> recovered to <b>healthy</b>.", severity: "resolved", deployment: "checkout-rank", timestamp: "2026-07-15T14:37:00Z" },
  { id: "if5", message: "<b>billing-clf</b> auto-scaled to 3 replicas.", severity: "info", deployment: "billing-clf", timestamp: "2026-07-15T13:37:00Z" },
];
