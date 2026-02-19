import { ResponsiveRadar, type RadarSvgProps } from "@nivo/radar";
import { useNivoTheme } from "./useNivoTheme";
import { FORGE_COLORS } from "@/lib/constants";

type RadarChartProps = Omit<RadarSvgProps<Record<string, unknown>>, "theme" | "data" | "height" | "width"> & {
  data: Record<string, unknown>[];
  colors?: string[];
};

export function RadarChart({ colors = [...FORGE_COLORS], data, ...props }: RadarChartProps) {
  const nivoTheme = useNivoTheme();

  return (
    <ResponsiveRadar
      theme={nivoTheme}
      colors={colors}
      data={data}
      margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
      borderColor={{ from: "color" }}
      gridLevels={4}
      gridShape="circular"
      dotSize={8}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      fillOpacity={0.15}
      blendMode="normal"
      animate
      motionConfig="gentle"
      {...props}
    />
  );
}
