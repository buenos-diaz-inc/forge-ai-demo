import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { ModelsPage } from "@/features/models/ModelsPage";
import { ModelDetailPage } from "@/features/models/ModelDetailPage";
import { DatasetsPage } from "@/features/datasets/DatasetsPage";
import { DatasetDetailPage } from "@/features/datasets/DatasetDetailPage";
import { ExperimentsPage } from "@/features/experiments/ExperimentsPage";
import { ExperimentDetailPage } from "@/features/experiments/ExperimentDetailPage";
import { DeploymentsPage } from "@/features/deployments/DeploymentsPage";
import { DeploymentDetailPage } from "@/features/deployments/DeploymentDetailPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { DesignTokensPage } from "@/features/design-tokens/DesignTokensPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "models", element: <ModelsPage /> },
      { path: "models/:modelId", element: <ModelDetailPage /> },
      { path: "datasets", element: <DatasetsPage /> },
      { path: "datasets/:datasetId", element: <DatasetDetailPage /> },
      { path: "experiments", element: <ExperimentsPage /> },
      { path: "experiments/:experimentId", element: <ExperimentDetailPage /> },
      { path: "deployments", element: <DeploymentsPage /> },
      { path: "deployments/:deploymentId", element: <DeploymentDetailPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "design-tokens", element: <DesignTokensPage /> },
    ],
  },
]);
