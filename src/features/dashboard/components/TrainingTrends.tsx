import { ChartContainer } from "@/components/charts/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import { FORGE_COLORS } from "@/lib/constants";
import { trainingTrendsData } from "../data/dashboard-data";

export function TrainingTrends() {
  return (
    <ChartContainer
      title="Training Trends"
      description="Training runs started per week over the last 12 weeks"
      height={280}
    >
      <LineChart
        data={trainingTrendsData}
        colors={[FORGE_COLORS[0], FORGE_COLORS[2], FORGE_COLORS[1]]}
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
  );
}
