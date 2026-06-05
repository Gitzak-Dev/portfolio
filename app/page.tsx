import CustomCursor from "@/components/CustomCursor/CustomCursor";
import DisableContextMenu from "@/components/DisableContextMenu/DisableContextMenu";
import Navbar from "@/components/Navbar/Navbar";
import HeroScroll from "@/components/HeroScroll/HeroScroll";
import StaticSections from "@/components/StaticSections/StaticSections";
import Footer from "@/components/Footer/Footer";
import ServicesShowcase from "@/components/ServicesShowcase/ServicesShowcase";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import WhyChooseMe from "@/components/WhyChooseMe/WhyChooseMe";
import ExpertiseCards from "@/components/ExpertiseCards/ExpertiseCards";
import SnakeTextSection from "@/components/SnakeTextSection/SnakeTextSection";
import SignalMetricsSection from "@/components/SignalMetricsSection/SignalMetricsSection";
import ContactSection from "@/components/ContactSection/ContactSection";


export default function Home() {
  return (
    <main>

      <DisableContextMenu />

      <CustomCursor />

      <Navbar />

      {/* Hero section with scroll character + text change */}

      <SnakeTextSection />

      <HeroScroll />

      <ExpertiseCards/>

      <SignalMetricsSection />

      <ServicesShowcase />

      {/* Baaki portfolio sections */}
      <StaticSections />

      <TestimonialsSection />

      <WhyChooseMe />
      
      <ContactSection />

      <Footer />
    </main>
  );
}