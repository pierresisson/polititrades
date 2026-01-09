import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  FilterChip,
  PersonalityCard,
  TickerCard,
  EmptyWatchlist,
  SectionHeader,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { useTradesStore } from "@/lib/store";
import { mockPoliticians, mockTickers } from "@/lib/mockData";

type WatchlistTab = "politicians" | "tickers" | "alerts";

export default function WatchlistScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<WatchlistTab>("politicians");

  const { followedPoliticians, removeFollowedPolitician } = useTradesStore();

  // For demo purposes, let's assume some followed items
  const demoFollowedPoliticians = ["pelosi", "crenshaw", "mcconnell"];
  const demoFollowedTickers = ["NVDA", "AAPL", "MSFT"];

  // Get full data for followed items
  const followedPoliticiansData = mockPoliticians.filter((p) =>
    demoFollowedPoliticians.includes(p.id)
  );
  const followedTickersData = mockTickers.filter((t) =>
    demoFollowedTickers.includes(t.symbol)
  );

  const handlePoliticianPress = (politicianId: string) => {
    router.push(`/personality/${politicianId}`);
  };

  const handleTickerPress = (ticker: string) => {
    router.push(`/ticker/${ticker}`);
  };

  const handleExplore = () => {
    router.push("/(tabs)/search");
  };

  const isEmpty =
    (activeTab === "politicians" && followedPoliticiansData.length === 0) ||
    (activeTab === "tickers" && followedTickersData.length === 0) ||
    (activeTab === "alerts" && true); // For now, alerts are empty

  return (
    <View className="flex-1 bg-background">
      {/* Tab Filter */}
      <View className="px-4 py-3 border-b border-background-border">
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
                  <PersonalityCard
                    key={politician.id}
                    variant="row"
                    name={politician.name}
                    role={politician.role}
                    party={politician.party}
                    imageUrl={politician.imageUrl}
                    stats={{
                      avgReturn: politician.stats.avgReturn,
                      totalTrades: politician.stats.totalTrades,
                      recentTrades: politician.stats.recentTrades,
                    }}
                    isFollowing
                    onPress={() => handlePoliticianPress(politician.id)}
                    showDivider={index < followedPoliticiansData.length - 1}
                  />
                ))}
              </View>
            ) : (
              <EmptyWatchlist onExplore={handleExplore} />
            )}
          </>
        )}

        {/* Tickers Tab */}
        {activeTab === "tickers" && (
          <>
            {followedTickersData.length > 0 ? (
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {followedTickersData.map((ticker, index) => (
                  <TickerCard
                    key={ticker.symbol}
                    symbol={ticker.symbol}
                    name={ticker.name}
                    price={ticker.price}
                    change={ticker.change}
                    changePercent={ticker.changePercent}
                    sparklineData={ticker.sparklineData}
                    onPress={() => handleTickerPress(ticker.symbol)}
                    showDivider={index < followedTickersData.length - 1}
                  />
                ))}
              </View>
            ) : (
              <EmptyWatchlist onExplore={handleExplore} variant="tickers" />
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
    </View>
  );
}
