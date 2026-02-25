import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnimatedPage } from "./AnimatedPage";

const meta: Meta<typeof AnimatedPage> = {
  title: "UI/AnimatedPage",
  component: AnimatedPage,
};
export default meta;

type Story = StoryObj<typeof AnimatedPage>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-6">
        <h2 className="text-lg font-semibold text-ui-fg-base">Page Content</h2>
        <p className="mt-2 text-sm text-ui-fg-muted">
          This content fades in and slides up on mount.
        </p>
      </div>
    ),
  },
};
