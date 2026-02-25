import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnimatedList } from "./AnimatedList";

const meta: Meta<typeof AnimatedList> = {
  title: "UI/AnimatedList",
  component: AnimatedList,
};
export default meta;

type Story = StoryObj<typeof AnimatedList>;

export const Default: Story = {
  args: {
    className: "flex flex-col gap-2",
    children: Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="rounded-lg border border-ui-border-base bg-ui-bg-base p-3 text-sm text-ui-fg-base">
        Item {i + 1}
      </div>
    )),
  },
};

export const Cards: Story = {
  args: {
    className: "grid grid-cols-3 gap-3",
    children: ["Models", "Datasets", "Experiments", "Deployments", "Settings", "Analytics"].map(
      (label) => (
        <div key={label} className="rounded-xl border border-ui-border-base bg-ui-bg-base p-4 text-center">
          <p className="font-medium text-ui-fg-base">{label}</p>
        </div>
      )
    ),
  },
};
