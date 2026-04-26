"use client";

import type { Coin } from "@/lib/markets";
import { cx, fmtPct, fmtPrice } from "@/lib/format";

export default function TickerStrip({ coins }: { coins: Coin[] }) {
  if (!coins.length) return null;
  const loop = [...coins, ...coins];
  return (
    <div className="overflow-hidden py-2.5 hairline-b">
      <div className="marquee whitespace-nowrap">
        {loop.map((c, i) => {
          const up = c.price_change_percentage_24h >= 0;
          return (
            <span
              key={`${c.id}-${i}`}
              className="inline-flex items-center gap-2 px-4 text-[12px]"
            >
              <span className="font-medium text-[color:var(--text-2)] tracking-tight">
                {c.symbol.toUpperCase()}
              </span>
              <span className="num text-[color:var(--text-dim)]">
                ${fmtPrice(c.current_price)}
              </span>
              <span
                className={cx(
                  "num font-medium",
                  up ? "tick-up" : "tick-down"
                )}
              >
                {fmtPct(c.price_change_percentage_24h)}
              </span>
              <span className="text-[color:var(--border-strong)] ml-1">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
