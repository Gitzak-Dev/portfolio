import type { Metadata } from "next";
import Link from "next/link";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import styles from "./ServicesPage.module.css";

export const metadata: Metadata = {
  title: "Custom Software Development Company | StackSpacer",
  description:
    "Custom software development for US businesses. Web development, mobile app development, AI automation, and machine learning services with direct collaboration and modern technology.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services",
    siteName: "StackSpacer",
    title: "Custom Software Development Company | StackSpacer",
    description:
      "Custom software development for US businesses. Web development, mobile app development, AI automation, and machine learning services with direct collaboration and modern technology.",
  },
};

const serviceLinks: Array<{
  slug: string;
  name: string;
  desc: string;
  tags: string[];
}> = [
  {
    slug: "web-development",
    name: "Web Development",
    desc: "Custom web applications built with Next.js, React, and TypeScript. Performance-focused development for landing pages, dashboards, and business websites.",
    tags: ["Next.js", "React", "TypeScript", "GSAP", "CSS"],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    desc: "Cross-platform mobile apps for iOS and Android using React Native. Clean UI, reliable APIs, and scalable architecture.",
    tags: ["React Native", "Firebase", "API", "iOS", "Android"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    desc: "AI-powered automation systems, chatbots, and workflow tools that reduce manual work and improve business efficiency.",
    tags: ["OpenAI", "Automation", "Chatbots", "Node.js"],
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    desc: "Machine learning models and data-driven dashboards that turn raw data into clear predictions and actionable business insight.",
    tags: ["Python", "ML Models", "Data", "Prediction"],
  },
];

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <PageBackHeader href="/" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>{"// SERVICES"}</div>
          <h1>
            Services Built <br />
            <span>for Growth.</span>
          </h1>
          <p className={styles.intro}>
            StackSpacer builds custom digital products across four core areas:
            web development, mobile apps, AI automation, and machine learning.
            Each service is tailored to the specific needs of the project.
          </p>
        </header>

        <div className={styles.divider} />

        <section className={styles.servicesGrid} aria-label="Service offerings">
          {serviceLinks.map((service) => (
            <article key={service.slug} className={styles.serviceCard}>
              <div className={styles.cardHeader}>
                <h2>{service.name}</h2>
                <Link
                  href={`/services/${service.slug}`}
                  className={styles.cardLink}
                >
                  Learn more <span>→</span>
                </Link>
              </div>
              <p className={styles.cardDesc}>{service.desc}</p>
              <div className={styles.tags}>
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <div className={styles.divider} />

        <section className={styles.ctaSection}>
          <h2>Ready to start a project?</h2>
          <p>
            Tell us about your project and we&apos;ll get back to you within 24
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
