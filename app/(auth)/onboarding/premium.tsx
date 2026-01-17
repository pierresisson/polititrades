import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Animated, { FadeInDown, SlideInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { haptics } from "@/lib/haptics";
import { usePaywallStore, useSettingsStore } from "@/lib/store";

export default function OnboardingScreen4() {
  const router = useRouter();
  const { t } = useTranslation();
  const [showPaywall, setShowPaywall] = useState(false);
  const { startTrial } = usePaywallStore();
  const { setHasCompletedOnboarding } = useSettingsStore();

  const handleShowPaywall = () => {
    haptics.light();
    setShowPaywall(true);
  };

  const handleStartTrial = () => {
    haptics.light();
    startTrial(168); // 7 jours
    setHasCompletedOnboarding(true);
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
    router.replace("/(tabs)");
  };

  if (!showPaywall) {
    // Écran 4 initial
    return (
      <View className="flex-1 bg-background px-6 pt-16">
        {/* Punchline hero */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="mb-8"
        >
          <Text variant="h1" align="center" className="mb-3">
            {t("onboarding.screen4.title")}
          </Text>
          <Text variant="body" align="center" className="text-text-secondary px-4">
            {t("onboarding.screen4.subtitle")}
          </Text>
        </Animated.View>

        {/* Illustration ou badge "Données officielles" */}
        <Animated.View
          entering={SlideInUp.delay(200).springify()}
          className="items-center mb-auto"
        >
          <View className="bg-primary/10 px-6 py-3 rounded-full">
            <Text variant="label" className="text-primary">
              Données officielles • Zéro spéculation
            </Text>
          </View>
        </Animated.View>

        {/* CTA + Skip */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="pb-8"
        >
          <Button
            label={t("onboarding.screen4.cta")}
            variant="accent"
            size="lg"
            onPress={handleShowPaywall}
            className="w-full mb-4"
          />

          <Button
            label={t("onboarding.screen4.skip")}
            variant="ghost"
            size="md"
            onPress={handleSkip}
          />
        </Animated.View>
      </View>
    );
  }

  // Paywall inline (après "Démarrer")
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-6 pt-16 pb-8">
        {/* Titre paywall */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="mb-6"
        >
          <Text variant="h2" align="center" className="mb-2">
            {t("onboarding.paywall.title")}
          </Text>
        </Animated.View>

        {/* Features list */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="mb-6"
        >
          <Card variant="default" padding="lg">
            <FeatureItem text={t("onboarding.paywall.feature1")} />
            <FeatureItem text={t("onboarding.paywall.feature2")} />
            <FeatureItem text={t("onboarding.paywall.feature3")} />
          </Card>
        </Animated.View>

        {/* Prix */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="mb-6"
        >
          <Text variant="h3" align="center" className="mb-2">
            {t("onboarding.paywall.price")}
          </Text>
          <Text variant="caption" align="center" className="text-text-tertiary">
            {t("onboarding.paywall.trust")}
          </Text>
        </Animated.View>

        {/* CTA + Skip */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
        >
          <Button
            label={t("onboarding.paywall.cta")}
            variant="primary"
            size="lg"
            onPress={handleStartTrial}
            className="w-full mb-4"
          />

          <Button
            label={t("onboarding.paywall.skip")}
            variant="ghost"
            size="md"
            onPress={handleSkip}
          />
        </Animated.View>
      </View>
    </ScrollView>
  );
}

// Composant helper pour features
function FeatureItem({ text }: { text: string }) {
  return (
    <View className="flex-row items-center gap-3 mb-4 last:mb-0">
      <View className="w-6 h-6 bg-primary rounded-full items-center justify-center">
        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
      </View>
      <Text variant="body" className="flex-1">{text}</Text>
    </View>
  );
}
