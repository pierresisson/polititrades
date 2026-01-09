import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { useSettingsStore, usePaywallStore } from "@/lib/store";

export default function PremiumScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const setHasCompletedOnboarding = useSettingsStore(
    (state) => state.setHasCompletedOnboarding
  );
  const openPaywall = usePaywallStore((state) => state.openPaywall);

  const handleStartTrial = () => {
    setHasCompletedOnboarding(true);
    openPaywall();
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
    router.replace("/(tabs)");
  };

  const handleBack = () => {
    router.back();
  };

  const premiumFeatures = [
    { key: "realTimeAlerts", icon: "flash" as const },
    { key: "advancedFilters", icon: "options" as const },
    { key: "exportData", icon: "download" as const },
    { key: "historicalData", icon: "time" as const },
    { key: "prioritySupport", icon: "headset" as const },
  ];

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
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
        </View>
        <Pressable onPress={handleSkip} className="active:opacity-70">
          <Text variant="secondary-xs">{t("onboarding.skip")}</Text>
        </Pressable>
      </Animated.View>

      <View className="h-px bg-background-border" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Premium Badge - Compact */}
        <Animated.View
          entering={ZoomIn.delay(150).duration(300)}
          className="items-center pt-6 pb-4"
        >
          <View className="w-12 h-12 rounded-lg bg-accent/12 items-center justify-center mb-2">
            <Ionicons name="diamond" size={22} color="#F59E0B" />
          </View>
          <Badge label="PREMIUM" variant="accent" size="sm" />
        </Animated.View>

        {/* Header */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(400)}
          className="px-4 items-center mb-4"
        >
          <Text variant="h2" align="center" className="mb-1">
            {t("onboarding.premium.title")}
          </Text>
          <Text variant="secondary-sm" align="center">
            {t("onboarding.premium.subtitle")}
          </Text>
        </Animated.View>

        {/* Features List - Compact */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(400)}
          className="px-4 mb-5"
        >
          <View className="bg-background-card border border-background-border rounded-md overflow-hidden">
            {premiumFeatures.map((feature, index) => (
              <View
                key={feature.key}
                className={`flex-row items-center px-3 py-2.5 ${
                  index < premiumFeatures.length - 1
                    ? "border-b border-background-border/50"
                    : ""
                }`}
              >
                <View className="w-5 h-5 rounded bg-accent/12 items-center justify-center mr-2.5">
                  <Ionicons name={feature.icon} size={11} color="#F59E0B" />
                </View>
                <Text variant="body-sm">
                  {t(`premium.features.${feature.key}`)}
                </Text>
                <View className="flex-1" />
                <Ionicons name="checkmark" size={14} color="#34D399" />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Pricing Cards - Side by side, compact */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(400)}
          className="px-4"
        >
          <View className="flex-row gap-2">
            {/* Monthly */}
            <Pressable className="flex-1 bg-background-card border border-background-border rounded-md p-3 active:opacity-80">
              <Text variant="label" className="mb-2">
                {t("onboarding.premium.monthly")}
              </Text>
              <Text variant="h3" className="text-text mb-0.5">
                {t("premium.price")}
              </Text>
              <Text variant="caption">{t("onboarding.premium.perMonth")}</Text>
            </Pressable>

            {/* Yearly - Recommended */}
            <Pressable className="flex-1 bg-background-card border-2 border-accent rounded-md p-3 relative active:opacity-80">
              <Badge
                label={t("onboarding.premium.save")}
                variant="accent"
                size="xs"
                className="absolute -top-2 right-2"
              />
              <Text variant="label" className="mb-2 mt-1">
                {t("onboarding.premium.yearly")}
              </Text>
              <Text variant="h3" className="text-accent mb-0.5">
                {t("premium.priceYearly")}
              </Text>
              <Text variant="caption">~€5/mo</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Trust Indicators */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(400)}
          className="px-4 mt-4"
        >
          <View className="flex-row items-center justify-center gap-4">
            <View className="flex-row items-center gap-1">
              <Ionicons name="shield-checkmark-outline" size={11} color="#71717A" />
              <Text variant="caption">
                {t("onboarding.premium.cancelAnytime")}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-center mt-1.5">
            <Ionicons name="lock-closed-outline" size={11} color="#71717A" />
            <Text variant="caption" className="ml-1">
              {t("onboarding.premium.securePayment")}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTAs - Compact */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-3 bg-background border-t border-background-border">
        <Button
          label={t("premium.startTrial")}
          variant="accent"
          size="lg"
          onPress={handleStartTrial}
          className="w-full mb-2"
          leftIcon={<Ionicons name="sparkles" size={13} color="#09090B" />}
        />
        <Pressable
          onPress={handleSkip}
          className="py-2 items-center active:opacity-70"
        >
          <Text variant="secondary-xs">{t("onboarding.skip")}</Text>
        </Pressable>
      </View>
    </View>
  );
}
