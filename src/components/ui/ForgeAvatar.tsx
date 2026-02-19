import Avatar from "boring-avatars";

const PALETTES = [
  ["#38896A", "#5AAD82", "#235843", "#B8DDCA", "#0D2119"],
  ["#6366f1", "#818cf8", "#4f46e5", "#c7d2fe", "#312e81"],
  ["#06b6d4", "#22d3ee", "#0891b2", "#a5f3fc", "#164e63"],
  ["#f59e0b", "#fbbf24", "#d97706", "#fde68a", "#78350f"],
  ["#f43f5e", "#fb7185", "#e11d48", "#fecdd3", "#881337"],
];

const VARIANTS = ["beam", "marble", "pixel", "sunset", "bauhaus"] as const;

const sizes = {
  sm: 28,
  md: 32,
  lg: 64,
} as const;

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

interface ForgeAvatarProps {
  name: string;
  size?: keyof typeof sizes;
}

export function ForgeAvatar({ name, size = "md" }: ForgeAvatarProps) {
  const hash = hashName(name);
  const variant = VARIANTS[hash % VARIANTS.length];
  const palette = PALETTES[hash % PALETTES.length];

  return (
    <Avatar
      size={sizes[size]}
      name={name}
      variant={variant}
      colors={palette}
    />
  );
}
