import fs from "fs";
import path from "path";

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

const DATA_PATH = path.join(process.cwd(), "src/data/account-data.json");

/**
 * Reads account data from disk (admin overrides), falling back to DEFAULTS.
 * Call this inside server component / API route bodies — not at module level.
 */
export function getAccountData(): AccountData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveAccountData(data: AccountData): void {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}
