import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { PageShell } from "@/components/layout/PageShell";
import { OverviewStats } from "./components/OverviewStats";
import { TrainingTrends } from "./components/TrainingTrends";
import { ResourceUtilization } from "./components/ResourceUtilization";
import { ModelAccuracyRadar } from "./components/ModelAccuracyRadar";
import { ActivityFeed } from "./components/ActivityFeed";
import { QuickActions } from "./components/QuickActions";

export function DashboardPage() {
  return (
    <AnimatedPage>
      <PageShell
        title="Dashboard"
        description="Overview of your AI development platform."
        actions={<QuickActions />}
      >
        <OverviewStats />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TrainingTrends />
          <ResourceUtilization />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ModelAccuracyRadar />
          <ActivityFeed />
        </div>
      </PageShell>
    </AnimatedPage>
  );
}
