"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Coin } from "@/lib/markets";
import { useRouter } from "next/navigation";
import Sparkline from "@/components/Sparkline";
import CoinRow from "@/components/CoinRow";
import { Search, ArrowUp, ArrowDown, Star } from "lucide-react";
import { cx, fmtPct, fmtPrice, fmtCompact } from "@/lib/format";

type SortKey = "cap" | "price" | "change" | "volume";
type SortDir = "desc" | "asc";

const CATEGORY_TABS = [
  { key: "all", label: "All" },
  { key: "gainers", label: "Gainers" },
  { key: "losers", label: "Losers" },
  { key: "volume", label: "Volume" },
  { key: "new", label: "New" },
];

const CHAIN_TABS = [
  { key: "favorites", label: "Favorites" },
  { key: "spot", label: "Spot" },
  { key: "futures", label: "Futures" },
  { key: "options", label: "Options" },
];

export default function MarketsClient({ initial }: { initial: Coin[] }) {
  const [coins, setCoins] = useState<Coin[]>(initial);
  const [ts, setTs] = useState(Date.now());
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [chain, setChain] = useState("spot");
  const [sort, setSort] = useState<SortKey>("cap");
  const [dir, setDir] = useState<SortDir>("desc");
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const id = setInterval(async () => {
      if (document.hidden) return;
      try {
        const r = await fetch("/api/markets?per_page=50", { cache: "no-store" });
        if (!r.ok) return;
        const d = (await r.json()) as { coins: Coin[]; ts: number };
        setCoins(d.coins);
        setTs(d.ts);
      } catch {}
    }, 15000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    let list = [...coins];
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.symbol.toLowerCase().includes(needle) ||
          c.name.toLowerCase().includes(needle)
      );
    }
    if (cat === "gainers") {
      list = list
        .filter((c) => c.price_change_percentage_24h > 0)
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );
    } else if (cat === "losers") {
      list = list
        .filter((c) => c.price_change_percentage_24h < 0)
        .sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        );
    } else if (cat === "volume") {
      list = list.sort((a, b) => b.total_volume - a.total_volume);
    } else {
      list = list.sort((a, b) => {
        let va = 0,
          vb = 0;
        if (sort === "cap") {
          va = a.market_cap;
          vb = b.market_cap;
        } else if (sort === "price") {
          va = a.current_price;
          vb = b.current_price;
        } else if (sort === "volume") {
          va = a.total_volume;
          vb = b.total_volume;
        } else {
          va = a.price_change_percentage_24h;
          vb = b.price_change_percentage_24h;
        }
        return dir === "desc" ? vb - va : va - vb;
      });
    }
    return list;
  }, [coins, q, cat, sort, dir]);

  const toggleSort = (k: SortKey) => {
    if (sort === k) setDir(dir === "desc" ? "asc" : "desc");
    else {
      setSort(k);
      setDir("desc");
    }
  };

  return (
    <div className="lg:container-xl">
      {/* display header */}
      <div className="px-4 pt-3 pb-4 lg:px-0 lg:pt-10 lg:pb-8">
        <div className="kicker">Markets</div>
        <h1 className="display-xl text-[34px] lg:text-[56px] mt-1 lg:mt-3">
          Trade the market,
          <br />
          in full.
        </h1>
      </div>

      {/* chain tabs */}
      <div className="scroll-x flex gap-5 lg:gap-8 px-4 lg:px-0 hairline-b">
        {CHAIN_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setChain(t.key)}
            className={cx(
              "text-[14.5px] lg:text-[16px] font-display font-medium tracking-[-0.01em] whitespace-nowrap pb-3 lg:pb-4",
              chain === t.key
                ? "text-[color:var(--text)] tab-underline"
                : "text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* search + category row */}
      <div className="px-4 lg:px-0 pt-3 lg:pt-5 lg:flex lg:items-center lg:justify-between lg:gap-6">
        <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-[color:var(--surface-2)] border border-[color:var(--border)] lg:w-[320px]">
          <Search size={15} className="text-[color:var(--text-dim)]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search symbol or project"
            className="bg-transparent outline-none text-[14px] flex-1 placeholder:text-[color:var(--text-mute)]"
          />
        </div>

        <div className="scroll-x flex gap-1.5 py-3 lg:py-0">
          {CATEGORY_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setCat(t.key)}
              className={cx("chip", cat === t.key && "chip-active")}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* mobile list */}
      <div className="lg:hidden">
        {/* live header */}
        <div className="px-4 py-2 grid grid-cols-[1fr_78px_96px] gap-3 items-center hairline-b text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-mute)]">
          <div className="flex items-center gap-2">
            <span className="live-dot" />
            <span className="num normal-case tracking-normal text-[10px] text-[color:var(--text-dim)]">
              {new Date(ts).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
          <button
            onClick={() => toggleSort("price")}
            className="flex items-center gap-1 justify-end"
          >
            Price
            <SortArrow active={sort === "price"} dir={dir} />
          </button>
          <button
            onClick={() => toggleSort("change")}
            className="flex items-center gap-1 justify-end"
          >
            24h %
            <SortArrow active={sort === "change"} dir={dir} />
          </button>
        </div>

        <div className="row-divide">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-[13px] text-[color:var(--text-dim)]">
              No results for &ldquo;{q}&rdquo;
            </div>
          ) : (
            filtered.map((c) => <CoinRow key={c.id} coin={c} />)
          )}
        </div>
      </div>

      {/* desktop table */}
      <div className="hidden lg:block pt-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-dim)]">
            <span className="live-dot" /> Live ·{" "}
            <span className="num normal-case tracking-normal text-[11px] text-[color:var(--text-2)]">
              {new Date(ts).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
          <span className="text-[11px] num text-[color:var(--text-dim)]">
            {filtered.length} pairs
          </span>
        </div>

        <div className="card overflow-hidden">
          <div className="grid grid-cols-[40px_minmax(180px,1.3fr)_1fr_1fr_1fr_1fr_110px_100px] gap-4 px-5 py-3 hairline-b text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
            <div>#</div>
            <div>Pair</div>
            <button
              onClick={() => toggleSort("price")}
              className="flex items-center gap-1 text-right justify-end"
            >
              Last price <SortArrow active={sort === "price"} dir={dir} />
            </button>
            <button
              onClick={() => toggleSort("change")}
              className="flex items-center gap-1 text-right justify-end"
            >
              24h change <SortArrow active={sort === "change"} dir={dir} />
            </button>
            <button
              onClick={() => toggleSort("volume")}
              className="flex items-center gap-1 text-right justify-end"
            >
              24h volume <SortArrow active={sort === "volume"} dir={dir} />
            </button>
            <button
              onClick={() => toggleSort("cap")}
              className="flex items-center gap-1 text-right justify-end"
            >
              Mkt cap <SortArrow active={sort === "cap"} dir={dir} />
            </button>
            <div className="text-right">7d chart</div>
            <div className="text-right">Trade</div>
          </div>

          <div className="row-divide">
            {filtered.length === 0 ? (
              <div className="px-5 py-16 text-center text-[13px] text-[color:var(--text-dim)]">
                No results for &ldquo;{q}&rdquo;
              </div>
            ) : (
              filtered.map((c, i) => <DesktopRow key={c.id} coin={c} rank={i + 1} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopRow({ coin, rank }: { coin: Coin; rank: number }) {
  const up = coin.price_change_percentage_24h >= 0;
  const router = useRouter();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/trade/${coin.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(`/trade/${coin.id}`);
      }}
      className="grid grid-cols-[40px_minmax(180px,1.3fr)_1fr_1fr_1fr_1fr_110px_100px] gap-4 px-5 py-3.5 items-center hover:bg-[color:var(--surface)]/80 transition-colors cursor-pointer"
    >
      <div className="flex items-center text-[color:var(--text-mute)]">
        <Star size={14} className="shrink-0" />
        <span className="ml-2 num text-[12px]">{rank}</span>
      </div>
      <div className="flex items-center gap-3 min-w-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coin.image}
          alt=""
          className="w-8 h-8 rounded-full shrink-0"
        />
        <div className="min-w-0">
          <div className="font-display font-medium text-[14px] tracking-[-0.015em] flex items-center gap-1.5">
            {coin.symbol.toUpperCase()}
            <span className="text-[11px] text-[color:var(--text-mute)] font-normal">
              / USDT
            </span>
          </div>
          <div className="text-[11px] text-[color:var(--text-dim)] truncate">
            {coin.name}
          </div>
        </div>
      </div>
      <div className="text-right num font-medium text-[14px]">
        ${fmtPrice(coin.current_price)}
      </div>
      <div className="text-right">
        <span className={up ? "pct-up" : "pct-down"}>
          {fmtPct(coin.price_change_percentage_24h)}
        </span>
      </div>
      <div className="text-right num text-[13px] text-[color:var(--text-2)]">
        ${fmtCompact(coin.total_volume)}
      </div>
      <div className="text-right num text-[13px] text-[color:var(--text-2)]">
        ${fmtCompact(coin.market_cap)}
      </div>
      <div className="flex justify-end">
        <Sparkline
          data={coin.sparkline_in_7d?.price ?? []}
          up={up}
          width={100}
          height={30}
        />
      </div>
      <div className="flex justify-end">
        <Link
          href={`/trade/${coin.id}`}
          onClick={(e) => e.stopPropagation()}
          className="h-8 px-3 rounded-md bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[12px] font-medium hover:bg-[color:var(--surface-3)] inline-flex items-center"
        >
          Trade
        </Link>
      </div>
    </div>
  );
}

function SortArrow({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="w-3 h-3 inline-block" />;
  return dir === "desc" ? (
    <ArrowDown size={11} className="text-[color:var(--text)]" />
  ) : (
    <ArrowUp size={11} className="text-[color:var(--text)]" />
  );
}
