import { View, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Sparkline, SparklineMini } from "./Sparkline";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { haptics } from "@/lib/haptics";
import { cva, type VariantProps } from "class-variance-authority";

const tickerTagVariants = cva(
  "flex-row items-center rounded-md border border-background-border",
  {
    variants: {
      size: {
        sm: "px-2 py-1",
        md: "px-2.5 py-1.5",
        lg: "px-3 py-2",
      },
      variant: {
        default: "bg-surface-secondary",
        ghost: "bg-transparent border-transparent",
        outline: "bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

interface TickerTagProps extends VariantProps<typeof tickerTagVariants> {
  symbol: string;
  price?: number;
  change?: number;
  changePercent?: number;
  sparklineData?: number[];
  showSparkline?: boolean;
  onPress?: () => void;
  className?: string;
}

export function TickerTag({
  symbol,
  price,
  change: _change,
  changePercent,
  sparklineData,
  showSparkline = false,
  size,
  variant,
  onPress,
  className,
}: TickerTagProps) {
  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const trend =
    changePercent !== undefined
      ? changePercent >= 0
        ? "up"
        : "down"
      : undefined;

  const content = (
    <View className={cn(tickerTagVariants({ size, variant }), className)}>
      <Text variant="ticker" className="text-text mr-1">
        {symbol}
      </Text>

      {price !== undefined && (
        <Text variant="mono-sm" className="text-text-secondary mr-1">
          {formatCurrency(price)}
        </Text>
      )}

      {changePercent !== undefined && (
        <Text
          variant="mono-sm"
          className={cn(
            trend === "up" ? "text-profit" : "text-loss"
          )}
        >
          {formatPercentage(changePercent)}
        </Text>
      )}

      {showSparkline && sparklineData && sparklineData.length > 1 && (
        <View className="ml-2">
          <SparklineMini data={sparklineData} trend={trend} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={handlePress} className="active:opacity-70">
        {content}
      </Pressable>
    );
  }

  return content;
}

// Simple ticker symbol only
export function TickerSymbol({
  symbol,
  onPress,
  className,
}: {
  symbol: string;
  onPress?: () => void;
  className?: string;
}) {
  const content = (
    <View
      className={cn(
        "px-1.5 py-0.5 bg-surface-secondary rounded",
        className
      )}
    >
      <Text variant="ticker">{symbol}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={() => {
          haptics.light();
          onPress();
        }}
        className="active:opacity-70"
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

// Ticker card with more details
interface TickerCardProps {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  sparklineData?: number[];
  sector?: string;
  onPress?: () => void;
  className?: string;
}

export function TickerCard({
  symbol,
  companyName,
  price,
  change: _change,
  changePercent,
  sparklineData,
  sector,
  onPress,
  className,
}: TickerCardProps) {
  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const trend = changePercent >= 0 ? "up" : "down";

  const content = (
    <View
      className={cn(
        "bg-surface-primary rounded-xl p-4 border border-background-border",
        className
      )}
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text variant="ticker" className="text-lg mb-0.5">
            {symbol}
          </Text>
          <Text variant="secondary-sm" numberOfLines={1}>
            {companyName}
          </Text>
          {sector && (
            <Text variant="caption" className="mt-0.5">
              {sector}
            </Text>
          )}
        </View>

        {sparklineData && sparklineData.length > 1 && (
          <Sparkline
            data={sparklineData}
            width={80}
            height={32}
            showGradient
          />
        )}
      </View>

      <View className="flex-row items-end justify-between">
        <Text variant="h3" className="font-mono">
          {formatCurrency(price)}
        </Text>

        <View className="items-end">
          <Text
            variant="mono"
            className={cn(trend === "up" ? "text-profit" : "text-loss")}
          >
            {change >= 0 ? "+" : ""}
            {formatCurrency(change)}
          </Text>
          <Text
            variant="mono-sm"
            className={cn(trend === "up" ? "text-profit" : "text-loss")}
          >
            {formatPercentage(changePercent)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={handlePress} className="active:opacity-90">
        {content}
      </Pressable>
    );
  }

  return content;
}
