import { DestinationCard } from "./DestinationCard";

const MARKER = "235526";

const destinations = [
  {
    location: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    stats: "1,200+ Hotels · Tours from $29",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format",
    themeColor: "150 50% 22%",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Bali`,
  },
  {
    location: "Paris",
    country: "France",
    flag: "🇫🇷",
    stats: "3,400+ Hotels · Flights from $480",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format",
    themeColor: "240 40% 25%",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Paris`,
  },
  {
    location: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    stats: "2,800+ Hotels · Tours from $45",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format",
    themeColor: "350 55% 28%",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Tokyo`,
  },
  {
    location: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    stats: "2,100+ Hotels · Flights from $390",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format",
    themeColor: "35 60% 30%",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Dubai`,
  },
  {
    location: "Santorini",
    country: "Greece",
    flag: "🇬🇷",
    stats: "680+ Hotels · Tours from $65",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80&auto=format",
    themeColor: "210 60% 28%",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Santorini`,
  },
  {
    location: "Maldives",
    country: "Maldives",
    flag: "🇲🇻",
    stats: "320+ Resorts · Packages from $799",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&auto=format",
    themeColor: "185 55% 25%",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Maldives`,
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[#ff6b47] text-sm font-semibold uppercase tracking-widest mb-2">
              Top Picks
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0c2340] leading-tight">
              Dream Destinations
            </h2>
          </div>
          <a
            href="/destinations"
            className="text-[#ff6b47] text-sm font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            View all destinations →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.slice(0, 3).map((dest) => (
            <div key={dest.location} className="h-[400px]">
              <DestinationCard {...dest} />
            </div>
          ))}
          {/* Featured wide card */}
          <div className="sm:col-span-2 h-[350px]">
            <DestinationCard {...destinations[3]} />
          </div>
          <div className="h-[350px]">
            <DestinationCard {...destinations[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
