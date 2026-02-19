import { ChartContainer } from "@/components/charts/ChartContainer";
import { BarChart } from "@/components/charts/BarChart";
import { FORGE_COLORS } from "@/lib/constants";
import { resourceUtilizationData } from "../data/dashboard-data";

export function ResourceUtilization() {
  return (
    <ChartContainer
      title="Resource Utilization"
      description="GPU, CPU, and Memory usage across clusters (%)"
      height={280}
    >
      <BarChart
        data={resourceUtilizationData}
        keys={["GPU", "CPU", "Memory"]}
        indexBy="cluster"
        groupMode="grouped"
        colors={[FORGE_COLORS[0], FORGE_COLORS[3], FORGE_COLORS[2]]}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-right",
            direction: "row",
            translateY: -20,
            itemWidth: 70,
            itemHeight: 20,
            symbolSize: 8,
            symbolShape: "circle",
          },
        ]}
      />
    </ChartContainer>
  );
}
