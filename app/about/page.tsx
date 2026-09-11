import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import { projects } from "@/data/projects";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About StackSpacer | Web, Mobile & AI Development",
  description:
    "Learn about StackSpacer — the developer behind custom web apps, mobile applications, AI automation, and machine learning systems for startups and businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about",
    siteName: "StackSpacer",
    title: "About StackSpacer | Web, Mobile & AI Development",
    description:
      "Learn about StackSpacer — the developer behind custom web apps, mobile applications, AI automation, and machine learning systems for startups and businesses.",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About StackSpacer",
  description:
    "Learn about StackSpacer — custom web development, mobile apps, AI automation, and machine learning.",
  about: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
    description:
      "StackSpacer builds mobile apps, AI automation systems, machine learning solutions, and modern web applications.",
  },
};

const featuredProjects = projects
  .filter((p) =>
    ["mobile-app-dashboard", "ai-automation-suite", "business-website-system"].includes(p.slug)
  )
  .map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    desc: p.desc,
  }));

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={aboutSchema} />
      <PageBackHeader href="/" />
      <AboutPageContent featuredProjects={featuredProjects} />
    </main>
  );
}
