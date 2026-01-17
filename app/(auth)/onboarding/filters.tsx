import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown, SlideInLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/FilterChip";
import { haptics } from "@/lib/haptics";

export default function OnboardingScreen3() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleContinue = () => {
    haptics.light();
    router.push("/(auth)/onboarding/premium");
  };

  const handleSkip = () => {
    router.push("/(auth)/onboarding/premium");
  };

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      {/* Icon Filter */}
      <Animated.View
        entering={SlideInLeft.delay(100).springify()}
        className="items-center mb-8"
      >
        <View className="w-20 h-20 bg-accent/10 rounded-full items-center justify-center">
          <Ionicons name="options" size={40} color="#F97316" />
        </View>
      </Animated.View>

      {/* Titre + Sous-titre */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        className="mb-8"
      >
        <Text variant="h2" align="center" className="mb-3">
          {t("onboarding.screen3.title")}
        </Text>
        <Text variant="body" align="center" className="text-text-secondary px-4">
          {t("onboarding.screen3.subtitle")}
        </Text>
      </Animated.View>

      {/* Mock filter chips */}
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        className="mb-auto"
      >
        <View className="flex-row flex-wrap gap-2 justify-center">
          <FilterChip label="Démocrates" selected={true} onPress={() => {}} />
          <FilterChip label="Tech" selected={true} onPress={() => {}} />
          <FilterChip label=">$100k" selected={true} onPress={() => {}} />
          <FilterChip label="Républicains" selected={false} onPress={() => {}} />
        </View>
      </Animated.View>

      {/* CTA + Skip */}
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        className="pb-8"
      >
        <Button
          label={t("onboarding.screen3.cta")}
          variant="primary"
          size="lg"
          onPress={handleContinue}
          className="w-full mb-4"
        />

        <Button
          label={t("onboarding.screen3.skip")}
          variant="ghost"
          size="md"
          onPress={handleSkip}
        />
      </Animated.View>
    </View>
  );
}
