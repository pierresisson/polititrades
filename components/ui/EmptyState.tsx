import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "./Text";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { colors } from "@/constants/theme";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <View
      className={cn(
        "items-center justify-center",
        compact ? "py-8 px-4" : "py-16 px-6",
        className
      )}
    >
      <View
        className={cn(
          "items-center justify-center rounded-full bg-surface-secondary",
          compact ? "w-12 h-12 mb-3" : "w-16 h-16 mb-4"
        )}
      >
        <Ionicons
          name={icon}
          size={compact ? 24 : 32}
          color={colors.text.muted}
        />
      </View>

      <Text
        variant={compact ? "h4" : "h3"}
        align="center"
        className={compact ? "mb-1" : "mb-2"}
      >
        {title}
      </Text>

      {description && (
        <Text
          variant="secondary-sm"
          align="center"
          className={cn("max-w-[280px]", compact ? "mb-3" : "mb-6")}
        >
          {description}
        </Text>
      )}

      {action && (
        <Button
          label={action.label}
          variant="primary"
          size={compact ? "sm" : "md"}
          onPress={action.onPress}
        />
      )}
    </View>
  );
}

// Preset empty states
export function EmptyTrades({ onExplore }: { onExplore?: () => void }) {
  return (
    <EmptyState
      icon="trending-up-outline"
      title="No trades found"
      description="Try adjusting your filters or check back later for new trades."
      action={
        onExplore
          ? {
              label: "Clear Filters",
              onPress: onExplore,
            }
          : undefined
      }
    />
  );
}

export function EmptyWatchlist({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon="heart-outline"
      title="Your watchlist is empty"
      description="Follow politicians or tickers to see them here and get updates."
      action={
        onAdd
          ? {
              label: "Explore",
              onPress: onAdd,
            }
          : undefined
      }
    />
  );
}

export function EmptySearch({ query }: { query: string }) {
  return (
    <EmptyState
      icon="search-outline"
      title="No results"
      description={`We couldn't find anything for "${query}". Try a different search.`}
    />
  );
}

export function EmptyAlerts({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon="notifications-outline"
      title="No alerts yet"
      description="Create alerts to get notified when politicians trade specific stocks."
      action={
        onCreate
          ? {
              label: "Create Alert",
              onPress: onCreate,
            }
          : undefined
      }
    />
  );
}
