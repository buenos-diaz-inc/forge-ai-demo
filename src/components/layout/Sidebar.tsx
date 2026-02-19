import { NavLink } from "react-router-dom";
import { clx } from "@medusajs/ui";
import { useSidebar } from "@/hooks/useSidebar";
import { SIDEBAR_WIDTH } from "@/lib/constants";
import { ForgeAvatar } from "@/components/ui/ForgeAvatar";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Models", path: "/models" },
  { label: "Datasets", path: "/datasets" },
  { label: "Experiments", path: "/experiments" },
  { label: "Deployments", path: "/deployments" },
  { label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const { collapsed } = useSidebar();

  return (
    <aside
      style={{ width: SIDEBAR_WIDTH }}
      className={clx(
        "fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-ui-border-base bg-ui-bg-base transition-transform duration-200",
        collapsed && "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-5">
        <div className="flex items-center gap-2.5">
          <img src="/logo-mark.svg" alt="Forge" className="h-8 w-8 shrink-0" />
          <span className="forge-logo-text text-xl font-bold whitespace-nowrap">
            Forge
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  clx(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-ui-bg-base-hover text-ui-fg-base font-medium"
                      : "text-ui-fg-muted hover:bg-ui-bg-subtle hover:text-ui-fg-base"
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      <div className="border-t border-ui-border-base p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <ForgeAvatar name="Brayden Love" size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ui-fg-base whitespace-nowrap">Brayden Love</p>
            <p className="truncate text-xs text-ui-fg-muted">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
