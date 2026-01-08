# PolitiTrades - Development Roadmap

## Phase 1: Foundation & MVP

### 1.1 Project Setup ✅
- [x] Expo project with expo-router
- [x] NativeWind/Tailwind configuration
- [x] Supabase client setup
- [x] Zustand state management
- [x] i18n (EN/FR)
- [x] TypeScript strict mode
- [x] oxlint configuration
- [x] Theme constants

### 1.2 Authentication
- [ ] Email/password auth
- [ ] Google OAuth
- [ ] Apple Sign-In
- [ ] Onboarding flow (3 screens)
- [ ] Profile creation
- [ ] Session persistence with SecureStore

### 1.3 Database Schema
- [ ] `profiles` table + RLS
- [ ] `politicians` table + seed data
- [ ] `insider_trades` table
- [ ] `user_alerts` table
- [ ] `push_tokens` table
- [ ] Supabase migrations

### 1.4 SEC Data Pipeline
- [ ] SEC EDGAR API integration
- [ ] Form 4 parser
- [ ] PTR parser
- [ ] Politician matching algorithm
- [ ] Cron job for daily scraping
- [ ] Data normalization

### 1.5 Core UI Screens
- [ ] Home screen (recent trades, top movers)
- [ ] Trade feed with infinite scroll
- [ ] Trade detail screen
- [ ] Politician profile screen
- [ ] Filter/search functionality
- [ ] Pull-to-refresh

### 1.6 Premium & Payments
- [ ] RevenueCat integration
- [ ] Paywall screen
- [ ] 7-day trial implementation
- [ ] Subscription management
- [ ] Premium feature gating
- [ ] Restore purchases

### 1.7 Alerts System
- [ ] Alert configuration screen
- [ ] Push notification setup
- [ ] Supabase Edge Function for alerts
- [ ] Alert history

---

## Phase 2: Enhanced Features

### 2.1 Analytics
- [ ] Trade performance tracking
- [ ] Politician success rates
- [ ] Sector analysis
- [ ] Time-based patterns
- [ ] Charts (victory-native or similar)

### 2.2 Historical Data
- [ ] Full historical database
- [ ] Date range filters
- [ ] Performance over time
- [ ] Comparison tools

### 2.3 Data Export
- [ ] CSV export
- [ ] API access for premium users
- [ ] Webhook notifications

### 2.4 UX Improvements
- [ ] Dark/light theme toggle
- [ ] Skeleton loaders
- [ ] Animations (Reanimated)
- [ ] Haptic feedback polish
- [ ] Accessibility improvements

---

## Phase 3: Expansion

### 3.1 EU Politicians
- [ ] France (HATVP data)
- [ ] Germany (Bundestag)
- [ ] UK (Parliament)
- [ ] Data source research
- [ ] Scraping infrastructure

### 3.2 News Integration
- [ ] News API integration
- [ ] Trade-news correlation
- [ ] Sentiment analysis
- [ ] Context enrichment

### 3.3 Portfolio Features
- [ ] Virtual portfolio
- [ ] Trade mirroring alerts
- [ ] Performance simulation
- [ ] Watchlists

### 3.4 Social Features
- [ ] Share trade cards
- [ ] Social media integration
- [ ] Leaderboards (optional)

---

## Phase 4: Scale & Monetization

### 4.1 Growth
- [ ] Referral program
- [ ] Affiliate partnerships
- [ ] Content marketing
- [ ] SEO (web version)

### 4.2 B2B Features
- [ ] Team/enterprise plans
- [ ] API tier pricing
- [ ] White-label options
- [ ] Custom alerts

### 4.3 Infrastructure
- [ ] Performance optimization
- [ ] Caching layer
- [ ] CDN for assets
- [ ] Monitoring & analytics

---

## Technical Milestones

| Milestone | Description | Target |
|-----------|-------------|--------|
| **Alpha** | Auth + basic feed working | Week 2 |
| **Beta** | Full MVP with payments | Week 4-5 |
| **Launch** | App Store submission | Week 6 |
| **v1.1** | Analytics + historical | Week 10 |
| **v2.0** | EU expansion | Week 16+ |

---

## Success Metrics

### Launch (Month 1-3)
- 200+ paying subscribers
- €3K MRR
- <5% churn rate
- 4.5+ App Store rating

### Growth (Month 4-12)
- 2000+ paying subscribers
- €30K MRR
- LTV/CAC > 3
- Organic growth > 30%

### Scale (Year 2)
- €100K+ MRR
- EU market penetration
- API revenue stream
- Profitable operations

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| SEC data reliability | Fallback to commercial APIs |
| Low conversion | A/B test pricing, trial length |
| Competition | First-mover EU, execution speed |
| Legal concerns | Clear disclaimers, no advice |
| Technical debt | Weekly refactoring, strict typing |

---

## Current Sprint

**Focus:** Phase 1.2-1.3 (Auth + Database)

### This Week
1. Set up Supabase project
2. Create database migrations
3. Implement auth flows
4. Build onboarding screens

### Next Week
1. SEC data pipeline
2. Home screen UI
3. Trade feed implementation
