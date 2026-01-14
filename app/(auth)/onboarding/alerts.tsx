import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown, SlideInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { haptics } from "@/lib/haptics";

export default function OnboardingScreen2() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleContinue = () => {
    haptics.light();
    router.push("/(auth)/onboarding/filters");
  };

  const handleSkip = () => {
    haptics.light();
    router.push("/(auth)/onboarding/premium");
  };

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      {/* Icon Bell */}
      <Animated.View
        entering={SlideInRight.delay(100).springify()}
        className="items-center mb-8"
      >
        <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center">
          <Ionicons name="notifications" size={40} color="#7C3AED" />
        </View>
      </Animated.View>

      {/* Titre + Sous-titre */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        className="mb-8"
      >
        <Text variant="h2" align="center" className="mb-3">
          {t("onboarding.screen2.title")}
        </Text>
        <Text variant="body" align="center" className="text-text-secondary px-4">
          {t("onboarding.screen2.subtitle")}
        </Text>
      </Animated.View>

      {/* Mock notification card */}
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        className="mb-auto"
      >
        <Card variant="default" padding="md">
          <View className="flex-row items-center gap-3">
            <View className="w-2 h-2 bg-profit rounded-full" />
            <View className="flex-1">
              <Text variant="label" className="mb-1">Nancy Pelosi</Text>
              <Text variant="body-sm" className="text-text-secondary">
                Achat NVDA • $500k - $1M
              </Text>
              <Text variant="caption" className="text-text-tertiary mt-1">
                Il y a 2 minutes
              </Text>
            </View>
          </View>
        </Card>
      </Animated.View>

      {/* CTA + Skip */}
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        className="pb-8"
      >
        <Button
          label={t("onboarding.screen2.cta")}
          variant="primary"
          size="lg"
          onPress={handleContinue}
          className="w-full mb-4"
        />

        <Pressable onPress={handleSkip} className="py-2">
          <Text variant="body-sm" align="center" className="text-text-tertiary">
            {t("onboarding.screen2.skip")}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
