"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Slide = {
  kicker: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  theme: "lime" | "red" | "blue";
};

const SLIDES: Slide[] = [
  {
    kicker: "Welcome bonus",
    title: "Up to $10,000",
    sub: "Sign up, verify, and unlock your welcome rewards.",
    cta: "Claim",
    href: "/assets",
    theme: "lime",
  },
  {
    kicker: "New listing",
    title: "PEPE2.0 is live",
    sub: "0% maker fee for the first 48 hours.",
    cta: "Trade",
    href: "/markets",
    theme: "red",
  },
  {
    kicker: "Earn",
    title: "18.9% on USDC",
    sub: "Auto-compounded DeFi vaults with flexible redemption.",
    cta: "Start",
    href: "/earn",
    theme: "blue",
  },
];

const themeClass = {
  lime: "hero-grad",
  red: "hero-grad-alt",
  blue: "hero-grad-blue",
} as const;

export default function HeroBanner() {
  return (
    <section className="pt-4">
      <div className="scroll-x flex gap-3 px-4 snap-x snap-mandatory">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.08, duration: 0.5, ease: "easeOut" }}
            className="snap-center shrink-0 w-[88%] first:ml-0"
          >
            <Link
              href={s.href}
              className={`block relative overflow-hidden rounded-2xl border border-[color:var(--border)] ${themeClass[s.theme]} grain dot-grid`}
            >
              <div className="relative p-5 pb-16">
                <div className="kicker">{s.kicker}</div>
                <h3 className="display-lg text-[30px] mt-2 max-w-[240px]">
                  {s.title}
                </h3>
                <p className="text-[12.5px] text-[color:var(--text-dim)] mt-2 max-w-[250px] leading-[1.45]">
                  {s.sub}
                </p>
              </div>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium">
                  {s.cta}
                  <ArrowUpRight size={14} strokeWidth={2.4} />
                </span>
                <div className="flex items-center gap-1">
                  {SLIDES.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-[3px] rounded-full transition-all ${
                        idx === i
                          ? "w-5 bg-[color:var(--text)]"
                          : "w-1.5 bg-[color:var(--text-mute)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
