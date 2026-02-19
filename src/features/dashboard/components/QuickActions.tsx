import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@medusajs/ui";
import { PlusMini, ArrowUpTray, BoltSolid, RocketLaunch } from "@medusajs/icons";

const actions = [
  { label: "New Model", icon: PlusMini, path: "/models" },
  { label: "Upload Dataset", icon: ArrowUpTray, path: "/datasets" },
  { label: "Start Training", icon: BoltSolid, path: "/experiments" },
  { label: "Create Deployment", icon: RocketLaunch, path: "/deployments" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <>
      {actions.map((action) => (
        <Tooltip key={action.label} content={action.label}>
          <IconButton
            variant="transparent"
            size="small"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      ))}
    </>
  );
}
