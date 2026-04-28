"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid username or password.");
    } else {
      router.push("/assets");
      router.refresh();
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        <div className="flex items-center gap-2.5 mb-10">
          <BrandMark size={26} />
          <span className="font-display font-semibold text-[22px] tracking-[-0.035em] leading-none">
            zengo
          </span>
        </div>

        <h1 className="display-xl text-[36px] leading-tight mb-1">Welcome back.</h1>
        <p className="text-[color:var(--text-dim)] text-[14px] mb-8">
          Sign in to your account to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] block mb-1.5">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Your username"
              required
              className="w-full h-12 px-4 rounded-xl bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[14.5px] outline-none focus:border-[color:var(--brand)] transition-colors placeholder:text-[color:var(--text-mute)]"
            />
          </div>

          <div>
            <label className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--text-mute)] block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="w-full h-12 px-4 rounded-xl bg-[color:var(--surface-2)] border border-[color:var(--border)] text-[14.5px] outline-none focus:border-[color:var(--brand)] transition-colors placeholder:text-[color:var(--text-mute)]"
            />
          </div>

          {error && (
            <p className="text-[color:var(--down)] text-[13px] pt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[color:var(--brand)] text-black font-semibold text-[14.5px] mt-2 disabled:opacity-50 transition-opacity hover:brightness-95"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[color:var(--text-dim)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[color:var(--text)] font-medium hover:text-[color:var(--brand)]"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
