"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, CandlestickChart, Coins, Wallet } from "lucide-react";
import { cx } from "@/lib/format";

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/markets", label: "Markets", Icon: LineChart },
  { href: "/trade/bitcoin", label: "Trade", Icon: CandlestickChart, match: "/trade" },
  { href: "/earn", label: "Earn", Icon: Coins },
  { href: "/assets", label: "Assets", Icon: Wallet },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="mobile-only fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 bg-[color:var(--bg)]/92 backdrop-blur-xl border-t border-[color:var(--border)]">
      <ul className="flex items-stretch justify-between px-2 pt-1 pb-[max(env(safe-area-inset-bottom),10px)]">
        {TABS.map(({ href, label, Icon, match }) => {
          const active = match
            ? pathname.startsWith(match)
            : pathname === href;
          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                className={cx(
                  "flex flex-col items-center justify-center gap-[5px] py-2",
                  active
                    ? "text-[color:var(--text)]"
                    : "text-[color:var(--text-mute)]"
                )}
              >
                <Icon size={21} strokeWidth={active ? 2.4 : 1.8} />
                <span
                  className="text-[10px] font-medium tracking-[0.02em]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
