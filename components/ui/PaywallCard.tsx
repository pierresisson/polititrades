import { View, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Badge } from "./Badge";
import { haptics } from "@/lib/haptics";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

interface PaywallCardProps {
  plan: "monthly" | "yearly";
  price: string;
  period: string;
  pricePerMonth?: string;
  savings?: string;
  isSelected?: boolean;
  isRecommended?: boolean;
  onSelect: () => void;
  className?: string;
}

export function PaywallCard({
  plan,
  price,
  period,
  pricePerMonth,
  savings,
  isSelected = false,
  isRecommended = false,
  onSelect,
  className,
}: PaywallCardProps) {
  const handlePress = () => {
    haptics.light();
    onSelect();
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        "rounded-2xl border-2 overflow-hidden",
        isSelected
          ? "border-primary bg-primary-subtle"
          : "border-background-border bg-surface-primary",
        "active:opacity-90",
        className
      )}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <View className="bg-primary py-1.5 px-3">
          <Text
            variant="label"
            className="text-white text-center normal-case"
          >
            Best Value
          </Text>
        </View>
      )}

      <View className="p-4">
        {/* Plan name */}
        <Text variant="label" className="text-text-secondary mb-2">
          {plan === "yearly" ? "Yearly" : "Monthly"}
        </Text>

        {/* Price */}
        <View className="flex-row items-baseline mb-1">
          <Text variant="h2" className="font-inter-bold">
            {price}
          </Text>
          <Text variant="secondary-sm" className="ml-1">
            /{period}
          </Text>
        </View>

        {/* Price per month for yearly */}
        {pricePerMonth && (
          <Text variant="secondary-sm" className="mb-2">
            {pricePerMonth}/month
          </Text>
        )}

        {/* Savings badge */}
        {savings && (
          <Badge
            label={`Save ${savings}`}
            variant="profit"
            size="sm"
            className="self-start"
          />
        )}

        {/* Selection indicator */}
        <View className="absolute top-4 right-4">
          <View
            className={cn(
              "w-6 h-6 rounded-full border-2 items-center justify-center",
              isSelected
                ? "border-primary bg-primary"
                : "border-background-border bg-transparent"
            )}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={14} color="white" />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// Feature list item
interface FeatureItemProps {
  text: string;
  included?: boolean;
}

export function FeatureItem({ text, included = true }: FeatureItemProps) {
  return (
    <View className="flex-row items-center py-2">
      <View
        className={cn(
          "w-5 h-5 rounded-full items-center justify-center mr-3",
          included ? "bg-primary-subtle" : "bg-surface-secondary"
        )}
      >
        <Ionicons
          name={included ? "checkmark" : "close"}
          size={12}
          color={included ? colors.primary.DEFAULT : colors.text.muted}
        />
      </View>
      <Text
        variant="body-sm"
        className={cn(!included && "text-text-muted line-through")}
      >
        {text}
      </Text>
    </View>
  );
}

// Feature list
interface FeatureListProps {
  features: Array<{
    text: string;
    included?: boolean;
  }>;
  className?: string;
}

export function FeatureList({ features, className }: FeatureListProps) {
  return (
    <View className={className}>
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          text={feature.text}
          included={feature.included}
        />
      ))}
    </View>
  );
}

// Premium badge/banner
interface PremiumBadgeProps {
  variant?: "small" | "large";
  className?: string;
}

export function PremiumBadge({ variant = "small", className }: PremiumBadgeProps) {
  if (variant === "large") {
    return (
      <View
        className={cn(
          "flex-row items-center gap-2 bg-accent-subtle px-4 py-2 rounded-full",
          className
        )}
      >
        <Ionicons name="diamond" size={20} color={colors.accent.DEFAULT} />
        <Text variant="label" className="text-accent normal-case">
          Premium
        </Text>
      </View>
    );
  }

  return (
    <View
      className={cn(
        "flex-row items-center gap-1 bg-accent-subtle px-2 py-0.5 rounded",
        className
      )}
    >
      <Ionicons name="diamond" size={12} color={colors.accent.DEFAULT} />
      <Text variant="caption" className="text-accent font-inter-medium">
        PRO
      </Text>
    </View>
  );
}

// Premium feature gate overlay
interface PremiumGateProps {
  title?: string;
  description?: string;
  onUpgrade: () => void;
  className?: string;
}

export function PremiumGate({
  title = "Premium Feature",
  description = "Upgrade to access this feature",
  onUpgrade,
  className,
}: PremiumGateProps) {
  return (
    <View
      className={cn(
        "absolute inset-0 bg-background/90 items-center justify-center p-6",
        className
      )}
    >
      <View className="items-center">
        <View className="w-16 h-16 rounded-full bg-accent-subtle items-center justify-center mb-4">
          <Ionicons name="lock-closed" size={28} color={colors.accent.DEFAULT} />
        </View>
        <Text variant="h3" align="center" className="mb-2">
          {title}
        </Text>
        <Text variant="secondary-sm" align="center" className="mb-6 max-w-[240px]">
          {description}
        </Text>
        <Pressable
          onPress={() => {
            haptics.light();
            onUpgrade();
          }}
          className="bg-accent px-6 py-3 rounded-xl active:opacity-90"
        >
          <Text variant="body" className="text-text-inverse font-inter-semibold">
            Upgrade to Premium
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Pricing comparison for A/B variant
interface PricingComparisonProps {
  monthlyPrice: string;
  yearlyPrice: string;
  yearlyPricePerMonth: string;
  savingsPercent: string;
  selected: "monthly" | "yearly";
  onSelect: (plan: "monthly" | "yearly") => void;
  className?: string;
}

export function PricingComparison({
  monthlyPrice,
  yearlyPrice,
  yearlyPricePerMonth,
  savingsPercent,
  selected,
  onSelect,
  className,
}: PricingComparisonProps) {
  return (
    <View className={cn("gap-3", className)}>
      <PaywallCard
        plan="yearly"
        price={yearlyPrice}
        period="year"
        pricePerMonth={yearlyPricePerMonth}
        savings={savingsPercent}
        isSelected={selected === "yearly"}
        isRecommended
        onSelect={() => onSelect("yearly")}
      />

      <PaywallCard
        plan="monthly"
        price={monthlyPrice}
        period="month"
        isSelected={selected === "monthly"}
        onSelect={() => onSelect("monthly")}
      />
    </View>
  );
}
