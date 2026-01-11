import { View } from "react-native";
import { cn, formatTradeAmount, formatCurrency } from "@/lib/utils";
import { Text } from "./Text";
import { Avatar } from "./Avatar";
import { TradeBadge } from "./Badge";
import { TickerSymbol } from "./TickerTag";
import { SparklineCard } from "./Sparkline";
import { Card } from "./Card";
import { useTranslation } from "react-i18next";

type Party = "Democrat" | "Republican" | "Independent" | "D" | "R" | "I";

interface FeaturedTradeData {
  politician: {
    name: string;
    initials: string;
    role: string;
    party: Party;
    imageUrl?: string;
  };
  trade: {
    type: "buy" | "sell";
    ticker: string;
    companyName: string;
    amountMin: number;
    amountMax: number;
    returnSinceFiling: number;
    currentPrice?: number;
    filingDate: Date;
    source: string;
  };
  sparklineData?: number[];
}

interface FeaturedTradeCardProps {
  data: FeaturedTradeData;
  className?: string;
}

export function FeaturedTradeCard({ data, className }: FeaturedTradeCardProps) {
  const { t } = useTranslation();
  const { politician, trade, sparklineData } = data;
  const isProfit = trade.returnSinceFiling >= 0;

  const formattedDate = trade.filingDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card variant="default" padding="lg" className={cn("", className)}>
      {/* Politician header */}
      <View className="flex-row items-center mb-4">
        <Avatar
          initials={politician.initials}
          imageUrl={politician.imageUrl}
          party={politician.party}
          showPartyIndicator
          size="lg"
          className="mr-3"
        />
        <View className="flex-1">
          <Text variant="body" className="font-inter-semibold">
            {politician.name}
          </Text>
          <Text variant="secondary-sm">{politician.role}</Text>
        </View>
      </View>

      {/* Trade details card */}
      <View className="bg-surface-secondary/30 rounded-lg p-3 mb-4">
        {/* Trade type and ticker */}
        <View className="flex-row items-center gap-2 mb-2">
          <TradeBadge type={trade.type} size="sm" />
          <TickerSymbol symbol={trade.ticker} />
          <Text variant="secondary-sm" numberOfLines={1} className="flex-1">
            {trade.companyName}
          </Text>
        </View>

        {/* Amount */}
        <Text variant="mono" className="text-text-secondary mb-3">
          {formatTradeAmount(trade.amountMin, trade.amountMax)}
        </Text>

        {/* Return since filing */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text variant="caption" className="mb-1">
              {t("onboarding.valueShowcase.sinceFilingLabel")}
            </Text>
            <View className="flex-row items-baseline gap-2">
              <Text
                variant="mono-lg"
                className={cn(
                  "font-inter-bold",
                  isProfit ? "text-profit" : "text-loss"
                )}
              >
                {isProfit ? "+" : ""}
                {trade.returnSinceFiling.toFixed(1)}%
              </Text>
              {trade.currentPrice && (
                <Text variant="mono-sm" className="text-text-secondary">
                  ({formatCurrency(trade.currentPrice)})
                </Text>
              )}
            </View>
          </View>

          {/* Sparkline */}
          {sparklineData && (
            <SparklineCard
              data={sparklineData}
              trend={isProfit ? "up" : "down"}
            />
          )}
        </View>
      </View>

      {/* Filing info */}
      <View className="flex-row items-center justify-between">
        <Text variant="caption">
          {t("onboarding.valueShowcase.filedOn", { date: formattedDate })}
        </Text>
        <Text variant="caption" className="text-text-muted">
          {trade.source}
        </Text>
      </View>
    </Card>
  );
}

// Mock data for onboarding
export const FEATURED_TRADE_MOCK: FeaturedTradeData = {
  politician: {
    name: "Nancy Pelosi",
    initials: "NP",
    role: "House Speaker Emerita - CA",
    party: "Democrat",
  },
  trade: {
    type: "buy",
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    amountMin: 1000001,
    amountMax: 5000000,
    returnSinceFiling: 12.4,
    currentPrice: 875.32,
    filingDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    source: "SEC Form 4",
  },
  sparklineData: [100, 102, 101, 105, 108, 106, 110, 112.4],
};
