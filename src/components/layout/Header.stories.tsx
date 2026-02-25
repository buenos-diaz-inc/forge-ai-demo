import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { SidebarProvider } from "@/providers/SidebarProvider";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <MemoryRouter initialEntries={["/models"]}>
          <Story />
        </MemoryRouter>
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const DashboardRoute: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Story />
        </MemoryRouter>
      </SidebarProvider>
    ),
  ],
};

export const DeepRoute: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <MemoryRouter initialEntries={["/experiments"]}>
          <Story />
        </MemoryRouter>
      </SidebarProvider>
    ),
  ],
};
