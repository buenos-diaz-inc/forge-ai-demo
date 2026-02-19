import { useParams, useNavigate } from "react-router-dom";
import { Badge, Tabs, Table } from "@medusajs/ui";
import { ArrowLeftMini } from "@medusajs/icons";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { StatusDot } from "@/components/ui/StatusDot";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { PieChart } from "@/components/charts/PieChart";
import { formatDate, formatNumber } from "@/lib/utils";
import { getDataset, datasetTypeDistribution, datasetSampleData } from "./data/datasets-data";

export function DatasetDetailPage() {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const dataset = getDataset(datasetId || "");

  if (!dataset) {
    return (
      <AnimatedPage>
        <div className="p-6 text-ui-fg-muted">Dataset not found.</div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/datasets")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ui-border-base text-ui-fg-muted hover:text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
          >
            <ArrowLeftMini className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-ui-fg-base">{dataset.name}</h1>
              <Badge color={dataset.status === "Ready" ? "green" : dataset.status === "Processing" ? "blue" : "red"}>
                {dataset.status}
              </Badge>
              <StatusDot status={dataset.status} pulse={dataset.status === "Processing"} />
            </div>
            <p className="mt-1 text-sm text-ui-fg-muted">
              {dataset.type} &middot; v{dataset.version} &middot; {formatNumber(dataset.records)} records
            </p>
          </div>
        </div>

        <Tabs defaultValue="preview">
          <Tabs.List>
            <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
            <Tabs.Trigger value="statistics">Statistics</Tabs.Trigger>
            <Tabs.Trigger value="info">Info</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="preview">
            <div className="mt-4 rounded-xl border border-ui-border-base overflow-hidden">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Text</Table.HeaderCell>
                    <Table.HeaderCell>Sentiment</Table.HeaderCell>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {datasetSampleData.map((row) => (
                    <Table.Row key={row.id}>
                      <Table.Cell>{row.id}</Table.Cell>
                      <Table.Cell className="max-w-xs truncate">{row.text}</Table.Cell>
                      <Table.Cell>
                        <Badge
                          color={row.sentiment === "positive" ? "green" : row.sentiment === "negative" ? "red" : "grey"}
                          size="small"
                        >
                          {row.sentiment}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{row.score}</Table.Cell>
                      <Table.Cell>{row.category}</Table.Cell>
                      <Table.Cell>{row.date}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Tabs.Content>

          <Tabs.Content value="statistics">
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <ChartContainer title="Type Distribution" height={280}>
                <PieChart data={datasetTypeDistribution} />
              </ChartContainer>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Records", value: formatNumber(dataset.records) },
                  { label: "Size", value: dataset.size },
                  { label: "Columns", value: dataset.columns || "N/A" },
                  { label: "Version", value: `v${dataset.version}` },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-ui-border-base bg-ui-bg-base p-4">
                    <p className="text-xs text-ui-fg-muted">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-ui-fg-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="info">
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Author", value: dataset.author.name },
                { label: "Created", value: formatDate(dataset.createdAt) },
                { label: "Last Updated", value: formatDate(dataset.updatedAt) },
                { label: "Type", value: dataset.type },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-ui-border-base bg-ui-bg-base p-4">
                  <p className="text-xs text-ui-fg-muted">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-ui-fg-base">{item.value}</p>
                </div>
              ))}
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
