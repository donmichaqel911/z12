import { fetchCoin, fetchMarkets } from "@/lib/markets";
import { getAccountData } from "@/lib/account";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import TradeChart from "@/components/TradeChart";
import OrderBook from "@/components/OrderBook";
import TradePad from "@/components/TradePad";
import ToastButton from "@/components/ToastButton";
import { fmtPct, fmtPrice, fmtCompact, cx } from "@/lib/format";
import Link from "next/link";
import { ChevronLeft, Star, MoreHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TradePage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const session = await getServerSession(authOptions);
  const coin = await fetchCoin(symbol);
  if (!coin) notFound();
  const userId = session?.user?.id;
  const { availableUsdt } = userId ? await getAccountData(userId) : { availableUsdt: 0 };

  const related = await fetchMarkets({ per_page: 8 });
  const up = coin.price_change_percentage_24h >= 0;

  return (
    <div className="pb-6 lg:pb-12 lg:container-xl">
      {/* mobile header */}
      <div className="mobile-only px-4 pt-2 pb-3 flex items-center gap-3 hairline-b">
        <Link
          href="/markets"
          className="h-8 w-8 grid place-items-center -ml-1 text-[color:var(--text-dim)]"
        >
          <ChevronLeft size={20} />
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coin.image} alt="" className="w-7 h-7 rounded-full" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-semibold text-[15.5px] tracking-[-0.02em]">
              {coin.symbol.toUpperCase()}/USDT
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-mute)]">
              Spot
            </span>
          </div>
          <div className="text-[11px] text-[color:var(--text-dim)]">
            {coin.name} · Rank #{coin.market_cap_rank}
          </div>
        </div>
        <ToastButton action="Favorites toggled..." className="h-8 w-8 grid place-items-center text-[color:var(--text-dim)]">
          <Star size={18} />
        </ToastButton>
        <ToastButton action="More options opening..." className="h-8 w-8 grid place-items-center text-[color:var(--text-dim)]">
          <MoreHorizontal size={18} />
        </ToastButton>
      </div>

      {/* desktop instrument strip */}
      <div className="desktop-only pt-6 pb-5 flex items-center gap-6 hairline-b">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coin.image} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-[22px] tracking-[-0.025em]">
                {coin.symbol.toUpperCase()}/USDT
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] px-2 py-0.5 border border-[color:var(--border)] rounded">
                Spot
              </span>
            </div>
            <div className="text-[11.5px] text-[color:var(--text-dim)] mt-0.5">
              {coin.name} · Rank #{coin.market_cap_rank}
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <div
            className={cx(
              "display-lg text-[30px] num leading-none",
              up ? "tick-up" : "tick-down"
            )}
          >
            ${fmtPrice(coin.current_price)}
          </div>
          <div className={up ? "pct-up" : "pct-down"}>
            {fmtPct(coin.price_change_percentage_24h)}
          </div>
        </div>

        <div className="ml-auto grid grid-cols-4 gap-6 text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
          <Stat label="24h High" value={`$${fmtPrice(coin.high_24h)}`} />
          <Stat label="24h Low" value={`$${fmtPrice(coin.low_24h)}`} />
          <Stat label="24h Vol" value={`$${fmtCompact(coin.total_volume)}`} />
          <Stat label="Mkt Cap" value={`$${fmtCompact(coin.market_cap)}`} />
        </div>

        <ToastButton action="Favorites toggled..." className="h-9 w-9 grid place-items-center text-[color:var(--text-dim)] rounded-lg hover:bg-[color:var(--surface-2)]">
          <Star size={17} />
        </ToastButton>
      </div>

      {/* mobile price + stats */}
      <div className="mobile-only px-4 pt-4">
        <div className="flex items-end gap-3">
          <div
            className={cx(
              "display-xl text-[38px] num",
              up ? "tick-up" : "tick-down"
            )}
          >
            ${fmtPrice(coin.current_price)}
          </div>
          <div
            className={cx(
              "pb-1.5 num font-medium text-[13px]",
              up ? "tick-up" : "tick-down"
            )}
          >
            {fmtPct(coin.price_change_percentage_24h)}
          </div>
        </div>
        <div className="text-[11.5px] text-[color:var(--text-dim)] mt-1 num">
          ≈ €{(coin.current_price * 0.93).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-5 text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
          <Stat label="24h High" value={`$${fmtPrice(coin.high_24h)}`} />
          <Stat label="24h Low" value={`$${fmtPrice(coin.low_24h)}`} />
          <Stat label="24h Vol" value={`$${fmtCompact(coin.total_volume)}`} />
          <Stat label="Mkt Cap" value={`$${fmtCompact(coin.market_cap)}`} />
        </div>
      </div>

      {/* mobile stacked chart + book + pad */}
      <div className="mobile-only">
        <div className="mt-5">
          <TradeChart data={coin.sparkline_in_7d?.price ?? []} up={up} />
        </div>
        <OrderBook price={coin.current_price} />
        <TradePad symbol={coin.symbol} price={coin.current_price} availableUsdt={availableUsdt} />
      </div>

      {/* desktop grid: chart (8) | book+pad (4) */}
      <div className="desktop-only grid grid-cols-12 gap-5 pt-5">
        <div className="col-span-8">
          <div className="card overflow-hidden">
            <TradeChart data={coin.sparkline_in_7d?.price ?? []} up={up} />
          </div>

          <section className="pt-6">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <div className="kicker">Related</div>
                <h2 className="display-md text-[20px] mt-1">Similar markets</h2>
              </div>
              <Link
                href="/markets"
                className="text-[12px] text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
              >
                All markets →
              </Link>
            </div>
            <div className="card overflow-hidden row-divide">
              {related
                .filter((c) => c.id !== coin.id)
                .slice(0, 6)
                .map((c) => {
                  const u = c.price_change_percentage_24h >= 0;
                  return (
                    <Link
                      key={c.id}
                      href={`/trade/${c.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-[color:var(--surface-2)]/50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.image}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-display font-medium tracking-[-0.015em]">
                          {c.symbol.toUpperCase()}/USDT
                        </div>
                        <div className="text-[11.5px] text-[color:var(--text-dim)]">
                          {c.name}
                        </div>
                      </div>
                      <div className="num text-[13.5px] font-medium">
                        ${fmtPrice(c.current_price)}
                      </div>
                      <div className="w-[110px] text-right">
                        <span className={u ? "pct-up" : "pct-down"}>
                          {fmtPct(c.price_change_percentage_24h)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        </div>

        <aside className="col-span-4 flex flex-col gap-5">
          <div className="card overflow-hidden">
            <OrderBook price={coin.current_price} />
          </div>
          <div className="card overflow-hidden">
            <TradePad symbol={coin.symbol} price={coin.current_price} availableUsdt={availableUsdt} />
          </div>
        </aside>
      </div>

      {/* mobile related list */}
      <section className="mobile-only pt-8">
        <div className="px-4 mb-3">
          <div className="kicker">Related</div>
          <h2 className="display-md text-[17px] mt-1">Similar markets</h2>
        </div>
        <div className="row-divide">
          {related
            .filter((c) => c.id !== coin.id)
            .slice(0, 5)
            .map((c) => (
              <Link
                key={c.id}
                href={`/trade/${c.id}`}
                className="flex items-center gap-3 px-4 py-3 active:bg-[color:var(--surface-2)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="w-7 h-7 rounded-full" />
                <div className="flex-1">
                  <div className="text-[13.5px] font-display font-medium tracking-[-0.015em]">
                    {c.symbol.toUpperCase()}/USDT
                  </div>
                  <div className="text-[11px] text-[color:var(--text-dim)]">
                    {c.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="num text-[13.5px] font-medium">
                    ${fmtPrice(c.current_price)}
                  </div>
                  <div
                    className={cx(
                      "num text-[11.5px] mt-0.5",
                      c.price_change_percentage_24h >= 0
                        ? "tick-up"
                        : "tick-down"
                    )}
                  >
                    {fmtPct(c.price_change_percentage_24h)}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div>{label}</div>
      <div className="num font-medium text-[12.5px] mt-1 text-[color:var(--text)] normal-case tracking-normal">
        {value}
      </div>
    </div>
  );
}
