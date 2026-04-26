"use client";

import { useState, useEffect } from "react";
import type { AccountData, ActivityEntry } from "@/lib/account";
import { Plus, Trash2 } from "lucide-react";

export default function AdminPanel() {
  const [data, setData] = useState<AccountData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/account")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    await fetch("/api/admin/account", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function setHolding(id: string, value: string) {
    if (!data) return;
    setData({ ...data, holdings: { ...data.holdings, [id]: parseFloat(value) || 0 } });
  }

  function updateActivity(i: number, field: keyof ActivityEntry, value: string) {
    if (!data) return;
    const updated = data.activity.map((a, idx) =>
      idx === i ? { ...a, [field]: value } : a
    );
    setData({ ...data, activity: updated });
  }

  function addActivity() {
    if (!data) return;
    setData({
      ...data,
      activity: [
        { type: "Buy", asset: "BTC", amount: "+0.001", time: "Just now" },
        ...data.activity,
      ],
    });
  }

  function removeActivity(i: number) {
    if (!data) return;
    setData({ ...data, activity: data.activity.filter((_, idx) => idx !== i) });
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-[color:var(--text-dim)] text-[14px]">
        Loading…
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-20">
      <div className="kicker">Admin</div>
      <h1 className="display-xl text-[40px] mt-2 mb-8">Dashboard</h1>

      {/* Balance & performance */}
      <Section title="Balance & performance">
        <div className="grid grid-cols-2 gap-4">
          <AdminField
            label="Available USDT"
            suffix="USDT"
            value={String(data.availableUsdt)}
            onChange={(v) => setData({ ...data, availableUsdt: parseFloat(v) || 0 })}
          />
          <AdminField
            label="Monthly performance"
            suffix="%"
            value={String(data.monthlyPct)}
            onChange={(v) => setData({ ...data, monthlyPct: parseFloat(v) || 0 })}
          />
        </div>
      </Section>

      {/* Holdings */}
      <Section title="Holdings">
        <div className="space-y-2.5">
          {Object.entries(data.holdings).map(([id, amount]) => (
            <div key={id} className="flex items-center gap-3">
              <span className="font-display font-medium text-[13px] w-28 capitalize text-[color:var(--text-dim)]">
                {id}
              </span>
              <input
                value={amount}
                onChange={(e) => setHolding(id, e.target.value)}
                inputMode="decimal"
                className="flex-1 h-10 px-3 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[13.5px] num outline-none focus:border-[color:var(--brand)] transition-colors"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Activity */}
      <Section
        title="Activity"
        action={
          <button
            onClick={addActivity}
            className="flex items-center gap-1 text-[12px] text-[color:var(--brand)]"
          >
            <Plus size={13} /> Add
          </button>
        }
      >
        <div className="space-y-2">
          {data.activity.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={a.type}
                onChange={(e) => updateActivity(i, "type", e.target.value)}
                placeholder="Type"
                className="w-24 h-9 px-2.5 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[12.5px] outline-none focus:border-[color:var(--brand)] transition-colors"
              />
              <input
                value={a.asset}
                onChange={(e) => updateActivity(i, "asset", e.target.value)}
                placeholder="Asset"
                className="w-20 h-9 px-2.5 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[12.5px] num outline-none focus:border-[color:var(--brand)] transition-colors"
              />
              <input
                value={a.amount}
                onChange={(e) => updateActivity(i, "amount", e.target.value)}
                placeholder="Amount"
                className="flex-1 h-9 px-2.5 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[12.5px] num outline-none focus:border-[color:var(--brand)] transition-colors"
              />
              <input
                value={a.time}
                onChange={(e) => updateActivity(i, "time", e.target.value)}
                placeholder="Time"
                className="w-28 h-9 px-2.5 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[12.5px] outline-none focus:border-[color:var(--brand)] transition-colors"
              />
              <button
                onClick={() => removeActivity(i)}
                className="h-9 w-9 grid place-items-center rounded-lg text-[color:var(--text-mute)] hover:text-[color:var(--down)] hover:bg-[color:var(--surface-2)] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Save */}
      <button
        onClick={save}
        disabled={saving}
        className="w-full h-12 rounded-xl bg-[color:var(--brand)] text-black font-semibold text-[14.5px] disabled:opacity-60 transition-all hover:brightness-95"
      >
        {saving ? "Saving…" : saved ? "Saved!" : "Save changes"}
      </button>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-[16px]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function AdminField({
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
    <div>
      <label className="text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--text-mute)] block mb-1.5">
        {label}
      </label>
      <div className="flex items-center h-11 px-3 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] focus-within:border-[color:var(--brand)] transition-colors">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode="decimal"
          className="bg-transparent flex-1 outline-none text-[14px] num"
        />
        <span className="text-[11px] text-[color:var(--text-dim)] ml-1">{suffix}</span>
      </div>
    </div>
  );
}
