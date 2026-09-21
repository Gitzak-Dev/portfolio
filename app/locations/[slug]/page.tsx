import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import { getLocationBySlug, cities, states } from "@/data/locations";
import type { CityData, StateData, LocationData } from "@/data/locations";
import Link from "next/link";
import styles from "./CityPage.module.css";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...cities, ...states].map((loc) => ({ slug: loc.slug }));
}

const insightTitles: Record<string, string> = {
  "what-nextjs-production-ready": "What Makes a Next.js Application Production-Ready",
  "react-native-vs-flutter": "React Native vs Flutter: Choosing the Right Framework",
  "when-ai-automation-makes-sense": "When AI Automation Makes Sense (And When It Doesn't)",
  "rag-vs-ai-agents": "RAG vs AI Agents: Architecture Choices",
  "machine-learning-for-business": "Machine Learning for Business: From Data to Decisions",
};

const projectTitles: Record<string, string> = {
  "mobile-app-dashboard": "Mobile App Dashboard",
  "ai-automation-suite": "AI Automation Suite",
  "ml-prediction-system": "ML Prediction System",
  "developer-portfolio": "Developer Portfolio",
  "business-website-system": "Business Website System",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  let title: string;
  let description: string;

  if (location.type === "state") {
    title = location.seoTitle;
    description = location.seoDescription;
  } else {
    title = `Software Development in ${location.name} | StackSpacer`;
    description = `StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses in ${location.name}, ${location.state}.`;
  }

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

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackspacer.com";

  const locationName = location.name;
  const isState = location.type === "state";

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
        name: locationName,
        item: `${baseUrl}/locations/${location.slug}`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isState
      ? location.seoTitle
      : `Software Development in ${location.name} | StackSpacer`,
    description: isState
      ? location.seoDescription
      : `StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses in ${location.name}, ${location.state}.`,
    url: `${baseUrl}/locations/${location.slug}`,
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

  // Parent state link for city pages
  let parentStateLink = null;
  if (!isState && "state" in location) {
    const stateSlug = location.state.toLowerCase().replace(/ /g, "-");
    const stateExists = states.some((s) => s.slug === stateSlug);
    if (stateExists) {
      parentStateLink = { slug: stateSlug, name: location.state };
    }
  }

  // Current service areas for state pages
  let currentServiceAreas = null;
  if (isState) {
    const stateSlug = location.slug;
    const matchingCities = cities.filter(
      (c) => c.state.toLowerCase() === location.name.toLowerCase()
    );
    if (matchingCities.length > 0) {
      currentServiceAreas = matchingCities;
    }
  }

  const locationLabel = isState ? location.stateCode : locationName;

  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageBackHeader href="/locations" label="Locations" />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>{"// " + locationLabel}</div>
          <h1>
            Software Development in <br />
            <span>{locationName}</span>
          </h1>
          {!isState && (
            <div className={styles.cityMeta}>
              <span>
                {locationName},{" "}
                {("state" in location ? location.state : "")}
              </span>
              <span>United States</span>
            </div>
          )}
          {isState && (
            <div className={styles.cityMeta}>
              <span>{locationName}</span>
              <span>United States</span>
            </div>
          )}
          {location.introParagraphs.map((para, i) => (
            <p key={i} className={styles.heroDesc}>{para}</p>
          ))}
          {parentStateLink && (
            <div className={styles.parentStateLink}>
              <Link href={`/locations/${parentStateLink.slug}`}>
                {"← "}
                {parentStateLink.name}
              </Link>
            </div>
          )}
        </header>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Our Services</h2>
          <p className={styles.sectionIntro}>
            StackSpacer provides four core development services for businesses in{" "}
            {locationName}. Each service page below contains detailed information
            about our approach and capabilities.
          </p>

          <div className={styles.servicesGrid}>
            {location.serviceUseCases.map((svc) => (
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

        {isState && (
          <>
            <section className={styles.section}>
              <h2>About {locationName}</h2>
              {location.marketContext.map((para, i) => (
                <p key={i} className={styles.businessContext}>{para}</p>
              ))}
            </section>
            <div className={styles.divider} />
          </>
        )}

        {!isState && (
          <>
            <section className={styles.section}>
              <h2>About {locationName}</h2>
              {location.industryContext.map((para, i) => (
                <p key={i} className={styles.businessContext}>{para}</p>
              ))}
            </section>
            <div className={styles.divider} />
          </>
        )}

        {currentServiceAreas && currentServiceAreas.length > 0 && (
          <>
            <section className={styles.section}>
              <h2>Featured Cities</h2>
              <p className={styles.sectionIntro}>
                StackSpacer currently serves businesses in the following cities
                across {locationName}.
              </p>
              <div className={styles.cityGrid}>
                {currentServiceAreas.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className={styles.cityCard}
                  >
                    <div className={styles.cityName}>
                      <span>{city.name}</span>
                      <span className={styles.cityState}>{city.stateAbbrev}</span>
                    </div>
                    <p className={styles.cityPreview}>
                      {city.introParagraphs[0].slice(0, 100)}...
                    </p>
                  </Link>
                ))}
              </div>
            </section>
            <div className={styles.divider} />
          </>
        )}

        <section className={styles.section}>
          <h2>How We Work</h2>
          <div className={styles.deliveryNote}>
            <p>
              StackSpacer provides all development services for businesses in{" "}
              {locationName} and across the United States. Project communication,
              demonstrations, reviews, and delivery are coordinated online
              throughout the engagement.
            </p>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <div className={styles.faq}>
            {location.faqs.map((faq, i) => (
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
            {location.relatedInsights.map((insightSlug) => (
              <Link
                key={insightSlug}
                href={`/insights/${insightSlug}`}
                className={styles.relatedLink}
              >
                {insightTitles[insightSlug] ?? `${insightSlug} →`}
              </Link>
            ))}
            {location.relatedProjects.map((projectSlug) => (
              <Link
                key={projectSlug}
                href={`/projects/${projectSlug}`}
                className={styles.relatedLink}
              >
                {projectTitles[projectSlug] ?? `${projectSlug} →`}
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
