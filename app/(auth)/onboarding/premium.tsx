import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useSettingsStore, usePaywallStore } from "@/lib/store";

interface PremiumFeatureProps {
  text: string;
  delay: number;
}

function PremiumFeature({ text, delay }: PremiumFeatureProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      className="flex-row items-center mb-4"
    >
      <View className="w-6 h-6 rounded-full bg-accent/20 items-center justify-center mr-3">
        <Ionicons name="checkmark" size={14} color="#FFB800" />
      </View>
      <Text variant="body" className="flex-1">
        {text}
      </Text>
    </Animated.View>
  );
}

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
    t("premium.features.realTimeAlerts"),
    t("premium.features.advancedFilters"),
    t("premium.features.exportData"),
    t("premium.features.historicalData"),
    t("premium.features.prioritySupport"),
  ];

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {/* Premium Badge */}
        <Animated.View
          entering={ZoomIn.delay(200).springify()}
          className="items-center mt-6 mb-6"
        >
          <View className="w-20 h-20 rounded-full bg-accent/20 items-center justify-center mb-4">
            <Ionicons name="diamond" size={40} color="#FFB800" />
          </View>
          <Badge label="PREMIUM" variant="accent" size="lg" />
        </Animated.View>

        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="items-center mb-8"
        >
          <Text variant="h1" align="center" className="mb-2">
            {t("onboarding.premium.title")}
          </Text>
          <Text variant="secondary" align="center">
            {t("onboarding.premium.subtitle")}
          </Text>
        </Animated.View>

        {/* Premium Features */}
        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <Card variant="gradient" className="mb-6">
            <Text variant="label" className="mb-4">
              {t("onboarding.premium.whatYouGet")}
            </Text>
            {premiumFeatures.map((feature, index) => (
              <PremiumFeature
                key={feature}
                text={feature}
                delay={500 + index * 100}
              />
            ))}
          </Card>
        </Animated.View>

        {/* Pricing Cards */}
        <Animated.View entering={FadeInUp.delay(800).springify()}>
          <View className="flex-row gap-3">
            {/* Monthly */}
            <Card className="flex-1 items-center">
              <Text variant="label" className="mb-2">
                {t("onboarding.premium.monthly")}
              </Text>
              <Text variant="h3" className="text-text">
                {t("premium.price")}
              </Text>
              <Text variant="caption">{t("onboarding.premium.perMonth")}</Text>
            </Card>

            {/* Yearly - Recommended */}
            <Card className="flex-1 items-center border-accent border-2">
              <Badge
                label={t("onboarding.premium.save")}
                variant="accent"
                size="sm"
                className="absolute -top-3"
              />
              <Text variant="label" className="mb-2 mt-2">
                {t("onboarding.premium.yearly")}
              </Text>
              <Text variant="h3" className="text-accent">
                {t("premium.priceYearly")}
              </Text>
              <Text variant="caption">12,42/mois</Text>
            </Card>
          </View>
        </Animated.View>

        {/* Trust Indicators */}
        <Animated.View
          entering={FadeInUp.delay(1000).springify()}
          className="mt-6 items-center"
        >
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={16} color="#8B949E" />
            <Text variant="caption" className="ml-2">
              {t("onboarding.premium.cancelAnytime")}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="lock-closed" size={16} color="#8B949E" />
            <Text variant="caption" className="ml-2">
              {t("onboarding.premium.securePayment")}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTAs */}
      <LinearGradient
        colors={["transparent", "#0D1117"]}
        className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-12"
      >
        <Animated.View entering={FadeInUp.delay(1100).springify()}>
          <Button
            label={t("premium.startTrial")}
            variant="accent"
            size="xl"
            onPress={handleStartTrial}
            className="mb-3"
            leftIcon={<Ionicons name="sparkles" size={20} color="#0D1117" />}
          />
          <Button
            label={t("onboarding.skip")}
            variant="ghost"
            size="lg"
            onPress={handleSkip}
            textClassName="text-text-secondary"
          />
        </Animated.View>

        {/* Back button */}
        <Animated.View
          entering={FadeInUp.delay(1200).springify()}
          className="absolute top-4 left-6"
        >
          <Button
            label={t("onboarding.back")}
            variant="ghost"
            size="sm"
            onPress={handleBack}
            leftIcon={<Ionicons name="arrow-back" size={16} color="#8B949E" />}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}
