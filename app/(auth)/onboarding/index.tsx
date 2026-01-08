import { View, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = () => {
    router.push("/(auth)/onboarding/features");
  };

  return (
    <View className="flex-1 px-6">
      {/* Hero Illustration Area */}
      <View className="flex-1 items-center justify-center">
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          {/* App Icon / Logo */}
          <View className="w-24 h-24 rounded-3xl bg-primary items-center justify-center mb-6">
            <Ionicons name="trending-up" size={48} color="#F0F6FC" />
          </View>

          {/* Decorative Chart Lines */}
          <View className="absolute -z-10 opacity-20">
            <LinearGradient
              colors={["transparent", "#1E3A5F", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: width * 0.8, height: 2, marginVertical: 20 }}
            />
          </View>
        </Animated.View>

        {/* Main Text */}
        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          className="items-center mt-8"
        >
          <Text variant="h1" align="center" className="mb-4">
            {t("onboarding.welcome.title")}
          </Text>
          <Text variant="secondary" align="center" className="px-4">
            {t("onboarding.welcome.subtitle")}
          </Text>
        </Animated.View>

        {/* Feature Highlights */}
        <Animated.View
          entering={FadeInUp.delay(600).springify()}
          className="mt-12 w-full"
        >
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-profit-muted items-center justify-center mr-4">
              <Ionicons name="notifications" size={20} color="#00C853" />
            </View>
            <Text variant="body" className="flex-1">
              {t("onboarding.welcome.feature1")}
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-4">
              <Ionicons name="people" size={20} color="#2D5A8A" />
            </View>
            <Text variant="body" className="flex-1">
              {t("onboarding.welcome.feature2")}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-4">
              <Ionicons name="analytics" size={20} color="#FFB800" />
            </View>
            <Text variant="body" className="flex-1">
              {t("onboarding.welcome.feature3")}
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(800).springify()} className="pb-6">
        <Button
          label={t("onboarding.continue")}
          size="xl"
          onPress={handleNext}
          rightIcon={<Ionicons name="arrow-forward" size={20} color="#FFF" />}
        />
      </Animated.View>
    </View>
  );
}
