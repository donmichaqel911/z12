"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Plane, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Destinations", href: "/destinations" },
  { label: "Deals", href: "/deals" },
  { label: "Flights", href: "https://aviasales.com/?marker=235526", external: true },
  { label: "Hotels", href: "https://hotellook.com/?marker=235526", external: true },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-dark shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b47] to-[#f5a623] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Plane className="w-4 h-4 text-white rotate-45" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Wander<span className="text-[#ff6b47]">Deals</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.travelpayouts.com/?marker=235526"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              <Globe className="w-4 h-4" />
              Find Deals
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2">
              <a
                href="https://www.travelpayouts.com/?marker=235526"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-3 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white text-sm font-semibold rounded-xl"
              >
                Find Deals
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
