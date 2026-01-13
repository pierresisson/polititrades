import { View, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { useEffect, useState } from "react";

interface TrialBannerProps {
  expiresAt: Date;
  onPress: () => void;
  variant?: "default" | "urgent" | "expired";
  className?: string;
}

// Calculate time remaining
function getTimeRemaining(expiresAt: Date): {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalHours: number;
} {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true, totalHours: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, isExpired: false, totalHours: hours };
}

export function TrialBanner({
  expiresAt,
  onPress,
  variant: variantProp,
  className,
}: TrialBannerProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // Auto-determine variant based on time remaining
  const variant =
    variantProp ||
    (timeRemaining.isExpired
      ? "expired"
      : timeRemaining.totalHours <= 4
      ? "urgent"
      : "default");

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  const formatTime = () => {
    if (timeRemaining.isExpired) {
      return "Expired";
    }

    if (timeRemaining.totalHours >= 24) {
      const days = Math.floor(timeRemaining.totalHours / 24);
      return `${days}d ${timeRemaining.hours % 24}h remaining`;
    }

    if (timeRemaining.totalHours >= 1) {
      return `${timeRemaining.hours}h ${timeRemaining.minutes}m remaining`;
    }

    return `${timeRemaining.minutes}m ${timeRemaining.seconds}s remaining`;
  };

  if (variant === "expired") {
    return (
      <Pressable
        onPress={handlePress}
        className={cn(
          "flex-row items-center justify-between bg-loss-subtle px-4 py-3 rounded-xl border border-loss/20",
          "active:opacity-90",
          className
        )}
      >
        <View className="flex-row items-center gap-2">
          <Ionicons name="alert-circle" size={18} color={colors.loss.DEFAULT} />
          <Text variant="body-sm" className="text-loss font-inter-medium">
            Trial Expired
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Text variant="body-sm" className="text-loss">
            Upgrade Now
          </Text>
          <Ionicons name="chevron-forward" size={14} color={colors.loss.DEFAULT} />
        </View>
      </Pressable>
    );
  }

  if (variant === "urgent") {
    return (
      <Pressable
        onPress={handlePress}
        className={cn(
          "flex-row items-center justify-between bg-accent-subtle px-4 py-3 rounded-xl border border-accent/20",
          "active:opacity-90",
          className
        )}
      >
        <View className="flex-row items-center gap-2">
          <Ionicons name="time" size={18} color={colors.accent.DEFAULT} />
          <View>
            <Text variant="body-sm" className="text-accent font-inter-medium">
              Trial ends soon
            </Text>
            <Text variant="caption" className="text-accent/80">
              {formatTime()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-1 bg-accent px-3 py-1.5 rounded-lg">
          <Text variant="body-sm" className="text-text-inverse font-inter-medium">
            Upgrade
          </Text>
          <Ionicons name="chevron-forward" size={14} color={colors.text.inverse} />
        </View>
      </Pressable>
    );
  }

  // Default variant - Purple gradient (Kraken-style)
  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        "flex-row items-center justify-between bg-gradient-to-r from-primary-100 to-primary-200 px-4 py-3 rounded-xl border-2 border-primary-300",
        "active:opacity-90",
        className
      )}
    >
      <View className="flex-row items-center gap-2">
        <Ionicons name="sparkles" size={18} color={colors.primary.DEFAULT} />
        <View>
          <Text variant="body-sm" className="text-primary-900 font-inter-semibold">
            Free Trial Active
          </Text>
          <Text variant="caption" className="text-primary-700">
            {formatTime()}
          </Text>
        </View>
      </View>
      <View className="bg-primary px-3 py-1.5 rounded-lg">
        <Text variant="body-sm" className="text-white font-inter-medium">
          Upgrade
        </Text>
      </View>
    </Pressable>
  );
}

// Countdown timer display
interface CountdownTimerProps {
  expiresAt: Date;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

export function CountdownTimer({
  expiresAt,
  size = "md",
  showLabels = true,
  className,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const sizeClasses = {
    sm: { container: "gap-1", digit: "w-8 h-8", text: "text-sm" },
    md: { container: "gap-2", digit: "w-12 h-12", text: "text-lg" },
    lg: { container: "gap-3", digit: "w-16 h-16", text: "text-2xl" },
  };

  const config = sizeClasses[size];

  if (timeRemaining.isExpired) {
    return (
      <View className={cn("items-center", className)}>
        <Text variant="h3" className="text-loss">
          Trial Expired
        </Text>
      </View>
    );
  }

  return (
    <View className={cn("flex-row items-center justify-center", config.container, className)}>
      {/* Hours */}
      <View className="items-center">
        <View
          className={cn(
            "bg-primary-100 border-2 border-primary-300 rounded-lg items-center justify-center",
            config.digit
          )}
        >
          <Text className={cn("font-mono font-inter-bold text-primary-900", config.text)}>
            {formatNumber(timeRemaining.hours)}
          </Text>
        </View>
        {showLabels && (
          <Text variant="caption" className="mt-1">
            hours
          </Text>
        )}
      </View>

      <Text className={cn("text-text-muted font-mono", config.text)}>:</Text>

      {/* Minutes */}
      <View className="items-center">
        <View
          className={cn(
            "bg-primary-100 border-2 border-primary-300 rounded-lg items-center justify-center",
            config.digit
          )}
        >
          <Text className={cn("font-mono font-inter-bold text-primary-900", config.text)}>
            {formatNumber(timeRemaining.minutes)}
          </Text>
        </View>
        {showLabels && (
          <Text variant="caption" className="mt-1">
            mins
          </Text>
        )}
      </View>

      <Text className={cn("text-text-muted font-mono", config.text)}>:</Text>

      {/* Seconds */}
      <View className="items-center">
        <View
          className={cn(
            "bg-primary-100 border-2 border-primary-300 rounded-lg items-center justify-center",
            config.digit
          )}
        >
          <Text className={cn("font-mono font-inter-bold text-primary-900", config.text)}>
            {formatNumber(timeRemaining.seconds)}
          </Text>
        </View>
        {showLabels && (
          <Text variant="caption" className="mt-1">
            secs
          </Text>
        )}
      </View>
    </View>
  );
}

// Trial info card for paywall
interface TrialInfoCardProps {
  daysRemaining?: number;
  features: string[];
  className?: string;
}

export function TrialInfoCard({
  daysRemaining,
  features,
  className,
}: TrialInfoCardProps) {
  return (
    <View
      className={cn(
        "bg-primary-subtle rounded-2xl p-4 border border-primary/20",
        className
      )}
    >
      {daysRemaining !== undefined && (
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="gift" size={20} color={colors.primary.DEFAULT} />
          <Text variant="body" className="text-primary font-inter-semibold">
            {daysRemaining > 0
              ? `${daysRemaining} days free trial`
              : "Start your free trial"}
          </Text>
        </View>
      )}

      <View className="gap-2">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center gap-2">
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={colors.primary.DEFAULT}
            />
            <Text variant="body-sm" className="text-text">
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
