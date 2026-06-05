"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBullhorn, FaCode, FaBrain } from "react-icons/fa";
import styles from "./ExpertiseCards.module.css";

const cards = [
  {
    title: "Mobile Apps",
    desc: "Build smooth, scalable mobile applications with clean UI, reliable APIs, and responsive user experiences.",
    link: "Explore mobile development",
    Icon: FaCode,
    mockTitle: "App Interface",
    mockLabel: "iOS + Android",
    tags: ["React Native", "Firebase", "API"],
  },
  {
    title: "AI Automation",
    desc: "Create smart AI workflows, chatbots, and automation tools that reduce manual work and improve business speed.",
    link: "Explore AI solutions",
    Icon: FaBrain,
    mockTitle: "AI Workflow",
    mockLabel: "Smart Systems",
    tags: ["OpenAI", "Automation", "Bots"],
  },
  {
    title: "Digital Systems",
    desc: "Design and develop complete digital experiences including websites, dashboards, and conversion interfaces.",
    link: "Explore web systems",
    Icon: FaBullhorn,
    mockTitle: "Web System",
    mockLabel: "Launch Ready",
    tags: ["Next.js", "UI/UX", "Motion"],
  },
];

export default function ExpertiseCards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={styles.expertiseSection} id="capabilities">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>// Capabilities</span>

          <h2>
            What I Can <br />
            <strong>Build For You.</strong>
          </h2>
        </motion.div>

        <div className={styles.cardsGrid}>
          {cards.map((card, index) => {
            const Icon = card.Icon;
            const isActive = activeIndex === index;

            return (
              // <motion.article
              //   key={card.title}
              //   className={`${styles.card} ${
              //     isActive ? styles.activeCard : ""
              //   }`}
              <motion.article
  key={card.title}
  data-cursor={index === 1 ? "dark" : undefined}
  className={`${styles.card} ${
    isActive ? styles.activeCard : ""
  }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                initial={{ opacity: 0, y: 45, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={styles.iconBox}>
                  <Icon />
                </div>

                <div className={styles.cardContent}>
                  <h3>{card.title}</h3>

                  <p>{card.desc}</p>

                  <a href="#contact" className={styles.cardLink}>
                    {card.link}
                  </a>
                </div>

                <div className={styles.mockupWrap}>
                  <motion.div
                    className={styles.mockupCard}
                    animate={{
                      y: isActive ? -10 : 0,
                      rotate: isActive ? -1 : 0,
                      scale: isActive ? 1.025 : 1,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className={styles.mockupTop}>
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className={styles.mockupBody}>
                      <small>{card.mockLabel}</small>

                      <h4>{card.mockTitle}</h4>

                      <div className={styles.mockupTags}>
                        {card.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      <div className={styles.mockupLines}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}