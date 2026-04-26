import { fetchMarkets } from "@/lib/markets";
import ToastButton from "@/components/ToastButton";
import { Coins, Sprout, Flame, Lock, ArrowUpRight } from "lucide-react";

export const revalidate = 60;

const PRODUCTS = [
  {
    Icon: Coins,
    title: "Simple Earn",
    sub: "Flexible savings",
    apy: "5.80",
    tag: "Flexible",
  },
  {
    Icon: Lock,
    title: "Fixed Staking",
    sub: "30 · 60 · 90 days",
    apy: "12.40",
    tag: "Fixed",
  },
  {
    Icon: Sprout,
    title: "DeFi Vaults",
    sub: "Auto-compounded yield",
    apy: "18.90",
    tag: "High APY",
  },
  {
    Icon: Flame,
    title: "Launchpool",
    sub: "Farm new tokens",
    apy: "—",
    tag: "New",
  },
];

export default async function EarnPage() {
  const coins = await fetchMarkets({ per_page: 12 });
  const featured = coins.slice(0, 8);

  return (
    <div className="pb-6 lg:pb-16 lg:container-xl">
      {/* hero */}
      <section className="px-4 pt-4 lg:px-0 lg:pt-10">
        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] hero-grad grain dot-grid p-6 pb-8 lg:p-12 lg:grid lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="kicker">Earn</div>
            <h1 className="display-xl text-[34px] lg:text-[64px] mt-2 lg:mt-4 max-w-[280px] lg:max-w-[520px]">
              Grow your crypto, while you sleep.
            </h1>
            <p className="text-[12.5px] lg:text-[15px] text-[color:var(--text-dim)] mt-3 lg:mt-5 max-w-[280px] lg:max-w-[480px] leading-[1.45] lg:leading-[1.55]">
              Flexible savings, fixed staking and DeFi vaults — all in one
              place. Start earning the moment you deposit.
            </p>
            <div className="hidden lg:flex items-center gap-3 mt-7">
              <ToastButton action="Start earning flow initiated..." className="h-11 px-5 rounded-lg bg-[color:var(--brand)] text-black font-semibold text-[13.5px] inline-flex items-center gap-2">
                Start earning <ArrowUpRight size={15} />
              </ToastButton>
              <ToastButton action="Loading tutorial details..." className="h-11 px-5 rounded-lg border border-[color:var(--border)] text-[13.5px] font-medium hover:bg-[color:var(--surface-2)]">
                How it works
              </ToastButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:gap-3 mt-6 lg:mt-0 lg:self-center">
            <div className="bg-[color:var(--surface)]/60 rounded-xl border border-[color:var(--border)] p-3 lg:p-5">
              <div className="text-[10px] lg:text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
                Avg. APY
              </div>
              <div className="num text-[22px] lg:text-[38px] font-semibold tick-up mt-1 lg:mt-2">
                +8.72%
              </div>
            </div>
            <div className="bg-[color:var(--surface)]/60 rounded-xl border border-[color:var(--border)] p-3 lg:p-5">
              <div className="text-[10px] lg:text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
                Earning
              </div>
              <div className="num text-[22px] lg:text-[38px] font-semibold mt-1 lg:mt-2">
                $0.00
              </div>
            </div>
            <div className="bg-[color:var(--surface)]/60 rounded-xl border border-[color:var(--border)] p-3 lg:p-5 lg:col-span-2">
              <div className="text-[10px] lg:text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
                Users earning
              </div>
              <div className="num text-[18px] lg:text-[28px] font-semibold mt-1 lg:mt-2">
                2.4M+
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="px-4 pt-7 lg:px-0 lg:pt-14">
        <div className="flex items-baseline justify-between mb-3 lg:mb-6">
          <div>
            <div className="kicker">Products</div>
            <h2 className="display-md text-[18px] lg:text-[28px] mt-1">
              Four ways to earn
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {PRODUCTS.map(({ Icon, title, sub, apy, tag }) => (
            <ToastButton
              key={title}
              action={`Opened ${title} product details`}
              className="card p-4 lg:p-6 text-left active:bg-[color:var(--surface-2)] hover:bg-[color:var(--surface-2)]/60 transition-colors block w-full"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 lg:w-11 lg:h-11 grid place-items-center rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)]">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <span className="text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--brand)] font-medium">
                  {tag}
                </span>
              </div>
              <div className="mt-4 lg:mt-6 font-display text-[14px] lg:text-[18px] font-semibold tracking-[-0.01em]">
                {title}
              </div>
              <div className="text-[11px] lg:text-[12.5px] text-[color:var(--text-dim)] mt-0.5">
                {sub}
              </div>
              <div className="mt-3 lg:mt-5 flex items-baseline gap-1">
                <span className="num display-md text-[22px] lg:text-[34px] tick-up">
                  {apy}
                </span>
                <span className="text-[10.5px] lg:text-[11.5px] text-[color:var(--text-dim)] uppercase tracking-[0.14em]">
                  % APY
                </span>
              </div>
            </ToastButton>
          ))}
        </div>
      </section>

      {/* hot staking */}
      <section className="pt-8 lg:pt-14">
        <div className="px-4 lg:px-0 flex items-baseline justify-between mb-3 lg:mb-5">
          <div>
            <div className="kicker">Staking</div>
            <h2 className="display-md text-[18px] lg:text-[28px] mt-1">
              Hot yields
            </h2>
          </div>
          <span className="text-[11px] lg:text-[13px] text-[color:var(--text-dim)] inline-flex items-center gap-1 hover:text-[color:var(--text)] cursor-pointer">
            View all <ArrowUpRight size={12} />
          </span>
        </div>
        <div className="row-divide lg:card lg:overflow-hidden lg:grid lg:grid-cols-2 lg:row-divide-none lg:gap-0">
          {featured.map((c, i) => {
            const apy = (2 + i * 1.7 + (i % 3) * 1.2).toFixed(2);
            return (
              <div
                key={c.id}
                className="flex items-center gap-3 px-4 lg:px-5 py-3 lg:py-4 lg:border-b lg:border-[color:var(--border)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt=""
                  className="w-8 h-8 lg:w-9 lg:h-9 rounded-full"
                />
                <div className="flex-1">
                  <div className="text-[13.5px] lg:text-[14.5px] font-display font-medium tracking-[-0.015em]">
                    {c.symbol.toUpperCase()}
                  </div>
                  <div className="text-[11px] lg:text-[12px] text-[color:var(--text-dim)]">
                    {c.name}
                  </div>
                </div>
                <div className="text-right mr-3">
                  <div className="num text-[14px] lg:text-[16px] font-semibold tick-up">
                    {apy}%
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-mute)]">
                    Est. APY
                  </div>
                </div>
                <ToastButton action={`Staking ${c.symbol.toUpperCase()} initiated...`} className="px-4 lg:px-5 h-8 lg:h-9 rounded-lg bg-[color:var(--brand)] text-black font-medium text-[12px] lg:text-[13px] hover:brightness-95">
                  Stake
                </ToastButton>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
