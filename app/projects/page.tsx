import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import { projects } from "@/data/projects";
import ProjectsPageContent from "./ProjectsPageContent";

const themeClassMap: Record<string, string> = {
  mobile: "themeMobile",
  ai: "themeAi",
  ml: "themeMl",
  web: "themeWeb",
  business: "themeBusiness",
};

const projectVisualMap: Record<string, string> = {
  "mobile-app-dashboard": "/project-visuals/mobile-app-dashboard.png",
  "ai-automation-suite": "/project-visuals/ai-human-analogy.png",
  "ml-prediction-system": "/projects/ml-stock-dashboard.png",
  "developer-portfolio": "/project-visuals/developer-portfolio.png",
  "business-website-system": "/project-visuals/business-website-system.png",
};

export const metadata: Metadata = {
  title: "Projects | StackSpacer",
  description:
    "View selected projects by StackSpacer — mobile apps, AI automation, machine learning, and web development case studies.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/projects",
    siteName: "StackSpacer",
    title: "Projects | StackSpacer",
    description:
      "View selected projects by StackSpacer — mobile apps, AI automation, machine learning, and web development case studies.",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects | StackSpacer",
  description: "Selected projects by StackSpacer — mobile apps, AI automation, machine learning, and web development.",
  about: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
  },
};

export default function ProjectsPage() {
  const projectsData = projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    desc: p.desc,
    tags: p.tags,
    theme: p.theme,
    previewImage: (p as { previewImage?: string }).previewImage,
  }));

  return (
    <main>
      <JsonLd data={collectionSchema} />
      <PageBackHeader href="/" />
      <ProjectsPageContent projects={projectsData} />
    </main>
  );
}
