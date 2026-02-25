import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import { InboxSolid, DocumentText, MagnifyingGlass } from "@medusajs/icons";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const WithAction: Story = {
  args: {
    icon: InboxSolid,
    title: "No models yet",
    description: "Get started by creating your first model. It only takes a few seconds.",
    actionLabel: "Create Model",
    onAction: () => alert("Create clicked"),
  },
};

export const WithoutAction: Story = {
  args: {
    icon: MagnifyingGlass,
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
};

export const Documents: Story = {
  args: {
    icon: DocumentText,
    title: "No documents",
    description: "Upload or create documents to get started with your project.",
    actionLabel: "Upload Document",
    onAction: () => alert("Upload clicked"),
  },
};
