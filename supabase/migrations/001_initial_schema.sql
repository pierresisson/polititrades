-- PolitiTrades Initial Schema
-- Run this migration to set up the database

-- gen_random_uuid() is native in PostgreSQL 13+ (no extension needed)

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- POLITICIANS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS politicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  party TEXT,
  state TEXT,
  chamber TEXT, -- 'house', 'senate', 'executive', etc.
  position TEXT,
  photo_url TEXT,
  country TEXT DEFAULT 'US',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for politicians (public read)
ALTER TABLE politicians ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Politicians are publicly readable"
  ON politicians FOR SELECT
  TO authenticated
  USING (true);

-- Index for searching
CREATE INDEX idx_politicians_name ON politicians(name);
CREATE INDEX idx_politicians_country ON politicians(country);

-- ============================================
-- INSIDER TRADES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS insider_trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  politician_id UUID REFERENCES politicians(id) ON DELETE CASCADE NOT NULL,
  ticker TEXT NOT NULL,
  company_name TEXT,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell')),
  transaction_date DATE NOT NULL,
  filing_date DATE NOT NULL,
  amount_min BIGINT, -- in USD
  amount_max BIGINT, -- in USD
  sector TEXT,
  source_url TEXT,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for trades (public read)
ALTER TABLE insider_trades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trades are publicly readable"
  ON insider_trades FOR SELECT
  TO authenticated
  USING (true);

-- Indexes for filtering
CREATE INDEX idx_trades_politician ON insider_trades(politician_id);
CREATE INDEX idx_trades_ticker ON insider_trades(ticker);
CREATE INDEX idx_trades_filing_date ON insider_trades(filing_date DESC);
CREATE INDEX idx_trades_transaction_date ON insider_trades(transaction_date DESC);
CREATE INDEX idx_trades_sector ON insider_trades(sector);
CREATE INDEX idx_trades_type ON insider_trades(transaction_type);

-- ============================================
-- USER ALERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  politician_id UUID REFERENCES politicians(id) ON DELETE CASCADE,
  sector TEXT,
  min_amount BIGINT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for alerts
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts"
  ON user_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own alerts"
  ON user_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON user_alerts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts"
  ON user_alerts FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_alerts_user ON user_alerts(user_id);

-- ============================================
-- PUSH TOKENS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'ios', 'android'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, token)
);

-- RLS for push tokens
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tokens"
  ON push_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens"
  ON push_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens"
  ON push_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_politicians_updated_at
  BEFORE UPDATE ON politicians
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
