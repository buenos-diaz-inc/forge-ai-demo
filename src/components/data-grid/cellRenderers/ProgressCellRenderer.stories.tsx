import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressCellRenderer } from "./ProgressCellRenderer";

const meta: Meta<typeof ProgressCellRenderer> = {
  title: "DataGrid/ProgressCellRenderer",
  component: ProgressCellRenderer,
};
export default meta;

type Story = StoryObj<typeof ProgressCellRenderer>;

const mockParams = (value: number) =>
  ({ value, data: {}, node: {}, colDef: {} }) as never;

export const Values: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <ProgressCellRenderer key={v} {...mockParams(v)} />
      ))}
    </div>
  ),
};
