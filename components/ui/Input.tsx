import {
  View,
  TextInput,
  type TextInputProps,
  Pressable,
} from "react-native";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./Text";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerClassName,
  inputClassName,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn("mb-4", containerClassName)}>
      {label && (
        <Text variant="label" className="mb-2">
          {label}
        </Text>
      )}
      <View
        className={cn(
          "flex-row items-center bg-surface-primary border rounded-lg px-4",
          isFocused ? "border-primary" : "border-background-border",
          error && "border-loss"
        )}
      >
        {leftIcon && <View className="mr-3">{leftIcon}</View>}
        <TextInput
          className={cn("flex-1 h-12 text-base text-text", inputClassName)}
          placeholderTextColor="#6E7681"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} className="ml-3">
            {rightIcon}
          </Pressable>
        )}
      </View>
      {error && (
        <Text variant="caption" className="text-loss mt-1">
          {error}
        </Text>
      )}
      {hint && !error && (
        <Text variant="caption" className="mt-1">
          {hint}
        </Text>
      )}
    </View>
  );
}

export function MoneyInput({
  value,
  onChangeText,
  currency = "$",
  ...props
}: Omit<InputProps, "value" | "onChangeText" | "keyboardType"> & {
  value: string;
  onChangeText: (value: string) => void;
  currency?: string;
}) {
  return (
    <Input
      leftIcon={
        <Text variant="mono-lg" className="text-text-secondary">
          {currency}
        </Text>
      }
      keyboardType="decimal-pad"
      value={value}
      onChangeText={(text) => {
        const filtered = text.replace(/[^0-9.]/g, "");
        const parts = filtered.split(".");
        if (parts.length > 2) return;
        onChangeText(filtered);
      }}
      inputClassName="font-mono"
      {...props}
    />
  );
}
