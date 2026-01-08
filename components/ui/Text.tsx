import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      // Headlines - Compact, tight tracking
      h1: "text-3xl font-bold text-text tracking-tight",
      h2: "text-2xl font-bold text-text tracking-tight",
      h3: "text-xl font-semibold text-text tracking-tight",
      h4: "text-lg font-semibold text-text",
      h5: "text-md font-medium text-text",
      // Body - Dense, readable
      body: "text-base text-text",
      "body-sm": "text-sm text-text",
      "body-xs": "text-xs text-text",
      // Secondary text
      secondary: "text-base text-text-secondary",
      "secondary-sm": "text-sm text-text-secondary",
      "secondary-xs": "text-xs text-text-secondary",
      // Muted/caption - minimal
      caption: "text-2xs text-text-muted",
      muted: "text-xs text-text-muted",
      // Labels - uppercase, spaced
      label: "text-2xs font-medium text-text-muted uppercase tracking-widest",
      "label-sm": "text-2xs font-medium text-text-secondary uppercase tracking-wider",
      // Monospace for data/numbers - tight
      mono: "font-mono text-base text-text tracking-tight",
      "mono-sm": "font-mono text-sm text-text tracking-tight",
      "mono-xs": "font-mono text-xs text-text tracking-tight",
      "mono-lg": "font-mono text-lg text-text tracking-tight",
      // Financial indicators
      profit: "font-mono font-semibold text-profit tracking-tight",
      "profit-sm": "font-mono font-medium text-profit text-sm tracking-tight",
      loss: "font-mono font-semibold text-loss tracking-tight",
      "loss-sm": "font-mono font-medium text-loss text-sm tracking-tight",
      // Accent
      accent: "text-accent font-semibold",
      "accent-sm": "text-sm text-accent font-medium",
      // Ticker style - monospace, bold
      ticker: "font-mono font-bold text-sm text-text tracking-tight",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

interface TextProps
  extends Omit<RNTextProps, "style">,
    VariantProps<typeof textVariants> {
  className?: string;
}

export function Text({
  variant,
  align,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(textVariants({ variant, align }), className)}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Headline({
  children,
  ...props
}: Omit<TextProps, "variant">) {
  return (
    <Text variant="h1" {...props}>
      {children}
    </Text>
  );
}

export function MonoText({ children, className, ...props }: TextProps) {
  return (
    <Text variant="mono" className={cn("", className)} {...props}>
      {children}
    </Text>
  );
}

export function ProfitText({
  value,
  showSign = true,
  size = "default",
  className,
}: {
  value: number;
  showSign?: boolean;
  size?: "default" | "sm";
  className?: string;
}) {
  const isPositive = value >= 0;
  const sign = showSign ? (isPositive ? "+" : "") : "";
  const variant = size === "sm"
    ? (isPositive ? "profit-sm" : "loss-sm")
    : (isPositive ? "profit" : "loss");

  return (
    <Text variant={variant} className={className}>
      {sign}
      {value.toFixed(2)}%
    </Text>
  );
}

// Ticker display component
export function Ticker({
  symbol,
  className
}: {
  symbol: string;
  className?: string;
}) {
  return (
    <Text variant="ticker" className={className}>
      {symbol}
    </Text>
  );
}

// Data value display
export function DataValue({
  value,
  prefix,
  suffix,
  className,
}: {
  value: string | number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <Text variant="mono-sm" className={className}>
      {prefix}{value}{suffix}
    </Text>
  );
}
