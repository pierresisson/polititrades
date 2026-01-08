import { View, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-lg overflow-hidden", {
  variants: {
    variant: {
      default: "bg-background-card border border-background-border",
      elevated: "bg-background-elevated",
      ghost: "bg-transparent",
      gradient: "bg-background-card border-l-2 border-l-primary",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
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
      <Pressable onPress={onPress} className="active:opacity-90">
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
      className={cn("flex-row items-center justify-between mb-3", className)}
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
        "flex-row items-center justify-between mt-3 pt-3 border-t border-background-border",
        className
      )}
    >
      {children}
    </View>
  );
}
