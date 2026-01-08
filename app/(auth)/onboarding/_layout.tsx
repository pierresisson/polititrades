import { View } from "react-native";
import { Slot, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const SCREENS = ["index", "features", "premium"];

function ProgressIndicator({ currentIndex }: { currentIndex: number }) {
  return (
    <View className="flex-row items-center justify-center gap-2 py-4">
      {SCREENS.map((_, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;

        return (
          <Animated.View
            key={index}
            className={`h-1.5 rounded-full ${
              isActive
                ? "w-8 bg-primary"
                : isPast
                  ? "w-2 bg-primary/50"
                  : "w-2 bg-surface-tertiary"
            }`}
          />
        );
      })}
    </View>
  );
}

export default function OnboardingLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const currentScreen = pathname.split("/").pop() || "index";
  const currentIndex = SCREENS.indexOf(
    currentScreen === "onboarding" ? "index" : currentScreen
  );

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ProgressIndicator currentIndex={Math.max(0, currentIndex)} />
      <Slot />
    </View>
  );
}
