"use client";

import { motion } from "framer-motion";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    quote:
      "I wanted a website for my mobile app idea and the final result was better than I expected. The structure, design, and user flow were handled professionally.",
    name: "ALEX SIMON",
    role: "FOUNDER, MOBILE STARTUP",
  },
  {
    quote:
      "The AI automation system saved us hours every week. Everything was explained clearly and delivered with a clean, professional setup.",
    name: "HUDA",
    role: "OWNER, DIGITAL BUSINESS",
  },
  {
    quote:
      "Working together was smooth from start to finish. Communication was clear, the design looked premium, and the final website felt fast and reliable.",
    name: "STEVEN STEWART",
    role: "BUSINESS OWNER",
    tall: true,
  },
  {
    quote:
      "The machine learning dashboard helped us understand our data properly. The final product was clean, practical, and easy to use.",
    name: "AHMED KHALIL",
    role: "CEO, DATA PROJECT",
  },
  {
    quote:
      "Every detail I asked for was included without confusion. The portfolio, animations, and mobile responsiveness came together beautifully.",
    name: "SEBASTIAN",
    role: "OWNER, PERSONAL BRAND",
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection} id="testimonials">
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
          <span className={styles.eyebrow}>// Client Feedback</span>

          <h2>
            Loved By <span>Founders.</span>
          </h2>

          <p className={styles.headerText}>
            Trusted by businesses and founders building modern digital products.
          </p>
        </motion.div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              className={`${styles.testimonialCard} ${
                item.tall ? styles.tallCard : ""
              }`}
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.quoteIcon} aria-hidden="true">
                ”
              </div>

              <p className={styles.quoteText}>&ldquo;{item.quote}&rdquo;</p>

              <div className={styles.divider} />

              <div className={styles.author}>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}