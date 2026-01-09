import { View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
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

const { width, height } = Dimensions.get("window");

// Mock live trades data - shorter names to fit
const LIVE_TRADES = [
  { initials: "NP", name: "N. Pelosi", ticker: "NVDA", type: "buy" as const, amount: "$1M+", change: "+18.2%" },
  { initials: "TT", name: "T. Tuberville", ticker: "AAPL", type: "buy" as const, amount: "$500K", change: "+5.4%" },
  { initials: "DC", name: "D. Crenshaw", ticker: "TSLA", type: "sell" as const, amount: "$250K", change: "-3.1%" },
];

export default function WelcomeScreen() {
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
      {/* Background gradient */}
      <LinearGradient
        colors={["#09090B", "#111113", "#09090B"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Subtle accent glow at top */}
      <View
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
        style={{ backgroundColor: "#0D9488", filter: "blur(100px)" }}
      />

      {/* Content */}
      <View className="flex-1 px-6 pt-16 pb-6">

        {/* Hero Section */}
        <View className="items-center mb-8">
          {/* Logo */}
          <Animated.View
            entering={ZoomIn.delay(100).springify()}
            className="mb-6"
          >
            <View className="w-20 h-20 rounded-2xl bg-primary items-center justify-center">
              <Ionicons name="trending-up" size={40} color="#FAFAFA" />
            </View>
          </Animated.View>

          {/* Live indicator */}
          <Animated.View
            entering={FadeIn.delay(300)}
            className="flex-row items-center gap-2 mb-6"
          >
            <Animated.View style={pulseStyle}>
              <View className="w-2 h-2 rounded-full bg-profit" />
            </Animated.View>
            <Text variant="label" className="text-profit">
              Live Data Feed
            </Text>
          </Animated.View>

          {/* App name */}
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Text variant="h1" align="center" className="mb-2">
              PolitiTrades
            </Text>
          </Animated.View>

          {/* Tagline */}
          <Animated.View entering={FadeInDown.delay(450).springify()}>
            <Text variant="h3" align="center" className="mb-3 text-text-secondary">
              Track What Politicians Trade
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).springify()}>
            <Text variant="secondary" align="center" className="max-w-[300px]">
              Real-time alerts when Congress members buy or sell stocks
            </Text>
          </Animated.View>
        </View>

        {/* Live Trades Feed - The hook */}
        <Animated.View
          entering={SlideInUp.delay(700).springify()}
          className="mb-6"
        >
          <View className="bg-background-card border border-background-border rounded-xl overflow-hidden">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-background-border">
              <View className="flex-row items-center gap-2">
                <Ionicons name="pulse" size={16} color="#34D399" />
                <Text variant="body-sm" className="font-semibold">Recent Filings</Text>
              </View>
              <Badge label="LIVE" variant="profit" size="sm" />
            </View>

            {/* Trades list */}
            <View>
              {LIVE_TRADES.map((trade, index) => (
                <Animated.View
                  key={trade.ticker}
                  entering={FadeInUp.delay(900 + index * 150).springify()}
                >
                  <TradeRow {...trade} isLast={index === LIVE_TRADES.length - 1} />
                </Animated.View>
              ))}
            </View>

            {/* Footer teaser */}
            <View className="px-4 py-3 bg-surface-secondary/30">
              <Text variant="caption" className="text-center">
                +2,847 trades tracked this month
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Bottom CTA */}
        <Animated.View
          entering={FadeInUp.delay(1200).springify()}
          className="pt-6"
        >
          <Button
            label="Get Started"
            variant="accent"
            size="md"
            onPress={handleNext}
            className="w-full mb-4"
            rightIcon={<Ionicons name="arrow-forward" size={16} color="#09090B" />}
          />
          <Text variant="caption" align="center">
            Free to browse • Premium for alerts
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
    >
      {/* Avatar */}
      <View className="w-10 h-10 rounded-full bg-surface-secondary items-center justify-center mr-3">
        <Text variant="body-sm" className="font-bold text-text-secondary">
          {initials}
        </Text>
      </View>

      {/* Info */}
      <View className="flex-1 mr-3">
        <View className="flex-row items-center mb-0.5">
          <Text variant="body-sm" className="font-semibold">{name}</Text>
          <View className="ml-2">
            <TradeBadge type={type} size="xs" />
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <Text variant="mono-sm" className={type === "buy" ? "text-profit" : "text-loss"}>
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
        <Text variant="caption">since filing</Text>
      </View>
    </View>
  );
}
