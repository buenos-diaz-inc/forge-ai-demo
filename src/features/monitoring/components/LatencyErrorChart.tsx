import { ChartContainer } from "@/components/charts/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import { latencyErrorSeries } from "../data/monitoring-data";

const CHART_COLORS = ["#2B6B4F", "#C0593A"];

export function LatencyErrorChart() {
  return (
    <ChartContainer
      title="Latency & Error Rate"
      description="p95 latency vs error rate · last 24h"
      height={280}
    >
      <LineChart
        data={latencyErrorSeries}
        colors={CHART_COLORS}
        margin={{ top: 20, right: 20, bottom: 50, left: 55 }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 12,
          tickValues: ["00:00", "06:00", "12:00", "18:00", "now"],
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 12,
        }}
        enableArea
        areaOpacity={0.06}
        pointSize={4}
        legends={[
          {
            anchor: "top-right",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -20,
            itemsSpacing: 16,
            itemWidth: 120,
            itemHeight: 12,
            itemDirection: "left-to-right",
            symbolSize: 10,
            symbolShape: "circle",
          },
        ]}
      />
    </ChartContainer>
  );
}
