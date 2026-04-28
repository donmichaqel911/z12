import Link from "next/link";
import { fetchMarkets } from "@/lib/markets";
import HeroBanner from "@/components/HeroBanner";
import QuickActions from "@/components/QuickActions";
import TickerStrip from "@/components/TickerStrip";
import TopMovers from "@/components/TopMovers";
import NewsStrip from "@/components/NewsStrip";
import LivePrices from "@/components/LivePrices";
import Sparkline from "@/components/Sparkline";
import ToastButton from "@/components/ToastButton";
import GetStartedForm from "@/components/GetStartedForm";
import { fmtPct, fmtPrice, fmtCompact, cx } from "@/lib/format";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe2,
  Users,
  Wallet,
  LineChart,
  Coins,
  Sprout,
  Boxes,
  Lock,
} from "lucide-react";

export const revalidate = 20;

const PRODUCT_CARDS = [
  {
    Icon: LineChart,
    title: "Spot & Futures",
    sub: "300+ pairs, deep liquidity, tight spreads.",
    href: "/markets",
    accent: "var(--brand)",
  },
  {
    Icon: Coins,
    title: "Earn",
    sub: "Flexible savings, staking, DeFi vaults.",
    href: "/earn",
    accent: "#6b7cff",
  },
  {
    Icon: Boxes,
    title: "Web3 Wallet",
    sub: "Self-custody across 80+ chains.",
    href: "/assets",
    accent: "#d98e3a",
  },
  {
    Icon: Sprout,
    title: "Copy Trading",
    sub: "Follow top traders in one tap.",
    href: "/markets",
    accent: "var(--up)",
  },
];

const TRUST_STATS = [
  { value: "60M+", label: "Verified users" },
  { value: "180+", label: "Countries" },
  { value: "$14B", label: "Proof-of-reserves" },
  { value: "300+", label: "Crypto pairs" },
];

export default async function Home() {
  const coins = await fetchMarkets({ per_page: 30 });
  const tickerCoins = coins.slice(0, 12);
  const hotPairs = coins.slice(0, 6);

  return (
    <>
      <TickerStrip coins={tickerCoins} />

      {/* ================= MOBILE (app shell) ================= */}
      <div className="mobile-only">
        <div className="lg:container-xl">
          <HeroBanner />
          <QuickActions />
          <TopMovers coins={coins} />

          <section className="pt-8">
            <div className="px-4 flex items-end justify-between mb-2">
              <div>
                <div className="kicker">Markets</div>
                <h2 className="display-md text-[18px] mt-1">Popular</h2>
              </div>
              <Link
                href="/markets"
                className="text-[12px] text-[color:var(--text-dim)] inline-flex items-center gap-1"
              >
                All markets <ArrowUpRight size={13} />
              </Link>
            </div>
            <LivePrices initial={coins.slice(0, 10)} perPage={10} compact />
          </section>

          <NewsStrip />

          <section className="px-4 pt-10 pb-2">
            <div className="card-elev hero-grad grain overflow-hidden p-6">
              <div className="kicker">Download</div>
              <h3 className="display-lg text-[28px] mt-2 max-w-[230px]">
                Take zengo anywhere.
              </h3>
              <p className="text-[12.5px] text-[color:var(--text-dim)] mt-2 max-w-[250px] leading-[1.45]">
                Scan the QR to install the native iOS & Android apps.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium">
                Get the app
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ================= DESKTOP (landing page) ================= */}
      <div className="desktop-only">
        {/* ---------- HERO ---------- */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 70% at 85% 0%, rgba(215,254,75,0.18), transparent 55%), radial-gradient(50% 60% at 10% 30%, rgba(107,124,255,0.12), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

          <div className="container-xl relative pt-20 pb-24 grid grid-cols-12 gap-10 items-center">
            <div className="col-span-7">
              <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 backdrop-blur">
                <span className="live-dot" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-2)] num">
                  Live markets · {tickerCoins.length} pairs
                </span>
              </div>
              <h1 className="display-xl text-[92px] leading-[0.94] mt-6 tracking-[-0.045em]">
                Buy, trade & hold{" "}
                <span className="text-[color:var(--brand)]">300+</span>
                <br />
                cryptocurrencies.
              </h1>
              <p className="text-[17px] text-[color:var(--text-dim)] mt-6 max-w-[540px] leading-[1.55]">
                The exchange that feels like an instrument. Deep liquidity,
                pro-grade tooling, and self-custody — from your first sat to
                institutional-scale portfolios.
              </p>

              {/* email capture */}
              <GetStartedForm />
              <div className="mt-4 text-[12px] text-[color:var(--text-mute)]">
                No trading fees on your first $10,000 · Licensed in 40+
                jurisdictions
              </div>
            </div>

            {/* right: live snapshot card */}
            <div className="col-span-5">
              <div className="card-elev hero-grad grain overflow-hidden p-6 relative">
                <div className="flex items-center justify-between">
                  <div className="kicker">Live · 24h</div>
                  <span className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] inline-flex items-center gap-1.5">
                    <span className="live-dot" />
                    Streaming
                  </span>
                </div>

                <div className="mt-5 row-divide">
                  {hotPairs.map((c) => {
                    const up = c.price_change_percentage_24h >= 0;
                    return (
                      <Link
                        key={c.id}
                        href={`/trade/${c.id}`}
                        className="flex items-center gap-3 py-3 -mx-2 px-2 rounded-lg hover:bg-[color:var(--surface-2)]/60 transition-colors"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.image}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13.5px] font-display font-medium tracking-[-0.015em]">
                            {c.symbol.toUpperCase()}
                            <span className="text-[11px] text-[color:var(--text-mute)] ml-1 font-normal">
                              /USDT
                            </span>
                          </div>
                          <div className="text-[11px] text-[color:var(--text-dim)] truncate">
                            {c.name}
                          </div>
                        </div>
                        <Sparkline
                          data={c.sparkline_in_7d?.price ?? []}
                          up={up}
                          width={60}
                          height={22}
                        />
                        <div className="text-right w-[86px]">
                          <div className="num text-[13px] font-medium">
                            ${fmtPrice(c.current_price)}
                          </div>
                          <div
                            className={cx(
                              "num text-[11px] mt-0.5",
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

                <Link
                  href="/markets"
                  className="mt-4 h-10 flex items-center justify-center rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--surface-2)] text-[12.5px] font-medium"
                >
                  Explore all markets
                  <ArrowUpRight size={13} className="ml-1.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* trust bar */}
          <div className="container-xl relative pb-16">
            <div className="grid grid-cols-4 gap-0 border-y border-[color:var(--border)]">
              {TRUST_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={cx(
                    "py-7 px-2",
                    i < 3 && "border-r border-[color:var(--border)]"
                  )}
                >
                  <div className="num display-lg text-[34px] leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- MARKETS PREVIEW ---------- */}
        <section className="container-xl pt-16 pb-6 grid grid-cols-12 gap-10">
          <div className="col-span-5">
            <div className="kicker">Markets</div>
            <h2 className="display-xl text-[58px] mt-3 leading-[0.98]">
              Trade the
              <br />
              moving tape.
            </h2>
            <p className="text-[15px] text-[color:var(--text-dim)] mt-5 max-w-[420px] leading-[1.55]">
              Prices stream from the world&rsquo;s deepest books. Filter
              gainers, scan volume, find your next position in under three
              seconds.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link
                href="/markets"
                className="h-11 px-5 rounded-lg bg-[color:var(--text)] text-black font-semibold text-[13.5px] inline-flex items-center gap-2 hover:brightness-90"
              >
                Open markets <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/trade/bitcoin"
                className="h-11 px-5 rounded-lg border border-[color:var(--border)] text-[13.5px] font-medium hover:bg-[color:var(--surface-2)]"
              >
                Trade BTC
              </Link>
            </div>
          </div>
          <div className="col-span-7">
            <TopMovers coins={coins} />
          </div>
        </section>

        <section className="container-xl pt-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="kicker">Popular</div>
              <h3 className="display-md text-[26px] mt-1">
                Top pairs right now
              </h3>
            </div>
            <Link
              href="/markets"
              className="text-[13px] text-[color:var(--text-dim)] hover:text-[color:var(--text)] inline-flex items-center gap-1"
            >
              All markets <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="card overflow-hidden">
            <LivePrices initial={coins.slice(0, 8)} perPage={8} compact />
          </div>
        </section>

        {/* ---------- PRODUCTS ---------- */}
        <section className="container-xl pt-24 pb-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="kicker">Products</div>
              <h2 className="display-xl text-[56px] mt-3 leading-[0.98] max-w-[680px]">
                One account.
                <br />
                Every way to crypto.
              </h2>
            </div>
            <p className="text-[14px] text-[color:var(--text-dim)] max-w-[320px] leading-[1.55]">
              Spot, futures, staking, DeFi, and self-custody — unified under a
              single login with shared balances.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {PRODUCT_CARDS.map(({ Icon, title, sub, href, accent }) => (
              <Link
                key={title}
                href={href}
                className="group card p-6 min-h-[220px] flex flex-col hover:bg-[color:var(--surface-2)]/70 transition-colors relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-[0.15] group-hover:opacity-[0.28] transition-opacity blur-2xl"
                  style={{ background: accent }}
                />
                <div
                  className="w-11 h-11 grid place-items-center rounded-xl border border-[color:var(--border)] relative"
                  style={{ background: "var(--surface-2)" }}
                >
                  <Icon size={18} strokeWidth={2} style={{ color: accent }} />
                </div>
                <div className="font-display font-semibold text-[20px] tracking-[-0.02em] mt-auto pt-8">
                  {title}
                </div>
                <div className="text-[12.5px] text-[color:var(--text-dim)] mt-2 leading-[1.5]">
                  {sub}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-[color:var(--text-2)]">
                  Explore
                  <ArrowUpRight
                    size={13}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- SECURITY ---------- */}
        <section className="container-xl pt-24 grid grid-cols-12 gap-10">
          <div className="col-span-6">
            <div className="card-elev hero-grad grain overflow-hidden p-10 h-full relative">
              <div className="kicker">Proof of reserves</div>
              <h3 className="display-xl text-[48px] mt-3 leading-[1.02]">
                Assets held 1:1.
                <br />
                Audited on-chain.
              </h3>
              <p className="text-[14px] text-[color:var(--text-dim)] mt-5 max-w-[420px] leading-[1.55]">
                Every user deposit is backed at least one-to-one by reserves,
                verified monthly by an independent auditor. Check the Merkle
                tree for your account anytime.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <ToastButton action="Loading proof of reserves data..." className="h-11 px-5 rounded-lg bg-[color:var(--brand)] text-black font-semibold text-[13.5px] inline-flex items-center gap-2">
                  View reserves
                  <ArrowUpRight size={15} />
                </ToastButton>
                <span className="text-[12px] text-[color:var(--text-dim)] num">
                  Last audit · 07 Apr 2026
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-2 gap-5">
            <FeatureCard
              Icon={ShieldCheck}
              title="Cold storage"
              sub="95% of customer assets stored in air-gapped multisig cold wallets."
            />
            <FeatureCard
              Icon={Zap}
              title="Low-latency matching"
              sub="Sub-millisecond order matching across 40+ data centers."
            />
            <FeatureCard
              Icon={Globe2}
              title="Global coverage"
              sub="Licensed in 40+ jurisdictions. 24/7 support in 20 languages."
            />
            <FeatureCard
              Icon={Users}
              title="Institutional desk"
              sub="OTC, prime brokerage, and API access for funds and corporates."
            />
          </div>
        </section>

        {/* ---------- DOWNLOAD ---------- */}
        <section className="container-xl pt-24">
          <div className="card-elev hero-grad grain overflow-hidden p-14 grid grid-cols-12 gap-10 items-center relative">
            <div className="col-span-7">
              <div className="kicker">Mobile</div>
              <h3 className="display-xl text-[54px] mt-3 leading-[0.98] max-w-[520px]">
                Take zengo anywhere.
              </h3>
              <p className="text-[14.5px] text-[color:var(--text-dim)] mt-5 max-w-[420px] leading-[1.55]">
                Stream markets, deposit, trade, and earn — the entire exchange
                in your pocket. iOS and Android, always on.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <ToastButton action="Redirecting to App Store..." className="h-12 px-5 rounded-lg bg-[color:var(--text)] text-black font-semibold text-[13.5px] inline-flex items-center gap-2 hover:brightness-90">
                  <AppleGlyph /> App Store
                </ToastButton>
                <ToastButton action="Redirecting to Google Play..." className="h-12 px-5 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-2)]/60 font-semibold text-[13.5px] inline-flex items-center gap-2 hover:bg-[color:var(--surface-2)]">
                  <PlayGlyph /> Google Play
                </ToastButton>
                <div className="h-12 px-4 ml-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] inline-flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-[4px] grid place-items-center">
                    <div className="w-6 h-6 bg-black rounded-[2px] grid place-items-center">
                      <div className="w-3 h-3 bg-white rounded-[1px]" />
                    </div>
                  </div>
                  <div className="text-[11.5px] leading-[1.25]">
                    <div className="text-[color:var(--text-mute)] uppercase tracking-[0.18em] text-[9.5px]">
                      Scan
                    </div>
                    <div className="font-medium">Open the app</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <PhoneMockup coin={hotPairs[0]} />
            </div>
          </div>
        </section>

        {/* ---------- NEWS ---------- */}
        <section className="container-xl pt-20 pb-4 grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <div className="kicker">Signals</div>
            <h2 className="display-xl text-[48px] mt-3 leading-[1.02]">
              From the desk.
            </h2>
            <p className="text-[13.5px] text-[color:var(--text-dim)] mt-5 leading-[1.55] max-w-[340px]">
              Research, market structure, and product updates — written by the
              people building the exchange.
            </p>
          </div>
          <div className="col-span-8">
            <NewsStrip />
          </div>
        </section>

        {/* ---------- BIG CTA ---------- */}
        <section className="container-xl pt-24 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] p-16 text-center">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 80% at 50% 0%, rgba(215,254,75,0.22), transparent 60%)",
              }}
            />
            <div className="dot-grid absolute inset-0 opacity-50 pointer-events-none" />
            <div className="relative">
              <div className="kicker">Start</div>
              <h2 className="display-xl text-[96px] leading-[0.92] tracking-[-0.05em] mt-4 max-w-[900px] mx-auto">
                Open the exchange.
              </h2>
              <p className="text-[15px] text-[color:var(--text-dim)] mt-6 max-w-[520px] mx-auto leading-[1.55]">
                Sign up in under a minute. Fund with card, bank, or on-chain
                transfer. Start trading immediately.
              </p>
              <div className="flex items-center justify-center gap-3 mt-9">
                <Link
                  href="/markets"
                  className="h-13 px-7 py-3.5 rounded-xl bg-[color:var(--brand)] text-black font-semibold text-[14.5px] inline-flex items-center gap-2 hover:brightness-95"
                >
                  Create account
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/markets"
                  className="h-13 px-7 py-3.5 rounded-xl border border-[color:var(--border)] font-semibold text-[14.5px] hover:bg-[color:var(--surface-2)]"
                >
                  Browse markets
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="border-t border-[color:var(--border)]">
          <div className="container-xl py-14 grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="font-display font-semibold text-[22px] tracking-[-0.035em]">
                zengo
              </div>
              <p className="text-[12.5px] text-[color:var(--text-dim)] mt-3 max-w-[300px] leading-[1.55]">
                The exchange that feels like an instrument. Built for the next
                10 million traders.
              </p>
              <div className="mt-6 flex items-center gap-2 text-[11px] text-[color:var(--text-mute)] uppercase tracking-[0.18em]">
                <Lock size={11} />
                SOC 2 · ISO 27001 · GDPR
              </div>
            </div>
            <FooterCol
              title="Products"
              links={[
                ["Spot", "/markets"],
                ["Futures", "/markets"],
                ["Earn", "/earn"],
                ["Wallet", "/assets"],
              ]}
            />
            <FooterCol
              title="Learn"
              links={[
                ["Academy", "#"],
                ["Research", "#"],
                ["Status", "#"],
                ["API docs", "#"],
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                ["About", "#"],
                ["Careers", "#"],
                ["Press", "#"],
                ["Contact", "#"],
              ]}
            />
          </div>
          <div className="container-xl pb-10 flex items-center justify-between text-[11px] text-[color:var(--text-mute)]">
            <span>© 2026 zengo Technologies Ltd.</span>
            <span className="num">v4.12.0 · Last push · 22 Apr 2026</span>
          </div>
        </footer>
      </div>
    </>
  );
}

function FeatureCard({
  Icon,
  title,
  sub,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  sub: string;
}) {
  return (
    <div className="card p-6">
      <div className="w-11 h-11 grid place-items-center rounded-xl bg-[color:var(--surface-2)] border border-[color:var(--border)]">
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="font-display font-semibold text-[17px] tracking-[-0.015em] mt-5">
        {title}
      </div>
      <div className="text-[12.5px] text-[color:var(--text-dim)] mt-2 leading-[1.5]">
        {sub}
      </div>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div className="col-span-2">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            {href === "#" ? (
              <ToastButton
                action={`${label} section opening...`}
                as="a"
                className="text-[13px] text-[color:var(--text-2)] hover:text-[color:var(--text)] cursor-pointer"
              >
                {label}
              </ToastButton>
            ) : (
              <Link
                href={href}
                className="text-[13px] text-[color:var(--text-2)] hover:text-[color:var(--text)]"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.29-1.15 3.1-.76.88-1.98 1.56-3.1 1.47-.12-1.14.4-2.3 1.13-3.06.8-.86 2.13-1.51 3.12-1.51zM20.5 17.12c-.55 1.23-.82 1.78-1.55 2.87-1 1.52-2.43 3.41-4.2 3.43-1.57.02-1.97-1.02-4.1-1.01-2.13.01-2.57 1.03-4.14 1.02-1.76-.02-3.12-1.72-4.12-3.24C-.1 16.8-.45 11.96 1.4 9.37 2.7 7.54 4.74 6.46 6.67 6.46c1.96 0 3.2 1.07 4.82 1.07 1.58 0 2.54-1.07 4.82-1.07 1.7 0 3.51.93 4.8 2.54-4.22 2.31-3.53 8.34-.61 8.12z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 2.5v19c0 .4.5.7.85.47l14.2-9.5a.57.57 0 0 0 0-.94L3.85 2.03A.57.57 0 0 0 3 2.5z" />
    </svg>
  );
}

function PhoneMockup({ coin }: { coin?: Awaited<ReturnType<typeof fetchMarkets>>[number] }) {
  const up = (coin?.price_change_percentage_24h ?? 0) >= 0;
  return (
    <div className="relative mx-auto w-[300px] aspect-[9/18.5]">
      <div className="absolute inset-0 rounded-[42px] border border-[color:var(--border-strong)] bg-[color:var(--bg-elev)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
        <div className="pt-10 px-5">
          <div className="kicker">Live</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="num display-lg text-[28px] tick-up">
              ${fmtPrice(coin?.current_price ?? 0)}
            </span>
            <span className={up ? "pct-up" : "pct-down"}>
              {fmtPct(coin?.price_change_percentage_24h ?? 0)}
            </span>
          </div>
          <div className="text-[11px] text-[color:var(--text-dim)] mt-0.5">
            {coin?.symbol.toUpperCase()}/USDT · Vol $
            {fmtCompact(coin?.total_volume ?? 0)}
          </div>
          <div className="mt-5 h-[110px] rounded-xl overflow-hidden bg-[color:var(--surface)] border border-[color:var(--border)] p-2">
            <Sparkline
              data={coin?.sparkline_in_7d?.price ?? []}
              up={up}
              width={252}
              height={94}
              fill
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <ToastButton action="Buy modal opening..." className="h-10 rounded-lg bg-[color:var(--up)] text-black font-semibold text-[13px]">
              Buy
            </ToastButton>
            <ToastButton action="Sell modal opening..." className="h-10 rounded-lg bg-[color:var(--down)] text-white font-semibold text-[13px]">
              Sell
            </ToastButton>
          </div>
          <div className="mt-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 rounded-lg bg-[color:var(--surface)] border border-[color:var(--border)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
