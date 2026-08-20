import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import styles from "./AiAutomationPage.module.css";

export const metadata: Metadata = {
  title: "AI Automation | StackSpacer",
  description:
    "AI-powered automation systems, chatbots, and workflow tools that reduce manual work and improve business efficiency.",
  alternates: {
    canonical: "/services/ai-automation",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services/ai-automation",
    siteName: "StackSpacer",
    title: "AI Automation | StackSpacer",
    description:
      "AI-powered automation systems, chatbots, and workflow tools that reduce manual work and improve business efficiency.",
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "AI Automation", url: null },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Automation",
  provider: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
  },
  description:
    "AI-powered automation systems, chatbots, and workflow tools for businesses.",
  serviceType: "AI Automation",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs
    .filter((b) => b.url)
    .map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `https://stackspacer.com${b.url}`,
    })),
};

export default function AiAutomationPage() {
  return (
    <main className={styles.page}>
      <PageBackHeader href="/services" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>
            {"// AI Automation"}
          </div>
          <h1>
            AI Automation <br />
            <span>Built for Modern Businesses</span>
          </h1>
          <p className={styles.heroDesc}>
            StackSpacer builds AI-powered automation systems, chatbots, and
            workflow tools that reduce repetitive manual work and connect
            business processes more efficiently. Each system is designed to be
            practical, clean, and easy to use.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </header>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>What We Build</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>AI Chatbots</h3>
              <p>
                Intelligent chat systems that respond to user questions,
                generate useful outputs, and handle common customer
                interactions automatically.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Workflow Automation</h3>
              <p>
                Automated workflows that connect APIs, internal systems, and
                operational tools to reduce manual task handling and improve
                response speed.
              </p>
            </article>
            <article className={styles.card}>
              <h3>AI-Integrated Tools</h3>
              <p>
                Business tools and dashboards with AI capabilities embedded
                directly into the user experience for smarter decision-making.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Prompt Engineering</h3>
              <p>
                Structured prompt systems designed for consistent, reliable AI
                outputs that match your business requirements and tone.
              </p>
            </article>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Technologies</h2>
          <div className={styles.tags}>
            {["OpenAI", "Node.js", "APIs", "Automation", "Chatbots", "Prompt Engineering", "LLM Integration"].map(
              (tech) => <span key={tech}>{tech}</span>
            )}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Our Approach</h2>
          <div className={styles.steps}>
            {[
              {
                num: "01",
                title: "Workflow Audit",
                desc: "We identify repetitive tasks, manual delays, and automation opportunities in your current processes.",
              },
              {
                num: "02",
                title: "Prompt Strategy",
                desc: "We design structured prompts and reusable AI actions for consistent, useful outputs.",
              },
              {
                num: "03",
                title: "System Build",
                desc: "We connect AI logic, backend actions, and workflow triggers into a working automation system.",
              },
              {
                num: "04",
                title: "Refinement",
                desc: "We test response quality, edge cases, and real usage scenarios to ensure reliability.",
              },
            ].map((step) => (
              <article key={step.num} className={styles.step}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Projects</h2>
          <div className={styles.projectGrid}>
            <Link
              href="/projects/ai-automation-suite"
              className={styles.projectCard}
            >
              <span className={styles.projectTag}>AI Development</span>
              <h3>AI Automation Suite</h3>
              <strong>View Case Study →</strong>
            </Link>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Reading</h2>
          <div className={styles.relatedReadingLinks}>
            <a href="/insights/when-ai-automation-makes-sense" className={styles.relatedReadingLink}>
              When AI Automation Makes Sense (And When It Doesn't) →
            </a>
            <a href="/insights/rag-vs-ai-agents" className={styles.relatedReadingLink}>
              RAG vs AI Agents: Architecture Choices for Different Problems →
            </a>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <div className={styles.faq}>
            {[
              {
                q: "What types of AI automation can StackSpacer build?",
                a: "StackSpacer builds AI chatbots, workflow automation systems, prompt-driven tools, and AI-integrated dashboards. Each solution is designed around the specific tasks and processes your business handles manually.",
              },
              {
                q: "Does AI automation replace human work?",
                a: "AI automation is designed to handle repetitive tasks so your team can focus on higher-value work. It complements existing processes rather than replacing them entirely.",
              },
              {
                q: "How long does an AI automation project take?",
                a: "Timeline depends on the complexity of the workflows, number of integrations, and the scope of AI capabilities required. A simple chatbot may take a few weeks, while a complex multi-step automation system can take longer.",
              },
              {
                q: "Can AI automation connect to our existing tools?",
                a: "Yes. StackSpacer can integrate AI systems with your existing APIs, databases, and business tools through structured connectors and workflow triggers.",
              },
            ].map((item, i) => (
              <article key={i} className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.ctaSection}>
          <h2>Start Your Automation Project</h2>
          <p>
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
