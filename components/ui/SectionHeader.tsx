import { View, Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  icon,
  className,
}: SectionHeaderProps) {
  const handleActionPress = () => {
    if (action) {
      haptics.light();
      action.onPress();
    }
  };

  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 py-2",
        className
      )}
    >
      <View className="flex-row items-center gap-2 flex-1">
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={colors.primary.DEFAULT}
          />
        )}
        <View className="flex-1">
          <Text variant="h4">{title}</Text>
          {subtitle && (
            <Text variant="caption" className="mt-0.5">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {action && (
        <Pressable
          onPress={handleActionPress}
          className="flex-row items-center gap-1 active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text variant="secondary-sm" className="text-primary">
            {action.label}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.primary.DEFAULT}
          />
        </Pressable>
      )}
    </View>
  );
}

// Divider component for sections
interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <View
      className={cn(
        "h-px bg-background-border mx-4 my-2",
        className
      )}
    />
  );
}

// List section wrapper
interface ListSectionProps {
  title?: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  children: React.ReactNode;
  className?: string;
}

export function ListSection({
  title,
  subtitle,
  action,
  children,
  className,
}: ListSectionProps) {
  return (
    <View className={cn("mb-6", className)}>
      {title && (
        <SectionHeader
          title={title}
          subtitle={subtitle}
          action={action}
        />
      )}
      <View className="mt-1">{children}</View>
    </View>
  );
}

// Screen header with back button
interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel: string;
  };
  className?: string;
}

export function ScreenHeader({
  title,
  onBack,
  rightAction,
  className,
}: ScreenHeaderProps) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 py-3 bg-background",
        className
      )}
    >
      <View className="flex-row items-center gap-3 flex-1">
        {onBack && (
          <Pressable
            onPress={() => {
              haptics.light();
              onBack();
            }}
            className="w-10 h-10 items-center justify-center -ml-2 active:opacity-70"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.text.DEFAULT}
            />
          </Pressable>
        )}
        <Text variant="h3" className="flex-1" numberOfLines={1}>
          {title}
        </Text>
      </View>

      {rightAction && (
        <Pressable
          onPress={() => {
            haptics.light();
            rightAction.onPress();
          }}
          className="w-10 h-10 items-center justify-center -mr-2 active:opacity-70"
          accessibilityLabel={rightAction.accessibilityLabel}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={rightAction.icon}
            size={22}
            color={colors.text.DEFAULT}
          />
        </Pressable>
      )}
    </View>
  );
}

// Tab screen header with settings button
interface TabScreenHeaderProps {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
  onSettingsPress?: () => void;
  className?: string;
}

export function TabScreenHeader({
  title,
  subtitle,
  showSettings = true,
  onSettingsPress,
  className,
}: TabScreenHeaderProps) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 py-3 bg-background",
        className
      )}
    >
      <View className="flex-1">
        {subtitle && (
          <Text variant="secondary-sm">{subtitle}</Text>
        )}
        <Text variant="h1">{title}</Text>
      </View>

      {showSettings && onSettingsPress && (
        <Pressable
          onPress={() => {
            haptics.light();
            onSettingsPress();
          }}
          className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center active:opacity-70"
          accessibilityLabel="Settings"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="settings-outline"
            size={20}
            color={colors.primary.DEFAULT}
          />
        </Pressable>
      )}
    </View>
  );
}
