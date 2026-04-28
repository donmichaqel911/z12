"use client";

import { useState, useEffect } from "react";
import type { AccountData, ActivityEntry } from "@/lib/account";
import { Plus, Trash2, ChevronDown } from "lucide-react";

type UserEntry = {
  id: string;
  username: string;
  email: string | null;
  role: string;
};

export default function AdminPanel() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string>("admin");
  const [data, setData] = useState<AccountData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load user list
  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((list: UserEntry[]) => {
        setUsers(list);
      });
  }, []);

  // Load selected user's account
  useEffect(() => {
    setData(null);
    fetch(`/api/admin/account?userId=${selectedId}`)
      .then((r) => r.json())
      .then(setData);
  }, [selectedId]);

  async function save() {
    if (!data) return;
    setSaving(true);
    await fetch(`/api/admin/account?userId=${selectedId}`, {
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

  const selectedUser = users.find((u) => u.id === selectedId);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-20">
      <div className="kicker">Admin</div>
      <h1 className="display-xl text-[40px] mt-2 mb-8">Dashboard</h1>

      {/* User selector */}
      <section className="card p-5 mb-4">
        <h2 className="font-display font-semibold text-[16px] mb-4">Editing account</h2>
        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full h-11 px-3 pr-9 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[13.5px] outline-none focus:border-[color:var(--brand)] transition-colors appearance-none"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username} — {u.role}{u.email ? ` (${u.email})` : ""}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-dim)] pointer-events-none"
          />
        </div>
        {selectedUser && (
          <div className="mt-2 text-[11.5px] text-[color:var(--text-dim)]">
            User ID: <span className="font-mono text-[color:var(--text)]">{selectedUser.id}</span>
          </div>
        )}
      </section>

      {!data ? (
        <div className="flex items-center justify-center min-h-[20vh] text-[color:var(--text-dim)] text-[14px]">
          Loading…
        </div>
      ) : (
        <>
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
        </>
      )}
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
