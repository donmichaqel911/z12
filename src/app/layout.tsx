import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "zengo — Trade. Earn. Own.",
  description:
    "A mobile-first crypto exchange. Spot, perpetuals and earn products with live markets.",
  applicationName: "zengo",
  openGraph: {
    title: "zengo — Trade. Earn. Own.",
    description: "Trade 300+ pairs with zero-friction onboarding.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Providers>
          <div className="app-shell">
            <Toaster theme="dark" position="top-center" />
            <TopBar />
            <main className="safe-bottom">{children}</main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
