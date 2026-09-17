"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/adminAuth";
import {
  isInsightSlugTaken,
  getValidServiceSlugs,
  getValidProjectSlugs,
} from "@/lib/insightsRepository";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
}

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  description: z.string().min(1).max(300),
  standfirst: z.string().max(500).optional().default(""),
  contentJson: z.string().min(1),
  faqsJson: z.string().optional().default(""),
  sourcesJson: z.string().optional().default(""),
  relatedService: z.string().optional().default(""),
  relatedProjectsJson: z.string().optional().default("[]"),
  relatedInsightsJson: z.string().optional().default("[]"),
  seoTitle: z.string().max(120).optional().default(""),
  seoDescription: z.string().max(300).optional().default(""),
});

function parseJsonSafe<T>(value: string, fallback: T): T {
  if (!value || value.trim() === "") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

async function validateContentFields(data: z.infer<typeof blogPostSchema>) {
  const errors: Record<string, string> = {};

  const sections = parseJsonSafe<Array<{ heading?: string; paragraphs?: string[] }>>(data.contentJson, []);
  if (!Array.isArray(sections) || sections.length === 0) {
    errors.contentJson = "At least one content section is required.";
  } else {
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      if (!s.heading || s.heading.trim() === "") {
        errors[`contentSection_${i}_heading`] = "Section heading is required.";
      }
      if (!Array.isArray(s.paragraphs) || s.paragraphs.length === 0) {
        errors[`contentSection_${i}_paragraphs`] = "Each section needs at least one paragraph.";
      }
    }
  }
  if (Object.keys(errors).length > 0) throw new Error(JSON.stringify(errors));

  const faqs = parseJsonSafe<Array<{ question?: string; answer?: string }>>(data.faqsJson, []);
  if (faqs !== null && (!Array.isArray(faqs) || !faqs.every((f) => typeof f.question === "string" && typeof f.answer === "string"))) {
    throw new Error("Invalid FAQ format.");
  }

  const sources = parseJsonSafe<Array<{ label?: string; href?: string }>>(data.sourcesJson, []);
  if (sources !== null && (!Array.isArray(sources) || !sources.every((s) => typeof s.label === "string" && typeof s.href === "string"))) {
    throw new Error("Invalid source format.");
  }

  const relatedProjects = parseJsonSafe<string[]>(data.relatedProjectsJson, []);
  if (!Array.isArray(relatedProjects) || !relatedProjects.every((p) => typeof p === "string")) {
    throw new Error("Invalid related projects format.");
  }

  const relatedInsights = parseJsonSafe<string[]>(data.relatedInsightsJson, []);
  if (!Array.isArray(relatedInsights) || !relatedInsights.every((i) => typeof i === "string")) {
    throw new Error("Invalid related insights format.");
  }

  const validServices = getValidServiceSlugs();
  if (data.relatedService && !validServices.has(data.relatedService)) {
    throw new Error(`Invalid related service.`);
  }

  const validProjects = getValidProjectSlugs();
  for (const p of relatedProjects) {
    if (p && !validProjects.has(p)) {
      throw new Error(`Invalid related project: ${p}`);
    }
  }

  return { sections, faqs, sources, relatedProjects, relatedInsights };
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();

  const raw = {
    title: String(formData.get("title") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    standfirst: String(formData.get("standfirst") || "").trim() || undefined,
    contentJson: String(formData.get("contentJson") || "").trim(),
    faqsJson: String(formData.get("faqsJson") || "").trim() || undefined,
    sourcesJson: String(formData.get("sourcesJson") || "").trim() || undefined,
    relatedService: String(formData.get("relatedService") || "").trim() || undefined,
    relatedProjectsJson: String(formData.get("relatedProjectsJson") || "[]").trim(),
    relatedInsightsJson: String(formData.get("relatedInsightsJson") || "[]").trim(),
    seoTitle: String(formData.get("seoTitle") || "").trim() || undefined,
    seoDescription: String(formData.get("seoDescription") || "").trim() || undefined,
  };

  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    const cookieStore = await cookies();
    cookieStore.set("blog_error", "Validation error.", { path: "/" });
    redirect("/admin/blogs/new");
  }

  const slug = parsed.data.slug;
  if (!slugRegex.test(slug)) {
    const cookieStore = await cookies();
    cookieStore.set("blog_error", "Slug must be lowercase letters, numbers, and hyphens only.", { path: "/" });
    redirect("/admin/blogs/new");
  }

  const taken = await isInsightSlugTaken(slug);
  if (taken) {
    const cookieStore = await cookies();
    cookieStore.set("blog_error", "This slug is already in use.", { path: "/" });
    redirect("/admin/blogs/new");
  }

  try {
    const validated = await validateContentFields(parsed.data);
    await prisma.blogPost.create({
      data: {
        slug,
        title: parsed.data.title,
        description: parsed.data.description,
        category: parsed.data.category,
        standfirst: parsed.data.standfirst ?? null,
        contentJson: JSON.stringify(validated.sections),
        faqsJson: validated.faqs !== null ? JSON.stringify(validated.faqs) : null,
        sourcesJson: validated.sources !== null ? JSON.stringify(validated.sources) : null,
        relatedService: parsed.data.relatedService ?? null,
        relatedProjectsJson: JSON.stringify(validated.relatedProjects),
        relatedInsightsJson: JSON.stringify(validated.relatedInsights),
        status: "draft",
        seoTitle: parsed.data.seoTitle ?? null,
        seoDescription: parsed.data.seoDescription ?? null,
      },
    });
    revalidatePath("/admin/blogs");
    redirect("/admin/blogs");
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create post.";
    const cookieStore = await cookies();
    cookieStore.set("blog_error", msg, { path: "/" });
    redirect("/admin/blogs/new");
  }
}

export async function updateBlogPost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "").trim();
  if (!id) redirect("/admin/blogs");

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) redirect("/admin/blogs");

  const raw = {
    title: String(formData.get("title") || "").trim(),
    slug: String(formData.get("slug") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    standfirst: String(formData.get("standfirst") || "").trim() || undefined,
    contentJson: String(formData.get("contentJson") || "").trim(),
    faqsJson: String(formData.get("faqsJson") || "").trim() || undefined,
    sourcesJson: String(formData.get("sourcesJson") || "").trim() || undefined,
    relatedService: String(formData.get("relatedService") || "").trim() || undefined,
    relatedProjectsJson: String(formData.get("relatedProjectsJson") || "[]").trim(),
    relatedInsightsJson: String(formData.get("relatedInsightsJson") || "[]").trim(),
    seoTitle: String(formData.get("seoTitle") || "").trim() || undefined,
    seoDescription: String(formData.get("seoDescription") || "").trim() || undefined,
  };

  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) {
    redirect("/admin/blogs/" + id + "/edit");
  }

  const currentSlug = existing.slug;
  const newSlug = parsed.data.slug;
  const isPublished = existing.status === "published";

  if (newSlug !== currentSlug) {
    if (isPublished) {
      const cookieStore = await cookies();
      cookieStore.set("blog_error", "Cannot change slug after publication.", { path: "/" });
      redirect("/admin/blogs/" + id + "/edit");
    }
    const taken = await isInsightSlugTaken(newSlug);
    if (taken && newSlug !== currentSlug) {
      const cookieStore = await cookies();
      cookieStore.set("blog_error", "This slug is already in use.", { path: "/" });
      redirect("/admin/blogs/" + id + "/edit");
    }
  }

  try {
    const validated = await validateContentFields(parsed.data);

    const hasContentChange =
      JSON.stringify(validated.sections) !== existing.contentJson ||
      (validated.faqs !== null ? JSON.stringify(validated.faqs ?? []) : "[]") !== (existing.faqsJson ?? "[]") ||
      (validated.sources !== null ? JSON.stringify(validated.sources ?? []) : "[]") !== (existing.sourcesJson ?? "[]");

    const data: Record<string, unknown> = {
      title: parsed.data.title,
      slug: newSlug,
      category: parsed.data.category,
      description: parsed.data.description,
      standfirst: parsed.data.standfirst ?? null,
      contentJson: JSON.stringify(validated.sections),
      relatedProjectsJson: JSON.stringify(validated.relatedProjects),
      relatedInsightsJson: JSON.stringify(validated.relatedInsights),
      relatedService: parsed.data.relatedService ?? null,
      seoTitle: parsed.data.seoTitle ?? null,
      seoDescription: parsed.data.seoDescription ?? null,
    };

    if (hasContentChange) {
      data.contentUpdatedAt = new Date();
    }

    const faqsChanged = (validated.faqs !== null ? JSON.stringify(validated.faqs ?? []) : "[]") !== (existing.faqsJson ?? "[]");
    const sourcesChanged = (validated.sources !== null ? JSON.stringify(validated.sources ?? []) : "[]") !== (existing.sourcesJson ?? "[]");
    if (faqsChanged) data.faqsJson = validated.faqs !== null ? JSON.stringify(validated.faqs) : null;
    if (sourcesChanged) data.sourcesJson = validated.sources !== null ? JSON.stringify(validated.sources) : null;

    await prisma.blogPost.update({ where: { id }, data });
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}/edit`);
    redirect(`/admin/blogs/${id}/edit`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to update post.";
    const cookieStore = await cookies();
    cookieStore.set("blog_error", msg, { path: "/" });
    redirect("/admin/blogs/" + id + "/edit");
  }
}

export async function publishBlogPost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "").trim();
  if (!id) redirect("/admin/blogs");

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) redirect("/admin/blogs");
  if (existing.status === "published") redirect("/admin/blogs");

  try {
    await setBlogPostPublished(existing);
    revalidatePath("/admin/blogs");
    revalidatePath("/insights");
    revalidatePath(`/insights/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    redirect("/admin/blogs");
  } catch {
    redirect("/admin/blogs");
  }
}

export async function unpublishBlogPost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "").trim();
  if (!id) redirect("/admin/blogs");

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing || existing.status !== "published") redirect("/admin/blogs");

  try {
    await setBlogPostUnpublished(existing);
    revalidatePath("/admin/blogs");
    revalidatePath("/insights");
    revalidatePath(`/insights/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    redirect("/admin/blogs");
  } catch {
    redirect("/admin/blogs");
  }
}

// Client-callable variant: creates a draft post and returns result instead of redirecting.
export async function createBlogPostClient(data: {
  title: string;
  slug: string;
  category: string;
  description: string;
  standfirst?: string;
  contentJson: string;
  faqsJson?: string;
  sourcesJson?: string;
  relatedService?: string;
  relatedProjectsJson: string;
  relatedInsightsJson: string;
  seoTitle?: string;
  seoDescription?: string;
}): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();

  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation error." };
  }

  const slug = parsed.data.slug;
  if (!slugRegex.test(slug)) {
    return { success: false, error: "Slug must be lowercase letters, numbers, and hyphens only." };
  }

  const taken = await isInsightSlugTaken(slug);
  if (taken) {
    return { success: false, error: "This slug is already in use." };
  }

  try {
    const validated = await validateContentFields(parsed.data);
    await prisma.blogPost.create({
      data: {
        slug,
        title: parsed.data.title,
        description: parsed.data.description,
        category: parsed.data.category,
        standfirst: parsed.data.standfirst ?? null,
        contentJson: JSON.stringify(validated.sections),
        faqsJson: validated.faqs !== null ? JSON.stringify(validated.faqs) : null,
        sourcesJson: validated.sources !== null ? JSON.stringify(validated.sources) : null,
        relatedService: parsed.data.relatedService ?? null,
        relatedProjectsJson: JSON.stringify(validated.relatedProjects),
        relatedInsightsJson: JSON.stringify(validated.relatedInsights),
        status: "draft",
        seoTitle: parsed.data.seoTitle ?? null,
        seoDescription: parsed.data.seoDescription ?? null,
      },
    });
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create post.";
    return { success: false, error: msg };
  }
}

// Client-callable variant: updates an existing post and returns result instead of redirecting.
export async function updateBlogPostClient(id: string, data: {
  title: string;
  slug: string;
  category: string;
  description: string;
  standfirst?: string;
  contentJson: string;
  faqsJson?: string;
  sourcesJson?: string;
  relatedService?: string;
  relatedProjectsJson: string;
  relatedInsightsJson: string;
  seoTitle?: string;
  seoDescription?: string;
}): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return { success: false, error: "Post not found." };

  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Validation error." };
  }

  const currentSlug = existing.slug;
  const newSlug = parsed.data.slug;
  const isPublished = existing.status === "published";

  if (newSlug !== currentSlug) {
    if (isPublished) {
      return { success: false, error: "Cannot change slug after publication." };
    }
    const taken = await isInsightSlugTaken(newSlug);
    if (taken && newSlug !== currentSlug) {
      return { success: false, error: "This slug is already in use." };
    }
  }

  try {
    const validated = await validateContentFields(parsed.data);

    const hasContentChange =
      JSON.stringify(validated.sections) !== existing.contentJson ||
      (validated.faqs !== null ? JSON.stringify(validated.faqs ?? []) : "[]") !== (existing.faqsJson ?? "[]") ||
      (validated.sources !== null ? JSON.stringify(validated.sources ?? []) : "[]") !== (existing.sourcesJson ?? "[]");

    const updateData: Record<string, unknown> = {
      title: parsed.data.title,
      slug: newSlug,
      category: parsed.data.category,
      description: parsed.data.description,
      standfirst: parsed.data.standfirst ?? null,
      contentJson: JSON.stringify(validated.sections),
      relatedProjectsJson: JSON.stringify(validated.relatedProjects),
      relatedInsightsJson: JSON.stringify(validated.relatedInsights),
      relatedService: parsed.data.relatedService ?? null,
      seoTitle: parsed.data.seoTitle ?? null,
      seoDescription: parsed.data.seoDescription ?? null,
    };

    if (hasContentChange) {
      updateData.contentUpdatedAt = new Date();
    }

    const faqsChanged = (validated.faqs !== null ? JSON.stringify(validated.faqs ?? []) : "[]") !== (existing.faqsJson ?? "[]");
    const sourcesChanged = (validated.sources !== null ? JSON.stringify(validated.sources ?? []) : "[]") !== (existing.sourcesJson ?? "[]");
    if (faqsChanged) updateData.faqsJson = validated.faqs !== null ? JSON.stringify(validated.faqs) : null;
    if (sourcesChanged) updateData.sourcesJson = validated.sources !== null ? JSON.stringify(validated.sources) : null;

    await prisma.blogPost.update({ where: { id }, data: updateData });
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}/edit`);
    revalidatePath("/insights");
    revalidatePath(`/insights/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    return { success: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to update post.";
    return { success: false, error: msg };
  }
}

// ── Canonical publication internals (non-exported) ───────────────────────────

/**
 * Core logic shared by both form-based and client-callable publish paths.
 * Sets status→published, preserves existing publishedAt on first-publish.
 * Does NOT touch contentUpdatedAt — publishing is not a substantive content edit.
 */
async function setBlogPostPublished(existing: { id: string; slug: string; publishedAt: Date | null }) {
  const now = new Date();
  await prisma.blogPost.update({
    where: { id: existing.id },
    data: {
      status: "published",
      publishedAt: existing.publishedAt ?? now,
    },
  });
}

/**
 * Core logic shared by both form-based and client-callable unpublish paths.
 * Sets status→draft. Preserves publishedAt and contentUpdatedAt.
 */
async function setBlogPostUnpublished(existing: { id: string; slug: string }) {
  await prisma.blogPost.update({
    where: { id: existing.id },
    data: { status: "draft" },
  });
}

// Client-callable variants (for BlogSubmissionsClient)
export async function deleteDraftBlogPostById(id: string) {
  await requireAdmin();

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return { success: false, error: "Post not found." };
  if (existing.status === "published") {
    return { success: false, error: "Cannot delete a published post. Unpublish it first." };
  }

  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete post." };
  }
}

export async function unpublishBlogPostById(id: string) {
  await requireAdmin();

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return { success: false, error: "Post not found." };
  if (existing.status !== "published") return { success: true };

  try {
    await setBlogPostUnpublished(existing);
    revalidatePath("/admin/blogs");
    revalidatePath("/insights");
    revalidatePath(`/insights/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to unpublish post." };
  }
}

// Client-callable publish action for the confirmation modal flow.
export async function publishBlogPostById(id: string) {
  await requireAdmin();

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return { success: false, error: "Post not found." };
  if (existing.status === "published") return { success: true };

  try {
    await setBlogPostPublished(existing);
    revalidatePath("/admin/blogs");
    revalidatePath("/insights");
    revalidatePath(`/insights/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to publish post." };
  }
}
