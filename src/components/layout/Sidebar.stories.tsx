import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { SidebarProvider } from "@/providers/SidebarProvider";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <MemoryRouter initialEntries={["/"]}>
          <div style={{ position: "relative", height: 500, width: 256 }}>
            <Story />
          </div>
        </MemoryRouter>
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const ModelsActive: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <MemoryRouter initialEntries={["/models"]}>
          <div style={{ position: "relative", height: 500, width: 256 }}>
            <Story />
          </div>
        </MemoryRouter>
      </SidebarProvider>
    ),
  ],
};

export const DeploymentsActive: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <MemoryRouter initialEntries={["/deployments"]}>
          <div style={{ position: "relative", height: 500, width: 256 }}>
            <Story />
          </div>
        </MemoryRouter>
      </SidebarProvider>
    ),
  ],
};
