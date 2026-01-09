import { View, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Avatar } from "./Avatar";
import { TradeBadge } from "./Badge";
import { TickerSymbol } from "./TickerTag";
import { SparklineMini } from "./Sparkline";
import { formatTradeAmount } from "@/lib/utils";
import { haptics } from "@/lib/haptics";
import type { MockTrade } from "@/lib/mockData";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

// Helper to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface TradeRowProps {
  trade: MockTrade;
  variant?: "compact" | "full";
  showPolitician?: boolean;
  showSector?: boolean;
  showSparkline?: boolean;
  onPress?: () => void;
  className?: string;
}

export function TradeRow({
  trade,
  variant = "full",
  showPolitician = true,
  showSector = false,
  showSparkline = false,
  onPress,
  className,
}: TradeRowProps) {
  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const isProfit = trade.returnSinceFiling >= 0;

  if (variant === "compact") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={!onPress}
        className={cn(
          "flex-row items-center py-3 px-4",
          onPress && "active:bg-surface-secondary/50",
          className
        )}
      >
        {showPolitician && (
          <Avatar
            initials={trade.politician.initials}
            party={trade.politician.party}
            showPartyIndicator
            size="sm"
            className="mr-3"
          />
        )}

        <View className="flex-1 mr-3">
          <View className="flex-row items-center gap-1.5">
            <Text variant="body-sm" className="font-inter-medium" numberOfLines={1}>
              {showPolitician ? trade.politician.shortName : trade.companyName}
            </Text>
            <TradeBadge type={trade.type} size="xs" />
          </View>
          <View className="flex-row items-center gap-1 mt-0.5">
            <TickerSymbol symbol={trade.ticker} />
            <Text variant="caption">·</Text>
            <Text variant="caption">{formatTradeAmount(trade.amountMin, trade.amountMax)}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text
            variant="mono-sm"
            className={cn(isProfit ? "text-profit" : "text-loss")}
          >
            {isProfit ? "+" : ""}
            {trade.returnSinceFiling.toFixed(1)}%
          </Text>
          <Text variant="caption">{formatRelativeTime(trade.filingDate)}</Text>
        </View>
      </Pressable>
    );
  }

  // Full variant
  return (
    <Pressable
      onPress={handlePress}
      disabled={!onPress}
      className={cn(
        "flex-row items-center py-3 px-4",
        onPress && "active:bg-surface-secondary/50",
        className
      )}
    >
      {showPolitician && (
        <Avatar
          initials={trade.politician.initials}
          party={trade.politician.party}
          showPartyIndicator
          size="md"
          className="mr-3"
        />
      )}

      <View className="flex-1 mr-3">
        <View className="flex-row items-center gap-2 mb-1">
          {showPolitician && (
            <Text variant="body" className="font-inter-medium" numberOfLines={1}>
              {trade.politician.name}
            </Text>
          )}
          <TradeBadge type={trade.type} size="sm" />
        </View>

        <View className="flex-row items-center gap-1.5">
          <TickerSymbol symbol={trade.ticker} />
          <Text variant="secondary-sm">{trade.companyName}</Text>
        </View>

        <View className="flex-row items-center gap-1 mt-1">
          <Text variant="caption">
            {formatTradeAmount(trade.amountMin, trade.amountMax)}
          </Text>
          {showSector && (
            <>
              <Text variant="caption">·</Text>
              <Text variant="caption">{trade.sector}</Text>
            </>
          )}
          <Text variant="caption">·</Text>
          <Text variant="caption">{trade.sourceType.toUpperCase()}</Text>
        </View>
      </View>

      <View className="items-end">
        {showSparkline && trade.currentPrice && (
          <SparklineMini
            data={[100, 102, 101, 105, 104, 108, 100 + trade.returnSinceFiling]}
            trend={isProfit ? "up" : "down"}
            className="mb-1"
          />
        )}
        <Text
          variant="mono"
          className={cn(
            "font-inter-semibold",
            isProfit ? "text-profit" : "text-loss"
          )}
        >
          {isProfit ? "+" : ""}
          {trade.returnSinceFiling.toFixed(1)}%
        </Text>
        <Text variant="caption" className="mt-0.5">
          {formatRelativeTime(trade.filingDate)}
        </Text>
      </View>

      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.text.muted}
          style={{ marginLeft: 8 }}
        />
      )}
    </Pressable>
  );
}

// Trade row with divider for lists
export function TradeRowWithDivider({
  trade,
  isLast = false,
  ...props
}: TradeRowProps & { isLast?: boolean }) {
  return (
    <View>
      <TradeRow trade={trade} {...props} />
      {!isLast && <View className="h-px bg-background-border mx-4" />}
    </View>
  );
}

// Date header for grouped trade lists
export function TradeDateHeader({
  date,
  count,
  className,
}: {
  date: string;
  count?: number;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 py-2 bg-background",
        className
      )}
    >
      <Text variant="label" className="text-text-secondary">
        {date}
      </Text>
      {count !== undefined && (
        <Text variant="caption">{count} trades</Text>
      )}
    </View>
  );
}
