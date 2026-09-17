"use client";

import { useState, useId } from "react";
import { createBlogPostClient } from "./actions";
import styles from "../AdminDashboard.module.css";

// ── Types ────────────────────────────────────────────────────────────────────

type SectionField = { heading: string; paragraphs: string[] };
type FaqField = { question: string; answer: string };
type SourceField = { label: string; href: string };

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function serializeSections(sections: SectionField[]): string {
  return JSON.stringify(
    sections
      .filter((s) => s.heading.trim())
      .map((s) => ({
        heading: s.heading.trim(),
        paragraphs: s.paragraphs.filter((p) => p.trim()),
      }))
      .filter((s) => s.paragraphs.length > 0)
  );
}

function serializeFaqs(faqs: FaqField[]): string {
  const filtered = faqs.filter((f) => f.question.trim() || f.answer.trim());
  if (filtered.length === 0) return "";
  return JSON.stringify(
    filtered.map((f) => ({
      question: f.question.trim(),
      answer: f.answer.trim(),
    }))
  );
}

function serializeSources(sources: SourceField[]): string {
  const filtered = sources.filter((s) => s.label.trim() || s.href.trim());
  if (filtered.length === 0) return "";
  return JSON.stringify(
    filtered.map((s) => ({
      label: s.label.trim(),
      href: s.href.trim(),
    }))
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.formPanel}>
      <div className={styles.formPanelLabel}>
        <span className={styles.formPanelAccent} aria-hidden="true" />
        <h2 className={styles.formPanelTitle}>{label}</h2>
      </div>
      {children}
    </div>
  );
}

function FieldRow({
  label,
  hint,
  required,
  htmlFor,
  error,
  children,
  counter,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
  counter?: { current: number; max: number };
}) {
  return (
    <div className={styles.formFieldRow}>
      <label
        htmlFor={htmlFor}
        className={styles.formFieldLabel}
      >
        {label}{required ? " *" : ""}
      </label>
      {children}
      {hint && <span className={styles.formFieldHint}>{hint}</span>}
      {counter && (
        <span className={styles.charCounter}>
          {counter.current}/{counter.max}
        </span>
      )}
      {error && <span className={styles.formFieldError}>{error}</span>}
    </div>
  );
}

function SerpPreview({
  seoTitle,
  seoDescription,
  articleTitle,
  slug,
}: {
  seoTitle: string;
  seoDescription: string;
  articleTitle: string;
  slug: string;
}) {
  const displayTitle = seoTitle || articleTitle;
  const displayDesc = seoDescription || "";

  return (
    <div className={styles.serpPreview} aria-label="Search engine preview">
      <span className={styles.serpPreviewLabel}>Search Preview</span>
      <p className={styles.serpPreviewTitle}>{displayTitle}</p>
      <p className={styles.serpPreviewUrl}>https://stackspacer.com/insights/{slug || "—"}</p>
      {displayDesc && <p className={styles.serpPreviewDesc}>{displayDesc}</p>}
    </div>
  );
}

// ── Structured Editors ───────────────────────────────────────────────────────

function SectionsEditor({
  sections,
  onChange,
  error,
}: {
  sections: SectionField[];
  onChange: (s: SectionField[]) => void;
  error?: string;
}) {
  const addSection = () =>
    onChange([...sections, { heading: "", paragraphs: [""] }]);

  const removeSection = (idx: number) =>
    onChange(sections.filter((_, i) => i !== idx));

  const updateHeading = (idx: number, val: string) => {
    const next = sections.map((s, i) =>
      i === idx ? { ...s, heading: val } : s
    );
    onChange(next);
  };

  const addParagraph = (sectionIdx: number) => {
    const next = sections.map((s, i) =>
      i === sectionIdx ? { ...s, paragraphs: [...s.paragraphs, ""] } : s
    );
    onChange(next);
  };

  const updateParagraph = (sectionIdx: number, pIdx: number, val: string) => {
    const next = sections.map((s, i) =>
      i === sectionIdx
        ? { ...s, paragraphs: s.paragraphs.map((p, j) => (j === pIdx ? val : p)) }
        : s
    );
    onChange(next);
  };

  const removeParagraph = (sectionIdx: number, pIdx: number) => {
    const next = sections.map((s, i) =>
      i === sectionIdx
        ? { ...s, paragraphs: s.paragraphs.filter((_, j) => j !== pIdx) }
        : s
    );
    onChange(next);
  };

  const hasContent = sections.some((s) => s.heading.trim() || s.paragraphs.some((p) => p.trim()));

  return (
    <div className={styles.structGrid}>
      {sections.map((section, sIdx) => (
        <div key={sIdx} className={styles.structItem}>
          <div className={styles.structItemHeader}>
            <p className={styles.structItemTitle}>
              Section {sIdx + 1}
            </p>
            <button
              type="button"
              className={styles.removeStructBtn}
              onClick={() => removeSection(sIdx)}
              aria-label={`Remove section ${sIdx + 1}`}
              disabled={sections.length === 1}
            >
              Remove
            </button>
          </div>
          <FieldRow label="Section Heading" required>
            <input
              type="text"
              className={styles.searchBoxInput}
              value={section.heading}
              onChange={(e) => updateHeading(sIdx, e.target.value)}
              placeholder="e.g. Introduction"
            />
          </FieldRow>
          <div>
            <span className={styles.formFieldLabel}>Paragraphs</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
              {section.paragraphs.map((para, pIdx) => (
                <div key={pIdx} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <textarea
                    className={styles.searchBoxInput}
                    value={para}
                    onChange={(e) => updateParagraph(sIdx, pIdx, e.target.value)}
                    placeholder={`Paragraph ${pIdx + 1}`}
                    rows={3}
                    style={{ flex: 1, resize: "vertical", minHeight: "72px" }}
                  />
                  {section.paragraphs.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeStructBtn}
                      onClick={() => removeParagraph(sIdx, pIdx)}
                      aria-label={`Remove paragraph ${pIdx + 1}`}
                      style={{ flexShrink: 0, marginTop: "4px" }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.addParaBtn}
              onClick={() => addParagraph(sIdx)}
              style={{ marginTop: "8px" }}
            >
              + Add Paragraph
            </button>
          </div>
        </div>
      ))}
      <button type="button" className={styles.addStructBtn} onClick={addSection}>
        + Add Section
      </button>
      {error && <span className={styles.formFieldError}>{error}</span>}
      {!hasContent && !error && (
        <span className={styles.formFieldError}>Add at least one section with a heading and paragraph.</span>
      )}
    </div>
  );
}

function FaqsEditor({
  faqs,
  onChange,
}: {
  faqs: FaqField[];
  onChange: (f: FaqField[]) => void;
}) {
  const addFaq = () => onChange([...faqs, { question: "", answer: "" }]);
  const removeFaq = (idx: number) => onChange(faqs.filter((_, i) => i !== idx));
  const update = (idx: number, field: "question" | "answer", val: string) => {
    onChange(faqs.map((f, i) => (i === idx ? { ...f, [field]: val } : f)));
  };

  if (faqs.length === 0 && !faqs.some((f) => f.question || f.answer)) {
    return (
      <div>
        <button type="button" className={styles.addStructBtn} onClick={addFaq}>
          + Add FAQ
        </button>
      </div>
    );
  }

  return (
    <div className={styles.structGrid}>
      {faqs.map((faq, idx) => (
        <div key={idx} className={styles.structItem}>
          <div className={styles.structItemHeader}>
            <p className={styles.structItemTitle}>FAQ {idx + 1}</p>
            <button
              type="button"
              className={styles.removeStructBtn}
              onClick={() => removeFaq(idx)}
              aria-label={`Remove FAQ ${idx + 1}`}
            >
              Remove
            </button>
          </div>
          <FieldRow label="Question">
            <input
              type="text"
              className={styles.searchBoxInput}
              value={faq.question}
              onChange={(e) => update(idx, "question", e.target.value)}
              placeholder="Frequently asked question…"
            />
          </FieldRow>
          <FieldRow label="Answer">
            <textarea
              className={styles.searchBoxInput}
              value={faq.answer}
              onChange={(e) => update(idx, "answer", e.target.value)}
              placeholder="Answer here…"
              rows={3}
              style={{ resize: "vertical", minHeight: "72px" }}
            />
          </FieldRow>
        </div>
      ))}
      <button type="button" className={styles.addStructBtn} onClick={addFaq}>
        + Add FAQ
      </button>
    </div>
  );
}

function SourcesEditor({
  sources,
  onChange,
}: {
  sources: SourceField[];
  onChange: (s: SourceField[]) => void;
}) {
  const addSource = () => onChange([...sources, { label: "", href: "" }]);
  const removeSource = (idx: number) => onChange(sources.filter((_, i) => i !== idx));
  const update = (idx: number, field: "label" | "href", val: string) => {
    onChange(sources.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
  };

  if (sources.length === 0 && !sources.some((s) => s.label || s.href)) {
    return (
      <div>
        <button type="button" className={styles.addStructBtn} onClick={addSource}>
          + Add Source
        </button>
      </div>
    );
  }

  return (
    <div className={styles.structGrid}>
      {sources.map((src, idx) => (
        <div key={idx} className={styles.structItem}>
          <div className={styles.structItemHeader}>
            <p className={styles.structItemTitle}>Source {idx + 1}</p>
            <button
              type="button"
              className={styles.removeStructBtn}
              onClick={() => removeSource(idx)}
              aria-label={`Remove source ${idx + 1}`}
            >
              Remove
            </button>
          </div>
          <FieldRow label="Source Name">
            <input
              type="text"
              className={styles.searchBoxInput}
              value={src.label}
              onChange={(e) => update(idx, "label", e.target.value)}
              placeholder="e.g. Next.js Documentation"
            />
          </FieldRow>
          <FieldRow label="Source URL">
            <input
              type="url"
              className={styles.searchBoxInput}
              value={src.href}
              onChange={(e) => update(idx, "href", e.target.value)}
              placeholder="https://example.com/reference"
            />
          </FieldRow>
        </div>
      ))}
      <button type="button" className={styles.addStructBtn} onClick={addSource}>
        + Add Source
      </button>
    </div>
  );
}

function RelatedSelector({
  options,
  selected,
  onChange,
  label,
}: {
  options: { slug: string; title: string }[];
  selected: string[];
  onChange: (s: string[]) => void;
  label: string;
}) {
  const toggle = (slug: string) => {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  };

  return (
    <div>
      <span className={styles.formFieldLabel}>{label}</span>
      <div className={styles.relationSelector} style={{ marginTop: "8px" }}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.slug);
          return (
            <button
              key={opt.slug}
              type="button"
              className={`${styles.relationChip} ${isSelected ? styles.relationChipSelected : ""}`}
              onClick={() => toggle(opt.slug)}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? "Deselect" : "Select"} ${opt.title}`}
            >
              <span className={styles.relationChipCheck} aria-hidden="true">
                {isSelected ? "✓" : ""}
              </span>
              <span className={styles.relationChipLabel}>{opt.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Form ────────────────────────────────────────────────────────────────

export default function BlogPostForm({
  projectOptions,
  insightOptions,
}: {
  projectOptions: Array<{ slug: string; title: string }>;
  insightOptions: Array<{ slug: string; title: string }>;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [standfirst, setStandfirst] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [sections, setSections] = useState<SectionField[]>([
    { heading: "Introduction", paragraphs: [""] },
  ]);
  const [faqs, setFaqs] = useState<FaqField[]>([]);
  const [sources, setSources] = useState<SourceField[]>([]);
  const [relatedService, setRelatedService] = useState("");
  const [relatedProjects, setRelatedProjects] = useState<string[]>([]);
  const [relatedInsights, setRelatedInsights] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    const result = await createBlogPostClient({
      title,
      slug,
      category,
      description,
      standfirst: standfirst || undefined,
      contentJson: serializeSections(sections),
      faqsJson: serializeFaqs(faqs) || undefined,
      sourcesJson: serializeSources(sources) || undefined,
      relatedService: relatedService || undefined,
      relatedProjectsJson: JSON.stringify(relatedProjects),
      relatedInsightsJson: JSON.stringify(relatedInsights),
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
    });

    if (result.success) {
      window.location.href = "/admin/blogs";
    } else {
      setSubmitError(result.error || "Failed to create post.");
    }
    setSubmitting(false);
  };

  const hasContent = sections.some((s) => s.heading.trim() || s.paragraphs.some((p) => p.trim()));

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ARTICLE BASICS */}
      <Panel label="Article Basics">
        <FieldRow label="Title" required htmlFor={titleId}>
          <input
            type="text"
            id={titleId}
            name="title"
            className={styles.searchBoxInput}
            value={title}
            onChange={handleTitleChange}
            placeholder="Article title"
            required
            maxLength={200}
          />
        </FieldRow>

        <FieldRow label="Slug" htmlFor={slugId}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id={slugId}
              name="slug"
              className={styles.searchBoxInput}
              value={slug}
              onChange={handleSlugChange}
              placeholder="article-slug"
              required
              maxLength={200}
              style={{ paddingRight: "220px" }}
            />
            <span className={styles.slugUrlPreview}>stackspacer.com/insights/</span>
          </div>
        </FieldRow>

        <FieldRow label="Category" required>
          <input
            type="text"
            name="category"
            className={styles.searchBoxInput}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Web Development, AI Automation"
            required
            maxLength={100}
          />
        </FieldRow>

        <FieldRow label="Description" required counter={{ current: description.length, max: 300 }}>
          <textarea
            name="description"
            className={styles.searchBoxInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description for SEO and listing cards"
            required
            maxLength={300}
            rows={3}
            style={{ resize: "vertical", minHeight: "80px" }}
          />
        </FieldRow>

        <FieldRow label="Standfirst (optional)" counter={{ current: standfirst.length, max: 500 }}>
          <textarea
            name="standfirst"
            className={styles.searchBoxInput}
            value={standfirst}
            onChange={(e) => setStandfirst(e.target.value)}
            placeholder="Introductory paragraph shown below the title"
            maxLength={500}
            rows={2}
            style={{ resize: "vertical", minHeight: "60px" }}
          />
        </FieldRow>
      </Panel>

      {/* CONTENT */}
      <Panel label="Content">
        <SectionsEditor
          sections={sections}
          onChange={setSections}
          error={hasContent ? undefined : "Add at least one section with a heading and paragraph."}
        />
      </Panel>

      {/* FAQS */}
      <Panel label="FAQs (optional)">
        <FaqsEditor faqs={faqs} onChange={setFaqs} />
      </Panel>

      {/* SOURCES */}
      <Panel label="Sources (optional)">
        <SourcesEditor sources={sources} onChange={setSources} />
      </Panel>

      {/* RELATED CONTENT */}
      <Panel label="Related Content">
        <div>
          <span className={styles.formFieldLabel}>Related Service</span>
          <select
            name="relatedService"
            className={styles.searchBoxInput}
            style={{ cursor: "pointer", marginTop: "8px" }}
            value={relatedService}
            onChange={(e) => setRelatedService(e.target.value)}
          >
            <option value="">— None —</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-app-development">Mobile App Development</option>
            <option value="ai-automation">AI Automation</option>
            <option value="machine-learning">Machine Learning</option>
          </select>
        </div>

        <RelatedSelector
          label="Related Projects"
          options={projectOptions}
          selected={relatedProjects}
          onChange={setRelatedProjects}
        />

        <RelatedSelector
          label="Related Insights"
          options={insightOptions}
          selected={relatedInsights}
          onChange={setRelatedInsights}
        />
      </Panel>

      {/* SEARCH & SOCIAL */}
      <Panel label="Search & Social">
        <FieldRow label="SEO Title (optional)" counter={{ current: seoTitle.length, max: 120 }}>
          <input
            type="text"
            name="seoTitle"
            className={styles.searchBoxInput}
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Defaults to article title"
            maxLength={120}
          />
        </FieldRow>

        <FieldRow label="SEO Description (optional)" counter={{ current: seoDescription.length, max: 300 }}>
          <textarea
            name="seoDescription"
            className={styles.searchBoxInput}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Defaults to article description"
            maxLength={300}
            rows={2}
            style={{ resize: "vertical" }}
          />
        </FieldRow>

        <SerpPreview
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          articleTitle={title}
          slug={slug}
        />
      </Panel>

      {/* HIDDEN FIELDS — serialized from state */}
      <input type="hidden" name="contentJson" value={serializeSections(sections)} />
      <input type="hidden" name="faqsJson" value={serializeFaqs(faqs)} />
      <input type="hidden" name="sourcesJson" value={serializeSources(sources)} />
      <input type="hidden" name="relatedProjectsJson" value={JSON.stringify(relatedProjects)} />
      <input type="hidden" name="relatedInsightsJson" value={JSON.stringify(relatedInsights)} />

      {submitError && (
        <div className={styles.formFieldError} style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(255,88,88,0.08)", border: "1px solid rgba(255,88,88,0.2)" }}>
          {submitError}
        </div>
      )}

      <div className={styles.formActions}>
        <button
          type="submit"
          data-cursor="dark"
          disabled={submitting}
          style={{
            height: "48px",
            padding: "0 24px",
            border: "0",
            borderRadius: "999px",
            color: "#000",
            background: submitting ? "rgba(216,175,37,0.5)" : "var(--gold)",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "0.68rem",
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Saving…" : "Save Draft"}
        </button>
        <a href="/admin/blogs" className={styles.clearButton} style={{ height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          Cancel
        </a>
      </div>
    </form>
  );
}
