import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import TipsSection from "@/components/home/TipsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PromoBanner />
      <Testimonials />
      <StatsSection />
      <TipsSection />
    </div>
  );
}
