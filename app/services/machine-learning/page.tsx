import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import styles from "./MLPage.module.css";

export const metadata: Metadata = {
  title: "Machine Learning Development Services | StackSpacer",
  description:
    "Machine learning for US businesses. Predictive models, data pipelines, and ML dashboards that turn data into actionable insights.",
  alternates: {
    canonical: "/services/machine-learning",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services/machine-learning",
    siteName: "StackSpacer",
    title: "Machine Learning Development Services | StackSpacer",
    description:
      "Machine learning for US businesses. Predictive models, data pipelines, and ML dashboards that turn data into actionable insights.",
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Machine Learning", url: null },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Machine Learning",
  provider: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
  },
  description:
    "Machine learning models and data-driven dashboards for predictions and business insight across the United States.",
  serviceType: "Machine Learning",
  areaServed: "United States",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs
    .filter((b) => b.url)
    .map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `https://stackspacer.com${b.url}`,
    })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of ML projects does StackSpacer handle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StackSpacer builds prediction models, classification systems, data dashboards, and ML pipelines. Each project is scoped based on the data available and the business questions being asked.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a large dataset to start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. The required dataset size depends on the type of model and the complexity of the predictions. StackSpacer can assess your data during the discovery phase and recommend the best approach.",
      },
    },
    {
      "@type": "Question",
      name: "Can ML models be integrated with our existing systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. StackSpacer can connect ML models to existing APIs, databases, and business tools through structured integration endpoints.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an ML project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timeline depends on data quality, model complexity, and dashboard requirements. A focused prediction model with a clean interface can take a few weeks, while a full pipeline with ongoing training may take longer.",
      },
    },
    {
      "@type": "Question",
      name: "What affects the cost of an ML project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project cost is shaped by data quality and preparation needs, model complexity, dashboard requirements, integration depth, testing scope, deployment environment, and ongoing maintenance. StackSpacer provides a project-specific estimate after the data review phase.",
      },
    },
  ],
};

export default function MLPage() {
  return (
    <main className={styles.page}>
      <PageBackHeader href="/services" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>
            {"// Machine Learning"}
          </div>
          <h1>
            Machine Learning <br />
            <span>Development</span>
          </h1>
          <p className={styles.heroDesc}>
            StackSpacer builds machine learning systems that turn raw data into
            clear predictions, actionable insight, and decision-ready outputs.
            Each model is designed for practical usability — not complexity.
          </p>
          <p className={styles.heroDesc}>
            StackSpacer provides machine learning development services for
            businesses across the United States, with project communication and
            delivery coordinated online. You work directly with the developer —
            not an account manager or a rotating team.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </header>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>What We Build</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>Prediction Models</h3>
              <p>
                Machine learning models that analyze patterns in data and
                generate predictions for business decisions, forecasting, and
                risk assessment.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Classification Systems</h3>
              <p>
                Systems that categorize data automatically — useful for
                sorting, tagging, filtering, and organizing large datasets.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Data Dashboards</h3>
              <p>
                Clean visualization interfaces that present model outputs and
                data insights in a way that non-technical users can understand.
              </p>
            </article>
            <article className={styles.card}>
              <h3>ML Pipelines</h3>
              <p>
                End-to-end data processing pipelines that clean, transform,
                train, and deploy models for ongoing use in production.
              </p>
            </article>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Technologies</h2>
          <div className={styles.tags}>
            {["Python", "ML Models", "Data Processing", "Prediction", "Classification", "Dashboards", "API Integration"].map(
              (tech) => <span key={tech}>{tech}</span>
            )}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Our Approach</h2>
          <div className={styles.steps}>
            {[
              {
                num: "01",
                title: "Data Review",
                desc: "We review the dataset, structure, missing values, and prediction goals to understand what the data can show.",
              },
              {
                num: "02",
                title: "Model Planning",
                desc: "We define model inputs, outputs, and the best approach to present results clearly.",
              },
              {
                num: "03",
                title: "Dashboard Build",
                desc: "We build prediction views, summary cards, and insight sections that non-technical users can navigate.",
              },
              {
                num: "04",
                title: "Validation",
                desc: "We check model behaviour, usability, and decision clarity before delivery.",
              },
            ].map((step) => (
              <article key={step.num} className={styles.step}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Cost &amp; Scope</h2>
          <p className={styles.costIntro}>
            Every machine learning project is scoped individually. The following
            factors shape timeline and investment:
          </p>
          <ul className={styles.costList}>
            <li>Data quality, preparation, and availability</li>
            <li>Model complexity and prediction type</li>
            <li>Dashboard requirements and visualization depth</li>
            <li>Integration with existing systems and APIs</li>
            <li>Testing scope and validation requirements</li>
            <li>Deployment environment and ongoing maintenance</li>
          </ul>
          <p className={styles.costNote}>
            Tell us about your data and goals and StackSpacer can provide a
            project-specific estimate.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Projects</h2>
          <div className={styles.projectGrid}>
            <Link
              href="/projects/ml-prediction-system"
              className={styles.projectCard}
            >
              <span className={styles.projectTag}>Machine Learning</span>
              <h3>ML Prediction System</h3>
              <strong>View Case Study →</strong>
            </Link>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Reading</h2>
            <Link href="/insights/machine-learning-for-business" className={styles.relatedReadingLink}>
            Machine Learning for Business: Practical Applications and ROI ?
            </Link>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <FaqAccordion
            items={[
              {
                question: "What types of ML projects does StackSpacer handle?",
                answer: "StackSpacer builds prediction models, classification systems, data dashboards, and ML pipelines. Each project is scoped based on the data available and the business questions being asked.",
              },
              {
                question: "Do I need a large dataset to start?",
                answer: "Not necessarily. The required dataset size depends on the type of model and the complexity of the predictions. StackSpacer can assess your data during the discovery phase and recommend the best approach.",
              },
              {
                question: "Can ML models be integrated with our existing systems?",
                answer: "Yes. StackSpacer can connect ML models to existing APIs, databases, and business tools through structured integration endpoints.",
              },
              {
                question: "How long does an ML project take?",
                answer: "Timeline depends on data quality, model complexity, and dashboard requirements. A focused prediction model with a clean interface can take a few weeks, while a full pipeline with ongoing training may take longer.",
              },
            ]}
            ariaLabel="Frequently asked questions about Machine Learning"
          />
        </section>

        <div className={styles.ctaSection}>
          <h2>Start Your ML Project</h2>
          <p>
            Tell us about your data and goals and we&apos;ll get back to you
            within 24 hours.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
