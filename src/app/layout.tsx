import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WanderDeals – Best Travel Deals & Cheap Flights",
  description:
    "Discover the best travel deals on flights, hotels, tours, and more. Compare prices and book your dream vacation with exclusive affiliate deals.",
  keywords: "travel deals, cheap flights, hotel deals, vacation packages, travel affiliate",
  openGraph: {
    title: "WanderDeals – Best Travel Deals & Cheap Flights",
    description: "Find the best deals on flights, hotels, and tours worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
