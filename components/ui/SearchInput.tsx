import { View, TextInput, Pressable, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { forwardRef, useCallback, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

interface SearchInputProps extends Omit<TextInputProps, "style"> {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  showCancel?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  (
    {
      value,
      onChangeText,
      onClear,
      onCancel,
      placeholder = "Search...",
      autoFocus = false,
      showCancel = false,
      disabled = false,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const cancelWidth = useSharedValue(0);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      if (showCancel) {
        cancelWidth.value = withTiming(70, { duration: 200 });
      }
    }, [showCancel, cancelWidth]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      if (showCancel && !value) {
        cancelWidth.value = withTiming(0, { duration: 200 });
      }
    }, [showCancel, value, cancelWidth]);

    const handleClear = useCallback(() => {
      haptics.light();
      onChangeText("");
      onClear?.();
    }, [onChangeText, onClear]);

    const handleCancel = useCallback(() => {
      haptics.light();
      onChangeText("");
      onCancel?.();
      cancelWidth.value = withTiming(0, { duration: 200 });
    }, [onChangeText, onCancel, cancelWidth]);

    const cancelAnimatedStyle = useAnimatedStyle(() => ({
      width: cancelWidth.value,
      opacity: cancelWidth.value > 0 ? 1 : 0,
    }));

    return (
      <View className={cn("flex-row items-center", containerClassName)}>
        <View
          className={cn(
            "flex-1 flex-row items-center bg-background-card border-2 rounded-xl px-3 h-11",
            isFocused ? "border-primary bg-primary-50" : "border-primary-200",
            disabled && "opacity-50",
            className
          )}
        >
          <Ionicons
            name="search"
            size={18}
            color={isFocused ? colors.primary.DEFAULT : colors.text.muted}
          />

          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.text.muted}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            className="flex-1 ml-2 text-text text-base font-inter"
            {...props}
          />

          {value.length > 0 && (
            <Pressable
              onPress={handleClear}
              className="w-6 h-6 items-center justify-center ml-1 active:opacity-70"
              hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
            >
              <View className="w-5 h-5 rounded-full bg-surface-tertiary items-center justify-center">
                <Ionicons
                  name="close"
                  size={14}
                  color={colors.text.secondary}
                />
              </View>
            </Pressable>
          )}
        </View>

        {showCancel && (
          <Animated.View style={cancelAnimatedStyle} className="overflow-hidden">
            <Pressable
              onPress={handleCancel}
              className="pl-3 h-11 justify-center active:opacity-70"
            >
              <Text variant="body" className="text-primary">
                Cancel
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    );
  }
);

SearchInput.displayName = "SearchInput";

// Search bar with filters button
interface SearchBarWithFilterProps extends SearchInputProps {
  onFilterPress?: () => void;
  filterCount?: number;
}

export function SearchBarWithFilter({
  onFilterPress,
  filterCount,
  ...searchProps
}: SearchBarWithFilterProps) {
  return (
    <View className="flex-row items-center gap-2 px-4">
      <View className="flex-1">
        <SearchInput {...searchProps} />
      </View>

      {onFilterPress && (
        <Pressable
          onPress={() => {
            haptics.light();
            onFilterPress();
          }}
          className={cn(
            "w-11 h-11 items-center justify-center rounded-xl",
            filterCount && filterCount > 0
              ? "bg-primary-subtle"
              : "bg-surface-secondary",
            "active:opacity-70"
          )}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={
              filterCount && filterCount > 0
                ? colors.primary.DEFAULT
                : colors.text.secondary
            }
          />
          {filterCount !== undefined && filterCount > 0 && (
            <View className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary items-center justify-center">
              <Text variant="caption" className="text-white text-[10px]">
                {filterCount}
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}

// Search result highlight helper
export function highlightSearchResult(
  text: string,
  query: string
): { text: string; highlight: boolean }[] {
  if (!query.trim()) {
    return [{ text, highlight: false }];
  }

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part) => ({
    text: part,
    highlight: part.toLowerCase() === query.toLowerCase(),
  }));
}

// Highlighted text component
export function HighlightedText({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  const parts = highlightSearchResult(text, query);

  return (
    <Text className={className}>
      {parts.map((part, index) =>
        part.highlight ? (
          <Text key={index} className="text-primary font-inter-semibold">
            {part.text}
          </Text>
        ) : (
          <Text key={index}>{part.text}</Text>
        )
      )}
    </Text>
  );
}
