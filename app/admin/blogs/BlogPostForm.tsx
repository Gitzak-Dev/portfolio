"use client";

import { useState, useId } from "react";
import { createBlogPost } from "./actions";
import styles from "../AdminDashboard.module.css";

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogPostForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const titleId = useId();
  const slugId = useId();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (!isSlugManual) {
      setSlug(generateSlugFromTitle(value));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManual(true);
  };

  return (
    <form action={createBlogPost} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Field label="Title" required htmlFor={titleId}>
        <input
          type="text"
          id={titleId}
          name="title"
          placeholder="Article title"
          required
          maxLength={200}
          className={styles.searchBoxInput}
          value={title}
          onChange={handleTitleChange}
        />
      </Field>

      <Field label="Slug" htmlFor={slugId}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            id={slugId}
            name="slug"
            value={slug}
            placeholder="article-slug"
            required
            maxLength={200}
            className={styles.searchBoxInput}
            onChange={handleSlugChange}
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
  );
}

function Field({ label, hint, required, htmlFor, children }: {
  label: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={htmlFor}
        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" }}
      >
        {label}{required ? " *" : ""}
      </label>
      {children}
      {hint && <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.72rem" }}>{hint}</span>}
    </div>
  );
}
