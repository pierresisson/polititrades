import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInUp,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Badge, TradeBadge } from "@/components/ui/Badge";
import { gradients } from "@/constants/theme";

// Mock live trades data
const LIVE_TRADES = [
  {
    initials: "NP",
    name: "N. Pelosi",
    ticker: "NVDA",
    type: "buy" as const,
    amount: "$1M+",
    change: "+12.4%",
  },
  {
    initials: "TT",
    name: "T. Tuberville",
    ticker: "LMT",
    type: "buy" as const,
    amount: "$500K",
    change: "+8.5%",
  },
  {
    initials: "DC",
    name: "D. Crenshaw",
    ticker: "XOM",
    type: "sell" as const,
    amount: "$250K",
    change: "-2.1%",
  },
];

export default function DiscoveryScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // Pulse animation for live indicator
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const handleNext = () => {
    router.push("/(auth)/onboarding/features");
  };

  return (
    <View className="flex-1 bg-background">
      {/* Background gradient - Purple Hero */}
      <LinearGradient
        colors={gradients.hero as string[]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Content */}
      <View className="flex-1 px-6 pt-12 pb-6">
        {/* Hero Section */}
        <View className="items-center mb-8">
          {/* Logo */}
          <Animated.View
            entering={ZoomIn.delay(100).springify()}
            className="mb-4"
            accessibilityLabel={t("onboarding.discovery.title")}
          >
            <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center">
              <Ionicons name="trending-up" size={32} color="#7C3AED" />
            </View>
          </Animated.View>

          {/* App name */}
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Text variant="h1" align="center" className="mb-1">
              {t("onboarding.discovery.title")}
            </Text>
          </Animated.View>

          {/* Tagline */}
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Text
              variant="h3"
              align="center"
              className="mb-2 text-text-secondary"
            >
              {t("onboarding.discovery.tagline")}
            </Text>
          </Animated.View>

          {/* Subtitle */}
          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <Text
              variant="secondary-sm"
              align="center"
              className="max-w-[280px]"
            >
              {t("onboarding.discovery.subtitle")}
            </Text>
          </Animated.View>
        </View>

        {/* Live Trades Feed */}
        <Animated.View entering={SlideInUp.delay(500).springify()} className="flex-1">
          <View className="bg-background-card border border-background-border rounded-xl overflow-hidden">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-background-border">
              <View className="flex-row items-center gap-2">
                <Ionicons name="pulse" size={16} color="#34D399" />
                <Text variant="body-sm" className="font-inter-semibold">
                  {t("onboarding.discovery.feedHeader")}
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Animated.View style={pulseStyle}>
                  <View className="w-2 h-2 rounded-full bg-profit" />
                </Animated.View>
                <Badge label="LIVE" variant="profit" size="sm" />
              </View>
            </View>

            {/* Trades list */}
            <View>
              {LIVE_TRADES.map((trade, index) => (
                <Animated.View
                  key={trade.ticker}
                  entering={FadeInUp.delay(700 + index * 100).springify()}
                >
                  <TradeRow
                    {...trade}
                    isLast={index === LIVE_TRADES.length - 1}
                  />
                </Animated.View>
              ))}
            </View>

            {/* Footer */}
            <View className="px-4 py-3 bg-surface-secondary/30">
              <Text variant="caption" className="text-center">
                {t("onboarding.discovery.feedFooter")}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Bottom CTA */}
        <Animated.View entering={FadeInUp.delay(1000).springify()} className="pt-6">
          <Button
            label={t("onboarding.discovery.cta")}
            variant="accent"
            size="lg"
            onPress={handleNext}
            className="w-full mb-3"
          />
          <Text variant="caption" align="center" className="text-text-muted">
            {t("onboarding.discovery.ctaCaption")}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

function TradeRow({
  initials,
  name,
  ticker,
  type,
  amount,
  change,
  isLast = false,
}: {
  initials: string;
  name: string;
  ticker: string;
  type: "buy" | "sell";
  amount: string;
  change: string;
  isLast?: boolean;
}) {
  const isPositive = !change.startsWith("-");

  return (
    <View
      className={`flex-row items-center px-4 py-3 ${
        !isLast ? "border-b border-background-border/50" : ""
      }`}
      accessibilityLabel={`${name}, ${type === "buy" ? "achat" : "vente"}, ${ticker}, ${amount}, ${change}`}
    >
      {/* Avatar */}
      <View className="w-10 h-10 rounded-full bg-surface-secondary items-center justify-center mr-3">
        <Text variant="body-sm" className="font-inter-bold text-text-secondary">
          {initials}
        </Text>
      </View>

      {/* Info */}
      <View className="flex-1 mr-3">
        <View className="flex-row items-center mb-0.5">
          <Text variant="body-sm" className="font-inter-semibold">
            {name}
          </Text>
          <View className="ml-2">
            <TradeBadge type={type} size="xs" />
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <Text
            variant="mono-sm"
            className={type === "buy" ? "text-profit" : "text-loss"}
          >
            {ticker}
          </Text>
          <Text variant="caption">•</Text>
          <Text variant="caption">{amount}</Text>
        </View>
      </View>

      {/* Change */}
      <View className="items-end">
        <Text
          variant="mono"
          className={isPositive ? "text-profit" : "text-loss"}
        >
          {change}
        </Text>
      </View>
    </View>
  );
}
