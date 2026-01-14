import { View, ScrollView, Pressable, Linking } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";

import {
  Text,
  Avatar,
  TradeBadge,
  Sparkline,
  StatsRow,
  SectionHeader,
  TradeRow,
  ProfitText,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import {
  MOCK_TRADES,
  MOCK_TICKERS,
  getRelatedTrades,
} from "@/lib/mockData";

export default function TradeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const trade = MOCK_TRADES.find((t) => t.id === id);
  const relatedTrades = trade ? getRelatedTrades(trade.id, 3) : [];

  if (!trade) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text variant="secondary-sm">{t("errors.notFound")}</Text>
      </View>
    );
  }

  const ticker = MOCK_TICKERS.find((t) => t.symbol === trade.ticker);
  const politician = trade.politician;

  const handleViewSource = () => {
    haptics.light();
    // Open SEC filing URL
    Linking.openURL("https://www.sec.gov/cgi-bin/browse-edgar");
  };

  const handlePoliticianPress = () => {
    if (politician) {
      router.push(`/personality/${politician.id}`);
    }
  };

  const handleTickerPress = () => {
    router.push(`/ticker/${trade.ticker}`);
  };

  const handleRelatedTradePress = (tradeId: string) => {
    router.push(`/trade/${tradeId}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("tradeDetail.title"),
      headerStyle: { backgroundColor: colors.background.DEFAULT },
      headerTintColor: colors.text.DEFAULT,
      headerShadowVisible: false,
    });
  }, [navigation, t]);

  return (
    <View className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Trade Header */}
          <View className="px-4 py-6 bg-surface-primary border-b border-background-border">
            {/* Politician Info */}
            <Pressable
              onPress={handlePoliticianPress}
              className="flex-row items-center gap-3 mb-4"
            >
              <Avatar
                initials={politician.initials}
                imageUrl={politician.photoUrl}
                size="lg"
                party={politician.party}
                showPartyIndicator
              />
              <View className="flex-1">
                <Text variant="body" className="font-inter-semibold">
                  {politician.name}
                </Text>
                <Text variant="caption">
                  {politician.position || `${politician.chamber} - ${politician.state}`}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.text.muted}
              />
            </Pressable>

            {/* Trade Badge */}
            <View className="flex-row items-center gap-3 mb-4">
              <TradeBadge type={trade.type} />
              <Text variant="h2" className="flex-1">
                {trade.ticker}
              </Text>
              {trade.returnSinceFiling !== undefined && (
                <ProfitText
                  value={trade.returnSinceFiling}
                  showSign
                  size="default"
                />
              )}
            </View>

            {/* Company Name */}
            <Pressable onPress={handleTickerPress}>
              <Text variant="secondary-sm" className="mb-1">
                {trade.companyName}
              </Text>
            </Pressable>
          </View>

          {/* Trade Details */}
          <View className="px-4 py-4">
            <StatsRow
              items={[
                {
                  label: t("tradeDetail.estimatedValue"),
                  value: `$${(trade.amountMin / 1000).toFixed(0)}K - $${(trade.amountMax / 1000).toFixed(0)}K`,
                  format: "none",
                },
                {
                  label: t("tradeDetail.returnSinceFiling"),
                  value: trade.returnSinceFiling || 0,
                  format: "percent",
                  trend: trade.returnSinceFiling >= 0 ? "up" : "down",
                },
              ]}
              columns={2}
            />
          </View>

          {/* Dates */}
          <View className="px-4 mb-6">
            <View className="bg-surface-primary rounded-2xl overflow-hidden">
              <View className="flex-row items-center justify-between p-4 border-b border-background-border">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-lg bg-surface-secondary items-center justify-center">
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={colors.text.secondary}
                    />
                  </View>
                  <Text variant="body">{t("tradeDetail.tradedOn")}</Text>
                </View>
                <Text variant="body" className="font-inter-medium">
                  {formatDate(trade.transactionDate)}
                </Text>
              </View>
              <View className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-lg bg-surface-secondary items-center justify-center">
                    <Ionicons
                      name="document-text-outline"
                      size={16}
                      color={colors.text.secondary}
                    />
                  </View>
                  <Text variant="body">{t("tradeDetail.filedOn")}</Text>
                </View>
                <Text variant="body" className="font-inter-medium">
                  {formatDate(trade.filingDate)}
                </Text>
              </View>
            </View>
          </View>

          {/* Ticker Info */}
          {ticker && (
            <View className="px-4 mb-6">
              <SectionHeader title={t("tradeDetail.aboutCompany", { company: trade.ticker })} />
              <Pressable
                onPress={handleTickerPress}
                className="bg-surface-primary rounded-2xl p-4"
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text variant="h3">{ticker.symbol}</Text>
                    <Text variant="caption">{ticker.companyName}</Text>
                  </View>
                  <View className="items-end">
                    <Text variant="h3">${ticker.price.toFixed(2)}</Text>
                    <Text
                      variant="caption"
                      className={
                        ticker.change >= 0 ? "text-profit" : "text-loss"
                      }
                    >
                      {ticker.change >= 0 ? "+" : ""}
                      {ticker.changePercent.toFixed(2)}%
                    </Text>
                  </View>
                </View>
                <Sparkline
                  data={ticker.sparklineData}
                  width={320}
                  height={60}
                />
              </Pressable>
            </View>
          )}

          {/* View Source Button */}
          <View className="px-4 mb-6">
            <Pressable
              onPress={handleViewSource}
              className="flex-row items-center justify-center gap-2 py-4 bg-surface-secondary rounded-xl active:opacity-90"
            >
              <Ionicons
                name="open-outline"
                size={18}
                color={colors.primary.DEFAULT}
              />
              <Text variant="body" className="text-primary font-inter-medium">
                {t("tradeDetail.viewSource")}
              </Text>
            </Pressable>
          </View>

          {/* Related Trades */}
          {relatedTrades.length > 0 && (
            <View className="px-4">
              <SectionHeader
                title={t("tradeDetail.otherTrades", { ticker: trade.ticker })}
              />
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {relatedTrades.map((relatedTrade, index) => (
                  <View key={relatedTrade.id}>
                    <TradeRow
                      trade={relatedTrade}
                      variant="compact"
                      onPress={() => handleRelatedTradePress(relatedTrade.id)}
                    />
                    {index < relatedTrades.length - 1 && (
                      <View className="h-px bg-background-border mx-4" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
  );
}
