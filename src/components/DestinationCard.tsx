import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  imageUrl: string;
  location: string;
  country: string;
  flag: string;
  stats: string;
  href: string;
  themeColor: string;
  className?: string;
}

export function DestinationCard({
  imageUrl,
  location,
  country,
  flag,
  stats,
  href,
  themeColor,
  className,
}: DestinationCardProps) {
  return (
    <div
      style={{ "--theme-color": themeColor } as React.CSSProperties}
      className={cn("group w-full h-full", className)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out group-hover:scale-[1.03] group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
        aria-label={`Explore ${location}`}
        style={{ boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.4)` }}
      >
        {/* Background image with parallax zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--theme-color) / 0.92), hsl(var(--theme-color) / 0.5) 40%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-end h-full p-6 text-white">
          <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-1">
            {country}
          </p>
          <h3 className="text-2xl font-bold tracking-tight">
            {location} <span className="text-xl">{flag}</span>
          </h3>
          <p className="text-sm text-white/70 mt-1">{stats}</p>

          <div
            className="mt-6 flex items-center justify-between backdrop-blur-md rounded-xl px-4 py-3 transition-all duration-300 group-hover:bg-white/20"
            style={{
              background: `rgba(255,255,255,0.12)`,
              border: `1px solid rgba(255,255,255,0.2)`,
            }}
          >
            <span className="text-sm font-semibold tracking-wide">Explore Now</span>
            <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </div>
  );
}
