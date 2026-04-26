"use client";

import { useMemo, useState } from "react";
import { cx } from "@/lib/format";

type Props = { data: number[]; up: boolean };

const RANGES = ["15m", "1H", "4H", "1D", "1W", "1M"] as const;

export default function TradeChart({ data, up }: Props) {
  const [range, setRange] = useState<(typeof RANGES)[number]>("1D");

  const { path, area, min, max, w, h } = useMemo(() => {
    const w = 400,
      h = 220;
    if (!data?.length) return { path: "", area: "", min: 0, max: 0, w, h };
    const mn = Math.min(...data);
    const mx = Math.max(...data);
    const r = mx - mn || 1;
    const dx = w / (data.length - 1);
    const pts = data.map(
      (p, i) => [i * dx, h - ((p - mn) / r) * h] as const
    );
    const d = pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ");
    const a = `${d} L${w},${h} L0,${h} Z`;
    return { path: d, area: a, min: mn, max: mx, w, h };
  }, [data]);

  const color = up ? "var(--up)" : "var(--down)";

  return (
    <div className="mx-4 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elev)]">
      <div className="flex items-center gap-5 px-4 pt-4">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={cx(
              "text-[12px] font-medium font-mono",
              range === r
                ? "text-[color:var(--text)]"
                : "text-[color:var(--text-dim)]"
            )}
          >
            {r}
          </button>
        ))}
        <div className="ml-auto text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-mute)]">
          Candles
        </div>
      </div>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-[220px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.2, 0.4, 0.6, 0.8].map((g) => (
            <line
              key={g}
              x1={0}
              x2={w}
              y1={h * g}
              y2={h * g}
              stroke="var(--border)"
              strokeDasharray="2 5"
            />
          ))}
          {area && <path d={area} fill="url(#tg)" />}
          {path && (
            <path
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* price axis overlay */}
        <div className="absolute inset-y-0 right-0 w-[46px] flex flex-col justify-between py-1 text-[9.5px] text-[color:var(--text-mute)] num text-right pr-1">
          <span>{max.toFixed(2)}</span>
          <span>{((max + min) / 2).toFixed(2)}</span>
          <span>{min.toFixed(2)}</span>
        </div>
      </div>

      <div className="px-4 py-3 grid grid-cols-3 gap-2 text-[10.5px] text-[color:var(--text-mute)] uppercase tracking-[0.14em] hairline-t">
        <div>
          L{" "}
          <span className="num text-[11px] text-[color:var(--text-2)] normal-case tracking-normal">
            {min.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          H{" "}
          <span className="num text-[11px] text-[color:var(--text-2)] normal-case tracking-normal">
            {max.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="text-right">
          Range{" "}
          <span className="num text-[11px] text-[color:var(--text-2)] normal-case tracking-normal">
            {(((max - min) / min) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
