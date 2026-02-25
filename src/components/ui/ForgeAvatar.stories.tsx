import type { Meta, StoryObj } from "@storybook/react-vite";
import { ForgeAvatar } from "./ForgeAvatar";

const meta: Meta<typeof ForgeAvatar> = {
  title: "UI/ForgeAvatar",
  component: ForgeAvatar,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    name: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ForgeAvatar>;

export const Small: Story = { args: { name: "Ada Lovelace", size: "sm" } };
export const Medium: Story = { args: { name: "Ada Lovelace", size: "md" } };
export const Large: Story = { args: { name: "Ada Lovelace", size: "lg" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {["Ada Lovelace", "Grace Hopper", "Alan Turing", "Linus Torvalds", "Margaret Hamilton"].map(
        (name) => (
          <div key={name} style={{ textAlign: "center" }}>
            <ForgeAvatar name={name} size="lg" />
            <p className="mt-1 text-xs text-ui-fg-muted">{name}</p>
          </div>
        )
      )}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <ForgeAvatar name="Ada Lovelace" size={size} />
          <p className="mt-1 text-xs text-ui-fg-muted">{size}</p>
        </div>
      ))}
    </div>
  ),
};
