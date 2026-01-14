import { View, ScrollView, RefreshControl, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Text,
  SectionHeader,
  TradeRow,
  PersonalityCard,
  Avatar,
  TrialBanner,
  TabScreenHeader,
} from "@/components/ui";
import { LinearGradient } from "expo-linear-gradient";
import { gradients } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { TodayStatsCard } from "@/components/ui/TodayStatsCard";
import { colors } from "@/constants/theme";
import { useSettingsStore, usePaywallStore, useWatchlistStore } from "@/lib/store";
import {
  MOCK_POLITICIANS,
  getRecentTrades,
  getTopMovers,
  getTodayStatsWithTrends,
} from "@/lib/mockData";
import { haptics } from "@/lib/haptics";

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
  const { addTicker, removeTicker, isFollowingTicker } = useWatchlistStore();

  const recentTrades = getRecentTrades(5);
  const topMovers = getTopMovers(5);
  const todayStats = getTodayStatsWithTrends();

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

  const handleTickerFollowToggle = (ticker: string) => {
    haptics.light();
    if (isFollowingTicker(ticker)) {
      removeTicker(ticker);
    } else {
      addTicker(ticker);
    }
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
        {/* Purple Hero Banner */}
        <View className="mx-4 mb-4 overflow-hidden rounded-2xl">
          <LinearGradient
            colors={gradients.premium as string[]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Ionicons name="pulse" size={20} color="#FFFFFF" />
                  <Text className="text-white text-sm font-inter-semibold uppercase tracking-wider">
                    Live Tracking
                  </Text>
                </View>
                <Text className="text-white text-2xl font-inter-bold">
                  {todayStats.totalTrades} {t("tabs.trades")}
                </Text>
                <Text className="text-white/80 text-sm">
                  {t("home.todaysActivity")}
                </Text>
              </View>
              <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
                <Ionicons name="trending-up" size={32} color="#FFFFFF" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Header */}
        <TabScreenHeader
          title="PolitiTrades"
          subtitle={getGreeting(t)}
          onSettingsPress={() => router.push("/(tabs)/settings")}
        />

        {/* Trial Banner */}
        {!isPremium && (
          <View className="px-4 mb-4">
            <TrialBanner
              expiresAt={trialExpiresAt}
              onPress={openPaywall}
            />
          </View>
        )}

        {/* Today's Stats */}
        <View className="px-4 mb-6">
          <SectionHeader title={t("home.todaysActivity")} className="mb-3" />
          <TodayStatsCard
            totalTrades={todayStats.totalTrades}
            totalVolume={todayStats.totalVolume}
            activePoliticians={todayStats.activePoliticians}
            trends={todayStats.trends}
          />
        </View>

        {/* Top Movers */}
        <View className="mb-6">
          <SectionHeader
            title={t("home.topMovers")}
            action={{ label: t("home.seeAll"), onPress: () => router.push("/(tabs)/search") }}
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
            action={{ label: t("home.seeAll"), onPress: () => router.push("/(tabs)/search") }}
          />
          <View className="bg-surface-primary rounded-2xl overflow-hidden">
            {recentTrades.map((trade) => (
              <TradeRow
                key={trade.id}
                trade={trade}
                variant="compact"
                showFollowButton
                isFollowingTicker={isFollowingTicker(trade.ticker)}
                onPress={() => handleTradePress(trade.id)}
                onFollowPress={() => handleTickerFollowToggle(trade.ticker)}
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
