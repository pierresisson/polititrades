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
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          headerTitle: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Moves Tab */}
      <Tabs.Screen
        name="moves"
        options={{
          title: t("tabs.moves"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "trending-up" : "trending-up-outline"}
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
              name={focused ? "heart" : "heart-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
