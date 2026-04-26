export function fmtPrice(n: number): string {
  if (!Number.isFinite(n)) return "--";
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString("en-US", { maximumFractionDigits: 3 });
  if (n >= 0.01) return n.toFixed(4);
  return n.toFixed(6);
}

export function fmtPct(n: number | undefined): string {
  if (n === undefined || !Number.isFinite(n)) return "--";
  const s = n.toFixed(2);
  return `${n >= 0 ? "+" : ""}${s}%`;
}

export function fmtCompact(n: number): string {
  if (!Number.isFinite(n)) return "--";
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(2)}K`;
  return n.toFixed(2);
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
