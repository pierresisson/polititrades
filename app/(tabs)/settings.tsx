import { View, ScrollView, Pressable, Switch, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Text, PremiumBadge } from "@/components/ui";
import { colors } from "@/constants/theme";
import {
  useAuthStore,
  useSettingsStore,
  usePaywallStore,
} from "@/lib/store";
import { haptics } from "@/lib/haptics";

interface SettingsItemProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string;
  showChevron?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  destructive?: boolean;
  premium?: boolean;
}

function SettingsItem({
  icon,
  label,
  value,
  showChevron = true,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  onPress,
  destructive = false,
  premium = false,
}: SettingsItemProps) {
  return (
    <Pressable
      onPress={() => {
        if (!showSwitch && onPress) {
          haptics.light();
          onPress();
        }
      }}
      disabled={showSwitch}
      className="flex-row items-center justify-between py-3.5 px-4 active:opacity-70"
    >
      <View className="flex-row items-center gap-3">
        <View
          className={`w-8 h-8 rounded-lg items-center justify-center ${
            destructive ? "bg-loss-subtle" : "bg-surface-secondary"
          }`}
        >
          <Ionicons
            name={icon}
            size={18}
            color={destructive ? colors.loss.DEFAULT : colors.text.secondary}
          />
        </View>
        <Text
          variant="body"
          className={destructive ? "text-loss" : "text-text"}
        >
          {label}
        </Text>
        {premium && <PremiumBadge />}
      </View>

      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={(val) => {
            haptics.light();
            onSwitchChange?.(val);
          }}
          trackColor={{
            false: colors.background.border,
            true: colors.primary.DEFAULT,
          }}
          thumbColor={colors.text.inverse}
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {value && (
            <Text variant="secondary-sm">{value}</Text>
          )}
          {showChevron && (
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.text.muted}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text variant="label" className="px-4 mb-2 text-text-secondary">
        {title}
      </Text>
      <View className="mx-4 bg-surface-primary rounded-2xl overflow-hidden divide-y divide-background-border">
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { reset: resetAuth } = useAuthStore();
  const {
    language,
    setLanguage,
    notificationsEnabled,
    setNotificationsEnabled,
    setHasCompletedOnboarding,
  } = useSettingsStore();
  const { isPremium, setIsPremium, openPaywall } = usePaywallStore();

  const handleLanguageChange = () => {
    const newLang = language === "en" ? "fr" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = () => {
    Alert.alert(
      t("auth.logout"),
      t("auth.logoutConfirm"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("auth.logout"),
          style: "destructive",
          onPress: () => {
            resetAuth();
            router.replace("/(auth)/onboarding");
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t("settings.deleteAccount"),
      t("settings.deleteAccountConfirm"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => {
            // Handle delete account
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Banner */}
        {!isPremium && (
          <Pressable
            onPress={openPaywall}
            className="mx-4 mt-4 mb-6 p-4 bg-accent-subtle rounded-2xl border border-accent/20 active:opacity-90"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-xl bg-accent/20 items-center justify-center">
                  <Ionicons
                    name="diamond"
                    size={24}
                    color={colors.accent.DEFAULT}
                  />
                </View>
                <View>
                  <Text variant="body" className="font-inter-semibold text-accent">
                    {t("premium.title")}
                  </Text>
                  <Text variant="caption" className="text-accent/80">
                    {t("premium.subtitle")}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.accent.DEFAULT}
              />
            </View>
          </Pressable>
        )}

        {/* Account */}
        <SettingsSection title={t("settings.account")}>
          <SettingsItem
            icon="person-outline"
            label={t("settings.account")}
            value="john@example.com"
            onPress={() => {}}
          />
          <SettingsItem
            icon="card-outline"
            label={t("settings.subscription")}
            value={isPremium ? "Premium" : "Free Trial"}
            onPress={openPaywall}
          />
        </SettingsSection>

        {/* Preferences */}
        <SettingsSection title={t("settings.preferences")}>
          <SettingsItem
            icon="notifications-outline"
            label={t("settings.pushNotifications")}
            showSwitch
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
            showChevron={false}
          />
          <SettingsItem
            icon="language-outline"
            label={t("settings.language")}
            value={language === "en" ? "English" : "Français"}
            onPress={handleLanguageChange}
          />
          <SettingsItem
            icon="moon-outline"
            label={t("settings.darkMode")}
            value="On"
            showChevron={false}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title={t("settings.support")}>
          <SettingsItem
            icon="help-circle-outline"
            label={t("settings.helpCenter")}
            onPress={() => {}}
          />
          <SettingsItem
            icon="mail-outline"
            label={t("settings.contactSupport")}
            onPress={() => {}}
          />
          <SettingsItem
            icon="star-outline"
            label={t("settings.rateApp")}
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Legal */}
        <SettingsSection title={t("settings.legal")}>
          <SettingsItem
            icon="document-text-outline"
            label={t("settings.termsOfService")}
            onPress={() => {}}
          />
          <SettingsItem
            icon="shield-checkmark-outline"
            label={t("settings.privacyPolicy")}
            onPress={() => {}}
          />
          <SettingsItem
            icon="warning-outline"
            label={t("settings.disclaimer")}
            onPress={() => {}}
          />
        </SettingsSection>

        {/* About */}
        <SettingsSection title={t("settings.about")}>
          <SettingsItem
            icon="information-circle-outline"
            label={t("settings.version")}
            value="1.0.0 (1)"
            showChevron={false}
          />
        </SettingsSection>

        {/* Dev Tools */}
        {__DEV__ && (
          <SettingsSection title="Dev Tools">
            <SettingsItem
              icon="diamond-outline"
              label="Premium Status"
              showSwitch
              switchValue={isPremium}
              onSwitchChange={setIsPremium}
              showChevron={false}
            />
            <SettingsItem
              icon="refresh-outline"
              label="Reset Onboarding"
              onPress={() => {
                setHasCompletedOnboarding(false);
                router.replace("/(auth)/onboarding");
              }}
            />
          </SettingsSection>
        )}

        {/* Actions */}
        <SettingsSection title="">
          <SettingsItem
            icon="log-out-outline"
            label={t("settings.signOut")}
            onPress={handleSignOut}
            showChevron={false}
          />
          <SettingsItem
            icon="trash-outline"
            label={t("settings.deleteAccount")}
            onPress={handleDeleteAccount}
            destructive
            showChevron={false}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
}
