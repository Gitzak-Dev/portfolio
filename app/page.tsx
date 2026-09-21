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
import StateDirectorySection from "@/components/StateDirectorySection/StateDirectorySection";
import CityDirectorySection from "@/components/CityDirectorySection/CityDirectorySection";
import GlobalLocationsSection from "@/components/GlobalLocationsSection/GlobalLocationsSection";
import AnswerBlock from "@/components/AnswerBlock/AnswerBlock";
import HomepageFaq from "@/components/HomepageFaq/HomepageFaq";

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

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does StackSpacer do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StackSpacer builds custom mobile applications, AI automation systems, machine learning solutions, and modern web applications for startups and businesses across the United States.",
      },
    },
    {
      "@type": "Question",
      name: "What services does StackSpacer offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer mobile app development, AI automation, machine learning, and web development. Each service is tailored to the specific goals and requirements of the project.",
      },
    },
    {
      "@type": "Question",
      name: "Does StackSpacer work with startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with startups and established businesses, building custom software solutions based on each project's requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Where does StackSpacer operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve clients across the United States.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact StackSpacer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach StackSpacer through the contact form on this page or by email at hanidev@gmail.com.",
      },
    },
  ],
};
  return (
    <main>

      <JsonLd data={websiteSchema} />

      <JsonLd data={organizationSchema} />

      <JsonLd data={faqPageSchema} />

      {/* <DisableContextMenu /> */}

      {/* <CustomCursor /> */}

      <Navbar />

      {/* Hero section with scroll character + text change */}

      <SnakeTextSection />

      <HeroScroll />

      <AnswerBlock />

      <ExpertiseCards/>

      <SignalMetricsSection />

      <ServicesShowcase />

      {/* Baaki portfolio sections */}
      <StaticSections />

      <TestimonialsSection />

      <WhyChooseMe />

      <HomepageFaq />

      <ContactSection />

      <StateDirectorySection />

      <CityDirectorySection />

      <GlobalLocationsSection />

      <Footer />
    </main>
  );
}
