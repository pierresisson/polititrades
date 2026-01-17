import { View, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";

import {
  Text,
  Button,
  Sparkline,
  SectionHeader,
  TradeRow,
  Badge,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { usePaywallStore } from "@/lib/store";
import {
  getTickerBySymbol,
  getTradesByTicker,
} from "@/lib/mockData";

export default function TickerDetailScreen() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { openPaywall } = usePaywallStore();

  const ticker = getTickerBySymbol(symbol || "");
  const trades = getTradesByTicker(symbol || "");

  // Set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: symbol || "",
      headerStyle: { backgroundColor: colors.background.DEFAULT },
      headerTintColor: colors.text.DEFAULT,
      headerShadowVisible: false,
      headerRight: () => (
        <Pressable
          onPress={() => {}}
          className="w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons
            name="share-outline"
            size={22}
            color={colors.text.DEFAULT}
          />
        </Pressable>
      ),
    });
  }, [navigation, symbol]);

  if (!ticker) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text variant="secondary-sm">{t("errors.notFound")}</Text>
      </View>
    );
  }

  const handleTradePress = (tradeId: string) => {
    router.push(`/trade/${tradeId}`);
  };

  const handleSetAlert = () => {
    openPaywall();
  };

  // Calculate insider sentiment
  const buyTrades = trades.filter((t) => t.type === "buy").length;
  const sellTrades = trades.filter((t) => t.type === "sell").length;
  const totalTrades = buyTrades + sellTrades;
  const sentiment = totalTrades > 0 ? (buyTrades / totalTrades) * 100 : 50;
  const isBullish = sentiment > 50;

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        >
          {/* Ticker Header */}
          <View className="px-4 py-6 bg-surface-primary border-b border-background-border">
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1">
                <Text variant="h1">{ticker.symbol}</Text>
                <Text variant="secondary-sm" className="mt-1">
                  {ticker.companyName}
                </Text>
              </View>
              <View className="items-end">
                <Text variant="h2">${ticker.price.toFixed(2)}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Ionicons
                    name={ticker.change >= 0 ? "arrow-up" : "arrow-down"}
                    size={14}
                    color={
                      ticker.change >= 0
                        ? colors.profit.DEFAULT
                        : colors.loss.DEFAULT
                    }
                  />
                  <Text
                    variant="body-sm"
                    className={
                      ticker.change >= 0 ? "text-profit" : "text-loss"
                    }
                  >
                    {ticker.change >= 0 ? "+" : ""}
                    ${Math.abs(ticker.change).toFixed(2)} (
                    {ticker.changePercent.toFixed(2)}%)
                  </Text>
                </View>
              </View>
            </View>

            {/* Chart */}
            <View className="mt-4">
              <Sparkline
                data={ticker.sparklineData}
                width={340}
                height={120}
                strokeWidth={2}
              />
            </View>
          </View>

          {/* Insider Activity Section */}
          <View className="px-4 py-4">
            <SectionHeader title={t("ticker.insiderActivity")} />
            <View className="bg-surface-primary rounded-2xl p-4">
              {/* Sentiment Bar */}
              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text variant="body-sm" className="text-profit">
                    {t("moves.buys")} ({buyTrades})
                  </Text>
                  <Text variant="body-sm" className="text-loss">
                    {t("moves.sells")} ({sellTrades})
                  </Text>
                </View>
                <View className="h-2 bg-surface-secondary rounded-full overflow-hidden flex-row">
                  <View
                    className="h-full bg-profit rounded-l-full"
                    style={{ width: `${sentiment}%` }}
                  />
                  <View
                    className="h-full bg-loss rounded-r-full"
                    style={{ width: `${100 - sentiment}%` }}
                  />
                </View>
              </View>

              {/* Net Activity */}
              <View className="flex-row items-center justify-between">
                <Text variant="secondary-sm">
                  {t("ticker.tradesThisMonth", { count: totalTrades })}
                </Text>
                <Badge
                  label={isBullish ? t("ticker.bullish") : t("ticker.bearish")}
                  variant={isBullish ? "profit" : "loss"}
                  size="sm"
                />
              </View>
            </View>
          </View>

          {/* Set Alert Button */}
          <View className="px-4 mb-6">
            <Button
              label={t("personality.setAlert")}
              variant="outline"
              size="md"
              onPress={handleSetAlert}
              leftIcon={
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={colors.text.DEFAULT}
                />
              }
            />
          </View>

          {/* Recent Trades */}
          {trades.length > 0 && (
            <View className="px-4">
              <SectionHeader
                title={t("tradeDetail.otherTrades", { ticker: ticker.symbol })}
              />
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {trades.map((trade, index) => (
                  <View key={trade.id}>
                    <TradeRow
                      trade={trade}
                      variant="full"
                      onPress={() => handleTradePress(trade.id)}
                    />
                    {index < trades.length - 1 && (
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
