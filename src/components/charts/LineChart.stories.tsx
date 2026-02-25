import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "./LineChart";
import { ChartContainer } from "./ChartContainer";

const meta: Meta<typeof LineChart> = {
  title: "Charts/LineChart",
  component: LineChart,
  decorators: [
    (Story) => (
      <ChartContainer title="Line Chart" height={300}>
        <Story />
      </ChartContainer>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LineChart>;

const singleSeries = [
  {
    id: "loss",
    data: [
      { x: "Epoch 1", y: 2.4 },
      { x: "Epoch 2", y: 1.8 },
      { x: "Epoch 3", y: 1.2 },
      { x: "Epoch 4", y: 0.8 },
      { x: "Epoch 5", y: 0.5 },
      { x: "Epoch 6", y: 0.35 },
    ],
  },
];

export const Default: Story = {
  args: { data: singleSeries },
};

export const MultiSeries: Story = {
  args: {
    data: [
      {
        id: "GPT-4",
        data: [
          { x: "Jan", y: 85 }, { x: "Feb", y: 87 }, { x: "Mar", y: 90 },
          { x: "Apr", y: 91 }, { x: "May", y: 93 }, { x: "Jun", y: 94 },
        ],
      },
      {
        id: "Forge-v2",
        data: [
          { x: "Jan", y: 80 }, { x: "Feb", y: 84 }, { x: "Mar", y: 88 },
          { x: "Apr", y: 90 }, { x: "May", y: 92 }, { x: "Jun", y: 95 },
        ],
      },
      {
        id: "Baseline",
        data: [
          { x: "Jan", y: 70 }, { x: "Feb", y: 71 }, { x: "Mar", y: 72 },
          { x: "Apr", y: 72 }, { x: "May", y: 73 }, { x: "Jun", y: 73 },
        ],
      },
    ],
  },
};

export const CustomColors: Story = {
  args: {
    data: singleSeries,
    colors: ["#C0593A"],
  },
};
