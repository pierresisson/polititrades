import { View } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
  format?: "number" | "percent" | "currency" | "none";
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
}

interface StatsRowProps {
  items: StatItem[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "compact" | "card";
  showDividers?: boolean;
  className?: string;
}

export function StatsRow({
  items,
  columns: _columns = 3,
  variant = "default",
  showDividers = true,
  className,
}: StatsRowProps) {
  const formatValue = (item: StatItem): string => {
    if (typeof item.value === "string") return item.value;

    switch (item.format) {
      case "percent":
        return formatPercentage(item.value);
      case "currency":
        return formatCurrency(item.value);
      case "number":
        return item.value.toLocaleString();
      default:
        return String(item.value);
    }
  };

  const getTrendColor = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-profit";
      case "down":
        return "text-loss";
      default:
        return "text-text";
    }
  };

  const containerClass = cn(
    "flex-row",
    variant === "card" && "bg-surface-primary rounded-xl p-4",
    className
  );

  return (
    <View className={containerClass}>
      {items.map((item, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 items-center",
            showDividers &&
              index > 0 &&
              "border-l border-background-border",
            variant === "compact" ? "py-2" : "py-3"
          )}
        >
          <Text
            variant={variant === "compact" ? "mono-lg" : "h3"}
            className={cn(
              "mb-0.5",
              getTrendColor(item.trend)
            )}
          >
            {item.prefix}
            {formatValue(item)}
            {item.suffix}
          </Text>
          <Text
            variant={variant === "compact" ? "caption" : "secondary-xs"}
            className="text-center"
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

// Single stat display
interface StatDisplayProps {
  label: string;
  value: string | number;
  format?: "number" | "percent" | "currency" | "none";
  trend?: "up" | "down" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatDisplay({
  label,
  value,
  format = "none",
  trend,
  size = "md",
  className,
}: StatDisplayProps) {
  const formatValue = (): string => {
    if (typeof value === "string") return value;

    switch (format) {
      case "percent":
        return formatPercentage(value);
      case "currency":
        return formatCurrency(value);
      case "number":
        return value.toLocaleString();
      default:
        return String(value);
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-profit";
      case "down":
        return "text-loss";
      default:
        return "text-text";
    }
  };

  const valueVariant = {
    sm: "mono" as const,
    md: "mono-lg" as const,
    lg: "h2" as const,
  };

  const labelVariant = {
    sm: "caption" as const,
    md: "secondary-xs" as const,
    lg: "secondary-sm" as const,
  };

  return (
    <View className={className}>
      <Text variant={valueVariant[size]} className={getTrendColor()}>
        {formatValue()}
      </Text>
      <Text variant={labelVariant[size]}>{label}</Text>
    </View>
  );
}

// Stats grid for more complex layouts
interface StatsGridProps {
  items: StatItem[];
  columns?: 2 | 3;
  className?: string;
}

export function StatsGrid({
  items,
  columns = 2,
  className,
}: StatsGridProps) {
  return (
    <View
      className={cn(
        "flex-row flex-wrap",
        className
      )}
    >
      {items.map((item, index) => (
        <View
          key={index}
          className={cn(
            "py-3",
            columns === 2 ? "w-1/2" : "w-1/3",
            index % columns !== 0 && "pl-4 border-l border-background-border"
          )}
        >
          <StatDisplay
            label={item.label}
            value={item.value}
            format={item.format}
            trend={item.trend}
            size="md"
          />
        </View>
      ))}
    </View>
  );
}
