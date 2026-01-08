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
import { useSettingsStore } from "@/lib/store";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

// Custom dark theme - Professional Finance Style (Navy/Slate)
const PolitiTradesDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#1E3A5F",
    background: "#0D1117",
    card: "#161B22",
    text: "#F0F6FC",
    border: "#30363D",
    notification: "#FFB800",
  },
};

function useProtectedRoute() {
  const hasCompletedOnboarding = useSettingsStore(
    (state) => state.hasCompletedOnboarding
  );
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (hasCompletedOnboarding && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!hasCompletedOnboarding && !inAuthGroup) {
      router.replace("/(auth)/onboarding");
    }
  }, [hasCompletedOnboarding, segments, router]);
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useProtectedRoute();

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
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
