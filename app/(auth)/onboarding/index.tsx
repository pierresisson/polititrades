import { View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { StatusDot } from "@/components/ui/Badge";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = () => {
    router.push("/(auth)/onboarding/features");
  };

  return (
    <View className="flex-1 bg-background px-4">
      {/* Top Bar - Minimal branding */}
      <Animated.View
        entering={FadeIn.delay(100)}
        className="flex-row items-center justify-between pt-3 pb-2"
      >
        <View className="flex-row items-center gap-2">
          <View className="w-6 h-6 rounded bg-primary/20 items-center justify-center">
            <Ionicons name="trending-up" size={14} color="#5B7A99" />
          </View>
          <Text variant="h5" className="tracking-tight">
            PolitiTrades
          </Text>
        </View>
        <StatusDot status="live" label="LIVE" />
      </Animated.View>

      {/* Divider */}
      <View className="h-px bg-background-border mb-6" />

      {/* Hero Section - Compact, editorial */}
      <View className="flex-1 justify-center">
        {/* Main headline */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <Text variant="label" className="mb-2">
            {t("common.welcome") || "INSIDER TRADING TRACKER"}
          </Text>
          <Text variant="h1" className="mb-3 leading-tight">
            {t("onboarding.welcome.title")}
          </Text>
          <Text variant="secondary-sm" className="mb-8 max-w-[280px]">
            {t("onboarding.welcome.subtitle")}
          </Text>
        </Animated.View>

        {/* Feature list - Compact inline */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(500)}
          className="gap-3"
        >
          <FeatureRow
            icon="flash-outline"
            text={t("onboarding.welcome.feature1")}
            color="#34D399"
            delay={500}
          />
          <FeatureRow
            icon="people-outline"
            text={t("onboarding.welcome.feature2")}
            color="#7C9AB8"
            delay={600}
          />
          <FeatureRow
            icon="analytics-outline"
            text={t("onboarding.welcome.feature3")}
            color="#F59E0B"
            delay={700}
          />
        </Animated.View>

        {/* Live data preview - Terminal style */}
        <Animated.View
          entering={SlideInRight.delay(800).duration(400)}
          className="mt-8 bg-background-card border border-background-border rounded-md p-3"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text variant="label">LATEST FILING</Text>
            <Text variant="caption">2m ago</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="w-6 h-6 rounded-full bg-surface-secondary items-center justify-center">
                <Text variant="caption" className="font-bold">NP</Text>
              </View>
              <View>
                <Text variant="body-sm" className="font-medium">N. Pelosi</Text>
                <Text variant="mono-xs" className="text-profit">NVDA</Text>
              </View>
            </View>
            <View className="items-end">
              <Text variant="mono-xs" className="text-text-secondary">$500K-1M</Text>
              <Text variant="profit-sm">+12.4%</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Bottom CTA - Compact */}
      <Animated.View
        entering={FadeInUp.delay(900).duration(400)}
        className="pb-4 pt-3"
      >
        <Button
          label={t("onboarding.continue")}
          size="lg"
          onPress={handleNext}
          className="w-full"
          rightIcon={<Ionicons name="arrow-forward" size={14} color="#FFF" />}
        />
        <Text variant="caption" align="center" className="mt-3">
          SEC Form 4 & PTR data updated daily
        </Text>
      </Animated.View>
    </View>
  );
}

function FeatureRow({
  icon,
  text,
  color,
  delay,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color: string;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(400)}
      className="flex-row items-center gap-2.5"
    >
      <View
        className="w-5 h-5 rounded items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Ionicons name={icon} size={12} color={color} />
      </View>
      <Text variant="body-sm">{text}</Text>
    </Animated.View>
  );
}
