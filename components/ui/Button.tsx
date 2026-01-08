import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { haptics } from "@/lib/haptics";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-lg active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-surface-secondary border border-background-border",
        ghost: "bg-transparent",
        profit: "bg-profit",
        loss: "bg-loss",
        accent: "bg-accent",
        outline: "bg-transparent border border-primary",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-4",
        lg: "h-14 px-6",
        xl: "h-16 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const buttonTextVariants = cva("font-semibold text-center", {
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-text",
      ghost: "text-text-secondary",
      profit: "text-white",
      loss: "text-white",
      accent: "text-text-inverse",
      outline: "text-primary-light",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  haptic?: boolean;
}

export function Button({
  label,
  variant,
  size,
  onPress,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  textClassName,
  haptic = true,
}: ButtonProps) {
  const handlePress = () => {
    if (haptic) haptics.light();
    onPress();
  };

  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, size }),
        disabled && "opacity-50",
        className
      )}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "accent" ? "#0D1117" : "#F0F6FC"}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text
            className={cn(buttonTextVariants({ variant, size }), textClassName)}
          >
            {label}
          </Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}
