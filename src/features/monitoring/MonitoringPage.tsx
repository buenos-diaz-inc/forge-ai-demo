import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { PageShell } from "@/components/layout/PageShell";
import { MonitoringStats } from "./components/MonitoringStats";
import { ActiveAlerts } from "./components/ActiveAlerts";
import { LatencyErrorChart } from "./components/LatencyErrorChart";
import { DeploymentHealthList } from "./components/DeploymentHealthList";
import { IncidentFeed } from "./components/IncidentFeed";

export function MonitoringPage() {
  return (
    <AnimatedPage>
      <PageShell
        title="Monitoring"
        description="Live health and alerting across your production deployments."
      >
        <MonitoringStats />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ActiveAlerts />
          <LatencyErrorChart />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DeploymentHealthList />
          <IncidentFeed />
        </div>
      </PageShell>
    </AnimatedPage>
  );
}
