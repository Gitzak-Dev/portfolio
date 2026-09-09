import styles from "./HomepageFaq.module.css";

const faqs = [
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
  return (
    <section className={styles.faqSection} id="faq" aria-label="Frequently asked questions">
      <div className={styles.bgGrid} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2>Common Questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item, i) => (
            <article key={i} className={styles.faqItem}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
