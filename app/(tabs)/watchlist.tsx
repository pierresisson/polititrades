import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Text,
  FilterChip,
  PersonalityCard,
  EmptyWatchlist,
  TabScreenHeader,
  QuickAddSheet,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { useWatchlistStore } from "@/lib/store";
import { MOCK_POLITICIANS, MOCK_TICKERS } from "@/lib/mockData";

type WatchlistTab = "politicians" | "tickers" | "alerts";

export default function WatchlistScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<WatchlistTab>("politicians");
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const { followedPoliticians, followedTickers } = useWatchlistStore();

  // For demo purposes, let's assume some followed items if store is empty
  const demoFollowedPoliticians = followedPoliticians.length > 0
    ? followedPoliticians
    : ["np-001", "dc-001", "mm-001"];
  const demoFollowedTickers = followedTickers.length > 0
    ? followedTickers
    : ["NVDA", "AAPL", "MSFT"];

  // Get full data for followed items
  const followedPoliticiansData = MOCK_POLITICIANS.filter((p) =>
    demoFollowedPoliticians.includes(p.id)
  );
  const followedTickersData = MOCK_TICKERS.filter((t) =>
    demoFollowedTickers.includes(t.symbol)
  );

  const handlePoliticianPress = (politicianId: string) => {
    router.push(`/personality/${politicianId}`);
  };

  const handleTickerPress = (ticker: string) => {
    router.push(`/ticker/${ticker}`);
  };

  const handleExplore = () => {
    setIsQuickAddOpen(true);
  };

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-background">
      {/* Header */}
      <TabScreenHeader
        title={t("watchlist.title")}
        onSettingsPress={() => router.push("/(tabs)/settings")}
      />

      {/* Tab Filter */}
      <View className="px-4 pb-3">
        <View className="flex-row gap-2">
          <FilterChip
            label={t("watchlist.politicians")}
            selected={activeTab === "politicians"}
            onPress={() => setActiveTab("politicians")}
            icon="people-outline"
          />
          <FilterChip
            label={t("watchlist.tickers")}
            selected={activeTab === "tickers"}
            onPress={() => setActiveTab("tickers")}
            icon="trending-up-outline"
          />
          <FilterChip
            label={t("watchlist.alerts")}
            selected={activeTab === "alerts"}
            onPress={() => setActiveTab("alerts")}
            icon="notifications-outline"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Politicians Tab */}
        {activeTab === "politicians" && (
          <>
            {followedPoliticiansData.length > 0 ? (
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {followedPoliticiansData.map((politician, index) => (
                  <View key={politician.id}>
                    <PersonalityCard
                      politician={politician}
                      variant="row"
                      isFollowing
                      onPress={() => handlePoliticianPress(politician.id)}
                    />
                    {index < followedPoliticiansData.length - 1 && (
                      <View className="h-px bg-background-border mx-4" />
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <EmptyWatchlist onAdd={handleExplore} />
            )}
          </>
        )}

        {/* Tickers Tab */}
        {activeTab === "tickers" && (
          <>
            {followedTickersData.length > 0 ? (
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {followedTickersData.map((ticker, index) => (
                  <Pressable
                    key={ticker.symbol}
                    onPress={() => handleTickerPress(ticker.symbol)}
                    className="flex-row items-center justify-between p-4 active:opacity-70"
                    style={
                      index < followedTickersData.length - 1
                        ? {
                            borderBottomWidth: 1,
                            borderBottomColor: colors.background.border,
                          }
                        : undefined
                    }
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 rounded-lg bg-surface-secondary items-center justify-center">
                        <Text variant="label" className="text-text">
                          {ticker.symbol.slice(0, 2)}
                        </Text>
                      </View>
                      <View>
                        <Text variant="body" className="font-inter-semibold">
                          {ticker.symbol}
                        </Text>
                        <Text variant="caption" numberOfLines={1}>
                          {ticker.companyName}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text variant="body" className="font-inter-medium">
                        ${ticker.price.toFixed(2)}
                      </Text>
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
                  </Pressable>
                ))}
              </View>
            ) : (
              <EmptyWatchlist onAdd={handleExplore} />
            )}
          </>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <View className="flex-1 items-center justify-center py-12">
            <View className="w-16 h-16 rounded-full bg-surface-secondary items-center justify-center mb-4">
              <Ionicons
                name="notifications-outline"
                size={32}
                color={colors.text.muted}
              />
            </View>
            <Text variant="h3" align="center" className="mb-2">
              {t("alerts.noAlerts")}
            </Text>
            <Text
              variant="secondary-sm"
              align="center"
              className="mb-6 max-w-[280px]"
            >
              {t("alerts.noAlertsDescription")}
            </Text>
            <Pressable
              onPress={() => {}}
              className="flex-row items-center gap-2 bg-primary px-5 py-3 rounded-xl active:opacity-90"
            >
              <Ionicons name="add" size={20} color={colors.text.inverse} />
              <Text
                variant="body"
                className="text-text-inverse font-inter-semibold"
              >
                {t("alerts.create")}
              </Text>
            </Pressable>
          </View>
        )}

        {/* Add more section */}
        {activeTab !== "alerts" &&
          ((activeTab === "politicians" && followedPoliticiansData.length > 0) ||
            (activeTab === "tickers" && followedTickersData.length > 0)) && (
            <Pressable
              onPress={handleExplore}
              className="flex-row items-center justify-center gap-2 mt-4 py-4 bg-surface-secondary rounded-xl active:opacity-90"
            >
              <Ionicons name="add" size={20} color={colors.primary.DEFAULT} />
              <Text variant="body" className="text-primary font-inter-medium">
                {t("watchlist.addFirst")}
              </Text>
            </Pressable>
          )}
      </ScrollView>

      {/* Quick Add Sheet */}
      <QuickAddSheet
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </View>
  );
}
