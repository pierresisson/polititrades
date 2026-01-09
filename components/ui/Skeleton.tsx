import { View, type ViewStyle, type DimensionValue } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";

const skeletonVariants = cva("bg-surface-secondary overflow-hidden", {
  variants: {
    variant: {
      text: "h-4 rounded-sm",
      circular: "rounded-full",
      rectangular: "rounded-md",
      card: "rounded-xl",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Skeleton({
  variant,
  width,
  height,
  className,
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 750 }),
        withTiming(0.3, { duration: 750 })
      ),
      -1,
      false
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sizeStyle: ViewStyle = {
    width: (width ?? (variant === "circular" ? 40 : "100%")) as DimensionValue,
    height: (height ?? (variant === "circular" ? 40 : variant === "card" ? 100 : 16)) as DimensionValue,
  };

  return (
    <Animated.View
      style={[sizeStyle, animatedStyle]}
      className={cn(skeletonVariants({ variant }), className)}
    />
  );
}

// Preset skeletons for common use cases
export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <View className={cn("gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 && lines > 1 ? "60%" : "100%"}
        />
      ))}
    </View>
  );
}

export function SkeletonAvatar({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <View className={cn("bg-surface-primary rounded-xl p-4 gap-3", className)}>
      <View className="flex-row items-center gap-3">
        <SkeletonAvatar size={40} />
        <View className="flex-1 gap-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" height={12} />
        </View>
      </View>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="50%" />
    </View>
  );
}

export function SkeletonTradeRow({ className }: { className?: string }) {
  return (
    <View
      className={cn("flex-row items-center gap-3 py-3 px-4", className)}
    >
      <SkeletonAvatar size={40} />
      <View className="flex-1 gap-1.5">
        <Skeleton variant="text" width="50%" height={14} />
        <Skeleton variant="text" width="70%" height={12} />
      </View>
      <View className="items-end gap-1.5">
        <Skeleton variant="text" width={60} height={14} />
        <Skeleton variant="text" width={40} height={12} />
      </View>
    </View>
  );
}
