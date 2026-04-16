"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f6f2]">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-[#0c2340] rounded-3xl p-8 sm:p-12 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b47]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f5a623]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b47] to-[#f5a623] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Mail className="w-7 h-7 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Get Weekly Travel Deals
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ travelers who get exclusive deals, destination guides, and travel tips every week.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-green-400">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  You&apos;re in! Check your inbox for your first deal.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-[#ff6b47] transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  Get Deals
                </button>
              </form>
            )}

            <p className="text-white/30 text-xs mt-4">
              No spam, unsubscribe any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
