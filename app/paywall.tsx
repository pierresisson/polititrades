import { View, ScrollView, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  Headline,
  Button,
  FeatureList,
  TrialInfoCard,
  PricingComparison,
} from "@/components/ui";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { usePaywallStore } from "@/lib/store";

type PlanType = "monthly" | "yearly";

// Pricing configuration
const PRICING = {
  monthly: {
    price: "€14.90",
    period: "month",
  },
  yearly: {
    price: "€149",
    period: "year",
    pricePerMonth: "€12.42",
    savings: "17%",
  },
};

const TRIAL_FEATURES = [
  "Unlimited trade access",
  "All politician profiles",
  "Real-time alerts",
  "News & analysis",
];

export default function PaywallScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("yearly");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsPremium, closePaywall } = usePaywallStore();

  const handleClose = () => {
    haptics.light();
    router.back();
    closePaywall();
  };

  const handleSubscribe = async () => {
    haptics.medium();
    setIsLoading(true);

    // Simulate subscription process
    setTimeout(() => {
      setIsLoading(false);
      setIsPremium(true);
      router.back();
      closePaywall();
    }, 1500);
  };

  const handleRestorePurchases = () => {
    haptics.light();
    // Handle restore purchases
  };

  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <View className="flex-1 bg-background">
        {/* Close Button */}
        <Pressable
          onPress={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface-secondary items-center justify-center"
          style={{ top: insets.top + 8 }}
        >
          <Ionicons name="close" size={24} color={colors.text.DEFAULT} />
        </Pressable>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: insets.top + 60,
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-2xl bg-accent-subtle items-center justify-center mb-4">
              <Ionicons name="diamond" size={40} color={colors.accent.DEFAULT} />
            </View>
            <Headline level={1} align="center">
              {t("premium.unlockTitle")}
            </Headline>
            <Text variant="secondary-sm" align="center" className="mt-2">
              {t("premium.subtitle")}
            </Text>
          </View>

          {/* Trial Info */}
          <TrialInfoCard
            daysRemaining={7}
            features={TRIAL_FEATURES}
            className="mb-6"
          />

          {/* Pricing Options */}
          <View className="mb-6">
            <PricingComparison
              monthlyPrice={PRICING.monthly.price}
              yearlyPrice={PRICING.yearly.price}
              yearlyPricePerMonth={PRICING.yearly.pricePerMonth}
              savingsPercent={PRICING.yearly.savings}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
            />
          </View>

          {/* Features List */}
          <View className="mb-6">
            <Text variant="label" className="mb-3 text-text-secondary">
              {t("premium.features.realTimeAlerts").split(" ")[0]} Features
            </Text>
            <View className="bg-surface-primary rounded-2xl p-4">
              <FeatureList
                features={[
                  { text: t("premium.features.realTimeAlerts"), included: true },
                  { text: t("premium.features.advancedFilters"), included: true },
                  { text: t("premium.features.exportData"), included: true },
                  { text: t("premium.features.historicalData"), included: true },
                  { text: t("premium.features.prioritySupport"), included: true },
                  { text: t("premium.features.unlimitedWatchlist"), included: true },
                ]}
              />
            </View>
          </View>

          {/* Subscribe Button */}
          <Button
            label={t("premium.startTrial")}
            variant="primary"
            size="xl"
            onPress={handleSubscribe}
            loading={isLoading}
            className="mb-4"
          />

          {/* Trust Signals */}
          <View className="items-center gap-2 mb-6">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="shield-checkmark"
                size={16}
                color={colors.text.muted}
              />
              <Text variant="caption">{t("premium.trust.securePayment")}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="close-circle" size={16} color={colors.text.muted} />
              <Text variant="caption">{t("premium.trust.cancelAnytime")}</Text>
            </View>
          </View>

          {/* Restore Purchases */}
          <Pressable onPress={handleRestorePurchases} className="py-3">
            <Text
              variant="body-sm"
              align="center"
              className="text-primary underline"
            >
              {t("premium.restore")}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}
