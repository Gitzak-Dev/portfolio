"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  type Variants,
} from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaAndroid,
  FaApple,
  FaBrain,
  FaChartLine,
  FaCloud,
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaMicrochip,
  FaMobileAlt,
  FaNetworkWired,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRobot,
  FaServer,
} from "react-icons/fa";

import styles from "./HeroScroll.module.css";

type StatItem = {
  value: string;
  label: string;
};

type FloatingIconItem = {
  Icon: IconType;
  label: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
};

type HeadlinePart = {
  text: string;
  tone: "white" | "accent";
};

type HeadlineLine = HeadlinePart[];

type HeroItem = {
  id: number;
  badge: string;
  desc: string;
  image: string;
  headline: HeadlineLine[];
  stats: StatItem[];
  icons: FloatingIconItem[];
};

const HERO_DATA: HeroItem[] = [
  {
    id: 1,
    badge: "MOBILE APP DEVELOPMENT",
    desc: "Clean, scalable mobile apps with smooth UI.\nBuilt for speed, responsiveness, and real users.",
    image: "/character (1).png",
    headline: [
      [
        { text: "Mobile ", tone: "white" },
        { text: "Application", tone: "white" },
      ],
      [
        { text: "Developer ", tone: "accent" },
        { text: "building", tone: "white" },
      ],
      [
        { text: "clean ", tone: "white" },
        { text: "apps.", tone: "white" },
      ],
    ],
    stats: [
      { value: "$35+", label: "Hourly Rate" },
      { value: "30+", label: "Apps Built" },
      { value: "Cross", label: "Platform" },
      { value: "24h", label: "Response" },
    ],
    icons: [
      {
        Icon: FaMobileAlt,
        label: "Mobile",
        x: "6%",
        y: "30%",
        delay: 0,
        duration: 4,
      },
      {
        Icon: FaCode,
        label: "Code",
        x: "1%",
        y: "50%",
        delay: 0.2,
        duration: 5,
      },
      {
        Icon: FaAndroid,
        label: "Android",
        x: "5%",
        y: "74%",
        delay: 0.3,
        duration: 4.4,
      },
      {
        Icon: FaServer,
        label: "API",
        x: "58%",
        y: "7%",
        delay: 0.6,
        duration: 5.2,
      },
      {
        Icon: FaApple,
        label: "iOS",
        x: "76%",
        y: "24%",
        delay: 0.8,
        duration: 4.6,
      },
      {
        Icon: FaDatabase,
        label: "Data",
        x: "88%",
        y: "45%",
        delay: 1,
        duration: 5.3,
      },
      {
        Icon: FaReact,
        label: "React",
        x: "79%",
        y: "77%",
        delay: 1.2,
        duration: 4.7,
      },
      {
        Icon: FaCloud,
        label: "Cloud",
        x: "26%",
        y: "5%",
        delay: 1.4,
        duration: 5.1,
      },
      {
        Icon: FaNodeJs,
        label: "Backend",
        x: "40%",
        y: "90%",
        delay: 1.2,
        duration: 4.4,
      },
    ],
  },
  {
    id: 2,
    badge: "AI DEVELOPMENT",
    desc: "AI tools, chatbots, and workflows that save time.\nSmart automation systems built for modern teams.",
    image: "/character (2).png",
    headline: [
      [
        { text: "AI ", tone: "white" },
        { text: "Developer", tone: "white" },
      ],
      [
        { text: "creating ", tone: "accent" },
        { text: "smart", tone: "accent" },
      ],
      [
        { text: "automation ", tone: "white" },
        { text: "systems.", tone: "white" },
      ],
    ],
    stats: [
      { value: "$45+", label: "Hourly Rate" },
      { value: "20+", label: "AI Builds" },
      { value: "10+", label: "Integrations" },
      { value: "Fast", label: "Delivery" },
    ],
    icons: [
      {
        Icon: FaRobot,
        label: "Bots",
        x: "11%",
        y: "27%",
        delay: 0,
        duration: 4.8,
      },
      {
        Icon: FaCloud,
        label: "API",
        x: "8%",
        y: "50%",
        delay: 0.2,
        duration: 5,
      },
      {
        Icon: FaCode,
        label: "Prompt",
        x: "14%",
        y: "74%",
        delay: 0.4,
        duration: 4.5,
      },
      {
        Icon: FaNetworkWired,
        label: "Flow",
        x: "50%",
        y: "91%",
        delay: 0.6,
        duration: 5.2,
      },
      {
        Icon: FaBrain,
        label: "AI",
        x: "69%",
        y: "22%",
        delay: 0.8,
        duration: 4.6,
      },
      {
        Icon: FaMicrochip,
        label: "Logic",
        x: "88%",
        y: "52%",
        delay: 1,
        duration: 5.4,
      },
      {
        Icon: FaNodeJs,
        label: "Backend",
        x: "79%",
        y: "77%",
        delay: 1.2,
        duration: 4.4,
      },
      {
        Icon: FaDatabase,
        label: "Data",
        x: "40%",
        y: "5%",
        delay: 1.4,
        duration: 5.1,
      },
    ],
  },
  {
    id: 3,
    badge: "MACHINE LEARNING",
    desc: "Machine learning models for predictions and decisions.\nTurning raw data into practical business insight.",
    image: "/character (3).png",
    headline: [
      [
        { text: "Machine ", tone: "white" },
        { text: "Learning", tone: "white" },
      ],
      [
        { text: "Developer ", tone: "accent" },
        { text: "turning", tone: "white" },
      ],
      [
        { text: "data ", tone: "white" },
        { text: "insight.", tone: "white" },
      ],
    ],
    stats: [
      { value: "$50+", label: "Hourly Rate" },
      { value: "15+", label: "ML Models" },
      { value: "Python", label: "Core Stack" },
      { value: "Data", label: "Driven" },
    ],
    icons: [
      {
        Icon: FaPython,
        label: "Python",
        x: "12%",
        y: "24%",
        delay: 0,
        duration: 4.6,
      },
      {
        Icon: FaLaptopCode,
        label: "Notebook",
        x: "9%",
        y: "52%",
        delay: 0.2,
        duration: 5.2,
      },
      {
        Icon: FaDatabase,
        label: "Dataset",
        x: "20%",
        y: "81%",
        delay: 0.4,
        duration: 4.8,
      },
      {
        Icon: FaNetworkWired,
        label: "Neural",
        x: "40%",
        y: "5%",
        delay: 0.6,
        duration: 5.4,
      },
      {
        Icon: FaBrain,
        label: "Model",
        x: "73%",
        y: "24%",
        delay: 0.8,
        duration: 4.5,
      },
      {
        Icon: FaChartLine,
        label: "Predict",
        x: "88%",
        y: "51%",
        delay: 1,
        duration: 5,
      },
      {
        Icon: FaServer,
        label: "Deploy",
        x: "82%",
        y: "79%",
        delay: 1.2,
        duration: 4.7,
      },
      {
        Icon: FaMicrochip,
        label: "Training",
        x: "50%",
        y: "92%",
        delay: 1.4,
        duration: 5.3,
      },
    ],
  },
];

const fadeUpVariants: Variants = {
  hidden: {
    y: 24,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      delay: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function TypedHeadline({
  lines,
  visibleCount,
}: {
  lines: HeadlineLine[];
  visibleCount: number;
}) {
  let globalCharIndex = 0;

  return (
    <h1 className={styles.typedHeading}>
      {lines.map((line, lineIndex) => (
        <span className={styles.typedLine} key={`line-${lineIndex}`}>
          {line.map((part, partIndex) => (
            <span
              key={`part-${lineIndex}-${partIndex}`}
              className={
                part.tone === "accent"
                  ? styles.typedAccent
                  : styles.typedWhite
              }
            >
              {Array.from(part.text).map((char, charIndex) => {
                const currentCharIndex = globalCharIndex++;

                const isVisible = currentCharIndex < visibleCount;
                const isNext =
                  currentCharIndex >= visibleCount &&
                  currentCharIndex < visibleCount + 7;

                return (
                  <span
                    key={`${lineIndex}-${partIndex}-${charIndex}`}
                    className={`${styles.typedChar} ${
                      isVisible
                        ? styles.charVisible
                        : isNext
                        ? styles.charNext
                        : styles.charHidden
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </span>
          ))}
        </span>
      ))}     
    </h1>
  );
}

export default function HeroScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) {
        setActiveIndex(0);
      } else if (latest < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    });
  }, [scrollYProgress]);

  const activeItem = HERO_DATA[activeIndex];

  const totalHeadlineChars = activeItem.headline.reduce((lineTotal, line) => {
    return (
      lineTotal +
      line.reduce((partTotal, part) => partTotal + part.text.length, 0)
    );
  }, 0);

  useEffect(() => {
    setVisibleCount(0);

    const interval = window.setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= totalHeadlineChars) {
          window.clearInterval(interval);
          return totalHeadlineChars;
        }

        return Math.min(prev + 2, totalHeadlineChars);
      });
    }, 22);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeItem.id, totalHeadlineChars]);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={styles.stickyWrap}>
        <div className={styles.inner}>
          <div className={styles.imageCol}>
            <div className={styles.characterWrap}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`icons-${activeItem.id}`}
                  className={styles.iconLayer}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {activeItem.icons.map((item) => {
                    const Icon = item.Icon;

                    return (
                      <motion.div
                        key={item.label}
                        className={styles.floatingIcon}
                        style={{
                          left: item.x,
                          top: item.y,
                        }}
                        animate={{
                          y: [0, -8, 0],
                          x: [0, 4, 0],
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: item.duration,
                          delay: item.delay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.badge}
                  className={styles.characterImage}
                  initial={{ opacity: 0, scale: 0.85, y: 60, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -50, rotate: 4 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </AnimatePresence>

              <div className={styles.glow} />
            </div>
          </div>

          <div className={styles.contentCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeItem.id}`}
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -45 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.span
                  className={styles.badge}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {activeItem.badge}
                </motion.span>

                <TypedHeadline
                  lines={activeItem.headline}
                  visibleCount={visibleCount}
                />

                <motion.p
                  className={styles.description}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {activeItem.desc}
                </motion.p>

                <div className={styles.statsGrid}>
                  {activeItem.stats.map((stat, index) => (
                    <motion.div
                      className={styles.statCard}
                      key={stat.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.08 * index,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.actions}>
                  <a href="#work" className={styles.primaryBtn} data-cursor="dark">
                    View Work
                  </a>

                  <a href="#services" className={styles.secondaryBtn}>
                    Explore Services
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={styles.counter}>
              <span>0{activeItem.id}</span>

              <div>
                {HERO_DATA.map((item, index) => (
                  <span
                    key={item.id}
                    className={
                      index === activeIndex ? styles.activeDot : styles.dot
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}