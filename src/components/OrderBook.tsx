"use client";

import { useMemo } from "react";
import { fmtPrice } from "@/lib/format";

type Row = { price: number; size: number; total: number };

function build(
  rows: number,
  mid: number,
  step: number,
  side: "bid" | "ask"
): Row[] {
  const out: Row[] = [];
  let total = 0;
  for (let i = 1; i <= rows; i++) {
    const price = side === "ask" ? mid + step * i : mid - step * i;
    const size = +(Math.random() * 3 + 0.15).toFixed(4);
    total += size;
    out.push({ price, size, total: +total.toFixed(4) });
  }
  return out;
}

export default function OrderBook({ price }: { price: number }) {
  const step = Math.max(price * 0.0005, 0.01);
  const { asks, bids, maxTotal } = useMemo(() => {
    const asks = build(8, price, step, "ask").reverse();
    const bids = build(8, price, step, "bid");
    const maxTotal = Math.max(
      asks[0]?.total ?? 1,
      bids[bids.length - 1]?.total ?? 1
    );
    return { asks, bids, maxTotal };
  }, [price, step]);

  const up = true;

  return (
    <div className="mx-4 mt-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elev)] p-3">
      <div className="grid grid-cols-3 text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] mb-2 px-1">
        <span>Price (USDT)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>
      <div className="space-y-[2px]">
        {asks.map((r, i) => (
          <BookRow key={`a-${i}`} row={r} maxTotal={maxTotal} side="ask" />
        ))}
      </div>
      <div className="my-2.5 flex items-center justify-between px-1">
        <span
          className={`num font-display text-[18px] font-semibold ${
            up ? "tick-up" : "tick-down"
          }`}
        >
          {fmtPrice(price)}
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
          Spread · <span className="num text-[10px] tracking-normal">0.02%</span>
        </span>
      </div>
      <div className="space-y-[2px]">
        {bids.map((r, i) => (
          <BookRow key={`b-${i}`} row={r} maxTotal={maxTotal} side="bid" />
        ))}
      </div>
    </div>
  );
}

function BookRow({
  row,
  maxTotal,
  side,
}: {
  row: Row;
  maxTotal: number;
  side: "ask" | "bid";
}) {
  const pct = Math.min(100, (row.total / maxTotal) * 100);
  const color = side === "ask" ? "tick-down" : "tick-up";
  const depthCls = side === "ask" ? "depth-ask" : "depth-bid";
  return (
    <div className="relative grid grid-cols-3 text-[12px] px-1 py-[2px]">
      <span
        className={`absolute inset-y-0 right-0 ${depthCls}`}
        style={{ width: `${pct}%` }}
        aria-hidden
      />
      <span className={`${color} num relative font-medium`}>
        {fmtPrice(row.price)}
      </span>
      <span className="text-right num relative">{row.size.toFixed(4)}</span>
      <span className="text-right num relative text-[color:var(--text-dim)]">
        {row.total.toFixed(4)}
      </span>
    </div>
  );
}
