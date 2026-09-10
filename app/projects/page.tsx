import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { projects } from "@/data/projects";
import ProjectsPageContent from "./ProjectsPageContent";

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
      <ProjectsPageContent projects={projectsData} />
    </main>
  );
}
