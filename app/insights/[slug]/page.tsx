import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import { insights } from "@/data/insights";
import styles from "./InsightPage.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((i) => i.slug === slug);

  if (!insight) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: insight.title,
    description: insight.description,
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/insights/${slug}`,
      siteName: "StackSpacer",
      title: `${insight.title} | StackSpacer`,
      description: insight.description,
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${insight.title} | StackSpacer`,
      description: insight.description,
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = insights.find((i) => i.slug === slug);

  if (!insight) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackspacer.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    url: `${baseUrl}/insights/${insight.slug}`,
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/insights/${insight.slug}`,
    },
    author: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "StackSpacer",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "StackSpacer",
      url: baseUrl,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "StackSpacer",
    url: baseUrl,
    email: "hanidev@gmail.com",
    description:
      "StackSpacer builds mobile apps, AI automation systems, machine learning solutions, and modern web applications for startups and businesses.",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  const faqSchema =
    insight.faqs && insight.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: insight.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${baseUrl}/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: insight.title,
        item: `${baseUrl}/insights/${insight.slug}`,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={organizationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageBackHeader href="/insights" />

      <article className={styles.container}>
        <span className={styles.category}>{insight.category}</span>
        <h1>{insight.title}</h1>
        <p className={styles.standfirst}>{insight.standfirst}</p>
        <p className={styles.metaDate}>
          <time dateTime={insight.publishedAt}>
            Published {new Date(insight.publishedAt + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          {" · "}
          <time dateTime={insight.updatedAt}>
            Updated {new Date(insight.updatedAt + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </p>

        <div className={styles.body}>
          {insight.sections.map((section, index) => (
            <section key={index} className={styles.section}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        {insight.faqs && insight.faqs.length > 0 && (
          <section className={styles.faqSection}>
            <h2>Common Questions</h2>
            {insight.faqs.map((faq, index) => (
              <article key={index} className={styles.faqItem}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </section>
        )}

        {(insight.relatedService ||
          insight.relatedProjects.length > 0 ||
          (insight.relatedInsights && insight.relatedInsights.length > 0)) && (
          <section className={styles.relatedSection}>
            <h2>Related Reading</h2>
            <div className={styles.relatedGrid}>
              {insight.relatedService && (
                <a
                  href={insight.relatedService}
                  className={styles.relatedLink}
                >
                  <span className={styles.relatedType}>Service</span>
                  <span className={styles.relatedTitle}>
                    {insight.relatedService
                      .split("/")
                      .filter(Boolean)
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                    →
                  </span>
                </a>
              )}
              {insight.relatedProjects.map((projectSlug) => (
                <a
                  key={projectSlug}
                  href={`/projects/${projectSlug}`}
                  className={styles.relatedLink}
                >
                  <span className={styles.relatedType}>Project</span>
                  <span className={styles.relatedTitle}>
                    View Case Study →
                  </span>
                </a>
              ))}
              {insight.relatedInsights?.map((relatedSlug) => {
                const related = insights.find((i) => i.slug === relatedSlug);
                if (!related) return null;
                return (
                  <a
                    key={relatedSlug}
                    href={`/insights/${relatedSlug}`}
                    className={styles.relatedLink}
                  >
                    <span className={styles.relatedType}>Insight</span>
                    <span className={styles.relatedTitle}>
                      {related.title} →
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <section className={styles.ctaSection}>
          <h2>{insight.ctaText}</h2>
          <p>
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
          <a href={insight.ctaHref} className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </a>
        </section>
      </article>
    </main>
  );
}
