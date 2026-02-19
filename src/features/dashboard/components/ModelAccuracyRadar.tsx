import { ChartContainer } from "@/components/charts/ChartContainer";
import { RadarChart } from "@/components/charts/RadarChart";
import { FORGE_COLORS } from "@/lib/constants";
import { modelComparisonData } from "../data/dashboard-data";

export function ModelAccuracyRadar() {
  return (
    <ChartContainer
      title="Model Comparison"
      description="Top 5 models across key performance metrics"
      height={320}
    >
      <RadarChart
        data={modelComparisonData}
        keys={["GPT-Forge", "BERT-Custom", "ResNet-V3", "LLaMA-Fine", "XGBoost-Pro"]}
        indexBy="metric"
        maxValue={100}
        colors={FORGE_COLORS.slice(0, 5)}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -30,
            itemWidth: 100,
            itemHeight: 18,
            symbolSize: 8,
            symbolShape: "circle",
          },
        ]}
      />
    </ChartContainer>
  );
}
