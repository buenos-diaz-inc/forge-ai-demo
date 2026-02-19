import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@medusajs/ui";
import { PlusMini } from "@medusajs/icons";
import type { ColDef } from "ag-grid-community";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { PageShell } from "@/components/layout/PageShell";
import { ForgeGrid } from "@/components/data-grid/ForgeGrid";
import { StatusCellRenderer } from "@/components/data-grid/cellRenderers/StatusCellRenderer";
import { AvatarCellRenderer } from "@/components/data-grid/cellRenderers/AvatarCellRenderer";
import { formatDate } from "@/lib/utils";
import { models } from "./data/models-data";
import type { Model } from "@/data/types";

const columnDefs: ColDef<Model>[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 160 },
  { field: "framework", headerName: "Framework", width: 130 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "version", headerName: "Version", width: 100 },
  { field: "status", headerName: "Status", width: 140, cellRenderer: StatusCellRenderer },
  {
    field: "accuracy",
    headerName: "Accuracy",
    width: 110,
    valueFormatter: (p) => `${p.value}%`,
  },
  {
    field: "latency",
    headerName: "Latency",
    width: 110,
    valueFormatter: (p) => `${p.value}ms`,
  },
  {
    field: "author",
    headerName: "Author",
    width: 170,
    cellRenderer: AvatarCellRenderer,
    valueGetter: (p) => p.data?.author?.name,
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
  {
    field: "deployed",
    headerName: "Deployed",
    width: 100,
    cellRenderer: (p: { value: boolean }) =>
      p.value ? (
        <span className="text-emerald-600 text-xs font-medium">Yes</span>
      ) : (
        <span className="text-ui-fg-muted text-xs">No</span>
      ),
  },
];

export function ModelsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <AnimatedPage>
      <PageShell
        title="Models"
        description="Manage your model registry."
        actions={
          <Button variant="primary" size="small">
            <PlusMini className="h-4 w-4" />
            New Model
          </Button>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              type="search"
              placeholder="Search models..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <ForgeGrid<Model>
          rowData={models}
          columnDefs={columnDefs}
          height={600}
          quickFilterText={search}
          onRowClicked={(row) => navigate(`/models/${row.id}`)}
        />
      </PageShell>
    </AnimatedPage>
  );
}
