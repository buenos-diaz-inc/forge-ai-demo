import { useParams, useNavigate } from "react-router-dom";
import { Badge, Tabs, Table } from "@medusajs/ui";
import { ArrowLeftMini } from "@medusajs/icons";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import { FORGE_COLORS } from "@/lib/constants";
import { getExperiment, lossCurveData, accuracyCurveData } from "./data/experiments-data";

export function ExperimentDetailPage() {
  const { experimentId } = useParams();
  const navigate = useNavigate();
  const experiment = getExperiment(experimentId || "");

  if (!experiment) {
    return (
      <AnimatedPage>
        <div className="p-6 text-ui-fg-muted">Experiment not found.</div>
      </AnimatedPage>
    );
  }

  const progress = Math.round((experiment.epoch / experiment.totalEpochs) * 100);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/experiments")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ui-border-base text-ui-fg-muted hover:text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
          >
            <ArrowLeftMini className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-ui-fg-base">{experiment.runId}</h1>
              <Badge
                color={
                  experiment.status === "Completed" ? "green" :
                  experiment.status === "Running" ? "blue" :
                  experiment.status === "Failed" ? "red" : "orange"
                }
              >
                {experiment.status}
              </Badge>
              {experiment.status === "Running" && <StatusDot status="running" pulse />}
            </div>
            <p className="mt-1 text-sm text-ui-fg-muted">
              {experiment.model} on {experiment.dataset} &middot; {experiment.gpu}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ui-fg-muted">
              Epoch {experiment.epoch} / {experiment.totalEpochs}
            </span>
            <span className="text-sm font-medium text-ui-fg-base">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-ui-bg-subtle overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-forge-500 to-forge-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Tabs defaultValue="training">
          <Tabs.List>
            <Tabs.Trigger value="training">Training Progress</Tabs.Trigger>
            <Tabs.Trigger value="hyperparams">Hyperparameters</Tabs.Trigger>
            <Tabs.Trigger value="metrics">Metrics</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="training">
            <div className="mt-4">
              <ChartContainer
                title="Loss Curve"
                description="Training and validation loss over epochs"
                height={300}
              >
                <LineChart
                  data={lossCurveData}
                  colors={[FORGE_COLORS[0], FORGE_COLORS[1]]}
                  enableArea
                  areaOpacity={0.06}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 12,
                    tickValues: ["1", "20", "40", "60", "80", "100"],
                    legend: "Epoch",
                    legendOffset: 32,
                    legendPosition: "middle" as const,
                  }}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "row",
                      translateY: -20,
                      itemWidth: 120,
                      itemHeight: 20,
                      symbolSize: 8,
                      symbolShape: "circle",
                    },
                  ]}
                />
              </ChartContainer>
            </div>
          </Tabs.Content>

          <Tabs.Content value="hyperparams">
            <div className="mt-4 rounded-xl border border-ui-border-base overflow-hidden">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Parameter</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Object.entries(experiment.hyperparameters).map(([key, value]) => (
                    <Table.Row key={key}>
                      <Table.Cell className="font-mono text-sm">{key}</Table.Cell>
                      <Table.Cell className="font-mono text-sm">{String(value)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Tabs.Content>

          <Tabs.Content value="metrics">
            <div className="mt-4">
              <ChartContainer
                title="Accuracy & F1 Score"
                description="Model performance metrics over epochs"
                height={300}
              >
                <LineChart
                  data={accuracyCurveData}
                  colors={[FORGE_COLORS[0], FORGE_COLORS[2]]}
                  enableArea
                  areaOpacity={0.06}
                  yScale={{ type: "linear", min: 50, max: 100 }}
                  axisBottom={{
                    tickSize: 0,
                    tickPadding: 12,
                    tickValues: ["1", "20", "40", "60", "80", "100"],
                    legend: "Epoch",
                    legendOffset: 32,
                    legendPosition: "middle" as const,
                  }}
                  legends={[
                    {
                      anchor: "top-right",
                      direction: "row",
                      translateY: -20,
                      itemWidth: 100,
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
