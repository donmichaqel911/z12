import { Zap, DollarSign, HeadphonesIcon, Star } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Best Price Guarantee",
    description:
      "We compare hundreds of providers to ensure you always get the best deal available.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description:
      "Book flights, hotels, and tours in seconds. No long forms, no hidden fees.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Star,
    title: "Curated Selection",
    description:
      "Only the best-rated destinations and experiences hand-picked by travel experts.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our partner brands offer round-the-clock customer support wherever you are.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const stats = [
  { value: "90+", label: "Travel Brands" },
  { value: "2M+", label: "Hotels Worldwide" },
  { value: "$0", label: "Hidden Fees" },
  { value: "24/7", label: "Support" },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats bar */}
        <div className="bg-[#0c2340] rounded-2xl p-6 sm:p-8 mb-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{value}</div>
              <div className="text-white/60 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#ff6b47] text-sm font-semibold uppercase tracking-widest mb-3">
              Why Choose WanderDeals
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0c2340] leading-tight mb-6">
              Travel smarter,<br />spend less
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              We partner with 90+ top travel brands to bring you exclusive deals on flights, hotels, tours, and more — all in one place.
            </p>
            <a
              href="https://www.travelpayouts.com/?marker=235526"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b47] to-[#f5a623] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300"
            >
              Start Exploring Deals →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-[#0c2340] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
