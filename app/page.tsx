// import CustomCursor from "@/components/CustomCursor/CustomCursor";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
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
import GlobalLocationsSection from "@/components/GlobalLocationsSection/GlobalLocationsSection";

export const metadata: Metadata = {
  title: "StackSpacer | Web, Mobile App, AI & ML Development for US Businesses",
  description:
    "StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses across the United States.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: siteConfig.name,
    title: "StackSpacer | Web, Mobile App, AI & ML Development for US Businesses",
    description:
      "StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses across the United States.",
  },
};

export default function Home() {
  const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};
  return (
    <main>

      <JsonLd data={websiteSchema} />

      <JsonLd data={organizationSchema} />

      {/* <DisableContextMenu /> */}

      {/* <CustomCursor /> */}

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

      <GlobalLocationsSection />

      <Footer />
    </main>
  );
}
