import Link from "next/link";
import {
  Plus,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  Coins,
  Flame,
  Layers,
  ShieldCheck,
} from "lucide-react";

const ACTIONS = [
  { label: "Buy", Icon: Plus, href: "/markets" },
  { label: "Deposit", Icon: ArrowDownToLine, href: "/assets" },
  { label: "Withdraw", Icon: ArrowUpFromLine, href: "/assets" },
  { label: "Convert", Icon: Repeat, href: "/markets" },
  { label: "Earn", Icon: Coins, href: "/earn" },
  { label: "Futures", Icon: Flame, href: "/markets" },
  { label: "Stake", Icon: Layers, href: "/earn" },
  { label: "Verify", Icon: ShieldCheck, href: "/assets" },
];

export default function QuickActions() {
  return (
    <section className="px-4 pt-5">
      <div className="grid grid-cols-4 gap-y-5">
        {ACTIONS.map(({ label, Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--border)] grid place-items-center transition-colors group-active:bg-[color:var(--surface-3)]">
              <Icon size={18} strokeWidth={2.1} />
            </div>
            <span className="text-[11.5px] text-[color:var(--text-2)] font-medium">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
