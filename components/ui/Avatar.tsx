import { View, Image } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "./Text";
import { colors } from "@/constants/theme";

// Support both full party names and short codes
type PartyFull = "Democrat" | "Republican" | "Independent";
type PartyShort = "D" | "R" | "I";
type Party = PartyFull | PartyShort;

const avatarVariants = cva(
  "items-center justify-center bg-surface-secondary overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
        "2xl": "w-20 h-20",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

const initialsVariants = cva("font-inter-semibold text-text", {
  variants: {
    size: {
      xs: "text-2xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  initials: string;
  imageUrl?: string | null;
  party?: Party;
  showPartyIndicator?: boolean;
  className?: string;
}

// Map both formats to colors
function getPartyColor(party: Party): string {
  switch (party) {
    case "Democrat":
    case "D":
      return colors.party.democrat;
    case "Republican":
    case "R":
      return colors.party.republican;
    case "Independent":
    case "I":
      return colors.party.independent;
    default:
      return colors.text.muted;
  }
}

const partyIndicatorSizes: Record<string, { size: number; border: number }> = {
  xs: { size: 8, border: 1 },
  sm: { size: 10, border: 1.5 },
  md: { size: 12, border: 2 },
  lg: { size: 14, border: 2 },
  xl: { size: 16, border: 2 },
  "2xl": { size: 20, border: 2.5 },
};

export function Avatar({
  initials,
  imageUrl,
  size = "md",
  shape = "circle",
  party,
  showPartyIndicator = false,
  className,
}: AvatarProps) {
  const indicatorConfig = partyIndicatorSizes[size || "md"];

  return (
    <View className="relative">
      <View className={cn(avatarVariants({ size, shape }), className)}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className={cn(initialsVariants({ size }))}>
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        )}
      </View>

      {showPartyIndicator && party && (
        <View
          className="absolute -bottom-0.5 -right-0.5 rounded-full"
          style={{
            width: indicatorConfig.size,
            height: indicatorConfig.size,
            backgroundColor: getPartyColor(party),
            borderWidth: indicatorConfig.border,
            borderColor: colors.background.DEFAULT,
          }}
        />
      )}
    </View>
  );
}

// Avatar group for showing multiple avatars
interface AvatarGroupProps {
  avatars: Array<{
    initials: string;
    imageUrl?: string | null;
    party?: Party;
  }>;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "sm",
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const overlapOffset: Record<string, number> = {
    xs: -8,
    sm: -10,
    md: -12,
    lg: -14,
    xl: -18,
    "2xl": -22,
  };

  return (
    <View className={cn("flex-row", className)}>
      {visibleAvatars.map((avatar, index) => (
        <View
          key={index}
          style={{
            marginLeft: index > 0 ? overlapOffset[size || "sm"] : 0,
            zIndex: visibleAvatars.length - index,
          }}
        >
          <Avatar
            initials={avatar.initials}
            imageUrl={avatar.imageUrl}
            party={avatar.party}
            size={size}
            className="border-2 border-background"
          />
        </View>
      ))}

      {remainingCount > 0 && (
        <View
          style={{
            marginLeft: overlapOffset[size || "sm"],
            zIndex: 0,
          }}
          className={cn(
            avatarVariants({ size }),
            "bg-surface-tertiary border-2 border-background"
          )}
        >
          <Text className={cn(initialsVariants({ size }), "text-text-secondary")}>
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
}
