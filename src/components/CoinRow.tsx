"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Sparkline from "./Sparkline";
import type { Coin } from "@/lib/markets";
import { cx, fmtPct, fmtPrice } from "@/lib/format";

type Props = { coin: Coin; showSpark?: boolean; compact?: boolean };

export default function CoinRow({ coin, showSpark = true, compact = false }: Props) {
  const prev = useRef<number | null>(null);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (prev.current !== null && prev.current !== coin.current_price) {
      setFlash(coin.current_price > prev.current ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 700);
      return () => clearTimeout(t);
    }
    prev.current = coin.current_price;
  }, [coin.current_price]);

  const up = coin.price_change_percentage_24h >= 0;

  return (
    <Link
      href={`/trade/${coin.id}`}
      className={cx(
        "flex items-center gap-3 px-4 transition-colors active:bg-[color:var(--surface-2)]",
        compact ? "py-2.5" : "py-3.5",
        flash === "up" && "flash-up",
        flash === "down" && "flash-down"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coin.image}
        alt={coin.name}
        width={32}
        height={32}
        className={cx(
          "rounded-full bg-[color:var(--surface-2)] shrink-0",
          compact ? "w-7 h-7" : "w-8 h-8"
        )}
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-semibold text-[14.5px] tracking-[-0.015em]">
            {coin.symbol.toUpperCase()}
          </span>
          <span className="text-[11px] text-[color:var(--text-mute)]">
            / USDT
          </span>
        </div>
        <div className="text-[11px] text-[color:var(--text-dim)] num mt-0.5">
          Vol ${(coin.total_volume / 1e6).toFixed(1)}M
        </div>
      </div>

      {showSpark && coin.sparkline_in_7d?.price && (
        <div className="opacity-90">
          <Sparkline
            data={coin.sparkline_in_7d.price}
            up={up}
            width={compact ? 58 : 72}
            height={compact ? 24 : 28}
          />
        </div>
      )}

      <div className="text-right w-[94px]">
        <div className="num font-semibold text-[14px] leading-tight">
          ${fmtPrice(coin.current_price)}
        </div>
        <div
          className={cx(
            "num text-[11.5px] mt-0.5",
            up ? "tick-up" : "tick-down"
          )}
        >
          {fmtPct(coin.price_change_percentage_24h)}
        </div>
      </div>
    </Link>
  );
}
