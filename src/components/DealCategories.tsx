import { Plane, Hotel, Map, Shield, Car, Ship } from "lucide-react";

const MARKER = "235526";

const categories = [
  {
    icon: Plane,
    title: "Flights",
    description: "Compare 1000+ airlines and find the cheapest fares worldwide.",
    badge: "Best Prices",
    badgeColor: "bg-blue-100 text-blue-700",
    bg: "from-blue-50 to-sky-100",
    iconBg: "bg-blue-600",
    href: `https://aviasales.com/?marker=${MARKER}`,
  },
  {
    icon: Hotel,
    title: "Hotels",
    description: "2M+ hotels, hostels, and apartments. Earn cashback on bookings.",
    badge: "Cashback",
    badgeColor: "bg-purple-100 text-purple-700",
    bg: "from-purple-50 to-violet-100",
    iconBg: "bg-purple-600",
    href: `https://hotellook.com/?marker=${MARKER}`,
  },
  {
    icon: Map,
    title: "Tours & Activities",
    description: "Thousands of guided tours, day trips, and local experiences.",
    badge: "Top Rated",
    badgeColor: "bg-orange-100 text-orange-700",
    bg: "from-orange-50 to-amber-100",
    iconBg: "bg-orange-500",
    href: `https://www.travelpayouts.com/r?marker=${MARKER}&p=3003`,
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Get covered for trip cancellation, medical, and baggage loss.",
    badge: "Essential",
    badgeColor: "bg-green-100 text-green-700",
    bg: "from-green-50 to-emerald-100",
    iconBg: "bg-green-600",
    href: `https://www.travelpayouts.com/r?marker=${MARKER}&p=3006`,
  },
  {
    icon: Car,
    title: "Car Rentals",
    description: "Compare rental cars from top providers at your destination.",
    badge: "Free Cancel",
    badgeColor: "bg-yellow-100 text-yellow-700",
    bg: "from-yellow-50 to-amber-100",
    iconBg: "bg-yellow-500",
    href: `https://www.travelpayouts.com/r?marker=${MARKER}&p=3007`,
  },
  {
    icon: Ship,
    title: "Cruises",
    description: "Luxury cruises to the Caribbean, Mediterranean, and beyond.",
    badge: "Luxury",
    badgeColor: "bg-teal-100 text-teal-700",
    bg: "from-teal-50 to-cyan-100",
    iconBg: "bg-teal-600",
    href: `https://www.travelpayouts.com/?marker=${MARKER}`,
  },
];

export default function DealCategories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#ff6b47] text-sm font-semibold uppercase tracking-widest mb-2">
            Everything You Need
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0c2340]">
            Browse by Category
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            From flights to insurance — compare the best deals across 90+ travel brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ icon: Icon, title, description, badge, badgeColor, bg, iconBg, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${bg} border border-white/60 card-hover overflow-hidden`}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform" />

              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
                  {badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0c2340] mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

              <div className="mt-4 flex items-center gap-1 text-[#ff6b47] text-sm font-semibold">
                Browse deals
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
