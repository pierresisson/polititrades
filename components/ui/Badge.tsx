import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "./Text";

const badgeVariants = cva(
  "flex-row items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-surface-secondary",
        profit: "bg-profit-muted",
        loss: "bg-loss-muted",
        buy: "bg-profit-muted",
        sell: "bg-loss-muted",
        accent: "bg-accent/20",
        primary: "bg-primary/20",
        outline: "bg-transparent border border-background-border",
      },
      size: {
        sm: "px-2 py-0.5",
        md: "px-3 py-1",
        lg: "px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const badgeTextVariants = cva("font-semibold uppercase tracking-wide", {
  variants: {
    variant: {
      default: "text-text-secondary",
      profit: "text-profit",
      loss: "text-loss",
      buy: "text-profit",
      sell: "text-loss",
      accent: "text-accent",
      primary: "text-primary-light",
      outline: "text-text-secondary",
    },
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({ label, variant, size, icon, className }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant, size }), className)}>
      {icon && <View className="mr-1">{icon}</View>}
      <Text className={cn(badgeTextVariants({ variant, size }))}>{label}</Text>
    </View>
  );
}

export function TradeBadge({
  type,
  size = "md",
}: {
  type: "buy" | "sell";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Badge label={type === "buy" ? "BUY" : "SELL"} variant={type} size={size} />
  );
}

export function ChangeBadge({
  value,
  size = "md",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  const isPositive = value >= 0;
  const sign = isPositive ? "+" : "";

  return (
    <Badge
      label={`${sign}${value.toFixed(2)}%`}
      variant={isPositive ? "profit" : "loss"}
      size={size}
    />
  );
}
