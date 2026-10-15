"use client";

import { useState, useId, useCallback } from "react";
import { updateBlogPostClient } from "./actions";
import styles from "../AdminDashboard.module.css";

// ── Types ────────────────────────────────────────────────────────────────────

type PostData = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  standfirst: string | null;
  contentJson: string;
  faqsJson: string | null;
  sourcesJson: string | null;
  relatedService: string | null;
  relatedProjectsJson: string;
  relatedInsightsJson: string;
  seoTitle: string | null;
  seoDescription: string | null;
};

type BlogEditFormProps = {
  initialPost: PostData;
  isPublished: boolean;
  excludeInsightSlug?: string;
  projectOptions: Array<{ slug: string; title: string }>;
  insightOptions: Array<{ slug: string; title: string }>;
};

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

function parseSectionsSafe(json: string): SectionField[] {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s: unknown) => {
      if (typeof s !== "object" || s === null) return { heading: "", paragraphs: [] };
      const obj = s as Record<string, unknown>;
      return {
        heading: typeof obj.heading === "string" ? obj.heading : "",
        paragraphs: Array.isArray(obj.paragraphs)
          ? obj.paragraphs.filter((p): p is string => typeof p === "string")
          : [],
      };
    });
  } catch {
    return [];
  }
}

function parseFaqsSafe(json: string | null): FaqField[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((f: unknown) => {
      if (typeof f !== "object" || f === null) return { question: "", answer: "" };
      const obj = f as Record<string, unknown>;
      return {
        question: typeof obj.question === "string" ? obj.question : "",
        answer: typeof obj.answer === "string" ? obj.answer : "",
      };
    });
  } catch {
    return [];
  }
}

function parseSourcesSafe(json: string | null): SourceField[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s: unknown) => {
      if (typeof s !== "object" || s === null) return { label: "", href: "" };
      const obj = s as Record<string, unknown>;
      return {
        label: typeof obj.label === "string" ? obj.label : "",
        href: typeof obj.href === "string" ? obj.href : "",
      };
    });
  } catch {
    return [];
  }
}

function parseSlugsSafe(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === "string")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  } catch {
    return [];
  }
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

// ── Sub-components (same shapes as BlogPostForm) ─────────────────────────────

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
  disabled,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
  counter?: { current: number; max: number };
  disabled?: boolean;
}) {
  return (
    <div className={styles.formFieldRow}>
      <label htmlFor={htmlFor} className={styles.formFieldLabel}>
        {label}{required ? " *" : ""}
      </label>
      {children}
      {hint && <span className={styles.formFieldHint}>{hint}</span>}
      {counter && <span className={styles.charCounter}>{counter.current}/{counter.max}</span>}
      {error && <span className={styles.formFieldError}>{error}</span>}
      {disabled && <span className={styles.slugLockedHint}>Locked after publication</span>}
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

function SectionsEditor({
  sections,
  onChange,
}: {
  sections: SectionField[];
  onChange: (s: SectionField[]) => void;
}) {
  const addSection = () => onChange([...sections, { heading: "", paragraphs: [""] }]);
  const removeSection = (idx: number) => onChange(sections.filter((_, i) => i !== idx));
  const updateHeading = (idx: number, val: string) =>
    onChange(sections.map((s, i) => (i === idx ? { ...s, heading: val } : s)));
  const addParagraph = (sectionIdx: number) =>
    onChange(sections.map((s, i) => (i === sectionIdx ? { ...s, paragraphs: [...s.paragraphs, ""] } : s)));
  const updateParagraph = (sectionIdx: number, pIdx: number, val: string) =>
    onChange(sections.map((s, i) =>
      i === sectionIdx
        ? { ...s, paragraphs: s.paragraphs.map((p, j) => (j === pIdx ? val : p)) }
        : s
    ));
  const removeParagraph = (sectionIdx: number, pIdx: number) =>
    onChange(sections.map((s, i) =>
      i === sectionIdx
        ? { ...s, paragraphs: s.paragraphs.filter((_, j) => j !== pIdx) }
        : s
    ));

  return (
    <div className={styles.structGrid}>
      {sections.map((section, sIdx) => (
        <div key={sIdx} className={styles.structItem}>
          <div className={styles.structItemHeader}>
            <p className={styles.structItemTitle}>Section {sIdx + 1}</p>
            <button type="button" className={styles.removeStructBtn} onClick={() => removeSection(sIdx)} aria-label={`Remove section ${sIdx + 1}`} disabled={sections.length === 1}>
              Remove
            </button>
          </div>
          <FieldRow label="Section Heading" required>
            <input type="text" className={styles.searchBoxInput} value={section.heading} onChange={(e) => updateHeading(sIdx, e.target.value)} placeholder="e.g. Introduction" />
          </FieldRow>
          <div>
            <span className={styles.formFieldLabel}>Paragraphs</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
              {section.paragraphs.map((para, pIdx) => (
                <div key={pIdx} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <textarea className={styles.searchBoxInput} value={para} onChange={(e) => updateParagraph(sIdx, pIdx, e.target.value)} placeholder={`Paragraph ${pIdx + 1}`} rows={3} style={{ flex: 1, resize: "vertical", minHeight: "72px" }} />
                  {section.paragraphs.length > 1 && (
                    <button type="button" className={styles.removeStructBtn} onClick={() => removeParagraph(sIdx, pIdx)} aria-label={`Remove paragraph ${pIdx + 1}`} style={{ flexShrink: 0, marginTop: "4px" }}>×</button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" className={styles.addParaBtn} onClick={() => addParagraph(sIdx)} style={{ marginTop: "8px" }}>+ Add Paragraph</button>
          </div>
        </div>
      ))}
      <button type="button" className={styles.addStructBtn} onClick={addSection}>+ Add Section</button>
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
  const update = (idx: number, field: "question" | "answer", val: string) =>
    onChange(faqs.map((f, i) => (i === idx ? { ...f, [field]: val } : f)));

  if (faqs.length === 0 && !faqs.some((f) => f.question || f.answer)) {
    return <button type="button" className={styles.addStructBtn} onClick={addFaq}>+ Add FAQ</button>;
  }

  return (
    <div className={styles.structGrid}>
      {faqs.map((faq, idx) => (
        <div key={idx} className={styles.structItem}>
          <div className={styles.structItemHeader}>
            <p className={styles.structItemTitle}>FAQ {idx + 1}</p>
            <button type="button" className={styles.removeStructBtn} onClick={() => removeFaq(idx)} aria-label={`Remove FAQ ${idx + 1}`}>Remove</button>
          </div>
          <FieldRow label="Question">
            <input type="text" className={styles.searchBoxInput} value={faq.question} onChange={(e) => update(idx, "question", e.target.value)} placeholder="Frequently asked question…" />
          </FieldRow>
          <FieldRow label="Answer">
            <textarea className={styles.searchBoxInput} value={faq.answer} onChange={(e) => update(idx, "answer", e.target.value)} placeholder="Answer here…" rows={3} style={{ resize: "vertical", minHeight: "72px" }} />
          </FieldRow>
        </div>
      ))}
      <button type="button" className={styles.addStructBtn} onClick={addFaq}>+ Add FAQ</button>
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
  const update = (idx: number, field: "label" | "href", val: string) =>
    onChange(sources.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));

  if (sources.length === 0 && !sources.some((s) => s.label || s.href)) {
    return <button type="button" className={styles.addStructBtn} onClick={addSource}>+ Add Source</button>;
  }

  return (
    <div className={styles.structGrid}>
      {sources.map((src, idx) => (
        <div key={idx} className={styles.structItem}>
          <div className={styles.structItemHeader}>
            <p className={styles.structItemTitle}>Source {idx + 1}</p>
            <button type="button" className={styles.removeStructBtn} onClick={() => removeSource(idx)} aria-label={`Remove source ${idx + 1}`}>Remove</button>
          </div>
          <FieldRow label="Source Name">
            <input type="text" className={styles.searchBoxInput} value={src.label} onChange={(e) => update(idx, "label", e.target.value)} placeholder="e.g. Next.js Documentation" />
          </FieldRow>
          <FieldRow label="Source URL">
            <input type="url" className={styles.searchBoxInput} value={src.href} onChange={(e) => update(idx, "href", e.target.value)} placeholder="https://example.com/reference" />
          </FieldRow>
        </div>
      ))}
      <button type="button" className={styles.addStructBtn} onClick={addSource}>+ Add Source</button>
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
    if (selected.includes(slug)) onChange(selected.filter((s) => s !== slug));
    else onChange([...selected, slug]);
  };
  return (
    <div>
      <span className={styles.formFieldLabel}>{label}</span>
      <div className={styles.relationSelector} style={{ marginTop: "8px" }}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.slug);
          return (
            <button key={opt.slug} type="button" className={`${styles.relationChip} ${isSelected ? styles.relationChipSelected : ""}`} onClick={() => toggle(opt.slug)} aria-pressed={isSelected} aria-label={`${isSelected ? "Deselect" : "Select"} ${opt.title}`}>
              <span className={styles.relationChipCheck} aria-hidden="true">{isSelected ? "✓" : ""}</span>
              <span className={styles.relationChipLabel}>{opt.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Edit Form ───────────────────────────────────────────────────────────

export default function BlogEditForm({ initialPost, isPublished, excludeInsightSlug, projectOptions, insightOptions }: BlogEditFormProps) {
  const [title, setTitle] = useState(initialPost.title);
  const [slug, setSlug] = useState(initialPost.slug);
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState(initialPost.category);
  const [description, setDescription] = useState(initialPost.description);
  const [standfirst, setStandfirst] = useState(initialPost.standfirst ?? "");
  const [seoTitle, setSeoTitle] = useState(initialPost.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initialPost.seoDescription ?? "");
  const [sections, setSections] = useState<SectionField[]>(() => parseSectionsSafe(initialPost.contentJson));
  const [faqs, setFaqs] = useState<FaqField[]>(() => parseFaqsSafe(initialPost.faqsJson));
  const [sources, setSources] = useState<SourceField[]>(() => parseSourcesSafe(initialPost.sourcesJson));
  const [relatedService, setRelatedService] = useState(initialPost.relatedService ?? "");
  const [relatedProjects, setRelatedProjects] = useState<string[]>(() => parseSlugsSafe(initialPost.relatedProjectsJson));
  const [relatedInsights, setRelatedInsights] = useState<string[]>(() => {
    const all = parseSlugsSafe(initialPost.relatedInsightsJson);
    return excludeInsightSlug ? all.filter((s) => s !== excludeInsightSlug) : all;
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; error?: string } | null>(null);

  const titleId = useId();
  const slugId = useId();

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (!isSlugManual && !isPublished) {
      setSlug(generateSlugFromTitle(value));
    }
  }, [isSlugManual, isPublished]);

  const handleSlugChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManual(true);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitResult(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("contentJson", serializeSections(sections));
    formData.set("faqsJson", serializeFaqs(faqs));
    formData.set("sourcesJson", serializeSources(sources));
    formData.set("relatedProjectsJson", JSON.stringify(relatedProjects));
    formData.set("relatedInsightsJson", JSON.stringify(relatedInsights));
    formData.set("relatedService", relatedService);

    const result = await updateBlogPostClient(initialPost.id, {
      title,
      slug,
      category,
      description,
      standfirst: standfirst || undefined,
      contentJson: formData.get("contentJson") as string,
      faqsJson: formData.get("faqsJson") as string || undefined,
      sourcesJson: formData.get("sourcesJson") as string || undefined,
      relatedService: relatedService || undefined,
      relatedProjectsJson: formData.get("relatedProjectsJson") as string,
      relatedInsightsJson: formData.get("relatedInsightsJson") as string,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
    });
    setSubmitResult(result);
    setSubmitting(false);
  }, [initialPost.id, title, slug, category, description, standfirst, seoTitle, seoDescription, sections, faqs, sources, relatedService, relatedProjects, relatedInsights]);

  const hasContent = sections.some((s) => s.heading.trim() || s.paragraphs.some((p) => p.trim()));
  const hasSources = sources.length > 0 && sources.some((s) => s.label.trim() && s.href.trim());
  const publishWarning = !isPublished && !hasSources;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <input type="hidden" name="id" value={initialPost.id} />

      {/* PUBLISH WARNING */}
      {publishWarning && (
        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(255,193,7,0.06)", border: "1px solid rgba(255,193,7,0.25)", color: "rgba(255,193,7,0.9)", fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "0.88rem", lineHeight: "1.5" }}>
          <strong>Publication requires references.</strong> Add at least one verified source in the Sources section below before publishing this article.
        </div>
      )}

      {/* ARTICLE BASICS */}
      <Panel label="Article Basics">
        <FieldRow label="Title" required htmlFor={titleId}>
          <input type="text" id={titleId} name="title" className={styles.searchBoxInput} value={title} onChange={handleTitleChange} placeholder="Article title" required maxLength={200} />
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
              disabled={isPublished}
              style={{ paddingRight: "220px" }}
            />
            <span className={styles.slugUrlPreview}>stackspacer.com/insights/</span>
          </div>
          {isPublished && <span className={styles.slugLockedHint}>Slug is locked after publication</span>}
        </FieldRow>

        <FieldRow label="Category" required>
          <input type="text" name="category" className={styles.searchBoxInput} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Web Development, AI Automation" required maxLength={100} />
        </FieldRow>

        <FieldRow label="Description" required counter={{ current: description.length, max: 300 }}>
          <textarea name="description" className={styles.searchBoxInput} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description for SEO and listing cards" required maxLength={300} rows={3} style={{ resize: "vertical", minHeight: "80px" }} />
        </FieldRow>

        <FieldRow label="Standfirst (optional)" counter={{ current: standfirst.length, max: 500 }}>
          <textarea name="standfirst" className={styles.searchBoxInput} value={standfirst} onChange={(e) => setStandfirst(e.target.value)} placeholder="Introductory paragraph shown below the title" maxLength={500} rows={2} style={{ resize: "vertical", minHeight: "60px" }} />
        </FieldRow>
      </Panel>

      {/* CONTENT */}
      <Panel label="Content">
        <SectionsEditor sections={sections} onChange={setSections} />
        {!hasContent && <span className={styles.formFieldError}>Add at least one section with a heading and paragraph.</span>}
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
          <select name="relatedService" className={styles.searchBoxInput} style={{ cursor: "pointer", marginTop: "8px" }} value={relatedService} onChange={(e) => setRelatedService(e.target.value)}>
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
          <input type="text" name="seoTitle" className={styles.searchBoxInput} value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Defaults to article title" maxLength={120} />
        </FieldRow>

        <FieldRow label="SEO Description (optional)" counter={{ current: seoDescription.length, max: 300 }}>
          <textarea name="seoDescription" className={styles.searchBoxInput} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Defaults to article description" maxLength={300} rows={2} style={{ resize: "vertical" }} />
        </FieldRow>

        <SerpPreview seoTitle={seoTitle} seoDescription={seoDescription} articleTitle={title} slug={slug} />
      </Panel>

      {/* HIDDEN FIELDS */}
      <input type="hidden" name="contentJson" value={serializeSections(sections)} />
      <input type="hidden" name="faqsJson" value={serializeFaqs(faqs)} />
      <input type="hidden" name="sourcesJson" value={serializeSources(sources)} />
      <input type="hidden" name="relatedProjectsJson" value={JSON.stringify(relatedProjects)} />
      <input type="hidden" name="relatedInsightsJson" value={JSON.stringify(relatedInsights)} />

      {submitResult && !submitResult.success && (
        <div className={styles.formFieldError} style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(255,88,88,0.08)", border: "1px solid rgba(255,88,88,0.2)" }}>
          {submitResult.error}
        </div>
      )}
      {submitResult?.success && (
        <div style={{ padding: "14px 18px", borderRadius: "12px", background: "rgba(216,175,37,0.08)", border: "1px solid rgba(216,175,37,0.25)", color: "var(--gold)", fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "0.88rem" }}>
          Changes saved successfully.
        </div>
      )}

      <div className={styles.formActions}>
        <button type="submit" data-cursor="dark" disabled={submitting} style={{ height: "48px", padding: "0 24px", border: "0", borderRadius: "999px", color: "#000", background: submitting ? "rgba(216,175,37,0.5)" : "var(--gold)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer" }}>
          {submitting ? "Saving…" : "Save Changes"}
        </button>
        <a href="/admin/blogs" className={styles.clearButton} style={{ height: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          Cancel
        </a>
      </div>
    </form>
  );
}
