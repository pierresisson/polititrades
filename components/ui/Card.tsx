import { View, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("overflow-hidden", {
  variants: {
    variant: {
      default: "bg-background-card border border-background-border rounded-md",
      elevated: "bg-background-elevated rounded-md",
      ghost: "bg-transparent",
      // Refined accent variants
      "accent-left": "bg-background-card border-l-2 border-l-primary rounded-md",
      "accent-profit": "bg-background-card border-l border-l-profit rounded-sm",
      "accent-loss": "bg-background-card border-l border-l-loss rounded-sm",
      // Minimal
      subtle: "bg-surface-secondary/30 rounded-sm",
      outline: "bg-transparent border border-background-border rounded-md",
    },
    padding: {
      none: "p-0",
      xs: "p-1.5",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export function Card({
  children,
  variant,
  padding,
  className,
  onPress,
}: CardProps) {
  const content = (
    <View className={cn(cardVariants({ variant, padding }), className)}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:opacity-80">
        {content}
      </Pressable>
    );
  }

  return content;
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn("flex-row items-center justify-between mb-2", className)}
    >
      {children}
    </View>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn("", className)}>{children}</View>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between mt-2 pt-2 border-t border-background-border",
        className
      )}
    >
      {children}
    </View>
  );
}

// Compact row card for lists
export function ListCard({
  children,
  onPress,
  className,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}) {
  const content = (
    <View
      className={cn(
        "flex-row items-center py-2 px-2.5 border-b border-background-border/50",
        className
      )}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:bg-surface-secondary/50">
        {content}
      </Pressable>
    );
  }

  return content;
}
