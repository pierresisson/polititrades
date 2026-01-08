import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
  badge?: string;
  delay: number;
}

function FeatureCard({
  icon,
  iconColor,
  iconBgColor,
  title,
  description,
  badge,
  delay,
}: FeatureCardProps) {
  return (
    <Animated.View entering={FadeInRight.delay(delay).springify()}>
      <Card variant="gradient" className="mb-4">
        <View className="flex-row">
          <View
            className="w-12 h-12 rounded-xl items-center justify-center mr-4"
            style={{ backgroundColor: iconBgColor }}
          >
            <Ionicons name={icon} size={24} color={iconColor} />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text variant="h4" className="mr-2">
                {title}
              </Text>
              {badge && <Badge label={badge} variant="accent" size="sm" />}
            </View>
            <Text variant="secondary-sm">{description}</Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  );
}

export default function FeaturesScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = () => {
    router.push("/(auth)/onboarding/premium");
  };

  const handleBack = () => {
    router.back();
  };

  const features = [
    {
      icon: "flash" as const,
      iconColor: "#00C853",
      iconBgColor: "#1B4D3E",
      title: t("onboarding.features.realTimeAlerts.title"),
      description: t("onboarding.features.realTimeAlerts.description"),
      badge: "LIVE",
    },
    {
      icon: "search" as const,
      iconColor: "#2D5A8A",
      iconBgColor: "rgba(30, 58, 95, 0.2)",
      title: t("onboarding.features.smartSearch.title"),
      description: t("onboarding.features.smartSearch.description"),
    },
    {
      icon: "stats-chart" as const,
      iconColor: "#FFB800",
      iconBgColor: "rgba(255, 184, 0, 0.2)",
      title: t("onboarding.features.analytics.title"),
      description: t("onboarding.features.analytics.description"),
    },
    {
      icon: "time" as const,
      iconColor: "#8B949E",
      iconBgColor: "#21262D",
      title: t("onboarding.features.historical.title"),
      description: t("onboarding.features.historical.description"),
    },
  ];

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="mt-4 mb-8"
        >
          <Text variant="h2" className="mb-2">
            {t("onboarding.features.title")}
          </Text>
          <Text variant="secondary">{t("onboarding.features.subtitle")}</Text>
        </Animated.View>

        {/* Feature Cards */}
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            delay={300 + index * 100}
          />
        ))}

        {/* Example Trade Card */}
        <Animated.View entering={FadeInUp.delay(800).springify()}>
          <Text variant="label" className="mb-3 mt-4">
            {t("onboarding.features.exampleAlert")}
          </Text>
          <Card className="border-l-2 border-l-profit">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text variant="body" className="font-semibold mr-2">
                    Nancy Pelosi
                  </Text>
                  <Badge label="BUY" variant="buy" size="sm" />
                </View>
                <Text variant="mono" className="text-profit mb-1">
                  NVDA - NVIDIA Corp
                </Text>
                <Text variant="caption">$500K - $1M | Dec 15, 2024</Text>
              </View>
              <View className="items-end">
                <Text variant="profit">+12.4%</Text>
                <Text variant="caption">{t("onboarding.features.sinceFiling")}</Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <Animated.View
        entering={FadeInUp.delay(1000).springify()}
        className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-background"
      >
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
            size="lg"
            onPress={handleNext}
            className="flex-[2]"
            rightIcon={<Ionicons name="arrow-forward" size={18} color="#FFF" />}
          />
        </View>
      </Animated.View>
    </View>
  );
}
