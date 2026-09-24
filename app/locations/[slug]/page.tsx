import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
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

const insightMap: Record<string, string> = {};
for (const ins of insights) {
  insightMap[ins.slug] = ins.title;
}

const projectMap: Record<string, string> = {};
for (const proj of projects) {
  projectMap[proj.slug] = proj.title;
}

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
    title = `Software Development in ${location.cityName}, ${location.stateName}`;
    description = location.seoDescription;
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
  const isState = location.type === "state";
  const cityName = isState ? "" : location.cityName;
  const stateName = isState ? location.name : location.stateName;
  const locationLabel = isState
    ? location.stateCode
    : `${location.cityName}, ${location.stateCode}`;

  // Breadcrumb: Home > Locations > [State] > [City]
  const breadcrumbItems: { name: string; item: string }[] = [
    { name: "Home", item: baseUrl },
    { name: "Locations", item: `${baseUrl}/locations` },
  ];

  if (!isState) {
    const stateSlug = location.stateSlug;
    const stateExists = states.some((s) => s.slug === stateSlug);
    if (stateExists) {
      breadcrumbItems.push({
        name: stateName,
        item: `${baseUrl}/locations/${stateSlug}`,
      });
    }
    breadcrumbItems.push({
      name: cityName,
      item: `${baseUrl}/locations/${location.slug}`,
    });
  } else {
    breadcrumbItems.push({
      name: location.name,
      item: `${baseUrl}/locations/${location.slug}`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isState
      ? location.seoTitle
      : `Software Development in ${cityName}, ${stateName} | StackSpacer`,
    description: isState
      ? location.seoDescription
      : `StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses in ${cityName}, ${stateName}.`,
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
  if (!isState) {
    const stateExists = states.some((s) => s.slug === location.stateSlug);
    if (stateExists) {
      parentStateLink = { slug: location.stateSlug, name: stateName };
    }
  }

  // State cities derived from canonical data
  let stateCities = null;
  if (isState) {
    const matching = cities
      .filter((c) => c.stateSlug === location.slug)
      .sort((a, b) => a.cityName.localeCompare(b.cityName));
    if (matching.length > 0) {
      stateCities = matching;
    }
  }

  return (
    <main className={styles.page}>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageBackHeader href="/locations" label="Locations" />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>
            {"// "}
            {!isState
              ? `${locationLabel}`
              : location.name}
          </div>
          <h1>
            Software Development in <br />
            <span>
              {isState ? location.name : `${cityName}, ${stateName}`}
            </span>
          </h1>
          <div className={styles.locationTags}>
            <span className={styles.tag}>{stateName}</span>
            <span className={styles.tag}>United States</span>
          </div>
          {location.introParagraphs.map((para, i) => (
            <p key={i} className={styles.heroDesc}>
              {para}
            </p>
          ))}
          {parentStateLink && (
            <div className={styles.parentStateLink}>
              <Link href={`/locations/${parentStateLink.slug}`}>
                <span className={styles.exploreLabel}>EXPLORE</span>{" "}
                {parentStateLink.name} &rarr;
              </Link>
            </div>
          )}
        </header>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>
            {isState ? `About ${location.name}` : "Local Market Context"}
          </h2>
          {(isState ? location.marketContext : location.marketContext).map(
            (para, i) => (
              <p key={i} className={styles.businessContext}>
                {para}
              </p>
            )
          )}
        </section>

        <div className={styles.divider} />

        {stateCities && stateCities.length > 0 && (
          <>
            <section className={styles.section}>
              <h2>Cities in {stateName}</h2>
              <nav
                className={styles.stateCityList}
                aria-label={`Cities in ${stateName}`}
              >
                {stateCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className={styles.stateCityLink}
                  >
                    <span className={styles.stateCityName}>
                      {city.cityName}
                    </span>
                    <span
                      className={styles.stateCityArrow}
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </Link>
                ))}
              </nav>
            </section>
            <div className={styles.divider} />
          </>
        )}

        <section className={styles.section}>
          <h2>Our Services</h2>
          <p className={styles.sectionIntro}>
            StackSpacer provides four core development services for businesses in{" "}
            {isState ? stateName : cityName}. Each service page below contains
            detailed information about our approach and capabilities.
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
                <span className={styles.cardLink}>Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>
            {isState
              ? `Why Businesses in ${stateName} Work With StackSpacer`
              : "Why Businesses Work With StackSpacer"}
          </h2>
          <div className={styles.deliveryNote}>
            <p>
              StackSpacer provides all development services for businesses in{" "}
              {isState ? stateName : cityName} and across the United States.
              Project communication, demonstrations, reviews, and delivery are
              coordinated online throughout the engagement. We work as a
              developer-led extension of your team — writing clean, well
              documented code that you can review, extend, and maintain.
            </p>
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Common Questions</h2>
          <FaqAccordion
            items={location.faqs}
            ariaLabel={`Frequently asked questions about ${isState ? stateName : cityName}`}
          />
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Projects</h2>
          <div className={styles.relatedGrid}>
            {location.relatedProjects.map((projectSlug) => {
              const proj = projects.find((p) => p.slug === projectSlug);
              if (!proj) return null;
              return (
                <Link
                  key={projectSlug}
                  href={`/projects/${projectSlug}`}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedType}>PROJECT</span>
                  <span className={styles.relatedTitle}>{proj.title}</span>
                  <span className={styles.relatedArrow}>&rarr;</span>
                </Link>
              );
            })}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Related Reading</h2>
          <div className={styles.relatedGrid}>
            {location.relatedInsights.map((insightSlug) => {
              const ins = insights.find((i) => i.slug === insightSlug);
              if (!ins) return null;
              return (
                <Link
                  key={insightSlug}
                  href={`/insights/${insightSlug}`}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedType}>INSIGHT</span>
                  <span className={styles.relatedTitle}>{ins.title}</span>
                  <span className={styles.relatedArrow}>&rarr;</span>
                </Link>
              );
            })}
          </div>
        </section>

        <div className={styles.divider} />

        {parentStateLink && (
          <>
            <section className={styles.section}>
              <h2>Explore {stateName}</h2>
              <Link
                href={`/locations/${parentStateLink.slug}`}
                className={styles.stateExploreLink}
              >
                <span>{stateName} &rarr;</span>
              </Link>
            </section>
            <div className={styles.divider} />
          </>
        )}

        <section className={styles.ctaSection}>
          <h2>Start Your Project</h2>
          <p>
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
          <Link href="/#contact" className={styles.ctaButton}>
            Discuss Your Project <span>&#8599;</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
