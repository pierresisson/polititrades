import { View, FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useMemo } from "react";

import {
  TradeRow,
  TradeDateHeader,
  TradeTypeFilter,
  TimePeriodFilter,
  SearchInput,
  EmptyTrades,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { MOCK_TRADES, type MockTrade } from "@/lib/mockData";

type TradeTypeFilterValue = "all" | "buy" | "sell";
type TimePeriodFilterValue = "today" | "week" | "month" | "all";

export default function MovesScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tradeType, setTradeType] = useState<TradeTypeFilterValue>("all");
  const [timePeriod, setTimePeriod] = useState<TimePeriodFilterValue>("week");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Filter trades
  const filteredTrades = useMemo(() => {
    let trades = [...MOCK_TRADES];

    // Filter by trade type
    if (tradeType !== "all") {
      trades = trades.filter((trade) => trade.type === tradeType);
    }

    // Filter by time period
    const now = new Date();
    if (timePeriod === "today") {
      trades = trades.filter((trade) => {
        const tradeDate = new Date(trade.filingDate);
        return tradeDate.toDateString() === now.toDateString();
      });
    } else if (timePeriod === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      trades = trades.filter((trade) => trade.filingDate >= weekAgo);
    } else if (timePeriod === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      trades = trades.filter((trade) => trade.filingDate >= monthAgo);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      trades = trades.filter(
        (trade) =>
          trade.politician.name.toLowerCase().includes(query) ||
          trade.ticker.toLowerCase().includes(query) ||
          trade.companyName.toLowerCase().includes(query)
      );
    }

    // Sort by date (most recent first)
    trades.sort(
      (a, b) => b.filingDate.getTime() - a.filingDate.getTime()
    );

    return trades;
  }, [tradeType, timePeriod, searchQuery]);

  // Group trades by date
  const groupedTrades = useMemo(() => {
    const groups: { title: string; data: MockTrade[] }[] = [];
    const dateMap = new Map<string, MockTrade[]>();

    filteredTrades.forEach((trade) => {
      const dateStr = trade.filingDate.toDateString();

      if (!dateMap.has(dateStr)) {
        dateMap.set(dateStr, []);
      }
      dateMap.get(dateStr)!.push(trade);
    });

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    dateMap.forEach((trades, dateStr) => {
      let title = dateStr;
      if (dateStr === now.toDateString()) {
        title = t("time.today");
      } else if (dateStr === yesterday.toDateString()) {
        title = t("time.yesterday");
      } else {
        const date = new Date(dateStr);
        title = date.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        });
      }
      groups.push({ title, data: trades });
    });

    return groups;
  }, [filteredTrades, t]);

  const handleTradePress = (tradeId: string) => {
    router.push(`/trade/${tradeId}`);
  };

  const handleClearFilters = () => {
    setTradeType("all");
    setTimePeriod("week");
    setSearchQuery("");
  };

  const renderItem = ({ item, index }: { item: MockTrade; index: number }) => {
    // Find if this is the first item of a new date group
    let isFirstInGroup = index === 0;
    if (index > 0) {
      const prevTrade = filteredTrades[index - 1];
      const prevDate = prevTrade.filingDate.toDateString();
      const currDate = item.filingDate.toDateString();
      isFirstInGroup = prevDate !== currDate;
    }

    // Check if next item is in same group
    const isLastInGroup =
      index === filteredTrades.length - 1 ||
      filteredTrades[index + 1].filingDate.toDateString() !==
        item.filingDate.toDateString();

    const getDateLabel = (date: Date) => {
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === now.toDateString()) {
        return t("time.today");
      } else if (date.toDateString() === yesterday.toDateString()) {
        return t("time.yesterday");
      } else {
        return date.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        });
      }
    };

    return (
      <View className="px-4">
        {isFirstInGroup && (
          <TradeDateHeader
            date={getDateLabel(item.filingDate)}
            count={
              groupedTrades.find(
                (g) =>
                  g.data[0] &&
                  g.data[0].filingDate.toDateString() ===
                    item.filingDate.toDateString()
              )?.data.length || 0
            }
          />
        )}
        <View
          className={
            isFirstInGroup
              ? "bg-surface-primary rounded-t-2xl overflow-hidden"
              : isLastInGroup
              ? "bg-surface-primary rounded-b-2xl overflow-hidden mb-4"
              : "bg-surface-primary"
          }
        >
          <TradeRow
            trade={item}
            variant="full"
            onPress={() => handleTradePress(item.id)}
          />
          {!isLastInGroup && <View className="h-px bg-background-border mx-4" />}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 pt-2 pb-4 bg-background border-b border-background-border">
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("search.placeholder")}
          className="mb-3"
        />

        {/* Filters */}
        <View className="flex-row gap-2">
          <TradeTypeFilter
            selected={tradeType}
            onSelect={(type) => setTradeType(type)}
          />
        </View>

        <View className="flex-row gap-2 mt-2">
          <TimePeriodFilter
            selected={timePeriod}
            onSelect={(period) => setTimePeriod(period)}
          />
        </View>
      </View>

      {/* Trade List */}
      <FlatList
        data={filteredTrades}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary.DEFAULT}
          />
        }
        ListEmptyComponent={
          <EmptyTrades
            onExplore={
              tradeType !== "all" || timePeriod !== "week" || searchQuery !== ""
                ? handleClearFilters
                : undefined
            }
          />
        }
      />
    </View>
  );
}
