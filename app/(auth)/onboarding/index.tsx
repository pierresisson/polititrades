import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { haptics } from "@/lib/haptics";

export default function OnboardingScreen1() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleContinue = () => {
    haptics.light();
    router.push("/(auth)/onboarding/alerts");
  };

  const handleSkip = () => {
    router.push("/(auth)/onboarding/premium");
  };

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      {/* Logo animé */}
      <Animated.View
        entering={ZoomIn.delay(100).springify()}
        className="items-center mb-12"
      >
        <View className="w-20 h-20 rounded-2xl bg-primary items-center justify-center">
          <Ionicons name="trending-up" size={40} color="#FFFFFF" />
        </View>
      </Animated.View>

      {/* Titre + Sous-titre */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        className="mb-6"
      >
        <Text variant="h1" align="center" className="mb-3">
          {t("onboarding.screen1.title")}
        </Text>
        <Text variant="body" align="center" className="text-text-secondary px-4">
          {t("onboarding.screen1.subtitle")}
        </Text>
      </Animated.View>

      {/* Badge "Sources SEC" */}
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        className="items-center mb-auto"
      >
        <Badge label="Sources SEC" variant="accent" size="md" />
      </Animated.View>

      {/* CTA + Skip */}
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        className="pb-8"
      >
        <Button
          label={t("onboarding.screen1.cta")}
          variant="primary"
          size="lg"
          onPress={handleContinue}
          className="w-full mb-4"
        />

        <Button
          label={t("onboarding.screen1.skip")}
          variant="ghost"
          size="md"
          onPress={handleSkip}
        />
      </Animated.View>
    </View>
  );
}
