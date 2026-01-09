import { View } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { cn } from "@/lib/utils";
import { colors } from "@/constants/theme";
import { useMemo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showGradient?: boolean;
  strokeWidth?: number;
  className?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 32,
  color,
  showGradient = false,
  strokeWidth = 1.5,
  className,
}: SparklineProps) {
  const { path, gradientPath, lineColor } = useMemo(() => {
    if (!data || data.length < 2) {
      return { path: "", gradientPath: "", lineColor: colors.text.muted };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Padding to prevent clipping at edges
    const padding = 2;
    const effectiveWidth = width - padding * 2;
    const effectiveHeight = height - padding * 2;

    // Generate points
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * effectiveWidth;
      const y = padding + effectiveHeight - ((value - min) / range) * effectiveHeight;
      return { x, y };
    });

    // Create smooth path using bezier curves
    let pathD = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;

      pathD += ` C ${midX} ${current.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
    }

    // Create gradient fill path (closes to bottom)
    const gradientPathD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    // Determine color based on trend (first vs last value)
    const trend = data[data.length - 1] >= data[0];
    const autoColor = trend ? colors.profit.DEFAULT : colors.loss.DEFAULT;

    return {
      path: pathD,
      gradientPath: gradientPathD,
      lineColor: color || autoColor,
    };
  }, [data, width, height, color]);

  if (!data || data.length < 2) {
    return (
      <View
        style={{ width, height }}
        className={cn("items-center justify-center", className)}
      >
        <View className="w-full h-px bg-background-border" />
      </View>
    );
  }

  const gradientId = `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <View style={{ width, height }} className={className}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {showGradient && (
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={lineColor} stopOpacity={0.2} />
              <Stop offset="100%" stopColor={lineColor} stopOpacity={0} />
            </LinearGradient>
          </Defs>
        )}

        {showGradient && (
          <Path d={gradientPath} fill={`url(#${gradientId})`} />
        )}

        <Path
          d={path}
          fill="none"
          stroke={lineColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

// Mini sparkline for inline use
export function SparklineMini({
  data,
  trend,
  className,
}: {
  data: number[];
  trend?: "up" | "down";
  className?: string;
}) {
  const color = useMemo(() => {
    if (trend === "up") return colors.profit.DEFAULT;
    if (trend === "down") return colors.loss.DEFAULT;
    return undefined; // auto-detect
  }, [trend]);

  return (
    <Sparkline
      data={data}
      width={48}
      height={20}
      color={color}
      strokeWidth={1.5}
      className={className}
    />
  );
}

// Larger sparkline for cards
export function SparklineCard({
  data,
  trend,
  className,
}: {
  data: number[];
  trend?: "up" | "down";
  className?: string;
}) {
  const color = useMemo(() => {
    if (trend === "up") return colors.profit.DEFAULT;
    if (trend === "down") return colors.loss.DEFAULT;
    return undefined;
  }, [trend]);

  return (
    <Sparkline
      data={data}
      width={120}
      height={40}
      color={color}
      strokeWidth={2}
      showGradient
      className={className}
    />
  );
}
