import { View, Pressable, Modal, Dimensions, TouchableWithoutFeedback } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { Button } from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useEffect, useCallback } from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  snapPoints?: number[];
  children: React.ReactNode;
  showHandle?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  snapPoints = [0.5],
  children,
  showHandle = true,
  showCloseButton = true,
  className,
}: BottomSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const currentSnapPoint = snapPoints[0] * SCREEN_HEIGHT;

  const handleClose = useCallback(() => {
    haptics.light();
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
    backdropOpacity.value = withTiming(0, { duration: 250 });
    setTimeout(onClose, 250);
  }, [onClose, translateY, backdropOpacity]);

  useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(SCREEN_HEIGHT - currentSnapPoint, {
        damping: 20,
        stiffness: 200,
      });
      backdropOpacity.value = withTiming(1, { duration: 250 });
    }
  }, [isOpen, currentSnapPoint, translateY, backdropOpacity]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = SCREEN_HEIGHT - currentSnapPoint + event.translationY;
      if (newY >= SCREEN_HEIGHT - currentSnapPoint) {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        runOnJS(handleClose)();
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT - currentSnapPoint, {
          damping: 20,
          stiffness: 200,
        });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value * 0.5,
  }));

  if (!isOpen) return null;

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="none"
      onRequestClose={handleClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1">
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={handleClose}>
            <Animated.View
              style={backdropStyle}
              className="absolute inset-0 bg-black"
            />
          </TouchableWithoutFeedback>

          {/* Sheet */}
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                sheetStyle,
                { height: currentSnapPoint, maxHeight: SCREEN_HEIGHT * 0.9 },
              ]}
              className={cn(
                "absolute left-0 right-0 bg-background-elevated rounded-t-3xl",
                className
              )}
            >
              {/* Handle */}
              {showHandle && (
                <View className="items-center pt-3 pb-2">
                  <View className="w-9 h-1 bg-surface-tertiary rounded-full" />
                </View>
              )}

              {/* Header */}
              {(title || showCloseButton) && (
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-background-border">
                  <View className="flex-1">
                    {title && <Text variant="h4">{title}</Text>}
                    {subtitle && (
                      <Text variant="caption" className="mt-0.5">
                        {subtitle}
                      </Text>
                    )}
                  </View>
                  {showCloseButton && (
                    <Pressable
                      onPress={handleClose}
                      className="w-8 h-8 items-center justify-center rounded-full bg-surface-secondary active:opacity-70"
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name="close"
                        size={18}
                        color={colors.text.secondary}
                      />
                    </Pressable>
                  )}
                </View>
              )}

              {/* Content */}
              <View className="flex-1">{children}</View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

// Action sheet variant with predefined actions
interface ActionSheetAction {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "default" | "destructive";
  onPress: () => void;
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: ActionSheetAction[];
}

export function ActionSheet({
  isOpen,
  onClose,
  title,
  actions,
}: ActionSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      snapPoints={[Math.min(0.4, (actions.length * 56 + 120) / SCREEN_HEIGHT)]}
      showHandle
      showCloseButton={false}
    >
      <View className="px-4 py-2">
        {actions.map((action, index) => (
          <Pressable
            key={index}
            onPress={() => {
              haptics.light();
              action.onPress();
              onClose();
            }}
            className="flex-row items-center py-3 active:opacity-70"
          >
            {action.icon && (
              <Ionicons
                name={action.icon}
                size={22}
                color={
                  action.variant === "destructive"
                    ? colors.loss.DEFAULT
                    : colors.text.DEFAULT
                }
                style={{ marginRight: 12 }}
              />
            )}
            <Text
              variant="body"
              className={cn(
                action.variant === "destructive" && "text-loss"
              )}
            >
              {action.label}
            </Text>
          </Pressable>
        ))}

        <Button
          label="Cancel"
          variant="secondary"
          size="lg"
          onPress={onClose}
          className="mt-4"
        />
      </View>
    </BottomSheet>
  );
}

// Confirmation sheet
interface ConfirmSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
}

export function ConfirmSheet({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
}: ConfirmSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[0.35]}
      showHandle
      showCloseButton={false}
    >
      <View className="px-4 py-4 flex-1">
        <Text variant="h3" align="center" className="mb-2">
          {title}
        </Text>
        <Text variant="secondary" align="center" className="mb-6">
          {message}
        </Text>

        <View className="flex-row gap-3 mt-auto">
          <Button
            label={cancelLabel}
            variant="secondary"
            size="lg"
            onPress={onClose}
            className="flex-1"
          />
          <Button
            label={confirmLabel}
            variant={variant === "destructive" ? "loss" : "primary"}
            size="lg"
            onPress={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1"
          />
        </View>
      </View>
    </BottomSheet>
  );
}
