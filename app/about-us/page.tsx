import AboutSection from "@/components/about-us/AboutSection";
import AboutBanner from "@/components/about-us/AboutUsBanner";
import MissionVisionSection from "@/components/about-us/MissionVisionSection";
import TimelineSection from "@/components/about-us/TimelineSection";
import WhyChooseUs from "@/components/about-us/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";

const page = () => {
  return (
    <div>
      <AboutBanner />
      <AboutSection />
      <TimelineSection />
      <MissionVisionSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default page;
