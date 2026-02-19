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
import { ProgressCellRenderer } from "@/components/data-grid/cellRenderers/ProgressCellRenderer";
import { formatDate } from "@/lib/utils";
import { experiments } from "./data/experiments-data";
import type { Experiment } from "@/data/types";

const columnDefs: ColDef<Experiment>[] = [
  { field: "runId", headerName: "Run ID", width: 120, pinned: "left" },
  { field: "model", headerName: "Model", flex: 1, minWidth: 140 },
  { field: "dataset", headerName: "Dataset", flex: 1, minWidth: 160 },
  { field: "status", headerName: "Status", width: 140, cellRenderer: StatusCellRenderer },
  {
    headerName: "Progress",
    width: 140,
    cellRenderer: ProgressCellRenderer,
    valueGetter: (p) => {
      if (!p.data) return 0;
      return Math.round((p.data.epoch / p.data.totalEpochs) * 100);
    },
  },
  {
    field: "loss",
    headerName: "Loss",
    width: 100,
    valueFormatter: (p) => (p.value as number > 0 ? (p.value as number).toFixed(4) : "-"),
  },
  {
    field: "accuracy",
    headerName: "Accuracy",
    width: 110,
    valueFormatter: (p) => (p.value as number > 0 ? `${p.value}%` : "-"),
  },
  { field: "duration", headerName: "Duration", width: 100 },
  { field: "gpu", headerName: "GPU", width: 110 },
  {
    field: "author",
    headerName: "Author",
    width: 160,
    cellRenderer: AvatarCellRenderer,
    valueGetter: (p) => p.data?.author?.name,
  },
  {
    field: "startedAt",
    headerName: "Started",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
];

export function ExperimentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <AnimatedPage>
      <PageShell
        title="Experiments"
        description="Track and compare training runs."
        actions={
          <Button variant="primary" size="small">
            <PlusMini className="h-4 w-4" />
            New Experiment
          </Button>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              type="search"
              placeholder="Search experiments..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <ForgeGrid<Experiment>
          rowData={experiments}
          columnDefs={columnDefs}
          height={650}
          quickFilterText={search}
          onRowClicked={(row) => navigate(`/experiments/${row.id}`)}
        />
      </PageShell>
    </AnimatedPage>
  );
}
