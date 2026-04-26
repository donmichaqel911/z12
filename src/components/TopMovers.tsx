import Link from "next/link";
import type { Coin } from "@/lib/markets";
import Sparkline from "./Sparkline";
import { cx, fmtPct, fmtPrice } from "@/lib/format";
import { ArrowUpRight } from "lucide-react";

type Props = { coins: Coin[] };

export default function TopMovers({ coins }: Props) {
  const sorted = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const gainers = sorted.slice(0, 5);
  const losers = sorted.slice(-5).reverse();

  return (
    <section className="pt-8">
      <div className="px-4 flex items-baseline justify-between mb-3">
        <div>
          <div className="kicker">Top movers</div>
          <h2 className="display-md text-[18px] mt-1">24-hour pulse</h2>
        </div>
        <Link
          href="/markets"
          className="text-[12px] text-[color:var(--text-dim)] inline-flex items-center gap-1"
        >
          All <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="scroll-x flex gap-3 px-4 pb-2 snap-x snap-mandatory">
        <Card title="Gainers" accent="up" list={gainers} />
        <Card title="Losers" accent="down" list={losers} />
      </div>
    </section>
  );
}

function Card({
  title,
  accent,
  list,
}: {
  title: string;
  accent: "up" | "down";
  list: Coin[];
}) {
  return (
    <div className="snap-center shrink-0 w-[88%] card-elev p-4">
      <div className="flex items-center justify-between mb-1">
        <h3
          className={cx(
            "text-[12px] font-medium uppercase tracking-[0.18em]",
            accent === "up" ? "tick-up" : "tick-down"
          )}
        >
          {title}
        </h3>
        <span className="text-[10px] text-[color:var(--text-mute)] uppercase tracking-[0.18em]">
          24h
        </span>
      </div>
      <div className="flex flex-col divide-y divide-[color:var(--border)]">
        {list.map((c) => {
          const up = c.price_change_percentage_24h >= 0;
          return (
            <Link
              key={c.id}
              href={`/trade/${c.id}`}
              className="flex items-center gap-2.5 py-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" className="w-6 h-6 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-medium tracking-tight">
                  {c.symbol.toUpperCase()}
                </div>
              </div>
              <Sparkline
                data={c.sparkline_in_7d?.price ?? []}
                up={up}
                width={44}
                height={18}
              />
              <div className="text-right w-[72px]">
                <div className="num text-[12.5px] font-medium">
                  ${fmtPrice(c.current_price)}
                </div>
                <div
                  className={cx(
                    "num text-[10.5px] mt-0.5",
                    up ? "tick-up" : "tick-down"
                  )}
                >
                  {fmtPct(c.price_change_percentage_24h)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
