import { useMemo } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@nivo/core";

export interface NivoThemeColors {
  axisText: string;
  legendText: string;
}

export function useNivoThemeColors(): NivoThemeColors {
  const { theme } = useTheme();
  return useMemo(() => {
    const isDark = theme === "dark";
    return {
      axisText: isDark ? "#d4d4d8" : "#374151",
      legendText: isDark ? "#e4e4e7" : "#1f2937",
    };
  }, [theme]);
}

export function useNivoTheme(): Theme {
  const { theme } = useTheme();

  return useMemo(() => {
    const isDark = theme === "dark";

    // WCAG AA compliant colors
    // Light mode: dark text on white — need >= 4.5:1 contrast ratio
    // Dark mode: light text on dark — need >= 4.5:1 contrast ratio
    const axisText = isDark ? "#d4d4d8" : "#374151"; // zinc-300 / gray-700
    const legendText = isDark ? "#e4e4e7" : "#1f2937"; // zinc-200 / gray-800
    const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    // Tooltip: force dark text on light bg so it's always readable
    // Nivo's slice tooltips can override the theme container, so we use
    // colors that work universally
    const tooltipBg = isDark ? "#27272a" : "#ffffff"; // zinc-800 / white
    const tooltipText = isDark ? "#f4f4f5" : "#111827"; // zinc-100 / gray-900
    const tooltipBorder = isDark ? "#3f3f46" : "#e5e7eb"; // zinc-700 / gray-200

    return {
      background: "transparent",
      text: {
        fontSize: 12,
        fontFamily: "Space Grotesk, system-ui, sans-serif",
        fill: axisText,
      },
      axis: {
        ticks: {
          text: { fill: axisText, fontSize: 11 },
          line: { stroke: gridColor },
        },
        legend: {
          text: { fill: legendText, fontSize: 12, fontWeight: 500 },
        },
      },
      grid: {
        line: { stroke: gridColor, strokeWidth: 1 },
      },
      legends: {
        text: { fill: legendText, fontSize: 11 },
      },
      tooltip: {
        container: {
          background: tooltipBg,
          color: tooltipText,
          fontSize: 12,
          borderRadius: "8px",
          boxShadow: isDark
            ? "0 4px 16px rgba(0,0,0,0.5)"
            : "0 4px 12px rgba(0,0,0,0.12)",
          border: `1px solid ${tooltipBorder}`,
          padding: "8px 12px",
        },
      },
      crosshair: {
        line: {
          stroke: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
          strokeWidth: 1,
          strokeDasharray: "4 4",
        },
      },
      labels: {
        text: {
          fill: legendText,
          fontSize: 12,
          fontWeight: 500,
        },
      },
    };
  }, [theme]);
}
