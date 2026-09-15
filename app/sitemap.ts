import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { cities } from "@/data/locations";
import { prisma } from "@/lib/prisma";
import { insights as staticInsights } from "@/data/insights";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const dbPosts = await prisma.blogPost.findMany({
    where: {
      status: "published",
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    select: { slug: true },
  });

  const dbInsightSlugs = new Set(dbPosts.map((p) => p.slug));

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
    ...staticInsights.map((ins) => ({
      url: `${baseUrl}/insights/${ins.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6 as const,
    })),
    { url: `${baseUrl}/locations`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.5 },
    ...dbPosts.map((p) => ({
      url: `${baseUrl}/insights/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6 as const,
    })),
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

  // Deduplicate by URL
  const seen = new Set<string>();
  const all = [...staticPages, ...cityPages, ...projectPages];
  return all.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  }).map((item) => ({
    ...item,
    lastModified: new Date(),
  }));
}
