import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import styles from "./WebDevPage.module.css";

export const metadata: Metadata = {
  title: "Web Development | StackSpacer",
  description:
    "Custom web applications built with Next.js, React, and TypeScript. Performance-focused development for landing pages, dashboards, and business websites.",
  alternates: {
    canonical: "/services/web-development",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services/web-development",
    siteName: "StackSpacer",
    title: "Web Development | StackSpacer",
    description:
      "Custom web applications built with Next.js, React, and TypeScript. Performance-focused development for landing pages, dashboards, and business websites.",
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Web Development", url: null },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development",
  provider: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
  },
  description:
    "Custom web applications built with Next.js, React, and TypeScript for businesses and startups across the United States.",
  serviceType: "Web Development",
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

export default function WebDevPage() {
  return (
    <main className={styles.page}>
      <PageBackHeader href="/services" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>
            {"// Web Development"}
          </div>
          <h1>
            Custom Web Development <br />
            <span>Built for Performance and Growth</span>
          </h1>
          <p className={styles.heroDesc}>
            StackSpacer builds custom web applications using Next.js, React,
            and TypeScript. From high-conversion landing pages and interactive
            dashboards to full business websites, each project is designed for
            speed, clarity, and long-term scalability.
          </p>
          <p className={styles.heroDesc}>
            StackSpacer provides web development services for businesses across
            the United States, with project communication and delivery
            coordinated online.
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
              <h3>Landing Pages</h3>
              <p>
                High-conversion landing pages with strong visual hierarchy,
                clear messaging, and performance-optimized builds that load
                instantly.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Business Websites</h3>
              <p>
                Complete website structures for businesses, with service
                sections, enquiry flows, SEO-friendly architecture, and mobile
                responsiveness.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Dashboards &amp; Web Apps</h3>
              <p>
                Interactive dashboards, admin panels, and data-driven web
                applications with clean interfaces and API integration.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Portfolio &amp; Brand Sites</h3>
              <p>
                Premium portfolio experiences with scroll animations,
                interactive sections, and strong visual identity tailored to
                the brand.
              </p>
            </article>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Technologies</h2>
          <div className={styles.tags}>
            {["Next.js", "React", "TypeScript", "GSAP", "Framer Motion", "CSS", "REST APIs", "Tailwind CSS"].map(
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
                title: "Discovery",
                desc: "We review your goals, target audience, and technical requirements to define the project scope.",
              },
              {
                num: "02",
                title: "Design &amp; Structure",
                desc: "We plan the information architecture, page hierarchy, and visual direction before writing code.",
              },
              {
                num: "03",
                title: "Development",
                desc: "Clean, component-based code with performance in mind. SEO structure and responsive layouts are built in from the start.",
              },
              {
                num: "04",
                title: "Launch &amp; Optimize",
                desc: "We test across devices, optimize Core Web Vitals, and deploy with ongoing support.",
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
          <h2>Related Projects</h2>
          <div className={styles.projectGrid}>
            {[
              {
                slug: "developer-portfolio",
                title: "Developer Portfolio",
                category: "Web Design & Development",
              },
              {
                slug: "business-website-system",
                title: "Business Website System",
                category: "Full Stack Development",
              },
            ].map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.projectCard}
              >
                <span className={styles.projectTag}>{project.category}</span>
                <h3>{project.title}</h3>
                <strong>View Case Study →</strong>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Reading</h2>
            <Link href="/insights/what-nextjs-production-ready" className={styles.relatedReadingLink}>
            What Makes a Next.js Application Production-Ready →
            </Link>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <FaqAccordion
            items={[
              {
                question: "What types of websites does StackSpacer build?",
                answer: "StackSpacer builds landing pages, business websites, dashboards, web applications, and portfolio sites. Each project is custom-built based on the specific requirements and goals.",
              },
              {
                question: "How long does a web development project take?",
                answer: "Timeline depends on scope, design complexity, integrations, and content requirements. A simple landing page may take a few days, while a full business website typically takes a few weeks.",
              },
              {
                question: "Do you handle hosting and deployment?",
                answer: "Yes. StackSpacer can deploy projects to hosting platforms such as Vercel, Hostinger, or other providers. Deployment and ongoing hosting setup are discussed during the project kickoff.",
              },
              {
                question: "Will the website be mobile-friendly?",
                answer: "Every project is built with a mobile-first approach. All pages are tested across desktop, tablet, and mobile devices to ensure a consistent experience.",
              },
            ]}
            ariaLabel="Frequently asked questions about Web Development"
          />
        </section>

        <div className={styles.ctaSection}>
          <h2>Start Your Web Project</h2>
          <p>
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
