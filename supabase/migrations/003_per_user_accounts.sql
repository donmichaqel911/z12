-- Per-user account data migration
-- Each user now gets their own row in account_data, keyed by their auth user ID.
-- The old shared 'default' row is removed.
-- New users get a fresh account row created automatically on first login (via initUserAccount).

-- Remove the old shared default row
DELETE FROM account_data WHERE id = 'default';

-- Seed accounts for the two hardcoded env users (admin / user)
-- These mirror the DEFAULTS constant in src/lib/account.ts
INSERT INTO account_data (id, holdings, available_usdt, monthly_pct, activity, updated_at)
VALUES
  ('admin', '{"bitcoin":0.12483,"ethereum":2.4,"solana":18.7,"ripple":2450,"dogecoin":12000}', 1240.0, 4.81,
   '[{"type":"Deposit","asset":"USDT","amount":"+500.00","time":"Today, 09:12"},{"type":"Buy","asset":"BTC","amount":"+0.0184","time":"Yesterday"},{"type":"Stake","asset":"ETH","amount":"1.2 → Flexible","time":"2 days ago"}]',
   NOW()),
  ('user',  '{"bitcoin":0.12483,"ethereum":2.4,"solana":18.7,"ripple":2450,"dogecoin":12000}', 1240.0, 4.81,
   '[{"type":"Deposit","asset":"USDT","amount":"+500.00","time":"Today, 09:12"},{"type":"Buy","asset":"BTC","amount":"+0.0184","time":"Yesterday"},{"type":"Stake","asset":"ETH","amount":"1.2 → Flexible","time":"2 days ago"}]',
   NOW())
ON CONFLICT (id) DO NOTHING;

-- For Supabase-registered users, account rows are created automatically at signup
-- via initUserAccount() in src/lib/account.ts (called from src/app/api/auth/signup/route.ts).
