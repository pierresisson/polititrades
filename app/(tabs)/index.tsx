import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/store";

export default function TabOneScreen() {
  const router = useRouter();
  const setHasCompletedOnboarding = useSettingsStore(
    (state) => state.setHasCompletedOnboarding
  );

  const handleResetOnboarding = () => {
    setHasCompletedOnboarding(false);
    router.replace("/(auth)/onboarding");
  };

  return (
    <View className="flex-1 bg-background items-center justify-center px-4">
      <Text variant="h2" className="mb-2">
        Home
      </Text>
      <Text variant="secondary-sm" align="center" className="mb-6">
        Trade feed will be displayed here
      </Text>

      {/* Temporary reset button for testing */}
      <Button
        label="Reset Onboarding (Dev)"
        variant="outline"
        size="md"
        onPress={handleResetOnboarding}
      />
    </View>
  );
}
