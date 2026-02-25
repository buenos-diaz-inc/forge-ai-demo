import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "./BarChart";
import { ChartContainer } from "./ChartContainer";

const meta: Meta<typeof BarChart> = {
  title: "Charts/BarChart",
  component: BarChart,
  decorators: [
    (Story) => (
      <ChartContainer title="Bar Chart" height={300}>
        <Story />
      </ChartContainer>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof BarChart>;

const sampleData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 180 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 220 },
  { month: "May", value: 190 },
  { month: "Jun", value: 260 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    keys: ["value"],
    indexBy: "month",
  },
};

export const Grouped: Story = {
  args: {
    data: [
      { model: "v1", accuracy: 82, recall: 78, precision: 85 },
      { model: "v2", accuracy: 88, recall: 84, precision: 90 },
      { model: "v3", accuracy: 91, recall: 89, precision: 93 },
    ],
    keys: ["accuracy", "recall", "precision"],
    indexBy: "model",
    groupMode: "grouped" as const,
  },
};

export const Stacked: Story = {
  args: {
    data: [
      { quarter: "Q1", training: 40, inference: 30, storage: 20 },
      { quarter: "Q2", training: 55, inference: 35, storage: 25 },
      { quarter: "Q3", training: 60, inference: 45, storage: 30 },
      { quarter: "Q4", training: 70, inference: 50, storage: 35 },
    ],
    keys: ["training", "inference", "storage"],
    indexBy: "quarter",
    groupMode: "stacked" as const,
  },
};

export const CustomColors: Story = {
  args: {
    data: sampleData,
    keys: ["value"],
    indexBy: "month",
    colors: ["#C0593A"],
  },
};
