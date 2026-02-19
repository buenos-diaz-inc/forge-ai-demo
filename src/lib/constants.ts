import type { ComponentType } from "react";

export const SIDEBAR_WIDTH = 256;
export const SIDEBAR_COLLAPSED_WIDTH = 0;
export const HEADER_HEIGHT = 64;

export interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const FORGE_COLORS = [
  "#2B6B4F", // forest
  "#C0593A", // terracotta
  "#C48E2A", // amber
  "#6B8F71", // sage
  "#A16B3F", // copper
  "#B47267", // clay
  "#7A8B3C", // olive
  "#8B5A3E", // sienna
] as const;
