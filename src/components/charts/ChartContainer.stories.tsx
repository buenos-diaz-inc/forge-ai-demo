import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartContainer } from "./ChartContainer";
import { Button } from "@medusajs/ui";

const meta: Meta<typeof ChartContainer> = {
  title: "Charts/ChartContainer",
  component: ChartContainer,
  argTypes: {
    height: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  args: {
    title: "Training Loss",
    description: "Loss over training epochs",
    height: 200,
    children: (
      <div className="flex h-full items-center justify-center text-sm text-ui-fg-muted">
        Chart goes here
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: "Model Performance",
    description: "Accuracy by model version",
    height: 200,
    actions: <Button variant="secondary" size="small">Export</Button>,
    children: (
      <div className="flex h-full items-center justify-center text-sm text-ui-fg-muted">
        Chart goes here
      </div>
    ),
  },
};

export const CustomHeight: Story = {
  args: {
    title: "Tall Chart",
    height: 400,
    children: (
      <div className="flex h-full items-center justify-center text-sm text-ui-fg-muted">
        400px height
      </div>
    ),
  },
};
