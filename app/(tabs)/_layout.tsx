import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";

// Tab bar icon component
function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) {
  return (
    <View className="items-center justify-center">
      <Ionicons name={name} size={24} color={color} />
    </View>
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
        headerShown: false,
      }}
    >
      {/* Trades Tab (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.trades"),
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
          href: null,
        }}
      />
    </Tabs>
  );
}
