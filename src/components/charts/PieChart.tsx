import { ResponsivePie, type PieSvgProps } from "@nivo/pie";
import { useNivoTheme, useNivoThemeColors } from "./useNivoTheme";
import { FORGE_COLORS } from "@/lib/constants";

type PieChartProps = Omit<PieSvgProps<Record<string, unknown>>, "theme" | "data" | "height" | "width"> & {
  data: Array<{ id: string; label: string; value: number; color?: string }>;
  colors?: string[];
};

export function PieChart({ colors = [...FORGE_COLORS], data, ...props }: PieChartProps) {
  const nivoTheme = useNivoTheme();
  const { axisText } = useNivoThemeColors();

  return (
    <ResponsivePie
      theme={nivoTheme}
      colors={colors}
      data={data}
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      innerRadius={0.6}
      padAngle={1}
      cornerRadius={4}
      activeOuterRadiusOffset={4}
      borderWidth={0}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={axisText}
      arcLinkLabelsColor={axisText}
      arcLinkLabelsThickness={1}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={axisText}
      animate
      motionConfig="gentle"
      {...props}
    />
  );
}
