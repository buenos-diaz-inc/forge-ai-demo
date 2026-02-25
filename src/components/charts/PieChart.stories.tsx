import type { Meta, StoryObj } from "@storybook/react-vite";
import { PieChart } from "./PieChart";
import { ChartContainer } from "./ChartContainer";

const meta: Meta<typeof PieChart> = {
  title: "Charts/PieChart",
  component: PieChart,
  decorators: [
    (Story) => (
      <ChartContainer title="Pie Chart" height={300}>
        <Story />
      </ChartContainer>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  args: {
    data: [
      { id: "nlp", label: "NLP", value: 35 },
      { id: "vision", label: "Vision", value: 28 },
      { id: "tabular", label: "Tabular", value: 22 },
      { id: "audio", label: "Audio", value: 15 },
    ],
  },
};

export const TwoSegments: Story = {
  args: {
    data: [
      { id: "pass", label: "Pass", value: 94 },
      { id: "fail", label: "Fail", value: 6 },
    ],
    colors: ["#38896A", "#f43f5e"],
  },
};

export const ManySegments: Story = {
  args: {
    data: [
      { id: "pytorch", label: "PyTorch", value: 40 },
      { id: "tensorflow", label: "TensorFlow", value: 25 },
      { id: "jax", label: "JAX", value: 15 },
      { id: "onnx", label: "ONNX", value: 10 },
      { id: "sklearn", label: "Scikit-learn", value: 7 },
      { id: "other", label: "Other", value: 3 },
    ],
  },
};
