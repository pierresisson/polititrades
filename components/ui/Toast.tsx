import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "./Text";
import { colors } from "@/constants/theme";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  visible,
  onDismiss,
  duration = 2500,
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 200 });

      const timer = setTimeout(() => {
        translateY.value = withTiming(-100, { duration: 200 });
        opacity.value = withTiming(0, { duration: 200 });
        setTimeout(() => runOnJS(onDismiss)(), 200);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      translateY.value = -100;
      opacity.value = 0;
    }
  }, [visible, duration, translateY, opacity, onDismiss]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  const iconName =
    type === "success"
      ? "checkmark-circle"
      : type === "error"
      ? "alert-circle"
      : "information-circle";

  const bgColor =
    type === "success"
      ? colors.profit.DEFAULT
      : type === "error"
      ? colors.loss.DEFAULT
      : colors.primary.DEFAULT;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          top: insets.top + 8,
          left: 16,
          right: 16,
          zIndex: 9999,
        },
      ]}
    >
      <Pressable
        onPress={onDismiss}
        className="flex-row items-center gap-3 px-4 py-3 rounded-xl shadow-lg active:opacity-90"
        style={{ backgroundColor: bgColor }}
      >
        <Ionicons name={iconName} size={20} color={colors.text.inverse} />
        <Text variant="body" className="flex-1 text-text-inverse font-inter-medium">
          {message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
