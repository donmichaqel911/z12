import { TrendingDown, Clock, Flame, Filter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Travel Deals Today | Flights, Hotels & Tours | WanderDeals",
  description:
    "Find today's hottest travel deals. Cheap flights, discounted hotels, and tour packages at unbeatable prices.",
};

const MARKER = "235526";

const deals = [
  { from: "New York", to: "Paris", price: "$389", original: "$620", savings: 37, airline: "Air France", dates: "Jun 14–21", type: "Flight", image: "https://images.unsplash.com/photo-1431274172761-fcdab704a698?w=600&q=80&auto=format", href: `https://aviasales.com/?marker=${MARKER}&origin=NYC&destination=PAR` },
  { from: "London", to: "Bali", price: "$520", original: "$890", savings: 42, airline: "Singapore Airlines", dates: "Jul 5–19", type: "Flight", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&auto=format", href: `https://aviasales.com/?marker=${MARKER}&origin=LON&destination=DPS` },
  { from: "Miami", to: "Cancún", price: "$799", original: "$1,400", savings: 43, airline: "5-Night Package", dates: "Aug 2–7", type: "Package", image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&q=80&auto=format", href: `https://www.travelpayouts.com/r?marker=${MARKER}&p=3003` },
  { from: "Any", to: "Maldives Resort", price: "$1,199", original: "$2,400", savings: 50, airline: "7-Night Overwater Villa", dates: "Sep 10–17", type: "Hotel", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&auto=format", href: `https://hotellook.com/?marker=${MARKER}&destination=Maldives` },
  { from: "Los Angeles", to: "Tokyo", price: "$650", original: "$1,100", savings: 41, airline: "Japan Airlines", dates: "Oct 3–17", type: "Flight", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80&auto=format", href: `https://aviasales.com/?marker=${MARKER}&origin=LAX&destination=TYO` },
  { from: "Paris", to: "Santorini", price: "$199", original: "$380", savings: 48, airline: "Aegean Air", dates: "Jun 20–27", type: "Flight", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80&auto=format", href: `https://aviasales.com/?marker=${MARKER}&origin=PAR&destination=JTR` },
  { from: "New York", to: "Dubai 5★ Hotel", price: "$180", original: "$420", savings: 57, airline: "Per night, breakfast included", dates: "Jul 15–22", type: "Hotel", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&auto=format", href: `https://hotellook.com/?marker=${MARKER}&destination=Dubai` },
  { from: "Any", to: "Thailand Adventure Tour", price: "$499", original: "$899", savings: 44, airline: "7-Day Tour Package", dates: "Aug 20–27", type: "Tour", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80&auto=format", href: `https://www.travelpayouts.com/r?marker=${MARKER}&p=3003` },
];

const typeColors: Record<string, string> = {
  Flight: "bg-blue-100 text-blue-700",
  Hotel: "bg-purple-100 text-purple-700",
  Package: "bg-orange-100 text-orange-700",
  Tour: "bg-green-100 text-green-700",
};

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      {/* Header */}
      <div className="bg-[#0c2340] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#ff6b47] text-sm font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4" /> Updated Daily
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Hot Travel Deals
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Hand-picked deals updated daily — flights, hotels, packages and tours at the lowest prices.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {["All", "Flights", "Hotels", "Packages", "Tours"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                f === "All"
                  ? "bg-[#0c2340] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Deals grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {deals.map((deal) => (
            <a
              key={deal.to + deal.dates}
              href={deal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${deal.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Savings */}
                <div className="absolute top-3 right-3 bg-[#ff6b47] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -{deal.savings}%
                </div>

                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${typeColors[deal.type] || "bg-gray-100 text-gray-700"}`}>
                    {deal.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-400 font-medium mb-1">{deal.airline}</p>
                <h3 className="font-bold text-[#0c2340] text-sm mb-1">
                  {deal.from !== "Any" ? `${deal.from} → ` : ""}{deal.to}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                  <Clock className="w-3 h-3" />
                  {deal.dates}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#0c2340]">{deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">{deal.original}</span>
                </div>
                <div className="mt-3 text-[#ff6b47] text-xs font-semibold flex items-center gap-1">
                  Book this deal
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* See more CTA */}
        <div className="mt-12 text-center">
          <a
            href={`https://www.travelpayouts.com/?marker=${MARKER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300"
          >
            Search All Deals on Travelpayouts →
          </a>
          <p className="text-gray-400 text-xs mt-3">
            90+ travel brands · Updated daily · No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
}
