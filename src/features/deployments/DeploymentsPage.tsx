import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@medusajs/ui";
import { PlusMini } from "@medusajs/icons";
import type { ColDef } from "ag-grid-community";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { PageShell } from "@/components/layout/PageShell";
import { ForgeGrid } from "@/components/data-grid/ForgeGrid";
import { StatusCellRenderer } from "@/components/data-grid/cellRenderers/StatusCellRenderer";
import { StatCard } from "@/components/ui/StatCard";
import { CheckCircleSolid, ExclamationCircleSolid, XCircleSolid, RocketLaunch } from "@medusajs/icons";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { formatPercent } from "@/lib/utils";
import { FORGE_COLORS } from "@/lib/constants";
import { deployments } from "./data/deployments-data";
import type { Deployment } from "@/data/types";

/* Semantic status colors from Tailwind palette — keeps hex out of component logic */
const STATUS_COLORS = {
  danger: "#e11d48",   // rose-600
  warning: "#d97706",  // amber-600
  success: FORGE_COLORS[0],
} as const;

const columnDefs: ColDef<Deployment>[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 180 },
  { field: "model", headerName: "Model", width: 140 },
  { field: "version", headerName: "Version", width: 120 },
  { field: "environment", headerName: "Env", width: 120 },
  { field: "region", headerName: "Region", width: 120 },
  { field: "status", headerName: "Status", width: 140, cellRenderer: StatusCellRenderer },
  {
    field: "requestsPerSec",
    headerName: "Req/s",
    width: 100,
    valueFormatter: (p) => (p.value as number > 0 ? `${p.value}` : "-"),
  },
  {
    field: "p99Latency",
    headerName: "P99 (ms)",
    width: 110,
    valueFormatter: (p) => (p.value as number > 0 ? `${p.value}ms` : "-"),
    cellStyle: (p) => {
      const val = p.value as number;
      if (val > 200) return { color: STATUS_COLORS.danger };
      if (val > 100) return { color: STATUS_COLORS.warning };
      return null;
    },
  },
  {
    field: "uptime",
    headerName: "Uptime",
    width: 100,
    valueFormatter: (p) => (p.value as number > 0 ? formatPercent(p.value as number) : "-"),
    cellStyle: (p) => {
      const val = p.value as number;
      if (val < 99) return { color: STATUS_COLORS.danger };
      if (val < 99.9) return { color: STATUS_COLORS.warning };
      return { color: STATUS_COLORS.success };
    },
  },
];

export function DeploymentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const healthy = deployments.filter((d) => d.status === "Healthy").length;
  const degraded = deployments.filter((d) => d.status === "Degraded").length;
  const down = deployments.filter((d) => d.status === "Down").length;

  return (
    <AnimatedPage>
      <PageShell
        title="Deployments"
        description="Monitor and manage deployed endpoints."
        actions={
          <Button variant="primary" size="small">
            <PlusMini className="h-4 w-4" />
            New Deployment
          </Button>
        }
      >
        <AnimatedList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Endpoints", value: deployments.length, icon: RocketLaunch },
            { title: "Healthy", value: healthy, icon: CheckCircleSolid },
            { title: "Degraded", value: degraded, icon: ExclamationCircleSolid },
            { title: "Down", value: down, icon: XCircleSolid },
          ].map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </AnimatedList>

        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-sm">
            <Input
              type="search"
              placeholder="Search deployments..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <ForgeGrid<Deployment>
          rowData={deployments}
          columnDefs={columnDefs}
          height={500}
          quickFilterText={search}
          onRowClicked={(row) => navigate(`/deployments/${row.id}`)}
        />
      </PageShell>
    </AnimatedPage>
  );
}
