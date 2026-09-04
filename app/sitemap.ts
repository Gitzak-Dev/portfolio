import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { cities } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${baseUrl}/services/web-development`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/mobile-app-development`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ai-automation`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/machine-learning`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insights`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${baseUrl}/insights/what-nextjs-production-ready`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights/react-native-vs-flutter`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights/when-ai-automation-makes-sense`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights/rag-vs-ai-agents`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/insights/machine-learning-for-business`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    { url: `${baseUrl}/locations`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/locations/${city.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...projectPages].map((item) => ({
    ...item,
    lastModified: new Date(),
  }));
}
