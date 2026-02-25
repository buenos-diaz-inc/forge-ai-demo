import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarCellRenderer } from "./AvatarCellRenderer";

const meta: Meta<typeof AvatarCellRenderer> = {
  title: "DataGrid/AvatarCellRenderer",
  component: AvatarCellRenderer,
};
export default meta;

type Story = StoryObj<typeof AvatarCellRenderer>;

const mockParams = (name: string) =>
  ({ value: name, data: { name }, node: {}, colDef: {} }) as never;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {["Ada Lovelace", "Grace Hopper", "Alan Turing", "Margaret Hamilton", "Linus Torvalds"].map(
        (name) => (
          <AvatarCellRenderer key={name} {...mockParams(name)} />
        )
      )}
    </div>
  ),
};
