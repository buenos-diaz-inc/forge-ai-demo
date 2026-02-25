import type { Meta, StoryObj } from "@storybook/react-vite";
import { ForgeGrid } from "./ForgeGrid";
import { AvatarCellRenderer } from "./cellRenderers/AvatarCellRenderer";
import { StatusCellRenderer } from "./cellRenderers/StatusCellRenderer";
import { ProgressCellRenderer } from "./cellRenderers/ProgressCellRenderer";

interface ModelRow {
  name: string;
  author: { name: string };
  status: string;
  accuracy: number;
  version: string;
}

const sampleData: ModelRow[] = [
  { name: "forge-nlp-v3", author: { name: "Ada Lovelace" }, status: "active", accuracy: 94, version: "3.1.0" },
  { name: "forge-vision-v2", author: { name: "Grace Hopper" }, status: "running", accuracy: 67, version: "2.4.1" },
  { name: "forge-tabular-v1", author: { name: "Alan Turing" }, status: "failed", accuracy: 45, version: "1.0.0" },
  { name: "forge-audio-v2", author: { name: "Linus Torvalds" }, status: "queued", accuracy: 12, version: "2.0.0" },
  { name: "forge-embed-v4", author: { name: "Margaret Hamilton" }, status: "completed", accuracy: 97, version: "4.2.0" },
  { name: "forge-gen-v1", author: { name: "Dennis Ritchie" }, status: "draft", accuracy: 0, version: "0.1.0" },
];

const meta: Meta<typeof ForgeGrid<ModelRow>> = {
  title: "DataGrid/ForgeGrid",
  component: ForgeGrid,
};
export default meta;

type Story = StoryObj<typeof ForgeGrid<ModelRow>>;

export const Default: Story = {
  args: {
    rowData: sampleData,
    height: 400,
    columnDefs: [
      { field: "name", headerName: "Model", flex: 1 },
      { field: "author", headerName: "Author", cellRenderer: AvatarCellRenderer, flex: 1 },
      { field: "status", headerName: "Status", cellRenderer: StatusCellRenderer, width: 160 },
      { field: "accuracy", headerName: "Progress", cellRenderer: ProgressCellRenderer, width: 180 },
      { field: "version", headerName: "Version", width: 120 },
    ],
  },
};

export const NoPagination: Story = {
  args: {
    rowData: sampleData,
    height: 350,
    pagination: false,
    columnDefs: [
      { field: "name", headerName: "Model", flex: 1 },
      { field: "status", headerName: "Status", cellRenderer: StatusCellRenderer, width: 160 },
      { field: "version", headerName: "Version", width: 120 },
    ],
  },
};
