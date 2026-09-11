import styles from "./AnswerBlock.module.css";

export default function AnswerBlock() {
  return (
    <section className={styles.answerSection} aria-label="What StackSpacer does">
      <div className={styles.container}>
        <div className={styles.goldDivider} />
        <h2 className={styles.heading}>What StackSpacer builds</h2>
        <p className={styles.answer}>
          <strong>StackSpacer</strong> is a developer-led software studio building
          custom mobile applications, AI
          automation systems, machine learning solutions, and modern web
          applications for businesses across the United States.
        </p>
        <ul className={styles.serviceList}>
          <li>Web applications</li>
          <li>Mobile applications</li>
          <li>AI automation</li>
          <li>Machine-learning systems</li>
        </ul>
      </div>
    </section>
  );
}
