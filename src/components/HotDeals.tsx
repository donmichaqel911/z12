import { TrendingDown, Clock, Flame } from "lucide-react";

const MARKER = "235526";

const deals = [
  {
    from: "New York",
    to: "Paris",
    price: "$389",
    originalPrice: "$620",
    airline: "Air France",
    dates: "Jun 14 – Jun 21",
    imageUrl: "https://images.unsplash.com/photo-1431274172761-fcdab704a698?w=600&q=80&auto=format",
    type: "flight",
    href: `https://aviasales.com/?marker=${MARKER}&origin=NYC&destination=PAR`,
  },
  {
    from: "London",
    to: "Bali",
    price: "$520",
    originalPrice: "$890",
    airline: "Singapore Air",
    dates: "Jul 5 – Jul 19",
    imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80&auto=format",
    type: "flight",
    href: `https://aviasales.com/?marker=${MARKER}&origin=LON&destination=DPS`,
  },
  {
    from: "Miami",
    to: "Cancún All-Inclusive",
    price: "$799",
    originalPrice: "$1,400",
    airline: "5 Nights Package",
    dates: "Aug 2 – Aug 7",
    imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&q=80&auto=format",
    type: "package",
    href: `https://www.travelpayouts.com/r?marker=${MARKER}&p=3003`,
  },
  {
    from: "Any",
    to: "Maldives Resort",
    price: "$1,199",
    originalPrice: "$2,400",
    airline: "7 Nights Overwater Villa",
    dates: "Sep 10 – Sep 17",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80&auto=format",
    type: "hotel",
    href: `https://hotellook.com/?marker=${MARKER}&destination=Maldives`,
  },
];

export default function HotDeals() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[#ff6b47] text-sm font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Limited Time
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0c2340]">
              Hot Deals Right Now
            </h2>
          </div>
          <a
            href="/deals"
            className="text-[#ff6b47] text-sm font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            See all deals →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((deal) => (
            <a
              key={deal.to}
              href={deal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${deal.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Savings badge */}
                <div className="absolute top-3 right-3 bg-[#ff6b47] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Save {Math.round((1 - parseFloat(deal.price.replace(/[^0-9.]/g, "")) / parseFloat(deal.originalPrice.replace(/[^0-9.]/g, ""))) * 100)}%
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                  {deal.airline}
                </p>
                <h3 className="font-bold text-[#0c2340] text-base mb-1">
                  {deal.from !== "Any" ? `${deal.from} → ` : ""}{deal.to}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <Clock className="w-3 h-3" />
                  {deal.dates}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#0c2340]">{deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">{deal.originalPrice}</span>
                  <span className="text-xs text-gray-400">/ person</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
