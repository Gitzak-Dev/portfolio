"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import styles from "./SnakeTextSection.module.css";

const QUOTES = [
  {
    eyebrow: "// Live Build Signal",
    title: "Next Big App",
    heading: "Products that launch.",
    paragraph:
      "Your code can shape the next big app. Let's build it together with clean systems, sharp interfaces, and motion that feels alive.",
    words: [
      "YOUR",
      "CODE",
      "CAN",
      "SHAPE",
      "THE",
      "NEXT",
      "BIG",
      "APP",
      "—",
      "LET'S",
      "BUILD",
      "IT",
      "TOGETHER",
    ],
    tags: ["Next.js", "AI APIs", "Mobile Apps", "ML Systems"],
  },
  {
    eyebrow: "// Build With Motion",
    title: "Launch Faster",
    heading: "Systems that scale.",
    paragraph:
      "Build smart digital products that move fast, feel premium, and stay scalable as your business grows.",
    words: [
      "BUILD",
      "SMART",
      "DIGITAL",
      "PRODUCTS",
      "THAT",
      "MOVE",
      "FAST",
      "AND",
      "SCALE",
      "CLEANLY",
    ],
    tags: ["React", "Motion", "APIs", "Frontend"],
  },
  {
    eyebrow: "// AI Workflow",
    title: "Smart Automation",
    heading: "Workflows that think.",
    paragraph:
      "AI can remove repetitive tasks, improve response speed, and help teams focus on growth instead of manual work.",
    words: [
      "AI",
      "CAN",
      "REMOVE",
      "REPETITIVE",
      "TASKS",
      "AND",
      "HELP",
      "TEAMS",
      "WORK",
      "SMARTER",
    ],
    tags: ["OpenAI", "Bots", "Automation", "Logic"],
  },
  {
    eyebrow: "// Mobile First",
    title: "Clean App Flow",
    heading: "Apps that feel alive.",
    paragraph:
      "Every mobile app needs a flow that feels simple, fast, responsive, and built around real user behaviour.",
    words: [
      "EVERY",
      "APP",
      "NEEDS",
      "A",
      "FLOW",
      "THAT",
      "FEELS",
      "FAST",
      "SIMPLE",
      "AND",
      "CLEAN",
    ],
    tags: ["iOS", "Android", "Firebase", "API"],
  },
  {
    eyebrow: "// Data Driven",
    title: "Insight Engine",
    heading: "Data into decisions.",
    paragraph:
      "Data becomes powerful when it turns into clear insight, better predictions, and smarter product direction.",
    words: [
      "DATA",
      "BECOMES",
      "POWERFUL",
      "WHEN",
      "IT",
      "TURNS",
      "INTO",
      "CLEAR",
      "ACTION",
    ],
    tags: ["Python", "ML", "Dashboards", "Prediction"],
  },
];

const QUOTE_CHANGE_TIME = 15000;
const TRAIL_LENGTH = 8;
const SPEED = 95;

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type LetterItem = {
  char: string;
  globalIndex: number;
};

type CellMotionCustom = {
  globalIndex: number;
  wordIndex: number;
  letterIndex: number;
  totalLetters: number;
};

const snakeBoardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: smoothEase,
      when: "beforeChildren",
      staggerChildren: 0.018,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    filter: "blur(16px)",
    transition: {
      duration: 0.35,
      ease: smoothEase,
      when: "afterChildren",
      staggerChildren: 0.012,
      staggerDirection: -1,
    },
  },
};

const letterFlyVariants: Variants = {
  hidden: (custom: CellMotionCustom) => {
    const xDirection = custom.globalIndex % 2 === 0 ? -1 : 1;
    const yDirection = custom.wordIndex % 2 === 0 ? -1 : 1;

    return {
      opacity: 0,
      x: xDirection * (180 + (custom.globalIndex % 5) * 45),
      y: yDirection * (110 + (custom.letterIndex % 4) * 28),
      rotate: xDirection * 22,
      scale: 0.45,
      filter: "blur(12px)",
    };
  },

  visible: (custom: CellMotionCustom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      delay: custom.globalIndex * 0.006,
      ease: smoothEase,
    },
  }),

  exit: (custom: CellMotionCustom) => {
    const xDirection = custom.globalIndex % 2 === 0 ? -1 : 1;
    const yDirection = custom.wordIndex % 2 === 0 ? -1 : 1;

    return {
      opacity: 0,
      x: xDirection * (260 + (custom.globalIndex % 6) * 55),
      y: yDirection * (150 + (custom.letterIndex % 5) * 38),
      rotate: xDirection * 38,
      scale: 0.35,
      filter: "blur(16px)",
      transition: {
        duration: 0.42,
        delay: (custom.totalLetters - custom.globalIndex) * 0.004,
        ease: smoothEase,
      },
    };
  },
};

const textChangeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(10px)",
    transition: {
      duration: 0.35,
      ease: smoothEase,
    },
  },
};

export default function SnakeTextSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeQuote = QUOTES[quoteIndex];

  const { wordGroups, totalLetters } = useMemo(() => {
    let globalIndex = 0;

    const groups = activeQuote.words.map((word) => {
      const letters: LetterItem[] = Array.from(word).map((char) => {
        const item = {
          char,
          globalIndex,
        };

        globalIndex += 1;

        return item;
      });

      return letters;
    });

    return {
      wordGroups: groups,
      totalLetters: globalIndex,
    };
  }, [activeQuote.words]);

  useEffect(() => {
    const quoteInterval = window.setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      setActivePathIndex(0);
      setHoveredIndex(null);
    }, QUOTE_CHANGE_TIME);

    return () => {
      window.clearInterval(quoteInterval);
    };
  }, []);

  useEffect(() => {
    if (!totalLetters) return;

    const interval = window.setInterval(() => {
      setActivePathIndex((prev) => (prev + 1) % totalLetters);
    }, SPEED);

    return () => {
      window.clearInterval(interval);
    };
  }, [totalLetters]);

  return (
    <section className={styles.signalSection} id="build-together">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.goldGlow} aria-hidden="true" />
      <div className={styles.softGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.leftContent}
          initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: smoothEase }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-content-${quoteIndex}`}
              variants={textChangeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <span className={styles.eyebrow}>{activeQuote.eyebrow}</span>

              <h1>
                Code that moves. <br />
                <strong>{activeQuote.heading}</strong>
              </h1>

              <p>{activeQuote.paragraph}</p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.actionRow}>
            <a href="#contact" className={styles.primaryBtn} data-cursor="dark">
              Start a Project <span>↗</span>
            </a>

            <a href="#work" className={styles.secondaryBtn}>
              View Work
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.signalPanel}
          initial={{ opacity: 0, x: 45, scale: 0.96, filter: "blur(14px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.12, ease: smoothEase }}
        >
          <div className={styles.panelHeader}>
            <div className={styles.windowDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <p>build-signal.tsx</p>

            <strong data-cursor="dark">LIVE</strong>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-top-${quoteIndex}`}
              variants={textChangeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.panelTop}>
                <div>
                  <small>Signal Message</small>
                  <h2>{activeQuote.title}</h2>
                </div>

                <div className={styles.statusPill}>
                  <span />
                  Running
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`snake-board-${quoteIndex}`}
              className={styles.snakeBoard}
              aria-label={activeQuote.paragraph}
              variants={snakeBoardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {wordGroups.map((word, wordIndex) => (
                <div
                  className={styles.wordGroup}
                  key={`word-${quoteIndex}-${wordIndex}`}
                >
                  {word.map((letter, letterIndex) => {
                    const distance =
                      (activePathIndex - letter.globalIndex + totalLetters) %
                      totalLetters;

                    const isHead = distance === 0;
                    const isTrail = distance > 0 && distance <= TRAIL_LENGTH;
                    const isHovering = hoveredIndex === letter.globalIndex;

                    const trailOpacity = isTrail
                      ? 1 - distance / (TRAIL_LENGTH + 2)
                      : 0;

                    return (
                      <motion.span
                        key={`${quoteIndex}-${letter.char}-${letter.globalIndex}`}
                        aria-hidden="true"
                        className={`${styles.letterCell} ${
                          isHead ? styles.headCell : ""
                        } ${isTrail ? styles.trailCell : ""} ${
                          isHovering ? styles.hoverCell : ""
                        }`}
                        style={
                          {
                            "--trail-opacity": trailOpacity,
                          } as CSSProperties
                        }
                        custom={{
                          globalIndex: letter.globalIndex,
                          wordIndex,
                          letterIndex,
                          totalLetters,
                        }}
                        variants={letterFlyVariants}
                        data-cursor={
                          isHead || isTrail || isHovering ? "dark" : undefined
                        }
                        onMouseEnter={() => setHoveredIndex(letter.globalIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        whileHover={{
                          y: -8,
                          scale: 1.13,
                          rotate: letter.globalIndex % 2 === 0 ? -3 : 3,
                          transition: {
                            duration: 0.2,
                            ease: smoothEase,
                          },
                        }}
                      >
                        {letter.char}
                      </motion.span>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className={styles.panelFooter}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`tags-${quoteIndex}`}
                className={styles.stackTags}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: smoothEase }}
              >
                {activeQuote.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className={styles.pulseLine} aria-hidden="true">
              <span />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}