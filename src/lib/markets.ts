export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  sparkline_in_7d?: { price: number[] };
  ath: number;
  atl: number;
};

const CG = "https://api.coingecko.com/api/v3";

export async function fetchMarkets(opts: {
  per_page?: number;
  page?: number;
  ids?: string;
  category?: string;
  revalidate?: number;
} = {}): Promise<Coin[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: String(opts.per_page ?? 50),
    page: String(opts.page ?? 1),
    sparkline: "true",
    price_change_percentage: "24h,7d",
  });
  if (opts.ids) params.set("ids", opts.ids);
  if (opts.category) params.set("category", opts.category);

  const url = `${CG}/coins/markets?${params.toString()}`;
  const res = await fetch(url, {
    next: { revalidate: opts.revalidate ?? 30 },
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    return FALLBACK_COINS;
  }
  try {
    const data = (await res.json()) as Coin[];
    return Array.isArray(data) && data.length ? data : FALLBACK_COINS;
  } catch {
    return FALLBACK_COINS;
  }
}

export async function fetchCoin(id: string): Promise<Coin | null> {
  const list = await fetchMarkets({ ids: id, per_page: 1 });
  return list[0] ?? null;
}

const makeSpark = (base: number, volatility = 0.04, len = 168) => {
  const out: number[] = [];
  let p = base;
  for (let i = 0; i < len; i++) {
    p = p * (1 + (Math.random() - 0.5) * volatility);
    out.push(p);
  }
  return out;
};

export const FALLBACK_COINS: Coin[] = [
  {
    id: "bitcoin", symbol: "btc", name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 68421.3, market_cap: 1_345_000_000_000, market_cap_rank: 1,
    total_volume: 28_400_000_000, high_24h: 69120, low_24h: 67230,
    price_change_24h: 820, price_change_percentage_24h: 1.21,
    price_change_percentage_7d_in_currency: 3.4,
    sparkline_in_7d: { price: makeSpark(68000, 0.02) },
    ath: 73800, atl: 67.8,
  },
  {
    id: "ethereum", symbol: "eth", name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3542.1, market_cap: 425_000_000_000, market_cap_rank: 2,
    total_volume: 14_200_000_000, high_24h: 3601, low_24h: 3488,
    price_change_24h: -18.4, price_change_percentage_24h: -0.52,
    price_change_percentage_7d_in_currency: 2.1,
    sparkline_in_7d: { price: makeSpark(3500, 0.025) },
    ath: 4878, atl: 0.43,
  },
  {
    id: "solana", symbol: "sol", name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 184.22, market_cap: 86_000_000_000, market_cap_rank: 5,
    total_volume: 3_800_000_000, high_24h: 189.9, low_24h: 179.1,
    price_change_24h: 4.6, price_change_percentage_24h: 2.56,
    price_change_percentage_7d_in_currency: 7.9,
    sparkline_in_7d: { price: makeSpark(180, 0.035) },
    ath: 259, atl: 0.5,
  },
  {
    id: "ripple", symbol: "xrp", name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.53, market_cap: 29_500_000_000, market_cap_rank: 7,
    total_volume: 1_100_000_000, high_24h: 0.55, low_24h: 0.52,
    price_change_24h: -0.004, price_change_percentage_24h: -0.72,
    price_change_percentage_7d_in_currency: -1.4,
    sparkline_in_7d: { price: makeSpark(0.53, 0.02) },
    ath: 3.4, atl: 0.002,
  },
  {
    id: "dogecoin", symbol: "doge", name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.162, market_cap: 23_400_000_000, market_cap_rank: 9,
    total_volume: 1_600_000_000, high_24h: 0.168, low_24h: 0.156,
    price_change_24h: 0.004, price_change_percentage_24h: 2.6,
    price_change_percentage_7d_in_currency: 5.1,
    sparkline_in_7d: { price: makeSpark(0.16, 0.04) },
    ath: 0.73, atl: 0.00008,
  },
  {
    id: "cardano", symbol: "ada", name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.46, market_cap: 16_000_000_000, market_cap_rank: 11,
    total_volume: 420_000_000, high_24h: 0.47, low_24h: 0.45,
    price_change_24h: -0.003, price_change_percentage_24h: -0.65,
    price_change_percentage_7d_in_currency: 0.9,
    sparkline_in_7d: { price: makeSpark(0.46, 0.025) },
    ath: 3.1, atl: 0.017,
  },
  {
    id: "avalanche-2", symbol: "avax", name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    current_price: 36.5, market_cap: 14_000_000_000, market_cap_rank: 13,
    total_volume: 380_000_000, high_24h: 37.8, low_24h: 35.9,
    price_change_24h: 0.4, price_change_percentage_24h: 1.1,
    price_change_percentage_7d_in_currency: 4.3,
    sparkline_in_7d: { price: makeSpark(36, 0.03) },
    ath: 144, atl: 2.8,
  },
  {
    id: "chainlink", symbol: "link", name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    current_price: 14.7, market_cap: 8_700_000_000, market_cap_rank: 15,
    total_volume: 320_000_000, high_24h: 15.1, low_24h: 14.3,
    price_change_24h: 0.2, price_change_percentage_24h: 1.45,
    price_change_percentage_7d_in_currency: 6.2,
    sparkline_in_7d: { price: makeSpark(14.5, 0.03) },
    ath: 52.7, atl: 0.15,
  },
  {
    id: "toncoin", symbol: "ton", name: "Toncoin",
    image: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png",
    current_price: 6.12, market_cap: 15_000_000_000, market_cap_rank: 12,
    total_volume: 210_000_000, high_24h: 6.3, low_24h: 5.98,
    price_change_24h: 0.05, price_change_percentage_24h: 0.81,
    price_change_percentage_7d_in_currency: 2.7,
    sparkline_in_7d: { price: makeSpark(6.1, 0.022) },
    ath: 7.6, atl: 0.5,
  },
  {
    id: "polkadot", symbol: "dot", name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 7.21, market_cap: 9_400_000_000, market_cap_rank: 14,
    total_volume: 180_000_000, high_24h: 7.38, low_24h: 7.09,
    price_change_24h: 0.06, price_change_percentage_24h: 0.85,
    price_change_percentage_7d_in_currency: -0.3,
    sparkline_in_7d: { price: makeSpark(7.2, 0.02) },
    ath: 55, atl: 2.7,
  },
];
