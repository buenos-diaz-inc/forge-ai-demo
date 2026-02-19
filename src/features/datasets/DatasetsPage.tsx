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
import { formatDate, formatNumber } from "@/lib/utils";
import { datasets } from "./data/datasets-data";
import type { Dataset } from "@/data/types";

const columnDefs: ColDef<Dataset>[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 180 },
  { field: "type", headerName: "Type", width: 110, enableRowGroup: true },
  {
    field: "records",
    headerName: "Records",
    width: 120,
    valueFormatter: (p) => formatNumber(p.value as number),
  },
  { field: "size", headerName: "Size", width: 100 },
  { field: "version", headerName: "Version", width: 100 },
  { field: "status", headerName: "Status", width: 130, cellRenderer: StatusCellRenderer },
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
];

export function DatasetsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <AnimatedPage>
      <PageShell
        title="Datasets"
        description="Browse and manage training datasets."
        actions={
          <Button variant="primary" size="small">
            <PlusMini className="h-4 w-4" />
            Upload Dataset
          </Button>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              type="search"
              placeholder="Search datasets..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <ForgeGrid<Dataset>
          rowData={datasets}
          columnDefs={columnDefs}
          height={600}
          quickFilterText={search}
          onRowClicked={(row) => navigate(`/datasets/${row.id}`)}
        />
      </PageShell>
    </AnimatedPage>
  );
}
