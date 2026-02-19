import { useParams, useNavigate } from "react-router-dom";
import { Badge, Tabs } from "@medusajs/ui";
import { ArrowLeftMini } from "@medusajs/icons";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { FORGE_COLORS } from "@/lib/constants";
import { getDeployment, trafficData, latencyData, statusCodeDistribution } from "./data/deployments-data";

export function DeploymentDetailPage() {
  const { deploymentId } = useParams();
  const navigate = useNavigate();
  const deployment = getDeployment(deploymentId || "");

  if (!deployment) {
    return (
      <AnimatedPage>
        <div className="p-6 text-ui-fg-muted">Deployment not found.</div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/deployments")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ui-border-base text-ui-fg-muted hover:text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
          >
            <ArrowLeftMini className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-ui-fg-base">{deployment.name}</h1>
              <Badge
                color={
                  deployment.status === "Healthy" ? "green" :
                  deployment.status === "Degraded" ? "orange" :
                  deployment.status === "Down" ? "red" : "blue"
                }
              >
                {deployment.status}
              </Badge>
              <StatusDot status={deployment.status} pulse={deployment.status !== "Down"} />
            </div>
            <p className="mt-1 text-sm text-ui-fg-muted">
              {deployment.model} v{deployment.version} &middot; {deployment.environment} &middot; {deployment.region}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[
            { label: "Requests/sec", value: deployment.requestsPerSec || "-" },
            { label: "P99 Latency", value: deployment.p99Latency ? `${deployment.p99Latency}ms` : "-" },
            { label: "Uptime", value: deployment.uptime ? `${deployment.uptime}%` : "-" },
            { label: "Replicas", value: deployment.replicas },
            { label: "Auto-Scale", value: deployment.autoScale ? "Enabled" : "Disabled" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-ui-border-base bg-ui-bg-base p-4">
              <p className="text-xs text-ui-fg-muted">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-ui-fg-base">{item.value}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="traffic">
          <Tabs.List>
            <Tabs.Trigger value="traffic">Traffic</Tabs.Trigger>
            <Tabs.Trigger value="performance">Performance</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="traffic">
            <div className="mt-4">
              <ChartContainer
                title="Request Volume"
                description="Requests per second over the last 24 hours"
                height={300}
              >
                <LineChart
                  data={trafficData}
                  colors={[FORGE_COLORS[0]]}
                  enableArea
                  areaOpacity={0.1}
                />
              </ChartContainer>
            </div>
          </Tabs.Content>

          <Tabs.Content value="performance">
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <ChartContainer
                title="Latency Distribution"
                description="P50, P95, and P99 latency over 24 hours"
                height={280}
              >
                <LineChart
                  data={latencyData}
                  colors={[FORGE_COLORS[3], FORGE_COLORS[2], FORGE_COLORS[1]]}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "row",
                      translateY: -20,
                      itemWidth: 60,
                      itemHeight: 20,
                      symbolSize: 8,
                      symbolShape: "circle",
                    },
                  ]}
                />
              </ChartContainer>
              <ChartContainer
                title="Status Code Distribution"
                description="Response status codes (%)"
                height={280}
              >
                <PieChart data={statusCodeDistribution} colors={FORGE_COLORS.slice(0, 5)} />
              </ChartContainer>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
