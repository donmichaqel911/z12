-- Account data table for zengo app
-- Run this in the Supabase SQL editor or via supabase db push

CREATE TABLE IF NOT EXISTS account_data (
  id TEXT PRIMARY KEY DEFAULT 'default',
  holdings JSONB NOT NULL DEFAULT '{}',
  available_usdt DECIMAL(20, 8) NOT NULL DEFAULT 0,
  monthly_pct DECIMAL(10, 4) NOT NULL DEFAULT 0,
  activity JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default row
INSERT INTO account_data (id, holdings, available_usdt, monthly_pct, activity)
VALUES (
  'default',
  '{"bitcoin": 50, "ethereum": 2.4, "solana": 18.7, "ripple": 2450, "dogecoin": 12000}',
  1240.0,
  4.81,
  '[
    {"type": "Deposit", "asset": "USDT", "amount": "+500.00", "time": "Today, 09:12"},
    {"type": "Buy", "asset": "BTC", "amount": "+0.0184", "time": "Yesterday"},
    {"type": "Stake", "asset": "ETH", "amount": "1.2 → Flexible", "time": "2 days ago"}
  ]'
)
ON CONFLICT (id) DO NOTHING;

-- Disable RLS (this is server-side only via service role key)
ALTER TABLE account_data DISABLE ROW LEVEL SECURITY;
