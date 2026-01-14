import { Pressable, View, ScrollView } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { haptics } from "@/lib/haptics";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  count?: number;
  disabled?: boolean;
  className?: string;
}

export function FilterChip({
  label,
  selected = false,
  onPress,
  icon,
  count,
  disabled = false,
  className,
}: FilterChipProps) {
  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "flex-row items-center px-4 py-2 rounded-full border-2",
        selected
          ? "bg-primary border-primary-700"
          : "bg-background-card border-primary-200",
        disabled && "opacity-40",
        "active:opacity-70",
        className
      )}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={selected ? "#FFFFFF" : colors.text.secondary}
          style={{ marginRight: 6 }}
        />
      )}
      <Text
        variant="label"
        className={cn(
          "normal-case tracking-normal font-inter-semibold",
          selected ? "text-white" : "text-text-secondary"
        )}
      >
        {label}
      </Text>
      {count !== undefined && count > 0 && (
        <View
          className={cn(
            "ml-1.5 px-1.5 py-0.5 rounded-full min-w-[18px] items-center",
            selected ? "bg-primary" : "bg-surface-tertiary"
          )}
        >
          <Text
            variant="caption"
            className={cn(selected ? "text-white" : "text-text-secondary")}
          >
            {count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

// Filter chip row with horizontal scroll
interface FilterChipGroupProps {
  filters: Array<{
    key: string;
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    count?: number;
  }>;
  selected: string | string[];
  onSelect: (key: string) => void;
  multiple?: boolean;
  className?: string;
}

export function FilterChipGroup({
  filters,
  selected,
  onSelect,
  multiple: _multiple = false,
  className,
}: FilterChipGroupProps) {
  const selectedKeys = Array.isArray(selected) ? selected : [selected];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
      className={className}
    >
      {filters.map((filter) => (
        <FilterChip
          key={filter.key}
          label={filter.label}
          icon={filter.icon}
          count={filter.count}
          selected={selectedKeys.includes(filter.key)}
          onPress={() => onSelect(filter.key)}
        />
      ))}
    </ScrollView>
  );
}

// Trade type filter preset
interface TradeTypeFilterProps {
  selected: "all" | "buy" | "sell";
  onSelect: (type: "all" | "buy" | "sell") => void;
  counts?: {
    all?: number;
    buy?: number;
    sell?: number;
  };
  className?: string;
}

export function TradeTypeFilter({
  selected,
  onSelect,
  counts,
  className,
}: TradeTypeFilterProps) {
  return (
    <View className={cn("flex-row gap-2", className)}>
      <FilterChip
        label="All"
        selected={selected === "all"}
        onPress={() => onSelect("all")}
        count={counts?.all}
      />
      <FilterChip
        label="Buys"
        selected={selected === "buy"}
        onPress={() => onSelect("buy")}
        count={counts?.buy}
        icon="trending-up"
      />
      <FilterChip
        label="Sells"
        selected={selected === "sell"}
        onPress={() => onSelect("sell")}
        count={counts?.sell}
        icon="trending-down"
      />
    </View>
  );
}

// Time period filter preset
interface TimePeriodFilterProps {
  selected: "today" | "week" | "month" | "all";
  onSelect: (period: "today" | "week" | "month" | "all") => void;
  className?: string;
}

export function TimePeriodFilter({
  selected,
  onSelect,
  className,
}: TimePeriodFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
      className={className}
    >
      <FilterChip
        label="Today"
        selected={selected === "today"}
        onPress={() => onSelect("today")}
      />
      <FilterChip
        label="This Week"
        selected={selected === "week"}
        onPress={() => onSelect("week")}
      />
      <FilterChip
        label="This Month"
        selected={selected === "month"}
        onPress={() => onSelect("month")}
      />
      <FilterChip
        label="All Time"
        selected={selected === "all"}
        onPress={() => onSelect("all")}
      />
    </ScrollView>
  );
}
