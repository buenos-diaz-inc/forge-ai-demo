import { Outlet } from "react-router-dom";
import { Toaster } from "@medusajs/ui";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSidebar } from "@/hooks/useSidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/lib/constants";

export function RootLayout() {
  const { collapsed } = useSidebar();
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <div className="min-h-screen bg-ui-bg-subtle">
      <Sidebar />
      <div
        style={{ marginLeft: sidebarWidth }}
        className="flex flex-col min-h-screen transition-all duration-200"
      >
        <Header />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
