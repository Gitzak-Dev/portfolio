import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import styles from "./MobileAppPage.module.css";

export const metadata: Metadata = {
  title: "Mobile App Development Company | StackSpacer",
  description:
    "Cross-platform mobile app development for US businesses. React Native apps for iOS and Android built for speed, usability, and business outcomes.",
  alternates: {
    canonical: "/services/mobile-app-development",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/services/mobile-app-development",
    siteName: "StackSpacer",
    title: "Mobile App Development Company | StackSpacer",
    description:
      "Cross-platform mobile app development for US businesses. React Native apps for iOS and Android built for speed, usability, and business outcomes.",
  },
};

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Mobile App Development", url: null },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mobile App Development",
  provider: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
  },
  description:
    "Cross-platform mobile applications for iOS and Android using React Native, built for businesses across the United States.",
  serviceType: "Mobile App Development",
  areaServed: "United States",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What platforms does StackSpacer build for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "StackSpacer builds cross-platform apps for both iOS and Android using React Native, delivering a single codebase that runs on both platforms.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a mobile app project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timeline depends on feature complexity, design requirements, and backend integrations. A basic app may take a few weeks, while a full-featured product can take several months.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle app store submission?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. StackSpacer can guide the app through Apple App Store and Google Play Store submission processes, including required assets and metadata preparation.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with an existing backend or API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. StackSpacer can integrate with existing backend systems, REST APIs, Firebase, or any documented API endpoint.",
      },
    },
    {
      "@type": "Question",
      name: "What affects the cost of a mobile app project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project cost is shaped by feature scope, screen count, third-party integrations, authentication requirements, backend complexity, design depth, testing scope, app store submission, and ongoing maintenance needs. StackSpacer provides a project-specific estimate after discovery.",
      },
    },
  ],
};

export default function MobileAppPage() {
  return (
    <main className={styles.page}>
      <PageBackHeader href="/services" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>
            {"// Mobile App Development"}
          </div>
          <h1>
            Mobile App Development <br />
            <span>That Scales</span>
          </h1>
          <p className={styles.heroDesc}>
            StackSpacer builds clean, scalable mobile applications for iOS
            and Android using React Native. Each app is designed with smooth
            user experience, reliable backend integrations, and a structure
            that can grow as the product evolves.
          </p>
          <p className={styles.heroDesc}>
            StackSpacer provides mobile app development services for businesses
            across the United States, with project communication and delivery
            coordinated online. You work directly with the developer — not an
            account manager or a rotating team.
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
              <h3>iOS &amp; Android Apps</h3>
              <p>
                Single codebase deployed to both platforms using React Native,
                reducing development time while maintaining native-quality
                performance.
              </p>
            </article>
            <article className={styles.card}>
              <h3>UI &amp; UX Design</h3>
              <p>
                Clean interfaces with strong visual hierarchy, smooth
                interactions, and responsive layouts that feel natural on any
                device.
              </p>
            </article>
            <article className={styles.card}>
              <h3>API Integration</h3>
              <p>
                Secure connections to backend services, third-party APIs,
                authentication systems, and real-time data feeds.
              </p>
            </article>
            <article className={styles.card}>
              <h3>Scalable Architecture</h3>
              <p>
                Reusable components, modular code structure, and clean
                navigation flows built for long-term maintenance and feature
                growth.
              </p>
            </article>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Technologies</h2>
          <div className={styles.tags}>
            {["React Native", "Firebase", "REST APIs", "iOS", "Android", "TypeScript", "UI/UX"].map(
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
                title: "Discovery",
                desc: "We define the app scope, target platforms, core features, and user flows.",
              },
              {
                num: "02",
                title: "Interface Design",
                desc: "Clean mobile UI with strong spacing, readable cards, and focused actions.",
              },
              {
                num: "03",
                title: "Development",
                desc: "Reusable components, API-ready sections, and responsive app layouts.",
              },
              {
                num: "04",
                title: "Testing &amp; Launch",
                desc: "User flow testing, button states, mobile scaling, and interaction consistency.",
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
              href="/projects/mobile-app-dashboard"
              className={styles.projectCard}
            >
              <span className={styles.projectTag}>Mobile App Development</span>
              <h3>Mobile App Dashboard</h3>
              <strong>View Case Study →</strong>
            </Link>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Reading</h2>
            <Link href="/insights/react-native-vs-flutter" className={styles.relatedReadingLink}>
            React Native vs Flutter: Choosing the Right Framework for Mobile Development →
            </Link>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Cost &amp; Scope</h2>
          <p className={styles.costIntro}>
            Every mobile app project is scoped individually. The following
            factors shape timeline and investment:
          </p>
          <ul className={styles.costList}>
            <li>Feature scope and number of screens</li>
            <li>Third-party integrations and API connections</li>
            <li>Authentication and user access requirements</li>
            <li>Backend complexity and data requirements</li>
            <li>Design depth and interaction requirements</li>
            <li>Testing scope and app store submission</li>
            <li>Ongoing maintenance and support needs</li>
          </ul>
          <p className={styles.costNote}>
            Tell us what you want to build and StackSpacer can provide a
            project-specific estimate.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <FaqAccordion
            items={[
              {
                question: "What platforms does StackSpacer build for?",
                answer: "StackSpacer builds cross-platform apps for both iOS and Android using React Native, delivering a single codebase that runs on both platforms.",
              },
              {
                question: "How long does a mobile app project take?",
                answer: "Timeline depends on feature complexity, design requirements, and backend integrations. A basic app may take a few weeks, while a full-featured product can take several months.",
              },
              {
                question: "Do you handle app store submission?",
                answer: "Yes. StackSpacer can guide the app through Apple App Store and Google Play Store submission processes, including required assets and metadata preparation.",
              },
              {
                question: "Can you work with an existing backend or API?",
                answer: "Yes. StackSpacer can integrate with existing backend systems, REST APIs, Firebase, or any documented API endpoint.",
              },
            ]}
            ariaLabel="Frequently asked questions about Mobile App Development"
          />
        </section>

        <div className={styles.ctaSection}>
          <h2>Start Your Mobile App</h2>
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
