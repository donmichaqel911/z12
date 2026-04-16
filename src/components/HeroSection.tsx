"use client";

import { useState } from "react";
import { Search, Plane, Hotel, Map, Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AFFILIATE_MARKER = "235526";

const tabs = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "tours", label: "Tours", icon: Map },
  { id: "insurance", label: "Insurance", icon: Shield },
];

const popularDestinations = [
  "Bali", "Paris", "Tokyo", "Dubai", "New York", "Santorini", "Maldives",
];

const bgImages = [
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80&auto=format",
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&q=80&auto=format",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80&auto=format",
];

function buildSearchUrl(tab: string, from: string, to: string, date: string): string {
  switch (tab) {
    case "flights":
      return `https://aviasales.com/?marker=${AFFILIATE_MARKER}&origin=${from || "NYC"}&destination=${to}&depart_date=${date}&one_way=true`;
    case "hotels":
      return `https://hotellook.com/?marker=${AFFILIATE_MARKER}&destination=${to}&checkIn=${date}&adults=2`;
    case "tours":
      return `https://www.travelpayouts.com/r?marker=${AFFILIATE_MARKER}&p=3003`;
    case "insurance":
      return `https://www.travelpayouts.com/r?marker=${AFFILIATE_MARKER}&p=3006`;
    default:
      return `https://www.travelpayouts.com/?marker=${AFFILIATE_MARKER}`;
  }
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [bgIndex] = useState(0);

  const handleSearch = () => {
    const url = buildSearchUrl(activeTab, from, to, date);
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c2340]/70 via-[#0c2340]/40 to-[#0c2340]/80" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#ff6b47] animate-pulse" />
            90+ Travel Brands, One Place
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-white font-bold tracking-tight mb-4">
          <span className="block text-5xl sm:text-6xl lg:text-7xl leading-none mb-2">
            Your Next
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl leading-none text-gradient">
            Adventure Awaits
          </span>
        </h1>
        <p className="text-center text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Compare flights, hotels, tours and more — all in one place with the best deals guaranteed.
        </p>

        {/* Search Widget */}
        <div className="glass rounded-2xl sm:rounded-3xl p-2 max-w-4xl mx-auto shadow-2xl shadow-black/30">
          {/* Tabs */}
          <div className="flex gap-1 p-1 mb-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTab === id
                    ? "bg-white text-[#0c2340] shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Search fields */}
          <div className="flex flex-col sm:flex-row gap-2 p-1">
            {(activeTab === "flights") && (
              <div className="flex-1 relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="From (city or airport)"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-white/50 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                />
              </div>
            )}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder={activeTab === "flights" ? "To (destination)" : "Where to?"}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/50 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:outline-none focus:bg-white/20 transition-colors"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/10 text-white/70 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white/20 transition-colors cursor-pointer"
              />
            </div>
            <button
              onClick={handleSearch}
              className="sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap"
            >
              Search Deals
            </button>
          </div>
        </div>

        {/* Popular destinations */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-white/50 text-xs font-medium">Popular:</span>
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => { setTo(dest); }}
              className="px-3 py-1.5 rounded-full glass text-white/80 text-xs hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-float">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
