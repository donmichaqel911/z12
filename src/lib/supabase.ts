import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — never throws at import/module-evaluation time.
// Supports both NEXT_PUBLIC_SUPABASE_URL (local) and SUPABASE_URL (Netlify).
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

// Proxy keeps the `supabase.from(...)` call-style unchanged across all callers.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string | symbol) {
    const client = getClient();
    const value = Reflect.get(client, prop);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
