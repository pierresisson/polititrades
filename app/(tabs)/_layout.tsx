import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { Platform, View, Pressable } from "react-native";

// Tab bar icon component
function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) {
  return (
    <View className="items-center justify-center">
      <Ionicons name={name} size={24} color={color} />
      {focused && (
        <View className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
      )}
    </View>
  );
}

// Settings header button
function SettingsButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/(tabs)/settings")}
      className="w-10 h-10 items-center justify-center mr-2"
    >
      <Ionicons
        name="settings-outline"
        size={22}
        color={colors.text.secondary}
      />
    </Pressable>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary.DEFAULT,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.background.DEFAULT,
          borderTopColor: colors.background.border,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: colors.background.DEFAULT,
          borderBottomColor: colors.background.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 17,
          color: colors.text.DEFAULT,
        },
        headerShadowVisible: false,
        headerShown: true,
        headerRight: () => <SettingsButton />,
      }}
    >
      {/* Trades Tab (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.trades"),
          headerTitle: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "swap-horizontal" : "swap-horizontal-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* News Tab */}
      <Tabs.Screen
        name="news"
        options={{
          title: t("tabs.news"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "newspaper" : "newspaper-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Search Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: t("tabs.search"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Watchlist Tab */}
      <Tabs.Screen
        name="watchlist"
        options={{
          title: t("tabs.watchlist"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Settings - Hidden from tab bar but accessible */}
      <Tabs.Screen
        name="settings"
        options={{
          href: null, // Hide from tab bar
          title: t("settings.title"),
        }}
      />
    </Tabs>
  );
}
