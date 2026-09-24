"use client";

import { useState } from "react";
import styles from "./HomepageFaq.module.css";

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "What does StackSpacer do?",
    a: "StackSpacer builds custom mobile applications, AI automation systems, machine learning solutions, and modern web applications for startups and businesses across the United States.",
  },
  {
    q: "What services does StackSpacer offer?",
    a: "We offer mobile app development, AI automation, machine learning, and web development. Each service is tailored to the specific goals and requirements of the project.",
  },
  {
    q: "Does StackSpacer work with startups?",
    a: "Yes. We work with startups and established businesses, building custom software solutions based on each project's requirements.",
  },
  {
    q: "Where does StackSpacer operate?",
    a: "We serve clients across the United States.",
  },
  {
    q: "How can I contact StackSpacer?",
    a: "You can reach StackSpacer through the contact form on this page or by email at hanidev@gmail.com.",
  },
];

export default function HomepageFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className={styles.faqSection}
      id="faq"
      aria-label="Frequently asked questions"
    >
      <div className={styles.bgGrid} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>// FAQ</span>
          <h2>Common Questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <article
                key={i}
                className={`${styles.faqItem}${isOpen ? ` ${styles.faqItemOpen}` : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className={styles.faqQuestionText}>{item.q}</span>
                  <span
                    className={`${styles.faqIcon}${isOpen ? ` ${styles.faqIconOpen}` : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`${styles.faqAnswerWrap}${isOpen ? ` ${styles.faqAnswerWrapOpen}` : ""}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                >
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
