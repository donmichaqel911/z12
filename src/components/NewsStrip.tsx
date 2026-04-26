import { ArrowUpRight } from "lucide-react";

const NEWS = [
  {
    tag: "Markets",
    title: "Bitcoin ETFs log third straight week of inflows",
    time: "2h",
  },
  {
    tag: "DeFi",
    title: "Solana DEX volume tops $3B as memecoins rebound",
    time: "4h",
  },
  {
    tag: "Regulation",
    title: "EU MiCA full rollout begins, stablecoins in focus",
    time: "6h",
  },
];

export default function NewsStrip() {
  return (
    <section className="px-4 pt-8">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="kicker">Newsroom</div>
          <h2 className="display-md text-[18px] mt-1">Today in crypto</h2>
        </div>
        <button className="text-[12px] text-[color:var(--text-dim)] inline-flex items-center gap-1">
          All <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="row-divide">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="flex items-start gap-3 py-3 active:bg-[color:var(--surface-2)]"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--brand)] font-medium">
                  {n.tag}
                </span>
                <span className="text-[10px] text-[color:var(--text-mute)]">
                  {n.time}
                </span>
              </div>
              <div className="text-[13.5px] font-medium leading-snug tracking-[-0.01em]">
                {n.title}
              </div>
            </div>
            <div className="w-16 h-16 rounded-lg bg-[color:var(--surface-2)] border border-[color:var(--border)] shrink-0 grid place-items-center">
              <div className="w-8 h-8 rounded-full bg-[color:var(--surface-3)]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
