import "../global.css";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import "@/lib/i18n";
import { useSettingsStore, useUIStore } from "@/lib/store";
import { Toast } from "@/components/ui";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

// Custom light purple theme - Modern Fintech Style
const PolitiTradesLightTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    primary: "#7C3AED", // Purple
    background: "#F8F7FF", // Light purple tint background
    card: "#FFFFFF", // White cards
    text: "#18181B", // Dark text
    border: "#E9D5FF", // Purple border
    notification: "#F97316", // Orange
  },
};

function useProtectedRoute(isReady: boolean) {
  const hasCompletedOnboarding = useSettingsStore(
    (state) => state.hasCompletedOnboarding
  );
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (hasCompletedOnboarding && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!hasCompletedOnboarding && !inAuthGroup) {
      router.replace("/(auth)/onboarding");
    }
  }, [hasCompletedOnboarding, segments, router, isReady]);
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { toast, hideToast } = useUIStore();

  useProtectedRoute(fontsLoaded);

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={PolitiTradesLightTheme}>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="ticker/[symbol]" options={{ headerShown: true }} />
            <Stack.Screen name="personality/[id]" options={{ headerShown: true }} />
            <Stack.Screen name="trade/[id]" options={{ headerShown: true }} />
            <Stack.Screen name="paywall" options={{ presentation: "modal", headerShown: false }} />
          </Stack>
          <Toast
            message={toast.message}
            type={toast.type}
            visible={toast.visible}
            onDismiss={hideToast}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
