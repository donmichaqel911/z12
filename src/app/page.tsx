import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import DealCategories from "@/components/DealCategories";
import WhyUs from "@/components/WhyUs";
import HotDeals from "@/components/HotDeals";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <HotDeals />
      <DealCategories />
      <WhyUs />
      <Newsletter />
    </>
  );
}
