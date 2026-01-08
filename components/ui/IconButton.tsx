import { Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { haptics } from "@/lib/haptics";

const iconButtonVariants = cva(
  "items-center justify-center rounded-full active:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-surface-secondary",
        ghost: "bg-transparent",
        primary: "bg-primary",
        accent: "bg-accent",
        outline: "bg-transparent border border-background-border",
      },
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-14 h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
  haptic?: boolean;
  accessibilityLabel: string;
}

export function IconButton({
  icon,
  variant,
  size,
  onPress,
  disabled = false,
  className,
  haptic = true,
  accessibilityLabel,
}: IconButtonProps) {
  const handlePress = () => {
    if (haptic) haptics.light();
    onPress();
  };

  return (
    <Pressable
      className={cn(
        iconButtonVariants({ variant, size }),
        disabled && "opacity-50",
        className
      )}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {icon}
    </Pressable>
  );
}
