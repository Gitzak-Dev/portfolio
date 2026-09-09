"use client";

import Link from "next/link";
import styles from "./AboutPage.module.css";

type FeaturedProject = {
  slug: string;
  category: string;
  title: string;
  desc: string;
};

type AboutPageContentProps = {
  featuredProjects: FeaturedProject[];
};

const services = [
  {
    title: "Web Development",
    desc: "Custom web applications built with Next.js, React, and TypeScript. From landing pages to full business platforms.",
    link: "/services/web-development",
  },
  {
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps for iOS and Android using React Native. Clean UI with scalable architecture.",
    link: "/services/mobile-app-development",
  },
  {
    title: "AI Automation",
    desc: "AI-powered chatbots, workflow automation, and smart tools that reduce manual work and connect business processes.",
    link: "/services/ai-automation",
  },
  {
    title: "Machine Learning",
    desc: "Prediction models, classification systems, and data dashboards that turn raw data into clear business insight.",
    link: "/services/machine-learning",
  },
];

const reasons = [
  {
    num: "01",
    title: "Direct collaboration",
    desc: "You work directly with the developer. Faster decisions, cleaner execution, and zero translation errors.",
  },
  {
    num: "02",
    title: "Attention to detail",
    desc: "If a micro-interaction, spacing, or animation feels off, it gets refined before delivery.",
  },
  {
    num: "03",
    title: "Speed without sacrificing quality",
    desc: "Clean architecture, reusable components, and proven development systems ship fast.",
  },
  {
    num: "04",
    title: "Code you can hand off",
    desc: "Clean, documented, scalable code that your next developer can understand without a full rebuild.",
  },
  {
    num: "05",
    title: "Clear communication",
    desc: "Clear updates, walkthroughs, and honest timelines so you always know what is happening.",
  },
];

const expertise = [
  {
    title: "Mobile Apps",
    desc: "Build smooth, scalable mobile applications with clean UI, reliable APIs, and responsive user experiences.",
    tags: ["React Native", "Firebase", "API"],
    link: "/services/mobile-app-development",
  },
  {
    title: "AI Automation",
    desc: "Create smart AI workflows, chatbots, and automation tools that reduce manual work and improve business speed.",
    tags: ["OpenAI", "Automation", "Bots"],
    link: "/services/ai-automation",
  },
  {
    title: "Digital Systems",
    desc: "Design and develop complete digital experiences including websites, dashboards, and conversion interfaces.",
    tags: ["Next.js", "UI/UX", "Motion"],
    link: "/services/web-development",
  },
];

export default function AboutPageContent({
  featuredProjects,
}: AboutPageContentProps) {
  return (
    <div className={styles.content}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.label}>{"// About"}</div>
          <h1>
            About <br />
            <span>StackSpacer</span>
          </h1>
          <p className={styles.heroDesc}>
            StackSpacer builds custom digital products for startups and
            businesses. The focus is on clean architecture, practical AI
            solutions, and interfaces that feel reliable — not complicated.
          </p>
        </div>
      </section>

      {/* What StackSpacer Builds */}
      <section className={styles.section}>
        <h2>What StackSpacer Builds</h2>
        <div className={styles.grid}>
          {services.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <Link href={item.link} className={styles.cardLink}>
                Learn more <span className={styles.arrow}>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* How StackSpacer Works */}
      <section className={styles.section}>
        <h2>How StackSpacer Works</h2>
        <div className={styles.reasons}>
          {reasons.map((item) => (
            <article
              key={item.num}
              className={`${styles.reason} ${
                item.num === "05" ? styles.reasonFull : ""
              }`}
            >
              <span className={styles.reasonNum}>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Core Expertise */}
      <section className={`${styles.section} ${styles.wideSection}`}>
        <h2>Core Expertise</h2>
        <div className={styles.expertiseGrid}>
          {expertise.map((item) => (
            <article key={item.title} className={styles.expertiseCard}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={item.link} className={styles.cardLink}>
                Explore {item.title} <span className={styles.arrow}>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Selected Projects */}
      <section className={`${styles.section} ${styles.wideSection}`}>
        <h2>Selected Projects</h2>
        <div className={styles.projectGrid}>
          {featuredProjects.map((project) => (
            <div key={project.slug} className={styles.projectCard}>
              <span className={styles.projectTag}>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <strong className={styles.projectCta}>
                View Case Study →
              </strong>
            </div>
          ))}
        </div>
        <Link href="/projects" className={styles.seeAllLink}>
          View All Projects <span>→</span>
        </Link>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <h2>Let&apos;s Work Together</h2>
        <p>
          Have a project in mind? Reach out and we&apos;ll get back to you
          within 24 hours.
        </p>
        <Link href="/#contact" className={styles.ctaButton}>
          Discuss Your Project <span>↗</span>
        </Link>
      </section>
    </div>
  );
}
