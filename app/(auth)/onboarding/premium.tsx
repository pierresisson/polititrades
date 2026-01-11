import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeInUp, ZoomIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useSettingsStore, usePaywallStore } from "@/lib/store";

const PRICING = {
  monthly: "€14,90",
  yearly: "€149",
  yearlyPerMonth: "€12,40",
  yearlySavings: "17",
};

export default function TrialStartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const setHasCompletedOnboarding = useSettingsStore(
    (state) => state.setHasCompletedOnboarding
  );
  const startTrial = usePaywallStore((state) => state.startTrial);

  const handleStartTrial = () => {
    startTrial(168); // 7 days trial
    setHasCompletedOnboarding(true);
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
    router.replace("/(tabs)");
  };

  const handleBack = () => {
    router.back();
  };

  const trialFeatures = [
    { key: "unlimitedTrades", icon: "infinite" as const },
    { key: "fullProfiles", icon: "person" as const },
    { key: "realTimeAlerts", icon: "flash" as const },
    { key: "historicalData", icon: "time" as const },
    { key: "advancedFilters", icon: "options" as const },
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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={16} color="#A1A1AA" />
          <Text variant="secondary-xs">{t("onboarding.back")}</Text>
        </Pressable>
        <View className="flex-row items-center gap-1">
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
        </View>
        <Pressable
          onPress={handleSkip}
          className="active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text variant="secondary-xs">{t("onboarding.trialStart.skip")}</Text>
        </Pressable>
      </Animated.View>

      <View className="h-px bg-background-border" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* Trial Badge + Timer Preview */}
        <Animated.View
          entering={ZoomIn.delay(150).duration(300)}
          className="items-center pt-8 pb-6"
        >
          <View className="w-14 h-14 rounded-2xl bg-primary/15 items-center justify-center mb-4">
            <Ionicons name="time" size={28} color="#0D9488" />
          </View>
          <Badge
            label={t("onboarding.trialStart.badge")}
            variant="primary"
            size="sm"
            className="mb-3"
          />
          <Text variant="h2" align="center" className="mb-2">
            {t("onboarding.trialStart.title")}
          </Text>
          <Text
            variant="mono-lg"
            className="text-primary font-inter-bold mb-2"
            accessibilityLabel={t("onboarding.trialStart.title")}
          >
            {t("onboarding.trialStart.countdownPreview")}
          </Text>
          <Text variant="secondary-sm" align="center">
            {t("onboarding.trialStart.subtitle")}
          </Text>
        </Animated.View>

        {/* What You Get Card */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(400)}
          className="px-4 mb-5"
        >
          <Card variant="default" padding="none">
            <View className="px-3 py-2.5 border-b border-background-border">
              <Text variant="label">
                {t("onboarding.trialStart.whatYouGetLabel")}
              </Text>
            </View>
            {trialFeatures.map((feature, index) => (
              <View
                key={feature.key}
                className={`flex-row items-center px-3 py-2.5 ${
                  index < trialFeatures.length - 1
                    ? "border-b border-background-border/50"
                    : ""
                }`}
              >
                <Ionicons
                  name={feature.icon}
                  size={16}
                  color="#0D9488"
                  style={{ marginRight: 12 }}
                />
                <Text variant="body-sm">
                  {t(`onboarding.trialStart.features.${feature.key}`)}
                </Text>
                <View className="flex-1" />
                <Ionicons name="checkmark-circle" size={18} color="#34D399" />
              </View>
            ))}
          </Card>
        </Animated.View>

        {/* After Trial Card */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(400)}
          className="px-4 mb-5"
        >
          <Card variant="subtle" padding="md">
            <Text variant="label" className="mb-3">
              {t("onboarding.trialStart.afterTrialLabel")}
            </Text>
            <View className="flex-row gap-3">
              {/* Monthly */}
              <View className="flex-1">
                <Text variant="secondary-sm" className="mb-1">
                  {t("onboarding.trialStart.monthly")}
                </Text>
                <Text variant="body" className="font-inter-semibold">
                  {t("onboarding.trialStart.monthlyPrice", {
                    price: PRICING.monthly,
                  })}
                </Text>
              </View>
              {/* Yearly */}
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text variant="secondary-sm">
                    {t("onboarding.trialStart.yearly")}
                  </Text>
                  <Badge
                    label={t("onboarding.trialStart.yearlySavings", {
                      percent: PRICING.yearlySavings,
                    })}
                    variant="profit"
                    size="xs"
                  />
                </View>
                <Text variant="body" className="font-inter-semibold text-profit">
                  {t("onboarding.trialStart.yearlyPrice", {
                    price: PRICING.yearly,
                  })}
                </Text>
                <Text variant="caption">
                  {t("onboarding.trialStart.yearlyPerMonth", {
                    price: PRICING.yearlyPerMonth,
                  })}
                </Text>
              </View>
            </View>
            <Text variant="caption" className="mt-3 text-text-muted">
              {t("onboarding.trialStart.cancelAnytime")}
            </Text>
          </Card>
        </Animated.View>

        {/* Trust Indicators */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(400)}
          className="px-4"
        >
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="shield-checkmark" size={14} color="#71717A" />
            <Text variant="caption" className="text-text-muted">
              {t("onboarding.trialStart.trustPayment")}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="lock-closed" size={14} color="#71717A" />
            <Text variant="caption" className="text-text-muted">
              {t("onboarding.trialStart.trustPrivacy")}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTAs */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-background border-t border-background-border">
        <Button
          label={t("onboarding.trialStart.cta")}
          variant="accent"
          size="lg"
          onPress={handleStartTrial}
          className="w-full mb-2"
        />
        <Text variant="caption" align="center" className="text-text-muted">
          {t("onboarding.trialStart.ctaCaption")}
        </Text>
      </View>
    </View>
  );
}
