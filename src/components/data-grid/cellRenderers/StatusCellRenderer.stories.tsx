import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusCellRenderer } from "./StatusCellRenderer";

const meta: Meta<typeof StatusCellRenderer> = {
  title: "DataGrid/StatusCellRenderer",
  component: StatusCellRenderer,
};
export default meta;

type Story = StoryObj<typeof StatusCellRenderer>;

const mockParams = (value: string) =>
  ({ value, data: {}, node: {}, colDef: {} }) as never;

export const AllStatuses: Story = {
  render: () => {
    const statuses = [
      "active", "healthy", "completed", "ready",
      "running", "deploying", "processing",
      "queued", "degraded", "warning",
      "draft", "archived",
      "failed", "error", "down",
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {statuses.map((s) => (
          <StatusCellRenderer key={s} {...mockParams(s)} />
        ))}
      </div>
    );
  },
};
