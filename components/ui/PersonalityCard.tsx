import { View, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Avatar } from "./Avatar";
import { StatsRow } from "./StatsRow";
import { Badge } from "./Badge";
import { haptics } from "@/lib/haptics";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import type { MockPolitician } from "@/lib/mockData";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface PersonalityCardProps {
  politician: MockPolitician;
  variant?: "compact" | "full" | "row" | "mini";
  showStats?: boolean;
  showFollowButton?: boolean;
  isFollowing?: boolean;
  onPress?: () => void;
  onFollowPress?: () => void;
  className?: string;
}

export function PersonalityCard({
  politician,
  variant = "compact",
  showStats = true,
  showFollowButton = false,
  isFollowing = false,
  onPress,
  onFollowPress,
  className,
}: PersonalityCardProps) {
  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const handleFollowPress = () => {
    if (onFollowPress) {
      haptics.light();
      onFollowPress();
    }
  };

  // Mini variant - just avatar and name (for horizontal scroll)
  if (variant === "mini") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={!onPress}
        className={cn(
          "items-center w-16",
          onPress && "active:opacity-70",
          className
        )}
      >
        <Avatar
          initials={politician.initials}
          party={politician.party}
          showPartyIndicator
          size="lg"
          className="mb-2"
        />
        <Text variant="caption" align="center" numberOfLines={1}>
          {politician.shortName.split(" ")[1] || politician.shortName}
        </Text>
      </Pressable>
    );
  }

  // Row variant - horizontal list item
  if (variant === "row") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={!onPress}
        className={cn(
          "flex-row items-center py-3 px-4",
          onPress && "active:bg-surface-secondary/50",
          className
        )}
      >
        <Avatar
          initials={politician.initials}
          party={politician.party}
          showPartyIndicator
          size="md"
          className="mr-3"
        />

        <View className="flex-1 mr-3">
          <Text variant="body" className="font-inter-medium">
            {politician.name}
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Text variant="secondary-sm">
              {politician.chamber === "Senate" ? "Senator" : "Rep."}
            </Text>
            <Text variant="caption">·</Text>
            <Text variant="secondary-sm">
              {politician.party.charAt(0)}-{politician.state}
            </Text>
            {politician.position && (
              <>
                <Text variant="caption">·</Text>
                <Text variant="caption" numberOfLines={1}>
                  {politician.position}
                </Text>
              </>
            )}
          </View>
        </View>

        {showStats && (
          <View className="items-end mr-2">
            <Text
              variant="mono-sm"
              className={cn(
                "font-inter-semibold",
                politician.avgReturn >= 0 ? "text-profit" : "text-loss"
              )}
            >
              {formatPercentage(politician.avgReturn)}
            </Text>
            <Text variant="caption">{politician.totalTrades} trades</Text>
          </View>
        )}

        {showFollowButton && (
          <Pressable
            onPress={handleFollowPress}
            className={cn(
              "w-8 h-8 items-center justify-center rounded-full",
              isFollowing ? "bg-primary-subtle" : "bg-surface-secondary",
              "active:opacity-70"
            )}
          >
            <Ionicons
              name={isFollowing ? "heart" : "heart-outline"}
              size={18}
              color={isFollowing ? colors.primary.DEFAULT : colors.text.secondary}
            />
          </Pressable>
        )}

        {onPress && !showFollowButton && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.text.muted}
          />
        )}
      </Pressable>
    );
  }

  // Compact variant - card for grids/horizontal lists
  if (variant === "compact") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={!onPress}
        className={cn(
          "bg-surface-primary rounded-xl p-4 border border-background-border w-40",
          onPress && "active:opacity-90",
          className
        )}
      >
        <View className="items-center mb-3">
          <Avatar
            initials={politician.initials}
            party={politician.party}
            showPartyIndicator
            size="xl"
            className="mb-2"
          />
          <Text variant="body-sm" className="font-inter-semibold" align="center">
            {politician.shortName}
          </Text>
          <Text variant="caption" align="center">
            {politician.party.charAt(0)}-{politician.state}
          </Text>
        </View>

        {showStats && (
          <View className="flex-row justify-between pt-3 border-t border-background-border">
            <View className="items-center flex-1">
              <Text
                variant="mono-sm"
                className={cn(
                  "font-inter-semibold",
                  politician.avgReturn >= 0 ? "text-profit" : "text-loss"
                )}
              >
                {formatPercentage(politician.avgReturn)}
              </Text>
              <Text variant="caption">Avg</Text>
            </View>
            <View className="w-px bg-background-border" />
            <View className="items-center flex-1">
              <Text variant="mono-sm" className="font-inter-semibold">
                {politician.totalTrades}
              </Text>
              <Text variant="caption">Trades</Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  }

  // Full variant - detailed card
  return (
    <Pressable
      onPress={handlePress}
      disabled={!onPress}
      className={cn(
        "bg-surface-primary rounded-xl p-4 border border-background-border",
        onPress && "active:opacity-90",
        className
      )}
    >
      <View className="flex-row items-start mb-4">
        <Avatar
          initials={politician.initials}
          party={politician.party}
          showPartyIndicator
          size="xl"
          className="mr-4"
        />

        <View className="flex-1">
          <Text variant="h3" className="mb-1">
            {politician.name}
          </Text>
          <Text variant="secondary-sm">
            {politician.chamber === "Senate" ? "Senator" : "Representative"} ·{" "}
            {politician.party.charAt(0)}-{politician.state}
          </Text>
          {politician.position && (
            <Badge
              label={politician.position}
              variant="default"
              size="sm"
              className="mt-2 self-start"
            />
          )}
        </View>

        {showFollowButton && (
          <Pressable
            onPress={handleFollowPress}
            className={cn(
              "px-3 py-1.5 rounded-full flex-row items-center gap-1",
              isFollowing ? "bg-primary-subtle" : "bg-surface-secondary",
              "active:opacity-70"
            )}
          >
            <Ionicons
              name={isFollowing ? "heart" : "heart-outline"}
              size={16}
              color={isFollowing ? colors.primary.DEFAULT : colors.text.secondary}
            />
            <Text
              variant="label"
              className={cn(
                "normal-case",
                isFollowing ? "text-primary" : "text-text-secondary"
              )}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>
        )}
      </View>

      {showStats && (
        <StatsRow
          items={[
            {
              label: "Total Trades",
              value: politician.totalTrades,
              format: "number",
            },
            {
              label: "Avg Return",
              value: politician.avgReturn,
              format: "percent",
              trend: politician.avgReturn >= 0 ? "up" : "down",
            },
            {
              label: "Win Rate",
              value: politician.winRate,
              suffix: "%",
              format: "none",
            },
          ]}
          columns={3}
          variant="compact"
          className="pt-4 border-t border-background-border"
        />
      )}

      <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-background-border">
        <View>
          <Text variant="caption">Top Sector</Text>
          <Text variant="body-sm" className="font-inter-medium">
            {politician.topSector}
          </Text>
        </View>
        <View className="items-end">
          <Text variant="caption">Total Value</Text>
          <Text variant="body-sm" className="font-inter-medium">
            {formatCurrency(politician.totalValue, "USD", "en-US")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// Personality row with divider
export function PersonalityRowWithDivider({
  politician,
  isLast = false,
  ...props
}: PersonalityCardProps & { isLast?: boolean }) {
  return (
    <View>
      <PersonalityCard politician={politician} variant="row" {...props} />
      {!isLast && <View className="h-px bg-background-border mx-4" />}
    </View>
  );
}
