import Link from "next/link";
import { Plane, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Destinations", href: "/destinations" },
    { label: "Hot Deals", href: "/deals" },
    { label: "Travel Blog", href: "/blog" },
    { label: "Travel Tips", href: "/blog" },
  ],
  Book: [
    { label: "Cheap Flights", href: "https://aviasales.com/?marker=235526", external: true },
    { label: "Hotels", href: "https://hotellook.com/?marker=235526", external: true },
    { label: "Tours & Activities", href: "https://www.travelpayouts.com/r?marker=235526&p=3003", external: true },
    { label: "Car Rentals", href: "https://www.travelpayouts.com/r?marker=235526&p=3007", external: true },
    { label: "Travel Insurance", href: "https://www.travelpayouts.com/r?marker=235526&p=3006", external: true },
  ],
  Company: [
    { label: "About Us", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Affiliate Disclosure", href: "/" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c2340] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b47] to-[#f5a623] flex items-center justify-center">
                <Plane className="w-4 h-4 text-white rotate-45" />
              </div>
              <span className="text-white font-bold text-xl">
                Wander<span className="text-[#ff6b47]">Deals</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Curating the world&apos;s best travel deals so you can explore more and spend less. Your adventure starts here.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#ff6b47] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#ff6b47] text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-[#ff6b47] text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} WanderDeals. All rights reserved.
          </p>
          <p className="text-white/30 text-xs text-center">
            This site contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
