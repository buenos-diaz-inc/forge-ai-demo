import { useParams, useNavigate } from "react-router-dom";
import { Button, Badge, Tabs } from "@medusajs/ui";
import { ArrowLeftMini } from "@medusajs/icons";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { formatDate } from "@/lib/utils";
import { FORGE_COLORS } from "@/lib/constants";
import { getModel, modelVersions, modelMetricsOverVersions } from "./data/models-data";

export function ModelDetailPage() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const model = getModel(modelId || "");

  if (!model) {
    return (
      <AnimatedPage>
        <div className="p-6 text-ui-fg-muted">Model not found.</div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/models")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ui-border-base text-ui-fg-muted hover:text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
          >
            <ArrowLeftMini className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-ui-fg-base">{model.name}</h1>
              <Badge color={model.status === "Active" ? "green" : model.status === "Draft" ? "grey" : "orange"}>
                {model.status}
              </Badge>
              {model.deployed && (
                <div className="flex items-center gap-1.5">
                  <StatusDot status="healthy" pulse />
                  <span className="text-xs text-emerald-600 font-medium">Deployed</span>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-ui-fg-muted">
              {model.framework} &middot; {model.type} &middot; v{model.version}
            </p>
          </div>
          <Button variant="secondary" size="small">Edit Model</Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="versions">Versions</Tabs.Trigger>
            <Tabs.Trigger value="metrics">Metrics</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview">
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Parameters", value: model.parameters },
                { label: "Model Size", value: model.size },
                { label: "Accuracy", value: `${model.accuracy}%` },
                { label: "Latency", value: `${model.latency}ms` },
                { label: "Framework", value: model.framework },
                { label: "Type", value: model.type },
                { label: "Created", value: formatDate(model.createdAt) },
                { label: "Last Updated", value: formatDate(model.updatedAt) },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-ui-border-base bg-ui-bg-base p-4">
                  <p className="text-xs text-ui-fg-muted">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-ui-fg-base">{item.value}</p>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="versions">
            <div className="mt-4">
              <AnimatedList className="space-y-3">
                {modelVersions.map((v) => (
                  <div
                    key={v.version}
                    className="flex items-center gap-4 rounded-lg border border-ui-border-base bg-ui-bg-base p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forge-100 text-forge-600 font-mono text-sm font-medium">
                      {v.version.split(".")[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ui-fg-base">v{v.version}</p>
                      <p className="text-xs text-ui-fg-muted">{formatDate(v.date)} by {v.author.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-ui-fg-base">{v.accuracy}%</p>
                      <p className="text-xs text-emerald-600">{v.delta}</p>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </Tabs.Content>

          <Tabs.Content value="metrics">
            <div className="mt-4">
              <ChartContainer
                title="Performance Over Versions"
                description="Accuracy and F1 score trends across model versions"
                height={300}
              >
                <LineChart
                  data={modelMetricsOverVersions}
                  colors={[FORGE_COLORS[0], FORGE_COLORS[2]]}
                  yScale={{ type: "linear", min: 85, max: 100 }}
                  enableArea
                  areaOpacity={0.08}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "row",
                      translateY: -20,
                      itemWidth: 80,
                      itemHeight: 20,
                      symbolSize: 8,
                      symbolShape: "circle",
                    },
                  ]}
                />
              </ChartContainer>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
