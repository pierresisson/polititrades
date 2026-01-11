import { View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { colors } from "@/constants/theme";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface FeaturePillProps {
  icon: IoniconsName;
  label: string;
  iconColor?: string;
  className?: string;
}

export function FeaturePill({
  icon,
  label,
  iconColor = colors.primary.DEFAULT,
  className,
}: FeaturePillProps) {
  return (
    <View
      className={cn(
        "flex-row items-center gap-1.5 px-3 py-2 rounded-full bg-surface-secondary/50",
        className
      )}
    >
      <Ionicons name={icon} size={14} color={iconColor} />
      <Text variant="caption" className="text-text-secondary">
        {label}
      </Text>
    </View>
  );
}

interface FeaturePillsRowProps {
  features: Array<{
    icon: IoniconsName;
    label: string;
    iconColor?: string;
  }>;
  className?: string;
}

export function FeaturePillsRow({ features, className }: FeaturePillsRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
      className={cn("-mx-4", className)}
    >
      {features.map((feature, index) => (
        <FeaturePill
          key={index}
          icon={feature.icon}
          label={feature.label}
          iconColor={feature.iconColor}
        />
      ))}
    </ScrollView>
  );
}

// Grid layout for feature pills
interface FeaturePillsGridProps {
  features: Array<{
    icon: IoniconsName;
    label: string;
    iconColor?: string;
  }>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeaturePillsGrid({
  features,
  columns = 2,
  className,
}: FeaturePillsGridProps) {
  const gapClass = columns === 2 ? "gap-2" : columns === 3 ? "gap-1.5" : "gap-1";

  return (
    <View className={cn("flex-row flex-wrap", gapClass, className)}>
      {features.map((feature, index) => (
        <FeaturePill
          key={index}
          icon={feature.icon}
          label={feature.label}
          iconColor={feature.iconColor}
        />
      ))}
    </View>
  );
}
