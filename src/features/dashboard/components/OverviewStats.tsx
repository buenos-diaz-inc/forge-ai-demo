import { CubeSolid, BoltSolid, RocketLaunch, ComputerDesktop } from "@medusajs/icons";
import { StatCard } from "@/components/ui/StatCard";
import { dashboardStats } from "../data/dashboard-data";

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Models"
        value={dashboardStats.totalModels.value}
        change={dashboardStats.totalModels.change}
        changeLabel={dashboardStats.totalModels.changeLabel}
        icon={CubeSolid}
      />
      <StatCard
        title="Active Experiments"
        value={dashboardStats.activeExperiments.value}
        change={dashboardStats.activeExperiments.change}
        changeLabel={dashboardStats.activeExperiments.changeLabel}
        icon={BoltSolid}
      />
      <StatCard
        title="Deployments"
        value={dashboardStats.deployments.value}
        change={dashboardStats.deployments.change}
        changeLabel={dashboardStats.deployments.changeLabel}
        icon={RocketLaunch}
      />
      <StatCard
        title="GPU Hours"
        value={dashboardStats.gpuHours.value}
        change={dashboardStats.gpuHours.change}
        changeLabel={dashboardStats.gpuHours.changeLabel}
        icon={ComputerDesktop}
      />
    </div>
  );
}
