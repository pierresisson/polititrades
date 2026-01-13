import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "./Text";

const badgeVariants = cva(
  "flex-row items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-surface-secondary rounded-md",
        profit: "bg-profit-subtle rounded-md",
        loss: "bg-loss-subtle rounded-md",
        buy: "bg-profit-subtle rounded-md",
        sell: "bg-loss-subtle rounded-md",
        accent: "bg-accent-subtle rounded-md",
        primary: "bg-primary-subtle rounded-md",
        outline: "bg-transparent border border-background-border rounded-md",
        // Pill variants
        "pill-profit": "bg-profit-subtle rounded-full",
        "pill-loss": "bg-loss-subtle rounded-full",
        "pill-accent": "bg-accent-subtle rounded-full",
        // Dot indicator style
        dot: "bg-transparent",
      },
      size: {
        xs: "px-1 py-px",
        sm: "px-1.5 py-0.5",
        md: "px-2 py-0.5",
        lg: "px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

const badgeTextVariants = cva("font-semibold uppercase", {
  variants: {
    variant: {
      default: "text-text-secondary",
      profit: "text-profit-dark",
      loss: "text-loss-dark",
      buy: "text-profit-dark",
      sell: "text-loss-dark",
      accent: "text-accent-dark",
      primary: "text-primary-900",
      outline: "text-text-secondary",
      "pill-profit": "text-profit-dark",
      "pill-loss": "text-loss-dark",
      "pill-accent": "text-accent-dark",
      dot: "text-text-secondary",
    },
    size: {
      xs: "text-2xs tracking-wider",
      sm: "text-2xs tracking-wide",
      md: "text-xs tracking-wide",
      lg: "text-xs tracking-wide",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
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
      {icon && <View className="mr-0.5">{icon}</View>}
      <Text className={cn(badgeTextVariants({ variant, size }))}>{label}</Text>
    </View>
  );
}

export function TradeBadge({
  type,
  size = "sm",
}: {
  type: "buy" | "sell";
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <Badge label={type === "buy" ? "BUY" : "SELL"} variant={type} size={size} />
  );
}

export function ChangeBadge({
  value,
  size = "sm",
}: {
  value: number;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const isPositive = value >= 0;
  const sign = isPositive ? "+" : "";

  return (
    <Badge
      label={`${sign}${value.toFixed(1)}%`}
      variant={isPositive ? "pill-profit" : "pill-loss"}
      size={size}
    />
  );
}

// Status dot indicator
export function StatusDot({
  status,
  label,
}: {
  status: "live" | "delayed" | "closed";
  label?: string;
}) {
  const colorMap = {
    live: "bg-profit",
    delayed: "bg-accent",
    closed: "bg-text-muted",
  };

  return (
    <View className="flex-row items-center gap-1">
      <View className={cn("w-1.5 h-1.5 rounded-full", colorMap[status])} />
      {label && <Text variant="caption">{label}</Text>}
    </View>
  );
}

// Compact inline tag
export function Tag({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <View className={cn("bg-surface-tertiary/50 px-1.5 py-px rounded-sm", className)}>
      <Text variant="caption" className="uppercase tracking-wider">{label}</Text>
    </View>
  );
}
