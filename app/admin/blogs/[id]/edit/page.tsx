import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/adminAuth";
import { updateBlogPost, publishBlogPost, unpublishBlogPost } from "../../actions";
import styles from "../../../AdminDashboard.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifyAdminToken(token)) {
    redirect("/admin/login");
  }
}

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default async function AdminBlogEditPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) {
    redirect("/admin/blogs");
  }

  const isPublished = post.status === "published";

  let contentDisplay = post.contentJson;
  try { contentDisplay = JSON.stringify(JSON.parse(post.contentJson), null, 2); } catch { /* keep raw */ }

  let faqsDisplay = "";
  if (post.faqsJson) {
    try { faqsDisplay = JSON.stringify(JSON.parse(post.faqsJson), null, 2); } catch { faqsDisplay = post.faqsJson; }
  }

  let sourcesDisplay = "";
  if (post.sourcesJson) {
    try { sourcesDisplay = JSON.stringify(JSON.parse(post.sourcesJson), null, 2); } catch { sourcesDisplay = post.sourcesJson; }
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <span>// Edit Blog Post</span>
          <h1>{post.title || "Untitled"}</h1>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="/admin/blogs" className={styles.clearButton}>Back to List</a>
          <form action={publishBlogPost}>
            <input type="hidden" name="id" value={post.id} />
            <button type="submit" data-cursor="dark" style={{ height: "46px", padding: "0 22px", border: "0", borderRadius: "999px", color: "#000", background: "var(--gold)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", cursor: isPublished ? "default" : "pointer", opacity: isPublished ? 0.5 : 1 }}>
              {isPublished ? "Published" : "Publish"}
            </button>
          </form>
          {isPublished && (
            <form action={unpublishBlogPost}>
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" data-cursor="dark" style={{ height: "46px", padding: "0 22px", border: "1px solid rgba(255,193,7,0.3)", borderRadius: "999px", color: "#ffc107", background: "rgba(255,193,7,0.1)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
                Unpublish
              </button>
            </form>
          )}
          <form action="/api/admin/logout" method="POST">
            <button type="submit" data-cursor="dark">Logout</button>
          </form>
        </div>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        <form action={updateBlogPost} method="POST" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input type="hidden" name="id" value={post.id} />

          <Field label="Title" required>
            <input
              type="text"
              name="title"
              defaultValue={post.title}
              required maxLength={200}
              className={styles.searchBoxInput}
              onChange={(e) => {
                const slugInput = document.getElementById("slug-input") as HTMLInputElement;
                if (slugInput && !slugInput.dataset.manual && !isPublished) {
                  slugInput.value = generateSlugFromTitle(e.target.value);
                }
              }}
            />
          </Field>

          <Field label="Slug" required>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                id="slug-input"
                name="slug"
                data-manual="false"
                defaultValue={post.slug}
                required maxLength={200}
                className={styles.searchBoxInput}
                disabled={isPublished}
                onChange={(e) => {
                  (e.currentTarget as HTMLInputElement).dataset.manual = "true";
                }}
              />
              <span style={{ position: "absolute", right: "12px", top: "38px", color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                {isPublished ? " (locked after publication)" : "stackspacer.com/insights/"}
              </span>
            </div>
          </Field>

          <Field label="Category" required>
            <input
              type="text"
              name="category"
              defaultValue={post.category}
              required maxLength={100}
              className={styles.searchBoxInput}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              name="description"
              defaultValue={post.description}
              required maxLength={300}
              rows={3}
              className={styles.searchBoxInput}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </Field>

          <Field label="Standfirst (optional)">
            <textarea
              name="standfirst"
              defaultValue={post.standfirst ?? ""}
              maxLength={500}
              rows={2}
              className={styles.searchBoxInput}
              style={{ resize: "vertical", minHeight: "60px" }}
            />
          </Field>

          <Field label="Content Sections" required hint="JSON array of sections with heading and paragraphs">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{"[{\"heading\":\"Section Title\",\"paragraphs\":[\"Paragraph text here.\"]}]"}
            </pre>
            <textarea
              name="contentJson"
              defaultValue={contentDisplay}
              required
              rows={10}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem", resize: "vertical" }}
            />
          </Field>

          <Field label="FAQs (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{"[{\"question\":\"Question?\",\"answer\":\"Answer here.\"}]"}
            </pre>
            <textarea
              name="faqsJson"
              defaultValue={faqsDisplay}
              rows={4}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem", resize: "vertical" }}
            />
          </Field>

          <Field label="Sources (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{"[{\"label\":\"Source Name\",\"href\":\"https://example.com\"}]"}
            </pre>
            <textarea
              name="sourcesJson"
              defaultValue={sourcesDisplay}
              rows={3}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem", resize: "vertical" }}
            />
          </Field>

          <Field label="Related Service (optional)">
            <select name="relatedService" className={styles.searchBoxInput} style={{ cursor: "pointer" }}>
              <option value="">— None —</option>
              <option value="web-development" selected={post.relatedService === "web-development"}>Web Development</option>
              <option value="mobile-app-development" selected={post.relatedService === "mobile-app-development"}>Mobile App Development</option>
              <option value="ai-automation" selected={post.relatedService === "ai-automation"}>AI Automation</option>
              <option value="machine-learning" selected={post.relatedService === "machine-learning"}>Machine Learning</option>
            </select>
          </Field>

          <Field label="Related Projects (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{"[\"mobile-app-dashboard\",\"developer-portfolio\"]"}
            </pre>
            <textarea
              name="relatedProjectsJson"
              defaultValue={post.relatedProjectsJson}
              rows={2}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
            />
          </Field>

          <Field label="Related Insights (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{"[\"what-nextjs-production-ready\",\"rag-vs-ai-agents\"]"}
            </pre>
            <textarea
              name="relatedInsightsJson"
              defaultValue={post.relatedInsightsJson}
              rows={2}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
            />
          </Field>

          <Field label="SEO Title (optional)">
            <input
              type="text"
              name="seoTitle"
              defaultValue={post.seoTitle ?? ""}
              maxLength={120}
              className={styles.searchBoxInput}
            />
          </Field>

          <Field label="SEO Description (optional)">
            <textarea
              name="seoDescription"
              defaultValue={post.seoDescription ?? ""}
              maxLength={300}
              rows={2}
              className={styles.searchBoxInput}
              style={{ resize: "vertical" }}
            />
          </Field>

          {/* SEO Preview */}
          <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <span style={{ display: "block", marginBottom: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              SEO Preview
            </span>
            <div style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              <div style={{ color: "#4fc3f7", fontSize: "1rem", marginBottom: "4px" }}>
                {post.seoTitle || post.title}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginBottom: "8px" }}>
                https://stackspacer.com/insights/{post.slug}
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: "1.5" }}>
                {post.seoDescription || post.description}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" data-cursor="dark" style={{ height: "48px", padding: "0 24px", border: "0", borderRadius: "999px", color: "#000", background: "var(--gold)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
              Save Changes
            </button>
            <a href="/admin/blogs" className={styles.clearButton} style={{ height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, hint, required, children }: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        {label}{required ? " *" : ""}
      </label>
      {children}
      {hint && <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.72rem" }}>{hint}</span>}
    </div>
  );
}
