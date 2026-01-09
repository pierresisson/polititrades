import { View, FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Text,
  Headline,
  TradeRow,
  TradeDateHeader,
  FilterChipGroup,
  TradeTypeFilter,
  TimePeriodFilter,
  SearchInput,
  EmptyTrades,
  ScreenHeader,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { mockTrades, type MockTrade } from "@/lib/mockData";

type TradeTypeFilter = "all" | "buy" | "sell";
type TimePeriodFilter = "today" | "thisWeek" | "thisMonth" | "allTime";

export default function MovesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tradeType, setTradeType] = useState<TradeTypeFilter>("all");
  const [timePeriod, setTimePeriod] = useState<TimePeriodFilter>("thisWeek");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Filter trades
  const filteredTrades = useMemo(() => {
    let trades = [...mockTrades];

    // Filter by trade type
    if (tradeType !== "all") {
      trades = trades.filter((trade) => trade.tradeType === tradeType);
    }

    // Filter by time period
    const now = new Date();
    if (timePeriod === "today") {
      trades = trades.filter((trade) => {
        const tradeDate = new Date(trade.filedAt);
        return tradeDate.toDateString() === now.toDateString();
      });
    } else if (timePeriod === "thisWeek") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      trades = trades.filter((trade) => new Date(trade.filedAt) >= weekAgo);
    } else if (timePeriod === "thisMonth") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      trades = trades.filter((trade) => new Date(trade.filedAt) >= monthAgo);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      trades = trades.filter(
        (trade) =>
          trade.politicianName.toLowerCase().includes(query) ||
          trade.ticker.toLowerCase().includes(query) ||
          trade.companyName.toLowerCase().includes(query)
      );
    }

    // Sort by date (most recent first)
    trades.sort(
      (a, b) => new Date(b.filedAt).getTime() - new Date(a.filedAt).getTime()
    );

    return trades;
  }, [tradeType, timePeriod, searchQuery]);

  // Group trades by date
  const groupedTrades = useMemo(() => {
    const groups: { title: string; data: MockTrade[] }[] = [];
    const dateMap = new Map<string, MockTrade[]>();

    filteredTrades.forEach((trade) => {
      const date = new Date(trade.filedAt);
      const dateStr = date.toDateString();

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
    setTimePeriod("thisWeek");
    setSearchQuery("");
  };

  const renderItem = ({ item, index }: { item: MockTrade; index: number }) => {
    // Find if this is the first item of a new date group
    let isFirstInGroup = index === 0;
    if (index > 0) {
      const prevTrade = filteredTrades[index - 1];
      const prevDate = new Date(prevTrade.filedAt).toDateString();
      const currDate = new Date(item.filedAt).toDateString();
      isFirstInGroup = prevDate !== currDate;
    }

    // Check if next item is in same group
    const isLastInGroup =
      index === filteredTrades.length - 1 ||
      new Date(filteredTrades[index + 1].filedAt).toDateString() !==
        new Date(item.filedAt).toDateString();

    return (
      <View className="px-4">
        {isFirstInGroup && (
          <TradeDateHeader
            date={new Date(item.filedAt)}
            count={
              groupedTrades.find(
                (g) =>
                  g.data[0] &&
                  new Date(g.data[0].filedAt).toDateString() ===
                    new Date(item.filedAt).toDateString()
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
            variant="full"
            politicianName={item.politicianName}
            politicianParty={item.politicianParty as "D" | "R" | "I"}
            politicianImageUrl={item.politicianImageUrl}
            ticker={item.ticker}
            companyName={item.companyName}
            tradeType={item.tradeType as "buy" | "sell"}
            amount={item.amount}
            estimatedValue={item.estimatedValue}
            filedAt={new Date(item.filedAt)}
            returnSinceFiling={item.returnSinceFiling}
            onPress={() => handleTradePress(item.id)}
            showDivider={!isLastInGroup}
          />
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
            onSelect={(type) => setTradeType(type as TradeTypeFilter)}
            labels={{
              all: t("moves.all"),
              buy: t("moves.buys"),
              sell: t("moves.sells"),
            }}
          />
        </View>

        <View className="flex-row gap-2 mt-2">
          <TimePeriodFilter
            selected={timePeriod}
            onSelect={(period) => setTimePeriod(period as TimePeriodFilter)}
            labels={{
              today: t("moves.today"),
              thisWeek: t("moves.thisWeek"),
              thisMonth: t("moves.thisMonth"),
              allTime: t("moves.allTime"),
            }}
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
            onClearFilters={handleClearFilters}
            showClearButton={
              tradeType !== "all" ||
              timePeriod !== "thisWeek" ||
              searchQuery !== ""
            }
          />
        }
      />
    </View>
  );
}
