import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "./Text";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

type TrendDirection = "up" | "down" | "neutral";

interface Trend {
  change: number;
  direction: TrendDirection;
}

interface TodayStatsCardProps {
  totalTrades: number;
  totalVolume: number;
  activePoliticians: number;
  trends: {
    trades: Trend;
    volume: Trend;
    politicians: Trend;
  };
}

interface StatItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  trend: Trend;
}

function StatItem({ icon, value, label, trend }: StatItemProps) {
  const trendColor =
    trend.direction === "up"
      ? "text-profit"
      : trend.direction === "down"
        ? "text-loss"
        : "text-text-secondary";

  const trendIcon =
    trend.direction === "up"
      ? "trending-up"
      : trend.direction === "down"
        ? "trending-down"
        : "remove";

  return (
    <View className="flex-1 items-center gap-2">
      <View className="bg-background-surface rounded-xl p-3 w-full items-center gap-3">
        <Ionicons name={icon} size={24} color="#0D9488" />
        <Text variant="mono-2xl" className="text-text">
          {value}
        </Text>
        <Text variant="secondary-xs" className="text-text-secondary text-center">
          {label}
        </Text>
        <View className="flex-row items-center gap-1">
          <Ionicons
            name={trendIcon}
            size={14}
            color={
              trend.direction === "up"
                ? "#22C55E"
                : trend.direction === "down"
                  ? "#EF4444"
                  : "#94A3B8"
            }
          />
          <Text variant="secondary-xs" className={trendColor}>
            {trend.change.toFixed(0)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

export function TodayStatsCard({
  totalTrades,
  totalVolume,
  activePoliticians,
  trends,
}: TodayStatsCardProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  return (
    <View className="flex-row gap-3">
      <StatItem
        icon="stats-chart"
        value={totalTrades.toString()}
        label="Trades"
        trend={trends.trades}
      />
      <StatItem
        icon="cash"
        value={formatValue(totalVolume)}
        label="Volume"
        trend={trends.volume}
      />
      <StatItem
        icon="people"
        value={activePoliticians.toString()}
        label="Active"
        trend={trends.politicians}
      />
    </View>
  );
}
