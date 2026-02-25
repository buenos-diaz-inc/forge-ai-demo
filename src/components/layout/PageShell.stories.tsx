import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageShell } from "./PageShell";
import { Button } from "@medusajs/ui";
import { Plus } from "@medusajs/icons";

const meta: Meta<typeof PageShell> = {
  title: "Layout/PageShell",
  component: PageShell,
};
export default meta;

type Story = StoryObj<typeof PageShell>;

export const Default: Story = {
  args: {
    title: "Models",
    description: "Manage and monitor your ML models.",
    children: (
      <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-8 text-center text-sm text-ui-fg-muted">
        Page content goes here
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: "Experiments",
    description: "Track experiment runs and compare results.",
    actions: (
      <>
        <Button variant="secondary" size="small">Export</Button>
        <Button size="small"><Plus /> New Experiment</Button>
      </>
    ),
    children: (
      <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-8 text-center text-sm text-ui-fg-muted">
        Page content goes here
      </div>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Settings",
    children: (
      <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-8 text-center text-sm text-ui-fg-muted">
        Settings form here
      </div>
    ),
  },
};
