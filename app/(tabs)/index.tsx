import { View, ScrollView, RefreshControl, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  SectionHeader,
  StatsRow,
  TradeRow,
  PersonalityCard,
  Avatar,
  TrialBanner,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { useSettingsStore, usePaywallStore } from "@/lib/store";
import {
  MOCK_POLITICIANS,
  getRecentTrades,
  getTopMovers,
  getTodayStats,
} from "@/lib/mockData";

// Get greeting based on time of day
function getGreeting(t: (key: string) => string): string {
  const hour = new Date().getHours();
  if (hour < 12) return t("home.greeting.morning");
  if (hour < 18) return t("home.greeting.afternoon");
  return t("home.greeting.evening");
}

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const { isPremium, openPaywall } = usePaywallStore();
  const setHasCompletedOnboarding = useSettingsStore(
    (state) => state.setHasCompletedOnboarding
  );

  const recentTrades = getRecentTrades(5);
  const topMovers = getTopMovers(5);
  const todayStats = getTodayStats();

  // Trial expires in 5 days (mock)
  const trialExpiresAt = new Date();
  trialExpiresAt.setDate(trialExpiresAt.getDate() + 5);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleTradePress = (tradeId: string) => {
    router.push(`/trade/${tradeId}`);
  };

  const handlePoliticianPress = (politicianId: string) => {
    router.push(`/personality/${politicianId}`);
  };

  const handleResetOnboarding = () => {
    setHasCompletedOnboarding(false);
    router.replace("/(auth)/onboarding");
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.DEFAULT}
          />
        }
      >
        {/* Header */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text variant="secondary-sm">{getGreeting(t)}</Text>
              <Text variant="h1">PolitiTrades</Text>
            </View>
            <Pressable
              onPress={() => router.push("/(tabs)/settings")}
              className="w-10 h-10 rounded-full bg-surface-secondary items-center justify-center"
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.text.secondary}
              />
            </Pressable>
          </View>

          {/* Trial Banner */}
          {!isPremium && (
            <TrialBanner
              expiresAt={trialExpiresAt}
              onPress={openPaywall}
              className="mb-4"
            />
          )}
        </View>

        {/* Today's Stats */}
        <View className="px-4 mb-6">
          <SectionHeader title={t("home.todaysActivity")} />
          <StatsRow
            items={[
              {
                label: "Trades",
                value: todayStats.totalTrades,
                format: "number",
              },
              {
                label: t("home.volume"),
                value: todayStats.totalVolume,
                format: "currency",
              },
              {
                label: t("home.activePoliticians"),
                value: todayStats.activePoliticians,
                format: "number",
              },
            ]}
            columns={3}
          />
        </View>

        {/* Top Movers */}
        <View className="mb-6">
          <SectionHeader
            title={t("home.topMovers")}
            action={{ label: t("home.seeAll"), onPress: () => router.push("/(tabs)/moves") }}
            className="px-4"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {topMovers.map((politician) => (
              <PersonalityCard
                key={politician.id}
                politician={politician}
                variant="mini"
                onPress={() => handlePoliticianPress(politician.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Recent Trades */}
        <View className="px-4 mb-6">
          <SectionHeader
            title={t("home.recentTrades")}
            action={{ label: t("home.seeAll"), onPress: () => router.push("/(tabs)/moves") }}
          />
          <View className="bg-surface-primary rounded-2xl overflow-hidden">
            {recentTrades.map((trade) => (
              <TradeRow
                key={trade.id}
                trade={trade}
                variant="compact"
                onPress={() => handleTradePress(trade.id)}
              />
            ))}
          </View>
        </View>

        {/* Your Watchlist Preview */}
        <View className="px-4 mb-6">
          <SectionHeader
            title={t("home.yourWatchlist")}
            action={{ label: t("home.seeAll"), onPress: () => router.push("/(tabs)/watchlist") }}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {MOCK_POLITICIANS.slice(0, 4).map((politician) => (
              <Pressable
                key={politician.id}
                onPress={() => handlePoliticianPress(politician.id)}
                className="items-center"
              >
                <Avatar
                  initials={politician.initials}
                  imageUrl={politician.photoUrl}
                  size="lg"
                  party={politician.party}
                  showPartyIndicator
                />
                <Text variant="caption" className="mt-2 text-center">
                  {politician.shortName}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Dev Reset Button */}
        <View className="px-4">
          <Pressable
            onPress={handleResetOnboarding}
            className="py-3 px-4 bg-surface-secondary rounded-xl"
          >
            <Text variant="secondary-sm" align="center">
              Reset Onboarding (Dev)
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
