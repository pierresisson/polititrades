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

// Custom dark theme - Refined Charcoal (Editorial Style)
const PolitiTradesDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#5B7A99",
    background: "#09090B",
    card: "#111113",
    text: "#FAFAFA",
    border: "#27272A",
    notification: "#F59E0B",
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
        <ThemeProvider value={PolitiTradesDarkTheme}>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
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
