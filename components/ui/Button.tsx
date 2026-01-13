import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { haptics } from "@/lib/haptics";

const buttonVariants = cva(
  "flex-row items-center justify-center active:opacity-70",
  {
    variants: {
      variant: {
        primary: "bg-primary rounded-xl",
        secondary: "bg-transparent border border-primary rounded-xl",
        ghost: "bg-transparent",
        profit: "bg-profit rounded-xl",
        loss: "bg-loss rounded-xl",
        accent: "bg-accent rounded-xl",
        outline: "bg-transparent border border-primary/40 rounded-xl",
        // New minimal variants
        link: "bg-transparent",
        subtle: "bg-surface-secondary/50 rounded-md",
      },
      size: {
        xs: "h-8 px-3",
        sm: "h-10 px-4",
        md: "h-11 px-4",
        lg: "h-12 px-5",
        xl: "h-14 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const buttonTextVariants = cva("font-medium text-center", {
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-primary",
      ghost: "text-text-secondary",
      profit: "text-white",
      loss: "text-white",
      accent: "text-white",
      outline: "text-primary",
      link: "text-primary",
      subtle: "text-text-secondary",
    },
    size: {
      xs: "text-sm",
      sm: "text-sm",
      md: "text-base",
      lg: "text-base",
      xl: "text-lg",
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
        disabled && "opacity-40",
        className
      )}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "secondary" || variant === "outline" || variant === "ghost"
              ? "#7C3AED"
              : "#FFFFFF"
          }
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View className="mr-1.5">{leftIcon}</View>}
          <Text
            className={cn(buttonTextVariants({ variant, size }), textClassName)}
          >
            {label}
          </Text>
          {rightIcon && <View className="ml-1.5">{rightIcon}</View>}
        </>
      )}
    </Pressable>
  );
}

// Compact icon-only button variant
export function IconTextButton({
  icon,
  label,
  onPress,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  className?: string;
}) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center gap-1 active:opacity-70",
        className
      )}
      onPress={() => {
        haptics.light();
        onPress();
      }}
    >
      {icon}
      <Text className="text-xs text-text-secondary font-medium">{label}</Text>
    </Pressable>
  );
}
