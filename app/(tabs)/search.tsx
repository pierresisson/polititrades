import { View, FlatList, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  SearchInput,
  FilterChip,
  PersonalityCard,
  TickerCard,
  Avatar,
  EmptySearch,
  SectionHeader,
  HighlightedText,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import {
  mockPoliticians,
  mockTickers,
  searchPoliticians,
  searchTickers,
} from "@/lib/mockData";

type SearchCategory = "all" | "politicians" | "tickers";

export default function SearchScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Pelosi",
    "NVDA",
    "McConnell",
  ]);

  // Search results
  const politicianResults = useMemo(() => {
    if (!searchQuery) return [];
    return searchPoliticians(searchQuery);
  }, [searchQuery]);

  const tickerResults = useMemo(() => {
    if (!searchQuery) return [];
    return searchTickers(searchQuery);
  }, [searchQuery]);

  const hasResults =
    (category === "all" || category === "politicians") &&
    politicianResults.length > 0
      ? true
      : (category === "all" || category === "tickers") &&
        tickerResults.length > 0;

  const handlePoliticianPress = (politicianId: string) => {
    // Add to recent searches
    const politician = mockPoliticians.find((p) => p.id === politicianId);
    if (politician && !recentSearches.includes(politician.name)) {
      setRecentSearches((prev) => [politician.name, ...prev.slice(0, 4)]);
    }
    router.push(`/personality/${politicianId}`);
  };

  const handleTickerPress = (ticker: string) => {
    // Add to recent searches
    if (!recentSearches.includes(ticker)) {
      setRecentSearches((prev) => [ticker, ...prev.slice(0, 4)]);
    }
    router.push(`/ticker/${ticker}`);
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Trending politicians (top by trades)
  const trendingPoliticians = mockPoliticians
    .sort((a, b) => b.stats.totalTrades - a.stats.totalTrades)
    .slice(0, 6);

  // Trending tickers (top by trade count)
  const trendingTickers = mockTickers.slice(0, 6);

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      {/* Search Header */}
      <View className="px-4 py-3">
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("search.placeholderFull")}
          autoFocus={false}
        />

        {/* Category Filter */}
        {searchQuery && (
          <View className="flex-row gap-2 mt-3">
            <FilterChip
              label={t("common.all")}
              selected={category === "all"}
              onPress={() => setCategory("all")}
            />
            <FilterChip
              label={t("search.politicians")}
              selected={category === "politicians"}
              onPress={() => setCategory("politicians")}
            />
            <FilterChip
              label={t("search.tickers")}
              selected={category === "tickers"}
              onPress={() => setCategory("tickers")}
            />
          </View>
        )}
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* No query - show recent & trending */}
        {!searchQuery && (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View className="mb-6">
                <SectionHeader
                  title={t("search.recent")}
                  action={t("search.clearRecent")}
                  onActionPress={clearRecentSearches}
                  className="px-4"
                />
                <View className="flex-row flex-wrap gap-2 px-4">
                  {recentSearches.map((search, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleRecentSearch(search)}
                      className="flex-row items-center gap-2 bg-surface-secondary px-3 py-2 rounded-full"
                    >
                      <Ionicons
                        name="time-outline"
                        size={14}
                        color={colors.text.muted}
                      />
                      <Text variant="body-sm">{search}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Trending Politicians */}
            <View className="mb-6">
              <SectionHeader
                title={t("search.trending")}
                subtitle={t("search.politicians")}
                className="px-4"
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              >
                {trendingPoliticians.map((politician) => (
                  <PersonalityCard
                    key={politician.id}
                    variant="mini"
                    name={politician.name}
                    role={politician.role}
                    party={politician.party}
                    imageUrl={politician.imageUrl}
                    stats={{
                      avgReturn: politician.stats.avgReturn,
                      totalTrades: politician.stats.totalTrades,
                    }}
                    onPress={() => handlePoliticianPress(politician.id)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Trending Tickers */}
            <View className="px-4 mb-6">
              <SectionHeader title={t("search.tickers")} />
              <View className="bg-surface-primary rounded-2xl overflow-hidden">
                {trendingTickers.map((ticker, index) => (
                  <Pressable
                    key={ticker.symbol}
                    onPress={() => handleTickerPress(ticker.symbol)}
                    className="flex-row items-center justify-between p-4 active:opacity-70"
                    style={
                      index < trendingTickers.length - 1
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
                          {ticker.name}
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
            </View>
          </>
        )}

        {/* Search Results */}
        {searchQuery && (
          <>
            {/* Politicians Results */}
            {(category === "all" || category === "politicians") &&
              politicianResults.length > 0 && (
                <View className="mb-6">
                  <SectionHeader
                    title={t("search.politicians")}
                    subtitle={`${politicianResults.length} ${t("empty.noResults").toLowerCase()}`}
                    className="px-4"
                  />
                  <View className="px-4">
                    <View className="bg-surface-primary rounded-2xl overflow-hidden">
                      {politicianResults.map((politician, index) => (
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
                          }}
                          onPress={() => handlePoliticianPress(politician.id)}
                          showDivider={index < politicianResults.length - 1}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              )}

            {/* Tickers Results */}
            {(category === "all" || category === "tickers") &&
              tickerResults.length > 0 && (
                <View className="px-4 mb-6">
                  <SectionHeader title={t("search.tickers")} />
                  <View className="bg-surface-primary rounded-2xl overflow-hidden">
                    {tickerResults.map((ticker, index) => (
                      <TickerCard
                        key={ticker.symbol}
                        symbol={ticker.symbol}
                        name={ticker.name}
                        price={ticker.price}
                        change={ticker.change}
                        changePercent={ticker.changePercent}
                        sparklineData={ticker.sparklineData}
                        onPress={() => handleTickerPress(ticker.symbol)}
                        showDivider={index < tickerResults.length - 1}
                      />
                    ))}
                  </View>
                </View>
              )}

            {/* Empty State */}
            {!hasResults && (
              <EmptySearch
                query={searchQuery}
                onClearSearch={() => setSearchQuery("")}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
