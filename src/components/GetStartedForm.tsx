"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function GetStartedForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const qs = email ? `?email=${encodeURIComponent(email)}` : "";
    router.push(`/signup${qs}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex items-center gap-2 max-w-[520px]">
      <div className="flex-1 h-14 flex items-center px-4 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] focus-within:border-[color:var(--border-strong)] transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or phone number"
          className="bg-transparent outline-none text-[14.5px] flex-1 placeholder:text-[color:var(--text-mute)]"
        />
      </div>
      <button
        type="submit"
        className="h-14 px-6 rounded-xl bg-[color:var(--brand)] text-black font-semibold text-[14.5px] inline-flex items-center gap-2 hover:brightness-95"
      >
        Get started
        <ArrowUpRight size={16} />
      </button>
    </form>
  );
}
