import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { cities, getCityBySlug } from "@/data/locations";
import Link from "next/link";
import styles from "./CityPage.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `Software Development in ${city.name} | StackSpacer`;
  const description = `StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses in ${city.name}, ${city.state}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/locations/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `/locations/${slug}`,
      siteName: "StackSpacer",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackspacer.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${baseUrl}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `${baseUrl}/locations/${city.slug}`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Software Development in ${city.name} | StackSpacer`,
    description: `StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses in ${city.name}, ${city.state}.`,
    url: `${baseUrl}/locations/${city.slug}`,
    about: {
      "@type": "Organization",
      name: "StackSpacer",
      url: baseUrl,
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
    },
    breadcrumb: breadcrumbSchema,
  };

  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>{"// " + city.name}</div>
          <h1>
            Software Development in <br />
            <span>{city.name}</span>
          </h1>
          <div className={styles.cityMeta}>
            <span>{city.name}, {city.state}</span>
            <span>United States</span>
          </div>
          {city.introParagraphs.map((para, i) => (
            <p key={i} className={styles.heroDesc}>{para}</p>
          ))}
        </header>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Our Services</h2>
          <p className={styles.sectionIntro}>
            StackSpacer provides four core development services for businesses
            in {city.name}. Each service page below contains detailed
            information about our approach and capabilities.
          </p>

          <div className={styles.servicesGrid}>
            {city.serviceUseCases.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={styles.serviceCard}
              >
                <h3>{svc.service}</h3>
                <p>{svc.desc}</p>
                <span className={styles.cardLink}>Learn more →</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>About {city.name}</h2>
          {city.industryContext.map((para, i) => (
            <p key={i} className={styles.businessContext}>{para}</p>
          ))}
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>How We Work</h2>
          <div className={styles.deliveryNote}>
            <p>
              StackSpacer provides all development services for businesses in
              {city.name} and across the United States. Project communication,
              demonstrations, reviews, and delivery are coordinated online
              throughout the engagement.
            </p>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <div className={styles.faq}>
            {city.faqs.map((faq, i) => (
              <article key={i} className={styles.faqItem}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Reading</h2>
          <div className={styles.relatedLinks}>
            {city.relatedInsights.map((insightSlug) => (
              <Link
                key={insightSlug}
                href={`/insights/${insightSlug}`}
                className={styles.relatedLink}
              >
                {insightSlug === "what-nextjs-production-ready"
                  ? "What Makes a Next.js Application Production-Ready →"
                  : insightSlug === "react-native-vs-flutter"
                  ? "React Native vs Flutter: Choosing the Right Framework →"
                  : insightSlug === "when-ai-automation-makes-sense"
                  ? "When AI Automation Makes Sense (And When It Doesn't) →"
                  : insightSlug === "rag-vs-ai-agents"
                  ? "RAG vs AI Agents: Architecture Choices →"
                  : insightSlug === "machine-learning-for-business"
                  ? "Machine Learning for Business: From Data to Decisions →"
                  : "Insight →"}
              </Link>
            ))}
            {city.relatedProjects.map((projectSlug) => (
              <Link
                key={projectSlug}
                href={`/projects/${projectSlug}`}
                className={styles.relatedLink}
              >
                View Case Study →
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.ctaSection}>
          <h2>Start Your Project</h2>
          <p>
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>↗</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
