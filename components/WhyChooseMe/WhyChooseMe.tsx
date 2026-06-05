"use client";

import { motion } from "framer-motion";
import styles from "./WhyChooseMe.module.css";

const reasons = [
  {
    id: "01",
    title: "No project managers playing telephone",
    desc: "You work directly with the developer. Faster decisions, cleaner execution, and zero translation errors.",
  },
  {
    id: "02",
    title: "Obsessive attention to detail",
    desc: "If a micro-interaction, spacing, or animation feels off, it gets refined before you even notice it.",
  },
  {
    id: "03",
    title: "Speed without sacrificing quality",
    desc: "I ship fast using clean architecture, reusable components, and proven development systems.",
  },
  {
    id: "04",
    title: "Code you can actually hand off",
    desc: "Clean, documented, scalable code that your next developer can understand without a full rebuild.",
  },
  {
    id: "05",
    title: "Real-time communication",
    desc: "Clear updates, walkthroughs, and honest timelines so you always know what is happening.",
  },
];

export default function WhyChooseMe() {
  return (
    <section className={styles.whySection} id="about">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, x: -45, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>// Why work with me</span>

          <h2>
            Why Founders <br />
            Choose Me <br />
            <span>Over Agencies.</span>
          </h2>

          <p className={styles.intro}>
            Direct collaboration beats agency delays. You get the speed of a
            freelancer with the quality of a senior product-minded developer.
          </p>

          <div className={styles.badges}>
            <span>✓ 100% Direct Access</span>
            <span>✓ No Overhead Costs</span>
          </div>
        </motion.div>

        <div className={styles.rightCol}>
          {reasons.map((item, index) => (
            <motion.article
              className={styles.reasonRow}
              key={item.id}
              initial={{ opacity: 0, y: 38, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.58,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.reasonNumber}>{item.id}</span>

              <div className={styles.reasonContent}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.article>
          ))}

          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p>Ready to skip the agency fluff?</p>

            <a href="#contact" className={styles.ctaButton} data-cursor="dark">
              Book a Call <span>↗</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}