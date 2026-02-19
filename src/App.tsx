import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@medusajs/ui";
import { router } from "@/routes/router";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/providers/SidebarProvider";

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
