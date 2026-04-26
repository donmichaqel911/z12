"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, QrCode, Globe, Download, ShieldCheck, LogOut } from "lucide-react";
import BrandMark from "./BrandMark";
import { cx } from "@/lib/format";
import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";

const mockToast = (action: string) => {
  toast.success(action, { description: "Will be controllable via dashboard." });
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/trade/bitcoin", label: "Trade", match: "/trade" },
  { href: "/earn", label: "Earn" },
  { href: "/assets", label: "Assets" },
];

export default function TopBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="safe-top sticky top-0 z-40 bg-[color:var(--bg)]/85 backdrop-blur-xl hairline-b">
      {/* mobile */}
      <div className="mobile-only flex items-center gap-3 px-4 h-14">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark size={20} />
          <span className="font-display font-semibold text-[17px] tracking-[-0.03em] leading-none">
            zengo
          </span>
        </Link>

        <Link
          href="/markets"
          aria-label="Search markets"
          className="ml-auto flex items-center gap-2 h-9 w-9 justify-center rounded-full bg-[color:var(--surface-2)] text-[color:var(--text-dim)]"
        >
          <Search size={16} strokeWidth={2.2} />
        </Link>
        <button
          onClick={() => mockToast("QR Scanner opening...")}
          aria-label="Scan QR"
          className="h-9 w-9 grid place-items-center rounded-full bg-[color:var(--surface-2)] text-[color:var(--text-dim)]"
        >
          <QrCode size={16} strokeWidth={2.2} />
        </button>
        <button
          onClick={() => mockToast("Notifications opening...")}
          aria-label="Notifications"
          className="relative h-9 w-9 grid place-items-center rounded-full bg-[color:var(--surface-2)] text-[color:var(--text-dim)]"
        >
          <Bell size={16} strokeWidth={2.2} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[color:var(--brand)]" />
        </button>
      </div>

      {/* desktop */}
      <div className="desktop-only h-16">
        <div className="container-xl h-full flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <BrandMark size={22} />
            <span className="font-display font-semibold text-[20px] tracking-[-0.035em] leading-none">
              zengo
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV.map((n) => {
              const active = n.match
                ? pathname.startsWith(n.match)
                : pathname === n.href;
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  className={cx(
                    "px-3 h-9 inline-flex items-center text-[13.5px] font-medium rounded-lg transition-colors",
                    active
                      ? "text-[color:var(--text)] bg-[color:var(--surface-2)]"
                      : "text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/markets"
            className="ml-4 flex-1 max-w-[380px] flex items-center gap-2 h-10 px-3.5 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[color:var(--text-dim)] hover:border-[color:var(--border-strong)] transition-colors"
          >
            <Search size={14} />
            <span className="text-[13px]">Search markets, coins, pairs…</span>
            <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border border-[color:var(--border)] bg-[color:var(--bg-elev)]">
              ⌘K
            </kbd>
          </Link>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => mockToast("Download app drawer opening...")}
              className="h-9 w-9 grid place-items-center rounded-full text-[color:var(--text-dim)] hover:bg-[color:var(--surface-2)]"
            >
              <Download size={17} />
            </button>
            <button
              onClick={() => mockToast("Language selector opening...")}
              className="h-9 w-9 grid place-items-center rounded-full text-[color:var(--text-dim)] hover:bg-[color:var(--surface-2)]"
            >
              <Globe size={17} />
            </button>
            <button
              onClick={() => mockToast("Notifications opening...")}
              className="relative h-9 w-9 grid place-items-center rounded-full text-[color:var(--text-dim)] hover:bg-[color:var(--surface-2)]"
            >
              <Bell size={17} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[color:var(--brand)]" />
            </button>

            {session ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={cx(
                      "ml-2 flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12.5px] font-medium transition-colors",
                      pathname === "/admin"
                        ? "bg-[color:var(--brand)] text-black"
                        : "text-[color:var(--brand)] hover:bg-[color:var(--surface-2)]"
                    )}
                  >
                    <ShieldCheck size={14} />
                    Admin
                  </Link>
                )}
                <div className="ml-1 flex items-center gap-2 h-9 px-3 rounded-lg bg-[color:var(--surface-2)] text-[13px]">
                  <span className="text-[color:var(--text-dim)]">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="h-9 w-9 grid place-items-center rounded-full text-[color:var(--text-dim)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)]"
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="ml-2 h-9 px-4 rounded-lg text-[13px] font-medium text-[color:var(--text)] hover:bg-[color:var(--surface-2)]"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="h-9 px-4 rounded-lg text-[13px] font-semibold bg-[color:var(--brand)] text-black hover:brightness-95"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
