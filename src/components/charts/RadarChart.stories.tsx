import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadarChart } from "./RadarChart";
import { ChartContainer } from "./ChartContainer";

const meta: Meta<typeof RadarChart> = {
  title: "Charts/RadarChart",
  component: RadarChart,
  decorators: [
    (Story) => (
      <ChartContainer title="Radar Chart" height={350}>
        <Story />
      </ChartContainer>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof RadarChart>;

export const Default: Story = {
  args: {
    data: [
      { metric: "Accuracy", modelA: 92, modelB: 88 },
      { metric: "Latency", modelA: 78, modelB: 95 },
      { metric: "Throughput", modelA: 85, modelB: 90 },
      { metric: "Memory", modelA: 70, modelB: 80 },
      { metric: "Cost", modelA: 88, modelB: 75 },
    ],
    keys: ["modelA", "modelB"],
    indexBy: "metric",
  },
};

export const SingleSeries: Story = {
  args: {
    data: [
      { metric: "Precision", score: 95 },
      { metric: "Recall", score: 88 },
      { metric: "F1", score: 91 },
      { metric: "AUC", score: 94 },
      { metric: "MCC", score: 87 },
    ],
    keys: ["score"],
    indexBy: "metric",
    colors: ["#38896A"],
  },
};

export const ThreeModels: Story = {
  args: {
    data: [
      { metric: "Accuracy", v1: 75, v2: 85, v3: 93 },
      { metric: "Speed", v1: 95, v2: 88, v3: 82 },
      { metric: "Size", v1: 90, v2: 75, v3: 65 },
      { metric: "Robustness", v1: 60, v2: 78, v3: 90 },
      { metric: "Fairness", v1: 70, v2: 82, v3: 88 },
      { metric: "Interpretability", v1: 85, v2: 70, v3: 55 },
    ],
    keys: ["v1", "v2", "v3"],
    indexBy: "metric",
  },
};
