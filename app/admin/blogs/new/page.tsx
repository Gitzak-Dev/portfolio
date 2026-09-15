import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/adminAuth";
import { createBlogPost } from "../actions";
import styles from "../../AdminDashboard.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export default async function AdminBlogNewPage() {
  await requireAdmin();

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <span>// New Blog Post</span>
          <h1>Create Insight</h1>
        </div>
        <a href="/admin/blogs" className={styles.clearButton}>
          Back to List
        </a>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <form action={createBlogPost} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Field label="Title" required>
            <input
              type="text"
              name="title"
              placeholder="Article title"
              required
              maxLength={200}
              className={styles.searchBoxInput}
              onChange={(e) => {
                const slugInput = document.getElementById("slug-input") as HTMLInputElement;
                if (slugInput && !slugInput.dataset.manual) {
                  slugInput.value = generateSlugFromTitle(e.target.value);
                }
              }}
            />
          </Field>

          <Field label="Slug">
            <div style={{ position: "relative" }}>
              <input
                type="text"
                id="slug-input"
                name="slug"
                data-manual="false"
                placeholder="article-slug"
                required
                maxLength={200}
                className={styles.searchBoxInput}
                onChange={(e) => {
                  (e.currentTarget as HTMLInputElement).dataset.manual = "true";
                }}
              />
              <span style={{ position: "absolute", right: "12px", top: "38px", color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                stackspacer.com/insights/
              </span>
            </div>
          </Field>

          <Field label="Category" required>
            <input
              type="text"
              name="category"
              placeholder="e.g. Web Development, AI Automation"
              required
              maxLength={100}
              className={styles.searchBoxInput}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              name="description"
              placeholder="Brief description for SEO and listing cards (max 300 chars)"
              required
              maxLength={300}
              rows={3}
              className={styles.searchBoxInput}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </Field>

          <Field label="Standfirst (optional)">
            <textarea
              name="standfirst"
              placeholder="Introductory paragraph shown below the title (max 500 chars)"
              maxLength={500}
              rows={2}
              className={styles.searchBoxInput}
              style={{ resize: "vertical", minHeight: "60px" }}
            />
          </Field>

          <Field label="Content Sections" required hint="JSON array of sections, each with heading and paragraphs">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{`[{"heading":"Introduction","paragraphs":["Your first paragraph here."]}]`}
            </pre>
            <textarea
              name="contentJson"
              defaultValue='[{"heading":"Introduction","paragraphs":["Start writing your article here."]}]'
              required
              rows={8}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem", resize: "vertical" }}
            />
          </Field>

          <Field label="FAQs (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{`[{"question":"Question?","answer":"Answer here."}]`}
            </pre>
            <textarea
              name="faqsJson"
              defaultValue=""
              rows={4}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem", resize: "vertical" }}
            />
          </Field>

          <Field label="Sources (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{`[{"label":"Source Name","href":"https://example.com"}]`}
            </pre>
            <textarea
              name="sourcesJson"
              defaultValue=""
              rows={3}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem", resize: "vertical" }}
            />
          </Field>

          <Field label="Related Service (optional)">
            <select name="relatedService" className={styles.searchBoxInput} style={{ cursor: "pointer" }}>
              <option value="">— None —</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app-development">Mobile App Development</option>
              <option value="ai-automation">AI Automation</option>
              <option value="machine-learning">Machine Learning</option>
            </select>
          </Field>

          <Field label="Related Projects (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{`["mobile-app-dashboard","developer-portfolio"]`}
            </pre>
            <textarea
              name="relatedProjectsJson"
              defaultValue="[]"
              rows={2}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
            />
          </Field>

          <Field label="Related Insights (optional)">
            <pre style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontFamily: "monospace", marginBottom: "8px" }}>
{`["what-nextjs-production-ready","rag-vs-ai-agents"]`}
            </pre>
            <textarea
              name="relatedInsightsJson"
              defaultValue="[]"
              rows={2}
              className={styles.searchBoxInput}
              style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
            />
          </Field>

          <Field label="SEO Title (optional)">
            <input
              type="text"
              name="seoTitle"
              placeholder="Defaults to article title"
              maxLength={120}
              className={styles.searchBoxInput}
            />
          </Field>

          <Field label="SEO Description (optional)">
            <textarea
              name="seoDescription"
              placeholder="Defaults to article description"
              maxLength={300}
              rows={2}
              className={styles.searchBoxInput}
              style={{ resize: "vertical" }}
            />
          </Field>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" data-cursor="dark" style={{ height: "48px", padding: "0 24px", border: "0", borderRadius: "999px", color: "#000", background: "var(--gold)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
              Save Draft
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
