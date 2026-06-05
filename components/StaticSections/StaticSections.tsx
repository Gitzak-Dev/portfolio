"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import styles from "./StaticSections.module.css";

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

export default function StaticSections() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleMobileCard = (index: number) => {
    setActiveIndex((previousIndex) => (previousIndex === index ? null : index));
  };

  const handlePointerEnter = (
    event: PointerEvent<HTMLElement>,
    index: number
  ) => {
    if (event.pointerType === "mouse") {
      setActiveIndex(index);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      setActiveIndex(null);
    }
  };

  const handlePointerUp = (
    event: PointerEvent<HTMLElement>,
    index: number
  ) => {
    if (event.pointerType !== "mouse") {
      toggleMobileCard(index);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMobileCard(index);
    }
  };

  const stopCardToggle = (event: PointerEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <section className={styles.portfolioSection} id="work">
      <div className={styles.bgGlowOne} aria-hidden="true" />
      <div className={styles.bgGlowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>// Selected Work</span>

          <h2>Portfolio</h2>

          <p>Selected projects that showcase quality, function, and results.</p>
        </motion.div>

        <div className={styles.projectList}>
          {projects.map((project, index) => {
            const isActive = activeIndex === index;
            const projectVisualImage = projectVisualMap[project.slug];

            return (
              <motion.article
                layout
                key={project.id}
                className={`${styles.projectCard} ${
                  isActive ? styles.activeCard : ""
                } ${themeClassMap[project.theme]}`}
                onPointerEnter={(event) => handlePointerEnter(event, index)}
                onPointerLeave={handlePointerLeave}
                onPointerUp={(event) => handlePointerUp(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`${
                  isActive ? "Close" : "Open"
                } ${project.title} project details`}
                transition={{
                  layout: {
                    duration: 0.46,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
              >
                <div className={styles.projectTop}>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectNumber}>{project.id}</span>

                    <div className={styles.projectTitleWrap}>
                      <h3>{project.title}</h3>

                      <div className={styles.projectInfo}>
                        <span>{project.category}</span>
                        <span className={styles.projectDivider}>•</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.arrowBtn} aria-hidden="true">
                    →
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className={styles.projectExpanded}
                      initial={{
                        opacity: 0,
                        y: 24,
                        filter: "blur(10px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: 14,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className={styles.projectDetails}>
                        <p>{project.desc}</p>

                        <div className={styles.tags}>
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className={styles.caseButton}
                          onPointerUp={stopCardToggle}
                          onClick={(event) => event.stopPropagation()}
                        >
                          View Case Study <span>→</span>
                        </Link>
                      </div>

                      <div className={styles.previewArea}>
                        <div className={styles.previewCard}>
                          <div className={styles.previewHeader}>
                            <span />
                            <span />
                            <span />
                          </div>

                          {projectVisualImage ? (
                            <div className={styles.projectImagePreview}>
                              <Image
                                src={projectVisualImage}
                                alt={`${project.title} visual preview`}
                                fill
                                priority={index <= 1}
                                sizes="(max-width: 900px) 100vw, 560px"
                                className={styles.projectPreviewImage}
                              />
                            </div>
                          ) : (
                            <>
                              <div className={styles.previewHero}>
                                <div className={styles.previewText}>
                                  <small>{project.category}</small>

                                  <strong>{project.title}</strong>

                                  <p>Premium digital experience</p>
                                </div>

                                <div className={styles.previewVisual} />
                              </div>

                              <div className={styles.previewGrid}>
                                <span />
                                <span />
                                <span />
                                <span />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}