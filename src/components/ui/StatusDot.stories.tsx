import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusDot } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
  title: "UI/StatusDot",
  component: StatusDot,
  argTypes: {
    status: {
      control: "select",
      options: [
        "healthy", "active", "running", "completed", "ready",
        "degraded", "warning", "processing", "queued", "deploying",
        "draft", "archived", "failed", "error", "down",
      ],
    },
    pulse: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof StatusDot>;

export const Healthy: Story = { args: { status: "healthy" } };
export const Running: Story = { args: { status: "running", pulse: true } };
export const Warning: Story = { args: { status: "warning" } };
export const Failed: Story = { args: { status: "failed" } };
export const Draft: Story = { args: { status: "draft" } };
export const Deploying: Story = { args: { status: "deploying", pulse: true } };

export const AllStatuses: Story = {
  render: () => {
    const statuses = [
      "healthy", "active", "running", "completed", "ready",
      "degraded", "warning", "processing", "queued", "deploying",
      "draft", "archived", "failed", "error", "down",
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {statuses.map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StatusDot status={s} pulse={["running", "deploying", "processing"].includes(s)} />
            <span className="text-sm text-ui-fg-base">{s}</span>
          </div>
        ))}
      </div>
    );
  },
};
