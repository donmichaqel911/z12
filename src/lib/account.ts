import { supabase } from "./supabase";

export type ActivityEntry = {
  type: string;   // "Deposit" | "Buy" | "Sell" | "Stake" | "Withdraw"
  asset: string;  // "USDT" | "BTC" | "ETH" ...
  amount: string; // "+500.00" | "+0.0184" | "1.2 → Flexible"
  time: string;   // "Today, 09:12" | "Yesterday"
};

export type AccountData = {
  holdings: Record<string, number>;
  availableUsdt: number;
  monthlyPct: number;
  activity: ActivityEntry[];
};

export const DEFAULTS: AccountData = {
  holdings: {
    bitcoin: 0.12483,
    ethereum: 2.4,
    solana: 18.7,
    ripple: 2450,
    dogecoin: 12000,
  },
  availableUsdt: 1_240.0,
  monthlyPct: 4.81,
  activity: [
    { type: "Deposit",  asset: "USDT", amount: "+500.00",        time: "Today, 09:12" },
    { type: "Buy",      asset: "BTC",  amount: "+0.0184",         time: "Yesterday" },
    { type: "Stake",    asset: "ETH",  amount: "1.2 → Flexible", time: "2 days ago" },
  ],
};

/** Fetch a specific user's account data. Auto-initialises if first login. */
export async function getAccountData(userId: string): Promise<AccountData> {
  try {
    const { data } = await supabase
      .from("account_data")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!data) {
      await initUserAccount(userId);
      return { ...DEFAULTS };
    }

    return {
      holdings: (data.holdings as Record<string, number>) ?? DEFAULTS.holdings,
      availableUsdt: Number(data.available_usdt) ?? DEFAULTS.availableUsdt,
      monthlyPct: Number(data.monthly_pct) ?? DEFAULTS.monthlyPct,
      activity: (data.activity as ActivityEntry[]) ?? DEFAULTS.activity,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

/** Persist a user's account data. */
export async function saveAccountData(userId: string, data: AccountData): Promise<void> {
  await supabase.from("account_data").upsert({
    id: userId,
    holdings: data.holdings,
    available_usdt: data.availableUsdt,
    monthly_pct: data.monthlyPct,
    activity: data.activity,
    updated_at: new Date().toISOString(),
  });
}

/** Create a fresh account row for a brand-new user (no-op if already exists). */
export async function initUserAccount(userId: string): Promise<void> {
  await supabase.from("account_data").upsert(
    {
      id: userId,
      holdings: DEFAULTS.holdings,
      available_usdt: DEFAULTS.availableUsdt,
      monthly_pct: DEFAULTS.monthlyPct,
      activity: DEFAULTS.activity,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id", ignoreDuplicates: true }
  );
}
