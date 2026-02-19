import { createContext, useCallback, useState, type ReactNode } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsedState] = useState(() => {
    return localStorage.getItem("forge-sidebar-collapsed") === "true";
  });

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value);
    localStorage.setItem("forge-sidebar-collapsed", String(value));
  }, []);

  const toggleSidebar = useCallback(
    () =>
      setCollapsedState((prev) => {
        const next = !prev;
        localStorage.setItem("forge-sidebar-collapsed", String(next));
        return next;
      }),
    []
  );

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
