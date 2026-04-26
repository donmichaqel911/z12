"use client";

import { useEffect, useState } from "react";
import type { Coin } from "@/lib/markets";
import CoinRow from "./CoinRow";

type Props = {
  initial: Coin[];
  pollMs?: number;
  perPage?: number;
  ids?: string;
  compact?: boolean;
  showHeader?: boolean;
};

export default function LivePrices({
  initial,
  pollMs = 15000,
  perPage = 50,
  ids,
  compact = false,
  showHeader = true,
}: Props) {
  const [coins, setCoins] = useState<Coin[]>(initial);
  const [ts, setTs] = useState<number>(Date.now());

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      if (document.hidden) return;
      try {
        const q = new URLSearchParams({ per_page: String(perPage) });
        if (ids) q.set("ids", ids);
        const res = await fetch(`/api/markets?${q.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { coins: Coin[]; ts: number };
        if (!cancelled && Array.isArray(data.coins)) {
          setCoins(data.coins);
          setTs(data.ts);
        }
      } catch {
        /* silent */
      }
    };
    const id = setInterval(tick, pollMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollMs, perPage, ids]);

  return (
    <div>
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 text-[10.5px] text-[color:var(--text-dim)] uppercase tracking-[0.18em]">
          <div className="flex items-center gap-1.5">
            <span className="live-dot" />
            Live
          </div>
          <span className="num normal-case tracking-normal text-[10px]">
            {new Date(ts).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      )}
      <div className="row-divide">
        {coins.map((c) => (
          <CoinRow key={c.id} coin={c} compact={compact} />
        ))}
      </div>
    </div>
  );
}
