import FAQSection from "@/components/home/FAQSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PromoBanner from "@/components/home/PromoBanner";
import RequirementsSection from "@/components/home/RequirementsSection";
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
      <RequirementsSection />
      <FAQSection />
    </div>
  );
}
