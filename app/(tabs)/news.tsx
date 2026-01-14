import { View, FlatList, RefreshControl, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { TFunction } from "i18next";

import { Text, SearchInput, TabScreenHeader } from "@/components/ui";
import { colors } from "@/constants/theme";
import { cn } from "@/lib/utils";

// Mock news data
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: Date;
  imageUrl?: string;
  category: "market" | "politics" | "earnings" | "analysis";
  relatedTickers?: string[];
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Nancy Pelosi's Latest Tech Trades Draw Attention",
    summary:
      "House Speaker's recent NVIDIA and Microsoft purchases spark debate over congressional trading practices.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "politics",
    relatedTickers: ["NVDA", "MSFT"],
  },
  {
    id: "2",
    title: "S&P 500 Hits New All-Time High",
    summary:
      "Tech stocks lead the rally as investors shrug off recession fears and focus on AI growth potential.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    category: "market",
  },
  {
    id: "3",
    title: "Congress Members Increase Energy Sector Holdings",
    summary:
      "Multiple senators reported significant purchases in oil and gas stocks ahead of energy bill vote.",
    source: "WSJ",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    category: "politics",
    relatedTickers: ["XOM", "CVX"],
  },
  {
    id: "4",
    title: "Apple Q4 Earnings Beat Expectations",
    summary:
      "iPhone sales exceed analyst predictions, services revenue continues strong growth trajectory.",
    source: "CNBC",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400",
    category: "earnings",
    relatedTickers: ["AAPL"],
  },
  {
    id: "5",
    title: "Fed Signals Potential Rate Cuts in 2025",
    summary:
      "Federal Reserve officials hint at monetary policy easing as inflation shows signs of cooling.",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: "market",
  },
  {
    id: "6",
    title: "Insider Trading Patterns Point to Tech Optimism",
    summary:
      "Analysis of congressional trades reveals bullish sentiment on semiconductor and AI companies.",
    source: "MarketWatch",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    category: "analysis",
    relatedTickers: ["NVDA", "AMD", "GOOGL"],
  },
];

type CategoryFilter = "all" | "market" | "politics" | "earnings" | "analysis";

const CATEGORIES: { value: CategoryFilter; labelKey: string }[] = [
  { value: "all", labelKey: "common.all" },
  { value: "market", labelKey: "news.categories.market" },
  { value: "politics", labelKey: "news.categories.politics" },
  { value: "earnings", labelKey: "news.categories.earnings" },
  { value: "analysis", labelKey: "news.categories.analysis" },
];

function formatTimeAgo(date: Date, t: TFunction): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return t("news.minutesAgo", { count: diffMins });
  } else if (diffHours < 24) {
    return t("news.hoursAgo", { count: diffHours });
  } else {
    return t("news.daysAgo", { count: diffDays });
  }
}

function CategoryChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "px-6 py-3 rounded-full",
        selected
          ? "bg-primary shadow-md"
          : "bg-white/60 border border-primary-200"
      )}
    >
      <Text
        variant="body-sm"
        className={cn(
          "font-inter-semibold",
          selected ? "text-white" : "text-text-secondary"
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function NewsCard({
  item,
  onPress,
  t,
}: {
  item: NewsItem;
  onPress: () => void;
  t: TFunction;
}) {
  const hasImage = !!item.imageUrl;

  return (
    <Pressable
      onPress={onPress}
      className="bg-background-card border-2 border-primary-200 rounded-2xl overflow-hidden mb-3 active:opacity-90"
    >
      {hasImage && (
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-40"
          resizeMode="cover"
        />
      )}
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <Text variant="caption" className="text-primary">
            {item.source}
          </Text>
          <View className="w-1 h-1 rounded-full bg-text-muted mx-2" />
          <Text variant="caption" className="text-text-muted">
            {formatTimeAgo(item.publishedAt, t)}
          </Text>
        </View>

        <Text variant="h3" className="mb-2">
          {item.title}
        </Text>

        <Text variant="secondary-sm" numberOfLines={2} className="mb-3">
          {item.summary}
        </Text>

        {item.relatedTickers && item.relatedTickers.length > 0 && (
          <View className="flex-row flex-wrap gap-2">
            {item.relatedTickers.map((ticker) => (
              <View
                key={ticker}
                className="bg-primary-100 border border-primary-300 px-2 py-1 rounded-md"
              >
                <Text variant="caption" className="text-primary-900 font-inter-semibold">
                  ${ticker}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

function CompactNewsCard({
  item,
  onPress,
  t,
}: {
  item: NewsItem;
  onPress: () => void;
  t: TFunction;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-background-card border-2 border-primary-200 rounded-xl p-4 mb-2 flex-row active:opacity-90"
    >
      <View className="flex-1 pr-3">
        <View className="flex-row items-center mb-1">
          <Text variant="caption" className="text-primary">
            {item.source}
          </Text>
          <View className="w-1 h-1 rounded-full bg-text-muted mx-2" />
          <Text variant="caption" className="text-text-muted">
            {formatTimeAgo(item.publishedAt, t)}
          </Text>
        </View>
        <Text variant="body" numberOfLines={2} className="font-inter-medium">
          {item.title}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.text.muted}
      />
    </Pressable>
  );
}

export default function NewsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const filteredNews = MOCK_NEWS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsPress = (newsId: string) => {
    // TODO: Navigate to news detail
    console.log("News pressed:", newsId);
  };

  const renderItem = ({ item, index }: { item: NewsItem; index: number }) => {
    // First item gets the featured card with image
    if (index === 0 && item.imageUrl) {
      return <NewsCard item={item} onPress={() => handleNewsPress(item.id)} t={t} />;
    }
    return <CompactNewsCard item={item} onPress={() => handleNewsPress(item.id)} t={t} />;
  };

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-background">
      {/* Header */}
      <TabScreenHeader
        title={t("news.title")}
        onSettingsPress={() => router.push("/(tabs)/settings")}
      />

      {/* Search and filters */}
      <View className="px-4 pb-3">
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("news.searchPlaceholder")}
          className="mb-3"
        />

        {/* Category filters */}
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="bg-transparent"
          renderItem={({ item }) => (
            <CategoryChip
              label={t(item.labelKey)}
              selected={selectedCategory === item.value}
              onPress={() => setSelectedCategory(item.value)}
            />
          )}
        />
      </View>

      {/* News list */}
      <FlatList
        data={filteredNews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.DEFAULT}
          />
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons
              name="newspaper-outline"
              size={48}
              color={colors.text.muted}
            />
            <Text variant="secondary" className="mt-4">
              {t("news.noNews")}
            </Text>
          </View>
        }
      />
    </View>
  );
}
