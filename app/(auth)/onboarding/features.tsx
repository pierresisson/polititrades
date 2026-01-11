import { View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, FadeInUp, SlideInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import {
  FeaturedTradeCard,
  FEATURED_TRADE_MOCK,
} from "@/components/ui/FeaturedTradeCard";
import { FeaturePillsRow } from "@/components/ui/FeaturePill";
import { colors } from "@/constants/theme";

export default function ValueShowcaseScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = () => {
    router.push("/(auth)/onboarding/premium");
  };

  const handleBack = () => {
    router.back();
  };

  // Feature pills data
  const features = [
    {
      icon: "flash" as const,
      label: t("onboarding.valueShowcase.features.realTimeAlerts"),
      iconColor: colors.profit.DEFAULT,
    },
    {
      icon: "options" as const,
      label: t("onboarding.valueShowcase.features.advancedFilters"),
      iconColor: colors.primary.DEFAULT,
    },
    {
      icon: "shield-checkmark" as const,
      label: t("onboarding.valueShowcase.features.secData"),
      iconColor: colors.info.DEFAULT,
    },
    {
      icon: "download" as const,
      label: t("onboarding.valueShowcase.features.exportCsv"),
      iconColor: colors.accent.DEFAULT,
    },
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
          className="px-4 pt-6 pb-4"
        >
          <Text variant="label" className="mb-2 text-primary">
            {t("onboarding.valueShowcase.label")}
          </Text>
          <Text variant="h2" className="mb-1">
            {t("onboarding.valueShowcase.title")}
          </Text>
          <Text variant="secondary-sm">
            {t("onboarding.valueShowcase.subtitle")}
          </Text>
        </Animated.View>

        {/* Featured Trade Card */}
        <Animated.View
          entering={SlideInUp.delay(300).springify()}
          className="px-4 mb-6"
        >
          <FeaturedTradeCard data={FEATURED_TRADE_MOCK} />
        </Animated.View>

        {/* Feature Pills */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(400)}
          className="mb-6"
        >
          <FeaturePillsRow features={features} />
        </Animated.View>

        {/* Disclaimer */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(400)}
          className="px-4"
        >
          <View className="flex-row items-center gap-2 bg-surface-secondary/20 rounded-lg p-3">
            <Ionicons name="information-circle-outline" size={16} color="#71717A" />
            <Text variant="caption" className="flex-1 text-text-muted">
              {t("onboarding.valueShowcase.disclaimer")}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-background border-t border-background-border">
        <View className="flex-row gap-3">
          <Button
            label={t("onboarding.back")}
            variant="ghost"
            size="lg"
            onPress={handleBack}
            className="flex-1"
          />
          <Button
            label={t("onboarding.continue")}
            variant="primary"
            size="lg"
            onPress={handleNext}
            className="flex-[2]"
            rightIcon={<Ionicons name="arrow-forward" size={16} color="#FFF" />}
          />
        </View>
      </View>
    </View>
  );
}
