-- Seed some well-known US politicians
-- This is sample data - real data will come from SEC scraping

INSERT INTO politicians (name, party, state, chamber, position, country) VALUES
  -- Senators
  ('Nancy Pelosi', 'Democratic', 'CA', 'house', 'Representative', 'US'),
  ('Dan Crenshaw', 'Republican', 'TX', 'house', 'Representative', 'US'),
  ('Tommy Tuberville', 'Republican', 'AL', 'senate', 'Senator', 'US'),
  ('Mark Kelly', 'Democratic', 'AZ', 'senate', 'Senator', 'US'),
  ('Josh Gottheimer', 'Democratic', 'NJ', 'house', 'Representative', 'US'),
  ('Michael McCaul', 'Republican', 'TX', 'house', 'Representative', 'US'),
  ('Ro Khanna', 'Democratic', 'CA', 'house', 'Representative', 'US'),
  ('Marjorie Taylor Greene', 'Republican', 'GA', 'house', 'Representative', 'US'),
  ('Alexandria Ocasio-Cortez', 'Democratic', 'NY', 'house', 'Representative', 'US'),
  ('Ted Cruz', 'Republican', 'TX', 'senate', 'Senator', 'US'),
  ('Elizabeth Warren', 'Democratic', 'MA', 'senate', 'Senator', 'US'),
  ('Bernie Sanders', 'Independent', 'VT', 'senate', 'Senator', 'US'),
  ('Marco Rubio', 'Republican', 'FL', 'senate', 'Senator', 'US'),
  ('Mitch McConnell', 'Republican', 'KY', 'senate', 'Senator', 'US'),
  ('Chuck Schumer', 'Democratic', 'NY', 'senate', 'Senator', 'US')
ON CONFLICT DO NOTHING;

-- Sample trades (for development/testing)
-- Real data will be scraped from SEC EDGAR

INSERT INTO insider_trades (politician_id, ticker, company_name, transaction_type, transaction_date, filing_date, amount_min, amount_max, sector)
SELECT
  p.id,
  'NVDA',
  'NVIDIA Corporation',
  'buy',
  '2024-12-15',
  '2024-12-20',
  100000,
  250000,
  'Technology'
FROM politicians p WHERE p.name = 'Nancy Pelosi'
ON CONFLICT DO NOTHING;

INSERT INTO insider_trades (politician_id, ticker, company_name, transaction_type, transaction_date, filing_date, amount_min, amount_max, sector)
SELECT
  p.id,
  'AAPL',
  'Apple Inc.',
  'sell',
  '2024-12-10',
  '2024-12-15',
  50000,
  100000,
  'Technology'
FROM politicians p WHERE p.name = 'Tommy Tuberville'
ON CONFLICT DO NOTHING;

INSERT INTO insider_trades (politician_id, ticker, company_name, transaction_type, transaction_date, filing_date, amount_min, amount_max, sector)
SELECT
  p.id,
  'TSLA',
  'Tesla Inc.',
  'buy',
  '2024-12-08',
  '2024-12-12',
  250000,
  500000,
  'Automotive'
FROM politicians p WHERE p.name = 'Dan Crenshaw'
ON CONFLICT DO NOTHING;

INSERT INTO insider_trades (politician_id, ticker, company_name, transaction_type, transaction_date, filing_date, amount_min, amount_max, sector)
SELECT
  p.id,
  'MSFT',
  'Microsoft Corporation',
  'buy',
  '2024-12-05',
  '2024-12-10',
  15000,
  50000,
  'Technology'
FROM politicians p WHERE p.name = 'Mark Kelly'
ON CONFLICT DO NOTHING;

INSERT INTO insider_trades (politician_id, ticker, company_name, transaction_type, transaction_date, filing_date, amount_min, amount_max, sector)
SELECT
  p.id,
  'GOOGL',
  'Alphabet Inc.',
  'sell',
  '2024-12-01',
  '2024-12-05',
  100000,
  250000,
  'Technology'
FROM politicians p WHERE p.name = 'Josh Gottheimer'
ON CONFLICT DO NOTHING;
