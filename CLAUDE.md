# PolitiTrades - Claude Code Guidelines

## Project Overview

PolitiTrades is a premium mobile-first platform that tracks insider trades from politicians and corporate executives. Built with Expo/React Native, targeting iOS first then Android.

**Business Model:** Premium-only (€14.90/month or €149/year) with 7-day trial.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Expo SDK 54** | React Native framework |
| **Expo Router v6** | File-based routing |
| **NativeWind v4** | Tailwind CSS for React Native |
| **Zustand** | State management |
| **Supabase** | Auth + Database + Realtime |
| **RevenueCat** | Premium subscriptions |
| **i18next** | Internationalization (EN/FR) |
| **TypeScript** | Type safety (strict mode) |
| **oxlint** | Linting |
| **Zod** | Schema validation |

## Project Structure

```
polititrades/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Non-authenticated routes
│   ├── (app)/             # Authenticated routes
│   │   └── (tabs)/        # Bottom tab navigation
│   └── _layout.tsx        # Root layout
├── components/
│   └── ui/                # Design system primitives
├── hooks/                 # Custom React hooks
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── store.ts          # Zustand stores
│   ├── i18n.ts           # i18n configuration
│   ├── utils.ts          # Helper functions
│   └── haptics.ts        # Haptic feedback
├── types/
│   └── database.types.ts # Auto-generated Supabase types
├── constants/
│   └── theme.ts          # Design tokens
├── locales/
│   ├── en.json           # English translations
│   └── fr.json           # French translations
└── supabase/
    └── migrations/       # SQL migrations
```

## Commands

```bash
bun run start          # Start Expo dev server
bun run ios            # Run on iOS simulator
bun run android        # Run on Android emulator
bun run lint           # Run oxlint
bun run typecheck      # Run TypeScript check
bun run validate       # Run lint + typecheck
bun run db:types       # Generate Supabase types
```

## Code Style

### Imports

Use `@/` path alias for absolute imports:
```typescript
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
```

### Components

- Use functional components with TypeScript
- Props interface above component
- Use NativeWind classes for styling
- Use `cn()` helper for conditional classes

```typescript
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onPress: () => void;
}

export function Button({ label, variant = "primary", onPress }: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "px-4 py-3 rounded-xl",
        variant === "primary" && "bg-primary",
        variant === "secondary" && "bg-background-card"
      )}
      onPress={onPress}
    >
      <Text className="text-text font-inter-semibold">{label}</Text>
    </Pressable>
  );
}
```

### State Management

Use Zustand stores from `lib/store.ts`:
```typescript
const { user, profile, isLoading } = useAuthStore();
const { isPremium, openPaywall } = usePaywallStore();
```

### Translations

Use react-i18next:
```typescript
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
<Text>{t("home.title")}</Text>
```

### Database Types

Types are auto-generated from Supabase. Regenerate after schema changes:
```bash
bun run db:types
```

## Design System

### Colors (Dark Theme)

- **Background:** `#0F172A` (dark slate)
- **Card:** `#1E293B`
- **Primary:** `#0D9488` (teal)
- **Profit:** `#22C55E` (green)
- **Loss:** `#EF4444` (red)
- **Accent:** `#F59E0B` (gold - premium)
- **Text:** `#F8FAFC`
- **Text Secondary:** `#94A3B8`

### Typography

- Font: Inter (Google Fonts)
- Weights: Regular (400), Medium (500), SemiBold (600), Bold (700)

### Spacing

Use Tailwind spacing: `p-4`, `m-2`, `gap-3`, etc.

## Database Schema

### Core Tables

- `profiles` - User profiles (linked to auth.users)
- `politicians` - Politicians/executives to track
- `insider_trades` - Individual trade records
- `user_alerts` - User alert configurations
- `push_tokens` - Push notification tokens

### Row Level Security

All tables have RLS enabled. Users can only access:
- Their own profile and alerts
- All politicians and trades (read-only)

## Key Features to Implement

### MVP (Phase 1)
1. Auth (email + social)
2. SEC data pipeline (Form 4/PTR scraping)
3. Trade feed with filters
4. Politician profiles
5. Basic alerts
6. Premium paywall

### Phase 2
- Advanced analytics
- Historical data
- Data export (CSV)
- API access

### Phase 3
- EU politicians (France, Germany)
- News integration
- Portfolio tracking

## SEC Data Sources

- **Form 4:** Insider trades (within 2 business days)
- **PTR (Periodic Transaction Report):** Congressional trades

API: https://www.sec.gov/cgi-bin/browse-edgar

## Important Notes

1. **Never store service role key client-side** - Only anon key in app
2. **Always use RLS** - Never bypass with service role in client
3. **Premium check** - Gate features with `isPremium` from store
4. **Haptic feedback** - Use `haptics.light()` for button presses
5. **i18n** - All user-facing strings must be in locale files
6. **Error boundaries** - Wrap screens with error handling
7. **Loading states** - Always show skeleton/spinner during fetches

## Testing

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Full validation
bun run validate
```

## Deployment

```bash
# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --latest
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_PROJECT_ID`
- `EXPO_PUBLIC_REVENUECAT_IOS_KEY`
