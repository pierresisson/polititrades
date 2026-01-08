import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeInUp,
  SlideInRight,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Badge, TradeBadge, StatusDot } from "@/components/ui/Badge";

export default function FeaturesScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = () => {
    router.push("/(auth)/onboarding/premium");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      {/* Compact Header */}
      <Animated.View
        entering={FadeIn.delay(100)}
        className="flex-row items-center justify-between px-4 pt-3 pb-2"
      >
        <Pressable
          onPress={handleBack}
          className="flex-row items-center gap-1 active:opacity-70"
        >
          <Ionicons name="chevron-back" size={16} color="#A1A1AA" />
          <Text variant="secondary-xs">Back</Text>
        </Pressable>
        <View className="flex-row items-center gap-1">
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
          <View className="w-1.5 h-1.5 rounded-full bg-background-border" />
        </View>
        <View className="w-12" />
      </Animated.View>

      <View className="h-px bg-background-border" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Section Header */}
        <Animated.View
          entering={FadeInUp.delay(150).duration(400)}
          className="px-4 pt-4 pb-3"
        >
          <Text variant="label" className="mb-1">
            FEATURES
          </Text>
          <Text variant="h2" className="mb-1">
            {t("onboarding.features.title")}
          </Text>
          <Text variant="secondary-sm">
            {t("onboarding.features.subtitle")}
          </Text>
        </Animated.View>

        {/* Feature Grid - 2 columns, compact */}
        <View className="px-4 flex-row flex-wrap gap-2 mb-4">
          <FeatureCard
            icon="flash"
            iconColor="#34D399"
            title={t("onboarding.features.realTimeAlerts.title")}
            description="Instant notifications"
            badge="LIVE"
            delay={200}
          />
          <FeatureCard
            icon="search"
            iconColor="#7C9AB8"
            title={t("onboarding.features.smartSearch.title")}
            description="Filter by ticker, name"
            delay={250}
          />
          <FeatureCard
            icon="stats-chart"
            iconColor="#F59E0B"
            title={t("onboarding.features.analytics.title")}
            description="Track performance"
            delay={300}
          />
          <FeatureCard
            icon="time"
            iconColor="#A1A1AA"
            title={t("onboarding.features.historical.title")}
            description="Years of data"
            delay={350}
          />
        </View>

        {/* Example Trades Section - Terminal list style */}
        <Animated.View
          entering={SlideInRight.delay(400).duration(400)}
          className="px-4"
        >
          <Text variant="label" className="mb-2">
            {t("onboarding.features.exampleAlert")}
          </Text>

          <View className="bg-background-card border border-background-border rounded-md overflow-hidden">
            {/* Trade Row 1 */}
            <TradeRow
              initials="NP"
              name="N. Pelosi"
              ticker="NVDA"
              type="buy"
              amount="$500K-1M"
              change={12.4}
              time="2m"
            />
            {/* Trade Row 2 */}
            <TradeRow
              initials="DT"
              name="D. Trump Jr"
              ticker="TSLA"
              type="sell"
              amount="$250K-500K"
              change={-4.2}
              time="1h"
            />
            {/* Trade Row 3 */}
            <TradeRow
              initials="MT"
              name="M. Tuberville"
              ticker="AAPL"
              type="buy"
              amount="$100K-250K"
              change={3.1}
              time="3h"
              isLast
            />
          </View>
        </Animated.View>

        {/* Data sources note */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(400)}
          className="px-4 mt-4"
        >
          <View className="flex-row items-center gap-2 bg-surface-secondary/30 rounded-sm p-2">
            <Ionicons name="shield-checkmark-outline" size={12} color="#71717A" />
            <Text variant="caption">
              Official SEC EDGAR data • Updated every 15 minutes
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation - Compact */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3 bg-background border-t border-background-border">
        <View className="flex-row gap-2">
          <Button
            label={t("onboarding.back")}
            variant="ghost"
            size="md"
            onPress={handleBack}
            className="flex-1"
          />
          <Button
            label={t("onboarding.continue")}
            size="md"
            onPress={handleNext}
            className="flex-[2]"
            rightIcon={<Ionicons name="arrow-forward" size={12} color="#FFF" />}
          />
        </View>
      </View>
    </View>
  );
}

function FeatureCard({
  icon,
  iconColor,
  title,
  description,
  badge,
  delay,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  description: string;
  badge?: string;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(400)}
      className="w-[48%] bg-background-card border border-background-border rounded-md p-2.5"
    >
      <View className="flex-row items-start justify-between mb-1.5">
        <View
          className="w-6 h-6 rounded items-center justify-center"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Ionicons name={icon} size={13} color={iconColor} />
        </View>
        {badge && <Badge label={badge} variant="accent" size="xs" />}
      </View>
      <Text variant="body-sm" className="font-medium mb-0.5">
        {title}
      </Text>
      <Text variant="caption">{description}</Text>
    </Animated.View>
  );
}

function TradeRow({
  initials,
  name,
  ticker,
  type,
  amount,
  change,
  time,
  isLast = false,
}: {
  initials: string;
  name: string;
  ticker: string;
  type: "buy" | "sell";
  amount: string;
  change: number;
  time: string;
  isLast?: boolean;
}) {
  const isPositive = change >= 0;

  return (
    <View
      className={`flex-row items-center justify-between px-2.5 py-2 ${
        !isLast ? "border-b border-background-border/50" : ""
      }`}
    >
      <View className="flex-row items-center gap-2 flex-1">
        <View className="w-6 h-6 rounded-full bg-surface-secondary items-center justify-center">
          <Text variant="caption" className="font-bold">
            {initials}
          </Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text variant="body-sm" className="font-medium">
              {name}
            </Text>
            <TradeBadge type={type} size="xs" />
          </View>
          <View className="flex-row items-center gap-1">
            <Text variant="mono-xs" className={type === "buy" ? "text-profit" : "text-loss"}>
              {ticker}
            </Text>
            <Text variant="caption">• {amount}</Text>
          </View>
        </View>
      </View>
      <View className="items-end">
        <Text
          variant="mono-xs"
          className={isPositive ? "text-profit" : "text-loss"}
        >
          {isPositive ? "+" : ""}{change.toFixed(1)}%
        </Text>
        <Text variant="caption">{time}</Text>
      </View>
    </View>
  );
}
