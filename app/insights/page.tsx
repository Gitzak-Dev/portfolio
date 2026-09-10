import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/data/insights";
import styles from "./InsightsPage.module.css";

export const metadata: Metadata = {
  title: "Insights | StackSpacer",
  description:
    "Technical guides and architectural comparisons from StackSpacer.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/insights",
    siteName: "StackSpacer",
    title: "Insights | StackSpacer",
    description: "Technical guides and architectural comparisons from StackSpacer.",
  },
};

export default function InsightsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.label}>// Insights</span>
          <h1>Expert Technical Writing</h1>
          <p className={styles.heroDesc}>
            Practical guides and architectural comparisons from StackSpacer.
          </p>
        </section>

        <section className={styles.grid} aria-label="Insight articles">
          {insights.map((insight) => (
            <article key={insight.slug} className={styles.card}>
              <span className={styles.category}>{insight.category}</span>
              <h2 className={styles.title}>{insight.title}</h2>
              <p className={styles.description}>{insight.description}</p>
              <a
                href={`/insights/${insight.slug}`}
                className={styles.cardLink}
              >
                Read Insight <span className={styles.arrow}>→</span>
              </a>
            </article>
          ))}
        </section>

        <section className={styles.ctaSection}>
          <h2>Have a project in mind?</h2>
          <p>
            StackSpacer builds custom digital products for startups and
            businesses. Get in touch and we&apos;ll get back to you within 24
            hours.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
