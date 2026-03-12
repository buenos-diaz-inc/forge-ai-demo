/**
 * Tailwind CSS Inferred Token Generator (Optimized)
 * Generates base design tokens with their applicable utility prefixes
 *
 * Run: npx tsx scripts/generate-inferred-tokens.ts
 */

import * as fs from 'fs';
import * as path from 'path';

type DesignTokenCategory = "color" | "spacing" | "typography" | "shadow" | "border" | "other";

interface DesignToken {
  id: number;
  name: string;
  value: string;
  category: DesignTokenCategory;
  source_file: string;
  description?: string;
  applies_to?: string[];
}

let tokenId = 0;
const tokens: DesignToken[] = [];

function addToken(
  name: string,
  value: string,
  category: DesignTokenCategory,
  appliesTo?: string[],
  description?: string
) {
  tokens.push({
    id: ++tokenId,
    name,
    value,
    category,
    source_file: 'tailwind.config.ts',
    ...(appliesTo && { applies_to: appliesTo }),
    ...(description && { description }),
  });
}

// ============================================================================
// SPACING TOKENS
// ============================================================================
const SPACING_SCALE: Record<string, string> = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
};

const SPACING_UTILITIES = [
  'w', 'h', 'size', 'min-w', 'max-w', 'min-h', 'max-h',
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'ps', 'pe',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me',
  'gap', 'gap-x', 'gap-y',
  'space-x', 'space-y',
  'inset', 'inset-x', 'inset-y', 'top', 'right', 'bottom', 'left', 'start', 'end',
  'basis', 'scroll-m', 'scroll-p'
];

// ============================================================================
// FRACTIONAL / PERCENTAGE TOKENS
// ============================================================================
const FRACTIONAL_SCALE: Record<string, string> = {
  '1/2': '50%',
  '1/3': '33.333%',
  '2/3': '66.667%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.667%',
  '5/6': '83.333%',
  '1/12': '8.333%',
  '5/12': '41.667%',
  '7/12': '58.333%',
  '11/12': '91.667%',
  'full': '100%',
};

const FRACTIONAL_UTILITIES = ['w', 'h', 'size', 'basis', 'inset', 'inset-x', 'inset-y', 'top', 'right', 'bottom', 'left'];

// ============================================================================
// SIZE KEYWORDS
// ============================================================================
const SIZE_KEYWORDS: Record<string, string> = {
  'auto': 'auto',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
  'screen': '100vw (w) / 100vh (h)',
  'svw': '100svw',
  'svh': '100svh',
  'lvw': '100lvw',
  'lvh': '100lvh',
  'dvw': '100dvw',
  'dvh': '100dvh',
};

// ============================================================================
// CUSTOM THEME COLORS
// ============================================================================
const CUSTOM_COLORS: Record<string, string> = {
  'background': 'hsl(var(--background))',
  'foreground': 'hsl(var(--foreground))',
  'primary': 'hsl(var(--primary))',
  'primary-foreground': 'hsl(var(--primary-foreground))',
  'secondary': 'hsl(var(--secondary))',
  'secondary-foreground': 'hsl(var(--secondary-foreground))',
  'destructive': 'hsl(var(--destructive))',
  'destructive-foreground': 'hsl(var(--destructive-foreground))',
  'muted': 'hsl(var(--muted))',
  'muted-foreground': 'hsl(var(--muted-foreground))',
  'accent': 'hsl(var(--accent))',
  'accent-foreground': 'hsl(var(--accent-foreground))',
  'popover': 'hsl(var(--popover))',
  'popover-foreground': 'hsl(var(--popover-foreground))',
  'card': 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  'border': 'hsl(var(--border))',
  'input': 'hsl(var(--input))',
  'ring': 'hsl(var(--ring))',
  'sidebar': 'hsl(var(--sidebar-background))',
  'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
  'sidebar-primary': 'hsl(var(--sidebar-primary))',
  'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  'sidebar-accent': 'hsl(var(--sidebar-accent))',
  'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  'sidebar-border': 'hsl(var(--sidebar-border))',
  'sidebar-ring': 'hsl(var(--sidebar-ring))',
  'fitness-blue': 'hsl(var(--fitness-blue))',
  'fitness-blue-light': 'hsl(var(--fitness-blue-light))',
  'fitness-orange': 'hsl(var(--fitness-orange))',
  'fitness-orange-light': 'hsl(var(--fitness-orange-light))',
  'fitness-green': 'hsl(var(--fitness-green))',
  'fitness-green-light': 'hsl(var(--fitness-green-light))',
  'fitness-purple': 'hsl(var(--fitness-purple))',
  'fitness-purple-light': 'hsl(var(--fitness-purple-light))',
};

// ============================================================================
// DEFAULT PALETTE COLORS (condensed - only base shades)
// ============================================================================
const DEFAULT_PALETTE: Record<string, Record<string, string>> = {
  'slate': { '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1', '400': '#94a3b8', '500': '#64748b', '600': '#475569', '700': '#334155', '800': '#1e293b', '900': '#0f172a', '950': '#020617' },
  'gray': { '50': '#f9fafb', '100': '#f3f4f6', '200': '#e5e7eb', '300': '#d1d5db', '400': '#9ca3af', '500': '#6b7280', '600': '#4b5563', '700': '#374151', '800': '#1f2937', '900': '#111827', '950': '#030712' },
  'zinc': { '50': '#fafafa', '100': '#f4f4f5', '200': '#e4e4e7', '300': '#d4d4d8', '400': '#a1a1aa', '500': '#71717a', '600': '#52525b', '700': '#3f3f46', '800': '#27272a', '900': '#18181b', '950': '#09090b' },
  'neutral': { '50': '#fafafa', '100': '#f5f5f5', '200': '#e5e5e5', '300': '#d4d4d4', '400': '#a3a3a3', '500': '#737373', '600': '#525252', '700': '#404040', '800': '#262626', '900': '#171717', '950': '#0a0a0a' },
  'red': { '50': '#fef2f2', '100': '#fee2e2', '200': '#fecaca', '300': '#fca5a5', '400': '#f87171', '500': '#ef4444', '600': '#dc2626', '700': '#b91c1c', '800': '#991b1b', '900': '#7f1d1d', '950': '#450a0a' },
  'orange': { '50': '#fff7ed', '100': '#ffedd5', '200': '#fed7aa', '300': '#fdba74', '400': '#fb923c', '500': '#f97316', '600': '#ea580c', '700': '#c2410c', '800': '#9a3412', '900': '#7c2d12', '950': '#431407' },
  'amber': { '50': '#fffbeb', '100': '#fef3c7', '200': '#fde68a', '300': '#fcd34d', '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706', '700': '#b45309', '800': '#92400e', '900': '#78350f', '950': '#451a03' },
  'yellow': { '50': '#fefce8', '100': '#fef9c3', '200': '#fef08a', '300': '#fde047', '400': '#facc15', '500': '#eab308', '600': '#ca8a04', '700': '#a16207', '800': '#854d0e', '900': '#713f12', '950': '#422006' },
  'lime': { '50': '#f7fee7', '100': '#ecfccb', '200': '#d9f99d', '300': '#bef264', '400': '#a3e635', '500': '#84cc16', '600': '#65a30d', '700': '#4d7c0f', '800': '#3f6212', '900': '#365314', '950': '#1a2e05' },
  'green': { '50': '#f0fdf4', '100': '#dcfce7', '200': '#bbf7d0', '300': '#86efac', '400': '#4ade80', '500': '#22c55e', '600': '#16a34a', '700': '#15803d', '800': '#166534', '900': '#14532d', '950': '#052e16' },
  'emerald': { '50': '#ecfdf5', '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7', '400': '#34d399', '500': '#10b981', '600': '#059669', '700': '#047857', '800': '#065f46', '900': '#064e3b', '950': '#022c22' },
  'teal': { '50': '#f0fdfa', '100': '#ccfbf1', '200': '#99f6e4', '300': '#5eead4', '400': '#2dd4bf', '500': '#14b8a6', '600': '#0d9488', '700': '#0f766e', '800': '#115e59', '900': '#134e4a', '950': '#042f2e' },
  'cyan': { '50': '#ecfeff', '100': '#cffafe', '200': '#a5f3fc', '300': '#67e8f9', '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2', '700': '#0e7490', '800': '#155e75', '900': '#164e63', '950': '#083344' },
  'sky': { '50': '#f0f9ff', '100': '#e0f2fe', '200': '#bae6fd', '300': '#7dd3fc', '400': '#38bdf8', '500': '#0ea5e9', '600': '#0284c7', '700': '#0369a1', '800': '#075985', '900': '#0c4a6e', '950': '#082f49' },
  'blue': { '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe', '300': '#93c5fd', '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb', '700': '#1d4ed8', '800': '#1e40af', '900': '#1e3a8a', '950': '#172554' },
  'indigo': { '50': '#eef2ff', '100': '#e0e7ff', '200': '#c7d2fe', '300': '#a5b4fc', '400': '#818cf8', '500': '#6366f1', '600': '#4f46e5', '700': '#4338ca', '800': '#3730a3', '900': '#312e81', '950': '#1e1b4b' },
  'violet': { '50': '#f5f3ff', '100': '#ede9fe', '200': '#ddd6fe', '300': '#c4b5fd', '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed', '700': '#6d28d9', '800': '#5b21b6', '900': '#4c1d95', '950': '#2e1065' },
  'purple': { '50': '#faf5ff', '100': '#f3e8ff', '200': '#e9d5ff', '300': '#d8b4fe', '400': '#c084fc', '500': '#a855f7', '600': '#9333ea', '700': '#7e22ce', '800': '#6b21a8', '900': '#581c87', '950': '#3b0764' },
  'fuchsia': { '50': '#fdf4ff', '100': '#fae8ff', '200': '#f5d0fe', '300': '#f0abfc', '400': '#e879f9', '500': '#d946ef', '600': '#c026d3', '700': '#a21caf', '800': '#86198f', '900': '#701a75', '950': '#4a044e' },
  'pink': { '50': '#fdf2f8', '100': '#fce7f3', '200': '#fbcfe8', '300': '#f9a8d4', '400': '#f472b6', '500': '#ec4899', '600': '#db2777', '700': '#be185d', '800': '#9d174d', '900': '#831843', '950': '#500724' },
  'rose': { '50': '#fff1f2', '100': '#ffe4e6', '200': '#fecdd3', '300': '#fda4af', '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48', '700': '#be123c', '800': '#9f1239', '900': '#881337', '950': '#4c0519' },
};

const SPECIAL_COLORS: Record<string, string> = {
  'inherit': 'inherit',
  'current': 'currentColor',
  'transparent': 'transparent',
  'black': '#000000',
  'white': '#ffffff',
};

const COLOR_UTILITIES = [
  'bg', 'text', 'border', 'ring', 'outline', 'divide',
  'accent', 'caret', 'fill', 'stroke', 'shadow', 'decoration',
  'from', 'via', 'to', 'placeholder'
];

// ============================================================================
// BORDER RADIUS
// ============================================================================
const BORDER_RADIUS: Record<string, string> = {
  'none': '0px',
  'sm': 'calc(var(--radius) - 4px)',
  'DEFAULT': '0.25rem',
  'md': 'calc(var(--radius) - 2px)',
  'lg': 'var(--radius)',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
};

const RADIUS_UTILITIES = [
  'rounded', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l',
  'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl',
  'rounded-s', 'rounded-e', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es'
];

// ============================================================================
// SHADOWS
// ============================================================================
const SHADOWS: Record<string, string> = {
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  'none': 'none',
  'card': 'var(--shadow-card)',
  'card-hover': 'var(--shadow-card-hover)',
  'workout': 'var(--shadow-workout)',
};

// ============================================================================
// BORDER WIDTH
// ============================================================================
const BORDER_WIDTH: Record<string, string> = {
  '0': '0px',
  'DEFAULT': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
};

const BORDER_WIDTH_UTILITIES = ['border', 'border-t', 'border-r', 'border-b', 'border-l', 'border-x', 'border-y', 'divide-x', 'divide-y'];

// ============================================================================
// TYPOGRAPHY
// ============================================================================
const FONT_SIZE: Record<string, string> = {
  'xs': '0.75rem / 1rem',
  'sm': '0.875rem / 1.25rem',
  'base': '1rem / 1.5rem',
  'lg': '1.125rem / 1.75rem',
  'xl': '1.25rem / 1.75rem',
  '2xl': '1.5rem / 2rem',
  '3xl': '1.875rem / 2.25rem',
  '4xl': '2.25rem / 2.5rem',
  '5xl': '3rem / 1',
  '6xl': '3.75rem / 1',
  '7xl': '4.5rem / 1',
  '8xl': '6rem / 1',
  '9xl': '8rem / 1',
};

const FONT_WEIGHT: Record<string, string> = {
  'thin': '100',
  'extralight': '200',
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700',
  'extrabold': '800',
  'black': '900',
};

const LINE_HEIGHT: Record<string, string> = {
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  'none': '1',
  'tight': '1.25',
  'snug': '1.375',
  'normal': '1.5',
  'relaxed': '1.625',
  'loose': '2',
};

const LETTER_SPACING: Record<string, string> = {
  'tighter': '-0.05em',
  'tight': '-0.025em',
  'normal': '0em',
  'wide': '0.025em',
  'wider': '0.05em',
  'widest': '0.1em',
};

const FONT_FAMILY: Record<string, string> = {
  'sans': 'ui-sans-serif, system-ui, sans-serif',
  'serif': 'ui-serif, Georgia, serif',
  'mono': 'ui-monospace, monospace',
};

// ============================================================================
// OPACITY
// ============================================================================
const OPACITY: Record<string, string> = {
  '0': '0', '5': '0.05', '10': '0.1', '15': '0.15', '20': '0.2', '25': '0.25',
  '30': '0.3', '35': '0.35', '40': '0.4', '45': '0.45', '50': '0.5',
  '55': '0.55', '60': '0.6', '65': '0.65', '70': '0.7', '75': '0.75',
  '80': '0.8', '85': '0.85', '90': '0.9', '95': '0.95', '100': '1',
};

const OPACITY_UTILITIES = ['opacity', 'bg-opacity', 'text-opacity', 'border-opacity', 'placeholder-opacity'];

// ============================================================================
// Z-INDEX
// ============================================================================
const Z_INDEX: Record<string, string> = {
  '0': '0', '10': '10', '20': '20', '30': '30', '40': '40', '50': '50', 'auto': 'auto',
};

// ============================================================================
// TRANSFORMS
// ============================================================================
const SCALE: Record<string, string> = {
  '0': '0', '50': '0.5', '75': '0.75', '90': '0.9', '95': '0.95',
  '100': '1', '105': '1.05', '110': '1.1', '125': '1.25', '150': '1.5',
};

const ROTATE: Record<string, string> = {
  '0': '0deg', '1': '1deg', '2': '2deg', '3': '3deg', '6': '6deg',
  '12': '12deg', '45': '45deg', '90': '90deg', '180': '180deg',
};

const SKEW: Record<string, string> = {
  '0': '0deg', '1': '1deg', '2': '2deg', '3': '3deg', '6': '6deg', '12': '12deg',
};

// ============================================================================
// BLUR
// ============================================================================
const BLUR: Record<string, string> = {
  'none': '0', 'sm': '4px', 'DEFAULT': '8px', 'md': '12px',
  'lg': '16px', 'xl': '24px', '2xl': '40px', '3xl': '64px',
};

// ============================================================================
// TRANSITIONS
// ============================================================================
const DURATION: Record<string, string> = {
  '0': '0s', '75': '75ms', '100': '100ms', '150': '150ms', '200': '200ms',
  '300': '300ms', '500': '500ms', '700': '700ms', '1000': '1000ms',
};

const TIMING: Record<string, string> = {
  'linear': 'linear',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'smooth': 'var(--transition-smooth)',
  'bounce': 'var(--transition-bounce)',
};

// ============================================================================
// ANIMATIONS
// ============================================================================
const ANIMATIONS: Record<string, string> = {
  'none': 'none',
  'spin': 'spin 1s linear infinite',
  'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'bounce': 'bounce 1s infinite',
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'drag-bounce': 'drag-bounce 0.8s ease-in-out infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
};

// ============================================================================
// GRID
// ============================================================================
const GRID_COLS: Record<string, string> = {
  '1': 'repeat(1, minmax(0, 1fr))', '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))', '4': 'repeat(4, minmax(0, 1fr))',
  '5': 'repeat(5, minmax(0, 1fr))', '6': 'repeat(6, minmax(0, 1fr))',
  '7': 'repeat(7, minmax(0, 1fr))', '8': 'repeat(8, minmax(0, 1fr))',
  '9': 'repeat(9, minmax(0, 1fr))', '10': 'repeat(10, minmax(0, 1fr))',
  '11': 'repeat(11, minmax(0, 1fr))', '12': 'repeat(12, minmax(0, 1fr))',
  'none': 'none', 'subgrid': 'subgrid',
};

const GRID_ROWS: Record<string, string> = {
  '1': 'repeat(1, minmax(0, 1fr))', '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))', '4': 'repeat(4, minmax(0, 1fr))',
  '5': 'repeat(5, minmax(0, 1fr))', '6': 'repeat(6, minmax(0, 1fr))',
  'none': 'none', 'subgrid': 'subgrid',
};

const COL_SPAN: Record<string, string> = {
  'auto': 'auto', '1': 'span 1', '2': 'span 2', '3': 'span 3', '4': 'span 4',
  '5': 'span 5', '6': 'span 6', '7': 'span 7', '8': 'span 8', '9': 'span 9',
  '10': 'span 10', '11': 'span 11', '12': 'span 12', 'full': '1 / -1',
};

const ROW_SPAN: Record<string, string> = {
  'auto': 'auto', '1': 'span 1', '2': 'span 2', '3': 'span 3',
  '4': 'span 4', '5': 'span 5', '6': 'span 6', 'full': '1 / -1',
};

// ============================================================================
// FLEX
// ============================================================================
const FLEX: Record<string, string> = {
  '1': '1 1 0%', 'auto': '1 1 auto', 'initial': '0 1 auto', 'none': 'none',
};

const ORDER: Record<string, string> = {
  '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
  '7': '7', '8': '8', '9': '9', '10': '10', '11': '11', '12': '12',
  'first': '-9999', 'last': '9999', 'none': '0',
};

// ============================================================================
// ASPECT RATIO
// ============================================================================
const ASPECT_RATIO: Record<string, string> = {
  'auto': 'auto', 'square': '1 / 1', 'video': '16 / 9',
};

// ============================================================================
// GRADIENTS
// ============================================================================
const GRADIENTS: Record<string, string> = {
  'gradient-primary': 'var(--gradient-primary)',
  'gradient-secondary': 'var(--gradient-secondary)',
  'gradient-accent': 'var(--gradient-accent)',
  'gradient-hero': 'var(--gradient-hero)',
};

// ============================================================================
// RING
// ============================================================================
const RING_WIDTH: Record<string, string> = {
  '0': '0px', '1': '1px', '2': '2px', 'DEFAULT': '3px', '4': '4px', '8': '8px', 'inset': 'inset',
};

const RING_OFFSET: Record<string, string> = {
  '0': '0px', '1': '1px', '2': '2px', '4': '4px', '8': '8px',
};

// ============================================================================
// OUTLINE
// ============================================================================
const OUTLINE_WIDTH: Record<string, string> = {
  '0': '0px', '1': '1px', '2': '2px', '4': '4px', '8': '8px',
};

const OUTLINE_OFFSET: Record<string, string> = {
  '0': '0px', '1': '1px', '2': '2px', '4': '4px', '8': '8px',
};

// ============================================================================
// COLUMNS
// ============================================================================
const COLUMNS: Record<string, string> = {
  '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
  '7': '7', '8': '8', '9': '9', '10': '10', '11': '11', '12': '12', 'auto': 'auto',
  '3xs': '16rem', '2xs': '18rem', 'xs': '20rem', 'sm': '24rem', 'md': '28rem',
  'lg': '32rem', 'xl': '36rem', '2xl': '42rem', '3xl': '48rem',
  '4xl': '56rem', '5xl': '64rem', '6xl': '72rem', '7xl': '80rem',
};

// ============================================================================
// GENERATE TOKENS
// ============================================================================
console.log('Generating optimized Tailwind tokens...\n');

// Spacing
for (const [key, value] of Object.entries(SPACING_SCALE)) {
  addToken(key, value, 'spacing', SPACING_UTILITIES);
}

// Fractional
for (const [key, value] of Object.entries(FRACTIONAL_SCALE)) {
  addToken(key, value, 'spacing', FRACTIONAL_UTILITIES, 'fractional');
}

// Size keywords
for (const [key, value] of Object.entries(SIZE_KEYWORDS)) {
  addToken(key, value, 'spacing', ['w', 'h', 'size', 'min-w', 'max-w', 'min-h', 'max-h'], 'keyword');
}

// Custom theme colors
for (const [key, value] of Object.entries(CUSTOM_COLORS)) {
  addToken(key, value, 'color', COLOR_UTILITIES, 'theme');
}

// Special colors
for (const [key, value] of Object.entries(SPECIAL_COLORS)) {
  addToken(key, value, 'color', COLOR_UTILITIES, 'special');
}

// Default palette
for (const [colorName, shades] of Object.entries(DEFAULT_PALETTE)) {
  for (const [shade, value] of Object.entries(shades)) {
    addToken(`${colorName}-${shade}`, value, 'color', COLOR_UTILITIES, 'palette');
  }
}

// Border radius
for (const [key, value] of Object.entries(BORDER_RADIUS)) {
  const name = key === 'DEFAULT' ? 'DEFAULT' : key;
  addToken(name, value, 'border', RADIUS_UTILITIES, 'radius');
}

// Shadows
for (const [key, value] of Object.entries(SHADOWS)) {
  addToken(key, value, 'shadow', ['shadow'], key.startsWith('card') || key === 'workout' ? 'custom' : 'default');
}

// Border width
for (const [key, value] of Object.entries(BORDER_WIDTH)) {
  addToken(key, value, 'border', BORDER_WIDTH_UTILITIES, 'width');
}

// Ring width
for (const [key, value] of Object.entries(RING_WIDTH)) {
  addToken(key, value, 'border', ['ring'], 'ring-width');
}

// Ring offset
for (const [key, value] of Object.entries(RING_OFFSET)) {
  addToken(key, value, 'border', ['ring-offset'], 'ring-offset');
}

// Outline width
for (const [key, value] of Object.entries(OUTLINE_WIDTH)) {
  addToken(key, value, 'border', ['outline'], 'outline-width');
}

// Outline offset
for (const [key, value] of Object.entries(OUTLINE_OFFSET)) {
  addToken(key, value, 'border', ['outline-offset'], 'outline-offset');
}

// Font size
for (const [key, value] of Object.entries(FONT_SIZE)) {
  addToken(key, value, 'typography', ['text'], 'font-size');
}

// Font weight
for (const [key, value] of Object.entries(FONT_WEIGHT)) {
  addToken(key, value, 'typography', ['font'], 'font-weight');
}

// Font family
for (const [key, value] of Object.entries(FONT_FAMILY)) {
  addToken(key, value, 'typography', ['font'], 'font-family');
}

// Line height
for (const [key, value] of Object.entries(LINE_HEIGHT)) {
  addToken(key, value, 'typography', ['leading'], 'line-height');
}

// Letter spacing
for (const [key, value] of Object.entries(LETTER_SPACING)) {
  addToken(key, value, 'typography', ['tracking'], 'letter-spacing');
}

// Opacity
for (const [key, value] of Object.entries(OPACITY)) {
  addToken(key, value, 'other', OPACITY_UTILITIES, 'opacity');
}

// Z-index
for (const [key, value] of Object.entries(Z_INDEX)) {
  addToken(key, value, 'other', ['z'], 'z-index');
}

// Scale
for (const [key, value] of Object.entries(SCALE)) {
  addToken(key, value, 'other', ['scale', 'scale-x', 'scale-y'], 'scale');
}

// Rotate
for (const [key, value] of Object.entries(ROTATE)) {
  addToken(key, value, 'other', ['rotate', '-rotate'], 'rotate');
}

// Skew
for (const [key, value] of Object.entries(SKEW)) {
  addToken(key, value, 'other', ['skew-x', 'skew-y', '-skew-x', '-skew-y'], 'skew');
}

// Blur
for (const [key, value] of Object.entries(BLUR)) {
  addToken(key, value, 'other', ['blur', 'backdrop-blur'], 'blur');
}

// Duration
for (const [key, value] of Object.entries(DURATION)) {
  addToken(key, value, 'other', ['duration', 'delay'], 'duration');
}

// Timing
for (const [key, value] of Object.entries(TIMING)) {
  addToken(key, value, 'other', ['ease'], 'timing');
}

// Animations
for (const [key, value] of Object.entries(ANIMATIONS)) {
  addToken(key, value, 'other', ['animate'], 'animation');
}

// Grid cols
for (const [key, value] of Object.entries(GRID_COLS)) {
  addToken(key, value, 'other', ['grid-cols'], 'grid-cols');
}

// Grid rows
for (const [key, value] of Object.entries(GRID_ROWS)) {
  addToken(key, value, 'other', ['grid-rows'], 'grid-rows');
}

// Col span
for (const [key, value] of Object.entries(COL_SPAN)) {
  addToken(key, value, 'other', ['col-span', 'col-start', 'col-end'], 'col-span');
}

// Row span
for (const [key, value] of Object.entries(ROW_SPAN)) {
  addToken(key, value, 'other', ['row-span', 'row-start', 'row-end'], 'row-span');
}

// Flex
for (const [key, value] of Object.entries(FLEX)) {
  addToken(key, value, 'other', ['flex'], 'flex');
}

// Order
for (const [key, value] of Object.entries(ORDER)) {
  addToken(key, value, 'other', ['order', '-order'], 'order');
}

// Aspect ratio
for (const [key, value] of Object.entries(ASPECT_RATIO)) {
  addToken(key, value, 'other', ['aspect'], 'aspect-ratio');
}

// Gradients
for (const [key, value] of Object.entries(GRADIENTS)) {
  addToken(key, value, 'color', ['bg'], 'gradient');
}

// Columns
for (const [key, value] of Object.entries(COLUMNS)) {
  addToken(key, value, 'other', ['columns'], 'columns');
}

// ============================================================================
// OUTPUT
// ============================================================================
const output = { tokens };
const outputPath = path.join(process.cwd(), 'design-tokens-inferred.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

// Summary
const categoryCounts: Record<string, number> = {};
for (const token of tokens) {
  categoryCounts[token.category] = (categoryCounts[token.category] || 0) + 1;
}

console.log(`Generated ${tokens.length} base tokens:\n`);
for (const [cat, count] of Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count}`);
}
console.log(`\nOutput: ${outputPath}`);
