"use client";

import { cx } from "@/lib/format";

type Tab = { key: string; label: string };
type Props = {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
  variant?: "underline" | "chip";
};

export default function MarketTabs({ tabs, active, onChange, variant = "underline" }: Props) {
  if (variant === "chip") {
    return (
      <div className="scroll-x flex gap-2 px-4 py-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={cx("chip", active === t.key && "chip-active")}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="scroll-x flex gap-5 px-4 py-3 border-b border-[color:var(--border)]">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={cx(
            "text-[14px] font-semibold whitespace-nowrap pb-1",
            active === t.key
              ? "text-[color:var(--text)] tab-underline"
              : "text-[color:var(--text-dim)]"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
