import { DestinationCard } from "@/components/DestinationCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Travel Destinations 2024 | WanderDeals",
  description:
    "Discover the world's best travel destinations. Find flights, hotels, and tours for Bali, Paris, Tokyo, Dubai, and more.",
};

const MARKER = "235526";

const allDestinations = [
  { location: "Bali", country: "Indonesia", flag: "🇮🇩", stats: "1,200+ Hotels · Tours from $29", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format", themeColor: "150 50% 22%", href: `https://hotellook.com/?marker=${MARKER}&destination=Bali` },
  { location: "Paris", country: "France", flag: "🇫🇷", stats: "3,400+ Hotels · Flights from $480", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format", themeColor: "240 40% 25%", href: `https://hotellook.com/?marker=${MARKER}&destination=Paris` },
  { location: "Tokyo", country: "Japan", flag: "🇯🇵", stats: "2,800+ Hotels · Tours from $45", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format", themeColor: "350 55% 28%", href: `https://hotellook.com/?marker=${MARKER}&destination=Tokyo` },
  { location: "Dubai", country: "UAE", flag: "🇦🇪", stats: "2,100+ Hotels · Flights from $390", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format", themeColor: "35 60% 30%", href: `https://hotellook.com/?marker=${MARKER}&destination=Dubai` },
  { location: "Santorini", country: "Greece", flag: "🇬🇷", stats: "680+ Hotels · Tours from $65", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80&auto=format", themeColor: "210 60% 28%", href: `https://hotellook.com/?marker=${MARKER}&destination=Santorini` },
  { location: "Maldives", country: "Maldives", flag: "🇲🇻", stats: "320+ Resorts · Packages from $799", imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&auto=format", themeColor: "185 55% 25%", href: `https://hotellook.com/?marker=${MARKER}&destination=Maldives` },
  { location: "New York", country: "USA", flag: "🇺🇸", stats: "4,200+ Hotels · Flights from $120", imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80&auto=format", themeColor: "200 50% 20%", href: `https://hotellook.com/?marker=${MARKER}&destination=New%20York` },
  { location: "Barcelona", country: "Spain", flag: "🇪🇸", stats: "1,800+ Hotels · Tours from $35", imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80&auto=format", themeColor: "30 55% 28%", href: `https://hotellook.com/?marker=${MARKER}&destination=Barcelona` },
  { location: "Kyoto", country: "Japan", flag: "🇯🇵", stats: "900+ Hotels · Tours from $40", imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&auto=format", themeColor: "355 45% 28%", href: `https://hotellook.com/?marker=${MARKER}&destination=Kyoto` },
  { location: "Lisbon", country: "Portugal", flag: "🇵🇹", stats: "1,100+ Hotels · Flights from $280", imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80&auto=format", themeColor: "20 55% 28%", href: `https://hotellook.com/?marker=${MARKER}&destination=Lisbon` },
  { location: "Phuket", country: "Thailand", flag: "🇹🇭", stats: "1,500+ Hotels · Tours from $25", imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80&auto=format", themeColor: "180 55% 22%", href: `https://hotellook.com/?marker=${MARKER}&destination=Phuket` },
  { location: "Cancún", country: "Mexico", flag: "🇲🇽", stats: "890+ Hotels · All-inclusive from $199", imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&q=80&auto=format", themeColor: "195 60% 22%", href: `https://hotellook.com/?marker=${MARKER}&destination=Cancun` },
];

const regions = ["All", "Europe", "Asia", "Americas", "Middle East", "Islands"];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      {/* Page Header */}
      <div className="bg-[#0c2340] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#ff6b47] text-sm font-semibold uppercase tracking-widest mb-3">
            Explore the World
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Top Destinations
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Hand-picked destinations with the best deals on flights, hotels, and tours.
          </p>
        </div>
      </div>

      {/* Region filter */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {regions.map((region) => (
            <button
              key={region}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                region === "All"
                  ? "bg-[#0c2340] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allDestinations.map((dest) => (
            <div key={dest.location} className="h-[320px]">
              <DestinationCard {...dest} />
            </div>
          ))}
        </div>

        {/* Travelpayouts Widget CTA */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-10 text-center border border-gray-100 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0c2340] mb-3">
            Can&apos;t find your destination?
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Search across 90+ travel brands for any destination in the world.
          </p>
          <a
            href={`https://www.travelpayouts.com/?marker=${MARKER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300"
          >
            Search All Destinations →
          </a>
        </div>
      </div>
    </div>
  );
}
