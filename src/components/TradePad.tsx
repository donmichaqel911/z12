"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cx, fmtPrice } from "@/lib/format";

export default function TradePad({
  symbol,
  price,
  availableUsdt = 0,
}: {
  symbol: string;
  price: number;
  availableUsdt?: number;
}) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [mode, setMode] = useState<"limit" | "market">("limit");
  const [amount, setAmount] = useState<string>("0.01");
  const [limit, setLimit] = useState<string>(fmtPrice(price));

  const isBuy = side === "buy";

  return (
    <div className="mx-4 mt-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elev)] p-4">
      {/* side */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSide("buy")}
          className={cx(
            "h-10 rounded-lg text-[13px] font-medium",
            isBuy
              ? "bg-[color:var(--up)] text-black"
              : "bg-[color:var(--surface-2)] text-[color:var(--text-dim)] border border-[color:var(--border)]"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={cx(
            "h-10 rounded-lg text-[13px] font-medium",
            !isBuy
              ? "bg-[color:var(--down)] text-white"
              : "bg-[color:var(--surface-2)] text-[color:var(--text-dim)] border border-[color:var(--border)]"
          )}
        >
          Sell
        </button>
      </div>

      {/* mode */}
      <div className="flex gap-5 mt-4 text-[12.5px] font-medium hairline-b pb-3">
        {(["limit", "market"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cx(
              "capitalize",
              mode === m
                ? "text-[color:var(--text)] tab-underline"
                : "text-[color:var(--text-dim)]"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* fields */}
      <div className="mt-3 space-y-2">
        {mode === "limit" && (
          <Field
            label="Price"
            suffix="USDT"
            value={limit}
            onChange={setLimit}
          />
        )}
        <Field
          label="Amount"
          suffix={symbol.toUpperCase()}
          value={amount}
          onChange={setAmount}
        />
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[25, 50, 75, 100].map((p) => (
            <button
              key={p}
              onClick={() =>
                setAmount(
                  (parseFloat(amount || "0") * (p / 25)).toFixed(4)
                )
              }
              className="h-7 rounded-md bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[11px] num text-[color:var(--text-dim)]"
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-[11px] text-[color:var(--text-dim)] uppercase tracking-[0.16em]">
        <span>Available</span>
        <span className="num normal-case tracking-normal text-[12px] text-[color:var(--text-2)]">
          {availableUsdt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
        </span>
      </div>

      <button
        onClick={() => toast.success(`${isBuy ? "Buy" : "Sell"} order for ${symbol.toUpperCase()} submitted`, { description: "Will be controllable via dashboard." })}
        className={cx(
          "w-full mt-3 h-12 rounded-xl font-semibold text-[14.5px] tracking-[-0.01em]",
          isBuy
            ? "bg-[color:var(--up)] text-black"
            : "bg-[color:var(--down)] text-white"
        )}
      >
        {isBuy ? "Buy" : "Sell"} {symbol.toUpperCase()}
      </button>
    </div>
  );
}

function Field({
  label,
  suffix,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--text-mute)] mb-1.5">
        {label}
      </div>
      <div className="flex items-center gap-2 h-11 px-3 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)]">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode="decimal"
          className="bg-transparent outline-none flex-1 text-[14px] num"
        />
        <span className="text-[11px] text-[color:var(--text-dim)] font-medium">
          {suffix}
        </span>
      </div>
    </label>
  );
}
