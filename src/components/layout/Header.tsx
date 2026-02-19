import { useLocation } from "react-router-dom";
import { clx, Input } from "@medusajs/ui";
import { Sun, Moon, SidebarLeft } from "@medusajs/icons";
import { useTheme } from "@/hooks/useTheme";
import { useSidebar } from "@/hooks/useSidebar";
import { HEADER_HEIGHT } from "@/lib/constants";
import { ForgeAvatar } from "@/components/ui/ForgeAvatar";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/models": "Models",
  "/datasets": "Datasets",
  "/experiments": "Experiments",
  "/deployments": "Deployments",
  "/settings": "Settings",
};

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: "Dashboard", path: "/" }];

  const crumbs = [{ label: "Home", path: "/" }];
  let currentPath = "";
  for (const seg of segments) {
    currentPath += `/${seg}`;
    const title = routeTitles[currentPath];
    crumbs.push({ label: title || seg, path: currentPath });
  }
  return crumbs;
}

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { collapsed, toggleSidebar } = useSidebar();
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header
      style={{ height: HEADER_HEIGHT }}
      className="sticky top-0 z-20 flex items-center justify-between border-b border-ui-border-base bg-ui-bg-base/80 backdrop-blur-sm px-6"
    >
      {/* Left side: toggle + breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-lg p-1 text-ui-fg-muted hover:text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
        >
          <SidebarLeft className={clx("h-4 w-4", collapsed && "rotate-180")} />
        </button>

        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.path} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-ui-fg-muted">/</span>}
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "font-medium text-ui-fg-base"
                    : "text-ui-fg-muted"
                }
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="w-64">
          <Input
            type="search"
            placeholder="Search..."
            size="small"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-ui-border-base text-ui-fg-muted hover:text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>

        <ForgeAvatar name="Brayden Love" size="md" />
      </div>
    </header>
  );
}
