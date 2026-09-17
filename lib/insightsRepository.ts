import { prisma } from "./prisma";
import { insights as staticInsights } from "@/data/insights";

export type InsightSection = {
  heading: string;
  paragraphs: string[];
};

export type InsightSource = {
  label: string;
  href: string;
};

export type InsightFAQ = {
  question: string;
  answer: string;
};

export type DbBlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  standfirst: string | null;
  contentJson: string;
  faqsJson: string | null;
  sourcesJson: string | null;
  relatedService: string | null;
  relatedProjectsJson: string;
  relatedInsightsJson: string;
  status: string;
  publishedAt: Date | null;
  contentUpdatedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  standfirst: string;
  sections: InsightSection[];
  faqs?: InsightFAQ[];
  sources?: InsightSource[];
  relatedService: string;
  relatedProjects: string[];
  relatedInsights?: string[];
  publishedAt: string;
  updatedAt: string;
  ctaText: string;
  ctaHref: string;
  seoTitle?: string;
  seoDescription?: string;
};

const STATIC_SLUGS = new Set(
  staticInsights.map((i) => i.slug)
);

const VALID_SERVICE_SLUGS = new Set([
  "web-development",
  "mobile-app-development",
  "ai-automation",
  "machine-learning",
]);

const VALID_PROJECT_SLUGS = new Set([
  "mobile-app-dashboard",
  "ai-automation-suite",
  "ml-prediction-system",
  "developer-portfolio",
  "business-website-system",
]);

const STATIC_CTA_TEXT = "Start Your Project";
const STATIC_CTA_HREF = "/#contact";

export function parseJsonSafe<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function adaptDbPostToInsight(post: DbBlogPost): Insight | null {
  if (post.status !== "published" || !post.publishedAt) {
    return null;
  }

  const sections = parseJsonSafe<InsightSection[]>(
    post.contentJson,
    []
  );
  const faqs = parseJsonSafe<InsightFAQ[] | null>(post.faqsJson, null);
  const sources = parseJsonSafe<InsightSource[] | null>(post.sourcesJson, null);
  const relatedProjects = parseJsonSafe<string[]>(
    post.relatedProjectsJson,
    []
  );
  const relatedInsights = parseJsonSafe<string[]>(
    post.relatedInsightsJson,
    []
  );

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    standfirst: post.standfirst ?? "",
    sections,
    faqs: faqs ?? undefined,
    sources: sources ?? undefined,
    relatedService: post.relatedService ?? "",
    relatedProjects,
    relatedInsights: relatedInsights.length > 0 ? relatedInsights : undefined,
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
    updatedAt: (post.contentUpdatedAt ?? post.publishedAt).toISOString().slice(0, 10),
    ctaText: STATIC_CTA_TEXT,
    ctaHref: STATIC_CTA_HREF,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
  };
}

export async function getStaticInsights(): Promise<Insight[]> {
  return staticInsights;
}

export async function getPublishedDbInsights(): Promise<Insight[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: "published",
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
  });

  return posts
    .map((p) => adaptDbPostToInsight(p as unknown as DbBlogPost))
    .filter((i): i is Insight => i !== null);
}

export async function getAllInsightsForSlugLookup(): Promise<Map<string, Insight>> {
  const map = new Map<string, Insight>();
  for (const ins of staticInsights) {
    map.set(ins.slug, ins);
  }
  const dbPosts = await getPublishedDbInsights();
  for (const ins of dbPosts) {
    map.set(ins.slug, ins);
  }
  return map;
}

export async function getPublishedInsights(): Promise<Insight[]> {
  const [staticIns, dbInsights] = await Promise.all([
    getStaticInsights(),
    getPublishedDbInsights(),
  ]);

  const all = [...dbInsights, ...staticIns];

  all.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return a.slug.localeCompare(b.slug);
  });

  return all;
}

export async function getPublishedInsightBySlug(
  slug: string
): Promise<Insight | null> {
  const staticInsight = staticInsights.find((i) => i.slug === slug);
  if (staticInsight) return staticInsight;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "published",
      publishedAt: { not: null },
    },
  });

  if (!post) return null;

  return adaptDbPostToInsight(post as unknown as DbBlogPost);
}

export async function isInsightSlugTaken(slug: string): Promise<boolean> {
  if (STATIC_SLUGS.has(slug)) return true;

  const existing = await prisma.blogPost.findUnique({
    where: { slug },
    select: { id: true },
  });

  return !!existing;
}

export function getReservedSlugs(): Set<string> {
  return STATIC_SLUGS;
}

export function getValidServiceSlugs(): Set<string> {
  return VALID_SERVICE_SLUGS;
}

export function getValidProjectSlugs(): Set<string> {
  return VALID_PROJECT_SLUGS;
}

/**
 * Server-only helper: returns slugs+titles for the admin related-insights selector.
 * Includes all static insights + published CMS insights.
 * Optionally excludes one slug (e.g. the article currently being edited).
 */
export async function getAdminRelatedInsightOptions(
  excludeSlug?: string
): Promise<Array<{ slug: string; title: string }>> {
  const cmsPosts = await prisma.blogPost.findMany({
    where: {
      status: "published",
      publishedAt: { not: null },
    },
    select: { slug: true, title: true },
  });

  const seen = new Set<string>();
  const result: Array<{ slug: string; title: string }> = [];

  // Static insights first (deterministic)
  for (const ins of staticInsights) {
    if (excludeSlug && ins.slug === excludeSlug) continue;
    if (seen.has(ins.slug)) continue;
    seen.add(ins.slug);
    result.push({ slug: ins.slug, title: ins.title });
  }

  // Published CMS insights
  for (const post of cmsPosts) {
    if (post.slug === excludeSlug) continue;
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    result.push({ slug: post.slug, title: post.title });
  }

  return result;
}
