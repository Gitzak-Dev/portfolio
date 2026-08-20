"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectsPage.module.css";

type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  theme: string;
  previewImage?: string;
};

type ProjectsPageContentProps = {
  projects: ProjectItem[];
};

const themeClassMap: Record<string, string> = {
  mobile: styles.themeMobile,
  ai: styles.themeAi,
  ml: styles.themeMl,
  web: styles.themeWeb,
  business: styles.themeBusiness,
};

const projectVisualMap: Record<string, string> = {
  "mobile-app-dashboard": "/project-visuals/mobile-app-dashboard.png",
  "ai-automation-suite": "/project-visuals/ai-human-analogy.png",
  "ml-prediction-system": "/projects/ml-stock-dashboard.png",
  "developer-portfolio": "/project-visuals/developer-portfolio.png",
  "business-website-system": "/project-visuals/business-website-system.png",
};

const stagger: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const heroStagger: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function ProjectsPageContent({
  projects,
}: ProjectsPageContentProps) {
  return (
    <motion.div
      className={styles.content}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={heroStagger}
    >
      {/* Hero */}
      <div className={styles.heroWrap}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.label}>{"// Selected Work"}</div>
          <h1>
            Projects <br />
            <span>That Ship.</span>
          </h1>
          <p className={styles.intro}>
            Each project represents a real product built for a specific goal.
            Browse by category or explore a case study in full detail.
          </p>
        </div>
      </div>

      {/* Project Grid */}
      <section className={styles.gridSection}>
        <div className={`${styles.projectGrid} ${styles.wideSection}`}>
          {projects.map((project, index) => {
            const isFullWidth = project.slug === "business-website-system";
            const visualImage =
              (project as { previewImage?: string }).previewImage ??
              projectVisualMap[project.slug];

            return (
              <motion.article
                key={project.slug}
                className={`${styles.projectCard} ${
                  isFullWidth ? styles.projectCardFull : ""
                } ${themeClassMap[project.theme] || ""}`}
                variants={stagger}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.projectId}>{project.id}</span>
                  <span className={styles.projectCategory}>{project.category}</span>
                </div>

                {isFullWidth ? (
                  <div className={styles.cardFullLayout}>
                    <div className={styles.cardFullVisual}>
                      {visualImage ? (
                        <div className={styles.imageFrame}>
                          <Image
                            src={visualImage}
                            alt={`${project.title} visual preview`}
                            className={styles.projectImage}
                            width={560}
                            height={315}
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        </div>
                      ) : (
                        <div className={styles.projectPlaceholder}>
                          <span>{project.title}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.cardFullBody}>
                      <h2>{project.title}</h2>
                      <p>{project.desc}</p>
                      <div className={styles.tags}>
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.caseButton}
                      >
                        View Case Study{" "}
                        <span className={styles.arrow}>→</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.cardVisual}>
                      {visualImage ? (
                        <div className={styles.imageFrame}>
                          <Image
                            src={visualImage}
                            alt={`${project.title} visual preview`}
                            className={styles.projectImage}
                            width={560}
                            height={373}
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        </div>
                      ) : (
                        <div className={styles.projectPlaceholder}>
                          <span>{project.title}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <h2>{project.title}</h2>
                      <p>{project.desc}</p>
                      <div className={styles.tags}>
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className={styles.caseButton}
                      >
                        View Case Study{" "}
                        <span className={styles.arrow}>→</span>
                      </Link>
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden="true" />
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
    </motion.div>
  );
}
