import AboutSection from "@/component/AboutSection";
import ContactSection from "@/component/ContactSection";
import FAQSection from "@/component/FAQSection";
import HeroSection from "@/component/Hero";
import IndustriesSection from "@/component/IndustriesSection";
import Section1 from "@/component/Section2";
import TurnkeyServices from "@/component/Services";
import TestimonialSection from "@/component/TestimonialSection";
import TurnkeyProcessSection from "@/component/TurnkeyProcessSection";
import WhyChooseUs from "@/component/WoodSection";
import WoodSection from "@/component/WoodSection";
import Image from "next/image";

export default function Home() {
  return (
   <div className="px-0 py-0 sm:px-4 sm:py-4">
   <HeroSection />
   <AboutSection />
   <TurnkeyServices />
   <IndustriesSection />
   <WhyChooseUs/>
  <Section1/>
  <TurnkeyProcessSection />
  <TestimonialSection />
 
  <FAQSection/>
   <ContactSection />
   </div>
  );
}
