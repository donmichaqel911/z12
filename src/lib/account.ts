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

const DEFAULTS: AccountData = {
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

export async function getAccountData(): Promise<AccountData> {
  try {
    const { data, error } = await supabase
      .from("account_data")
      .select("*")
      .eq("id", "default")
      .single();

    if (error || !data) return { ...DEFAULTS };

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

export async function saveAccountData(data: AccountData): Promise<void> {
  await supabase.from("account_data").upsert({
    id: "default",
    holdings: data.holdings,
    available_usdt: data.availableUsdt,
    monthly_pct: data.monthlyPct,
    activity: data.activity,
    updated_at: new Date().toISOString(),
  });
}
