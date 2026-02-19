import { ResponsiveLine, type LineSvgProps } from "@nivo/line";
import { useNivoTheme, useNivoThemeColors } from "./useNivoTheme";
import { FORGE_COLORS } from "@/lib/constants";

type LineChartProps = Omit<LineSvgProps, "theme"> & {
  colors?: string[];
};

export function LineChart({ colors = [...FORGE_COLORS], ...props }: LineChartProps) {
  const nivoTheme = useNivoTheme();
  const { axisText } = useNivoThemeColors();

  return (
    <ResponsiveLine
      theme={nivoTheme}
      colors={colors}
      margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 12,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 12,
      }}
      pointSize={6}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableGridX={false}
      useMesh
      enableSlices="x"
      crosshairType="cross"
      curve="monotoneX"
      animate
      motionConfig="gentle"
      sliceTooltip={({ slice }) => (
        <div
          style={{
            background: nivoTheme.tooltip?.container?.background as string,
            color: nivoTheme.tooltip?.container?.color as string,
            borderRadius: "8px",
            boxShadow: nivoTheme.tooltip?.container?.boxShadow as string,
            border: nivoTheme.tooltip?.container?.border as string,
            padding: "8px 12px",
            fontSize: 12,
          }}
        >
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "2px 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: point.serieColor,
                }}
              />
              <span style={{ color: axisText, fontWeight: 500 }}>
                {point.serieId}
              </span>
              <span style={{ fontWeight: 600 }}>{point.data.yFormatted}</span>
            </div>
          ))}
        </div>
      )}
      {...props}
    />
  );
}
