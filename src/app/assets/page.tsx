import { fetchMarkets } from "@/lib/markets";
import { getAccountData } from "@/lib/account";
import {
  Eye,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  Plus,
} from "lucide-react";
import Sparkline from "@/components/Sparkline";
import ToastButton from "@/components/ToastButton";
import { cx, fmtPct, fmtPrice } from "@/lib/format";

export const revalidate = 30;

export default async function AssetsPage() {
  const { holdings: HOLDINGS, monthlyPct, activity: ACTIVITY } = await getAccountData();

  const ids = Object.keys(HOLDINGS).join(",");
  const coins = await fetchMarkets({ ids, per_page: Object.keys(HOLDINGS).length });
  const holdings = coins
    .filter((c) => HOLDINGS[c.id] !== undefined)
    .map((c) => ({
      coin: c,
      amount: HOLDINGS[c.id],
      value: HOLDINGS[c.id] * c.current_price,
    }));
  const total = holdings.reduce((s, h) => s + h.value, 0);
  const pnlToday = holdings.reduce(
    (s, h) => s + h.coin.price_change_24h * h.amount,
    0
  );
  const pnlPct = (pnlToday / Math.max(total - pnlToday, 1)) * 100;

  return (
    <div className="pb-6 lg:pb-16 lg:container-xl">
      {/* desktop page header */}
      <div className="desktop-only pt-10 pb-6">
        <div className="kicker">Portfolio</div>
        <h1 className="display-xl text-[56px] mt-2">Your assets.</h1>
      </div>

      {/* desktop grid: balance hero (8) + quick stats (4) */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6">
        {/* balance hero */}
        <section className="px-4 pt-4 lg:px-0 lg:pt-0 lg:col-span-8">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] hero-grad grain dot-grid p-6 lg:p-10">
            <div className="flex items-center gap-2 text-[10.5px] lg:text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-mute)]">
              Total balance · USD <Eye size={12} />
            </div>
            <div className="num display-xl text-[44px] lg:text-[72px] mt-2 lg:mt-3">
              ${total.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </div>
            <div
              className={cx(
                "mt-2 lg:mt-3 num font-medium text-[13px] lg:text-[15px]",
                pnlToday >= 0 ? "tick-up" : "tick-down"
              )}
            >
              {pnlToday >= 0 ? "+" : ""}${Math.abs(pnlToday).toFixed(2)} ·{" "}
              {fmtPct(pnlPct)}{" "}
              <span className="text-[11px] lg:text-[12px] text-[color:var(--text-dim)]">
                today
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 lg:gap-3 mt-6 lg:mt-10 lg:max-w-[520px]">
              <Action label="Deposit" Icon={ArrowDownToLine} accent />
              <Action label="Withdraw" Icon={ArrowUpFromLine} />
              <Action label="Convert" Icon={Repeat} />
              <Action label="Buy" Icon={Plus} />
            </div>
          </div>
        </section>

        {/* desktop sidebar stats */}
        <aside className="desktop-only lg:col-span-4 flex flex-col gap-3">
          <div className="card p-5">
            <div className="kicker">Allocation</div>
            <div className="mt-3 flex gap-1 h-2 rounded-full overflow-hidden">
              {holdings.map((h, i) => {
                const pct = (h.value / total) * 100;
                const hues = [
                  "var(--brand)",
                  "var(--up)",
                  "var(--down)",
                  "#6b7cff",
                  "#d98e3a",
                ];
                return (
                  <div
                    key={h.coin.id}
                    style={{
                      width: `${pct}%`,
                      background: hues[i % hues.length],
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-4 space-y-2">
              {holdings.map((h, i) => {
                const pct = (h.value / total) * 100;
                const hues = [
                  "var(--brand)",
                  "var(--up)",
                  "var(--down)",
                  "#6b7cff",
                  "#d98e3a",
                ];
                return (
                  <div
                    key={h.coin.id}
                    className="flex items-center gap-2 text-[12px]"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: hues[i % hues.length] }}
                    />
                    <span className="font-display font-medium">
                      {h.coin.symbol.toUpperCase()}
                    </span>
                    <span className="ml-auto num text-[color:var(--text-dim)]">
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card p-5">
            <div className="kicker">This month</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span
                className={cx(
                  "num display-md text-[28px]",
                  monthlyPct >= 0 ? "tick-up" : "tick-down"
                )}
              >
                {monthlyPct >= 0 ? "+" : ""}{monthlyPct.toFixed(2)}%
              </span>
            </div>
            <div className="text-[11.5px] text-[color:var(--text-dim)] mt-1">
              vs. previous 30-day window
            </div>
          </div>
        </aside>
      </div>

      {/* holdings */}
      <section className="pt-8 lg:pt-12">
        <div className="px-4 lg:px-0 flex items-baseline justify-between mb-2 lg:mb-4">
          <div>
            <div className="kicker">Portfolio</div>
            <h2 className="display-md text-[18px] lg:text-[24px] mt-1">
              Holdings
            </h2>
          </div>
          <span className="text-[11px] lg:text-[12px] text-[color:var(--text-dim)] num">
            {holdings.length} assets
          </span>
        </div>

        {/* desktop table header */}
        <div className="hidden lg:grid grid-cols-[minmax(200px,1.3fr)_1fr_1fr_110px_140px] gap-4 px-5 py-3 hairline-b text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-mute)] card-flat rounded-t-xl">
          <div>Asset</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Price</div>
          <div className="text-right">7d</div>
          <div className="text-right">Value</div>
        </div>

        <div className="row-divide lg:card-flat lg:rounded-b-xl lg:overflow-hidden">
          {holdings.map(({ coin, amount, value }) => {
            const up = coin.price_change_percentage_24h >= 0;
            return (
              <div key={coin.id}>
                {/* mobile */}
                <div className="mobile-only flex items-center gap-3 px-4 py-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coin.image}
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-display font-medium tracking-[-0.015em]">
                      {coin.symbol.toUpperCase()}
                    </div>
                    <div className="text-[11px] text-[color:var(--text-dim)] num">
                      {amount.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}{" "}
                      · ${fmtPrice(coin.current_price)}
                    </div>
                  </div>
                  <Sparkline
                    data={coin.sparkline_in_7d?.price ?? []}
                    up={up}
                    width={50}
                    height={22}
                  />
                  <div className="text-right w-[96px]">
                    <div className="num text-[14px] font-semibold">
                      $
                      {value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
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
                </div>

                {/* desktop */}
                <div className="hidden lg:grid grid-cols-[minmax(200px,1.3fr)_1fr_1fr_110px_140px] gap-4 px-5 py-4 items-center hover:bg-[color:var(--surface-2)]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coin.image}
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <div className="font-display font-medium text-[14.5px] tracking-[-0.015em]">
                        {coin.symbol.toUpperCase()}
                      </div>
                      <div className="text-[11.5px] text-[color:var(--text-dim)]">
                        {coin.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right num text-[13.5px]">
                    {amount.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </div>
                  <div className="text-right num text-[13.5px]">
                    ${fmtPrice(coin.current_price)}
                  </div>
                  <div className="flex justify-end">
                    <Sparkline
                      data={coin.sparkline_in_7d?.price ?? []}
                      up={up}
                      width={100}
                      height={28}
                    />
                  </div>
                  <div className="text-right">
                    <div className="num text-[15px] font-semibold">
                      $
                      {value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
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
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* activity */}
      <section className="px-4 pt-8 lg:px-0 lg:pt-12">
        <div className="kicker">Ledger</div>
        <h2 className="display-md text-[18px] lg:text-[24px] mt-1 mb-3 lg:mb-5">
          Recent activity
        </h2>
        <div className="row-divide card overflow-hidden">
          {ACTIVITY.map((a, i) => (
            <Activity
              key={i}
              type={a.type}
              asset={a.asset}
              amount={a.amount}
              time={a.time}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Action({
  label,
  Icon,
  accent,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  accent?: boolean;
}) {
  return (
    <ToastButton action={`${label} dialog opening...`} className="flex flex-col items-center gap-2">
      <div
        className={cx(
          "w-11 h-11 lg:w-14 lg:h-14 rounded-full grid place-items-center border transition-transform hover:scale-105",
          accent
            ? "bg-[color:var(--brand)] text-black border-transparent"
            : "bg-[color:var(--surface-2)] text-[color:var(--text)] border-[color:var(--border)]"
        )}
      >
        <Icon size={17} strokeWidth={2.1} />
      </div>
      <span className="text-[11px] lg:text-[12.5px] text-[color:var(--text-2)]">
        {label}
      </span>
    </ToastButton>
  );
}

function Activity({
  type,
  asset,
  amount,
  time,
}: {
  type: string;
  asset: string;
  amount: string;
  time: string;
}) {
  return (
    <div className="flex items-center px-4 lg:px-5 py-3 lg:py-4">
      <div className="flex-1">
        <div className="text-[13.5px] lg:text-[14.5px] font-display font-medium tracking-[-0.01em]">
          {type} · {asset}
        </div>
        <div className="text-[11px] lg:text-[12px] text-[color:var(--text-dim)]">
          {time}
        </div>
      </div>
      <div className="num text-[13px] lg:text-[14px]">{amount}</div>
    </div>
  );
}
