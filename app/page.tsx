import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PromoBanner />
      <Testimonials />
    </div>
  );
}
