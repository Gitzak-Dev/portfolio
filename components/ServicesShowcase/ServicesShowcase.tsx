"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ServicesShowcase.module.css";

const SERVICES = [
  {
    id: "01",
    title: "Mobile App Development That Feels Native.",
    desc: "I build clean, scalable mobile applications with smooth user experience, responsive interfaces, and reliable backend integrations.",
    tags: ["React Native", "Flutter", "Firebase", "API", "UI/UX"],
    theme: "gold",
    code: [
      "const app = createMobileExperience();",
      "app.connectAPI('/secure-endpoints');",
      "app.optimizePerformance();",
      "app.launch('iOS + Android');",
    ],
  },
  {
    id: "02",
    title: "AI Tools That Automate Real Work.",
    desc: "From AI chatbots to automation workflows, I create smart systems that help businesses save time and improve daily operations.",
    tags: ["OpenAI", "Automation", "Chatbots", "Node.js", "API"],
    theme: "green",
    code: [
      "const assistant = createAIWorkflow();",
      "assistant.readBusinessData();",
      "assistant.generateSmartReplies();",
      "assistant.automateTasks();",
    ],
  },
  {
    id: "03",
    title: "Machine Learning Models From Data to Insight.",
    desc: "I design machine learning models for prediction, classification, automation, and practical data driven decision making.",
    tags: ["Python", "ML Models", "Data", "Prediction", "Training"],
    theme: "purple",
    code: [
      "model.loadDataset('business-data.csv');",
      "model.train({ epochs: 50 });",
      "model.evaluateAccuracy();",
      "model.predictNextOutcome();",
    ],
  },
  {
    id: "04",
    title: "Frontend Interfaces That Convert Users.",
    desc: "I build modern frontend experiences with strong visual hierarchy, clean animations, and conversion focused user flows.",
    tags: ["Next.js", "React", "GSAP", "Framer Motion", "CSS"],
    theme: "blue",
    code: [
      "const page = buildLandingPage();",
      "page.addScrollAnimations();",
      "page.optimizeCoreVitals();",
      "page.convertVisitors();",
    ],
  },
] as const;

export default function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = SERVICES[activeIndex];

  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.goldGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>// What I Build</span>
          <h2>Services</h2>
        </motion.div>

        <div className={styles.contentGrid}>
          <div className={styles.servicesList} aria-label="Available services">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={service.id}
                  type="button"
                  className={`${styles.serviceItem} ${
                    isActive ? styles.activeService : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  aria-controls="service-preview-panel"
                >
                  <span className={styles.serviceNumber}>{service.id}</span>

                  <span className={styles.serviceTitle}>{service.title}</span>

                  <span className={styles.serviceArrow}>↗</span>
                </button>
              );
            })}
          </div>

          <div className={styles.previewWrap}>
            <AnimatePresence mode="wait">
              <motion.div
                id="service-preview-panel"
                key={activeService.id}
                className={`${styles.previewCard} ${
                  styles[`theme_${activeService.theme}`]
                }`}
                initial={{
                  opacity: 0,
                  x: 45,
                  scale: 0.97,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: -35,
                  scale: 0.97,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-live="polite"
              >
                <div className={styles.previewTop}>
                  <span>{activeService.id}</span>
                  <p>{activeService.title}</p>
                </div>

                <p className={styles.previewDesc}>{activeService.desc}</p>

                <div className={styles.tags}>
                  {activeService.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.mockup}>
                  <div className={styles.mockupHeader}>
                    <div className={styles.windowDots} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>

                    <p>service-builder.tsx</p>
                  </div>

                  <div className={styles.codeBody}>
                    {activeService.code.map((line, index) => (
                      <div className={styles.codeLine} key={line}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <code>{line}</code>
                      </div>
                    ))}
                  </div>

                  <div className={styles.mockupFooter}>
                    <span>Ready to launch</span>
                    <strong>↗</strong>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}