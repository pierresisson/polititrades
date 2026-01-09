import { View, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  Avatar,
  FilterChip,
  StatsRow,
  SectionHeader,
  TradeRow,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { useWatchlistStore, usePaywallStore } from "@/lib/store";
import {
  getPoliticianById,
  getTradesByPolitician,
} from "@/lib/mockData";

type ProfileTab = "overview" | "trades" | "holdings";

export default function PersonalityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  const { addPolitician, removePolitician, isFollowingPolitician } =
    useWatchlistStore();
  const { openPaywall } = usePaywallStore();

  const politician = getPoliticianById(id || "");
  const trades = getTradesByPolitician(id || "");

  // Check if following
  const isFollowing = isFollowingPolitician(id || "");

  if (!politician) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text variant="secondary-sm">{t("errors.notFound")}</Text>
      </View>
    );
  }

  const handleFollow = () => {
    haptics.light();
    if (isFollowing) {
      removePolitician(id || "");
    } else {
      addPolitician(id || "");
    }
  };

  const handleSetAlert = () => {
    haptics.light();
    // Navigate to alert creation or open paywall
    openPaywall();
  };

  const handleTradePress = (tradeId: string) => {
    router.push(`/trade/${tradeId}`);
  };

  const partyColor =
    politician.party === "Democrat"
      ? colors.party.democrat
      : politician.party === "Republican"
      ? colors.party.republican
      : colors.party.independent;

  const role = politician.position
    ? politician.position
    : `${politician.chamber === "Senate" ? "Senator" : "Representative"} - ${politician.state}`;

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
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
        }}
      />

      <View className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          {/* Profile Header */}
          <View className="items-center px-4 pt-2 pb-6">
            <Avatar
              initials={politician.initials}
              imageUrl={politician.photoUrl}
              size="2xl"
              party={politician.party}
              showPartyIndicator
            />
            <Text variant="h2" className="mt-4 text-center">
              {politician.name}
            </Text>
            <Text variant="secondary-sm" className="mt-1 text-center">
              {role}
            </Text>
            <View
              className="flex-row items-center gap-1 mt-2 px-3 py-1 rounded-full"
              style={{ backgroundColor: `${partyColor}20` }}
            >
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: partyColor }}
              />
              <Text
                variant="caption"
                className="font-inter-medium"
              >
                {politician.party}
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 mt-6">
              <Pressable
                onPress={handleFollow}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${
                  isFollowing ? "bg-surface-secondary" : "bg-primary"
                }`}
              >
                <Ionicons
                  name={isFollowing ? "checkmark" : "add"}
                  size={18}
                  color={isFollowing ? colors.text.DEFAULT : colors.text.inverse}
                />
                <Text
                  variant="body"
                  className={`font-inter-semibold ${
                    isFollowing ? "text-text" : "text-text-inverse"
                  }`}
                >
                  {isFollowing ? t("personality.following") : t("personality.follow")}
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSetAlert}
                className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border border-background-border"
              >
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={colors.text.DEFAULT}
                />
                <Text variant="body" className="font-inter-semibold">
                  {t("personality.setAlert")}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Tab Navigation */}
          <View className="bg-background px-4 py-3 border-b border-background-border">
            <View className="flex-row gap-2">
              <FilterChip
                label={t("personality.overview")}
                selected={activeTab === "overview"}
                onPress={() => setActiveTab("overview")}
              />
              <FilterChip
                label={t("personality.trades")}
                selected={activeTab === "trades"}
                onPress={() => setActiveTab("trades")}
              />
              <FilterChip
                label={t("personality.holdings")}
                selected={activeTab === "holdings"}
                onPress={() => setActiveTab("holdings")}
              />
            </View>
          </View>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <>
              {/* Stats */}
              <View className="px-4 py-4">
                <StatsRow
                  items={[
                    {
                      label: t("personality.totalTrades"),
                      value: politician.totalTrades,
                      format: "number",
                    },
                    {
                      label: t("personality.avgReturn"),
                      value: politician.avgReturn,
                      format: "percent",
                      trend: politician.avgReturn >= 0 ? "up" : "down",
                    },
                    {
                      label: t("personality.winRate"),
                      value: politician.winRate,
                      format: "percent",
                    },
                  ]}
                  columns={3}
                />
              </View>

              {/* Additional Stats */}
              <View className="px-4 mb-6">
                <View className="bg-surface-primary rounded-2xl overflow-hidden">
                  <View className="flex-row items-center justify-between p-4 border-b border-background-border">
                    <Text variant="body">{t("personality.totalValue")}</Text>
                    <Text variant="body" className="font-inter-semibold">
                      ${(politician.totalValue / 1000000).toFixed(1)}M
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between p-4 border-b border-background-border">
                    <Text variant="body">{t("personality.topSector")}</Text>
                    <Text variant="body" className="font-inter-semibold">
                      {politician.topSector}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between p-4">
                    <Text variant="body">{t("personality.chamber")}</Text>
                    <Text variant="body" className="font-inter-semibold">
                      {politician.chamber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Recent Trades Preview */}
              <View className="px-4">
                <SectionHeader
                  title={t("personality.recentTrades")}
                  action={{
                    label: t("home.seeAll"),
                    onPress: () => setActiveTab("trades"),
                  }}
                />
                <View className="bg-surface-primary rounded-2xl overflow-hidden">
                  {trades.slice(0, 3).map((trade, index) => (
                    <View key={trade.id}>
                      <TradeRow
                        trade={trade}
                        variant="compact"
                        showPolitician={false}
                        onPress={() => handleTradePress(trade.id)}
                      />
                      {index < 2 && trades.length > index + 1 && (
                        <View className="h-px bg-background-border mx-4" />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {activeTab === "trades" && (
            <View className="px-4 py-4">
              {trades.length > 0 ? (
                <View className="bg-surface-primary rounded-2xl overflow-hidden">
                  {trades.map((trade, index) => (
                    <View key={trade.id}>
                      <TradeRow
                        trade={trade}
                        variant="full"
                        showPolitician={false}
                        onPress={() => handleTradePress(trade.id)}
                      />
                      {index < trades.length - 1 && (
                        <View className="h-px bg-background-border mx-4" />
                      )}
                    </View>
                  ))}
                </View>
              ) : (
                <View className="items-center py-12">
                  <Text variant="secondary-sm">{t("personality.noTrades")}</Text>
                </View>
              )}
            </View>
          )}

          {activeTab === "holdings" && (
            <View className="px-4 py-4">
              {/* Holdings would show current positions - for now, show placeholder */}
              <View className="items-center py-12">
                <View className="w-16 h-16 rounded-full bg-surface-secondary items-center justify-center mb-4">
                  <Ionicons
                    name="pie-chart-outline"
                    size={32}
                    color={colors.text.muted}
                  />
                </View>
                <Text variant="h3" align="center" className="mb-2">
                  {t("personality.holdings")}
                </Text>
                <Text variant="secondary-sm" align="center" className="max-w-[280px]">
                  Holdings analysis coming soon. Track this politician to get notified.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
