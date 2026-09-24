"use client";

import { useState } from "react";
import { useId } from "react";
import styles from "./FaqAccordion.module.css";

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  ariaLabel?: string;
  className?: string;
};

export default function FaqAccordion({ items, ariaLabel, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idPrefix = useId();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={`${styles.accordion}${className ? ` ${className}` : ""}`}
      role="region"
      aria-label={ariaLabel ?? "Frequently asked questions"}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const questionId = `${idPrefix}-q-${i}`;
        const answerId = `${idPrefix}-a-${i}`;

        return (
          <article
            key={i}
            className={`${styles.row}${isOpen ? ` ${styles.rowOpen}` : ""}`}
          >
            <button
              type="button"
              className={styles.question}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              id={questionId}
            >
              <span className={styles.questionText}>{item.question}</span>
              <span
                className={`${styles.icon}${isOpen ? ` ${styles.iconOpen}` : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={answerId}
              className={`${styles.answerWrap}${isOpen ? ` ${styles.answerWrapOpen}` : ""}`}
              role="region"
              aria-labelledby={questionId}
            >
              <div className={styles.answerInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
