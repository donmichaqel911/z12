-- Users table for zengo authentication
-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Disable RLS (server-side only via service role key)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
