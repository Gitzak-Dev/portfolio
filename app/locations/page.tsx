import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";
import { cities, states } from "@/data/locations";
import styles from "./LocationsPage.module.css";

export const metadata: Metadata = {
  title: "Software Development Across the United States | StackSpacer",
  description:
    "StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses across the United States. Explore our city service areas and state coverage.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/locations",
    siteName: "StackSpacer",
    title: "Software Development Across the United States | StackSpacer",
    description:
      "StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses across the United States.",
  },
};

const services = [
  {
    name: "Web Development",
    slug: "web-development",
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
  },
  {
    name: "AI Automation",
    slug: "ai-automation",
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
  },
];

const locationSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Locations | StackSpacer",
  description:
    "StackSpacer provides web development, mobile app development, AI automation, and machine learning services for businesses across the United States.",
  url: "https://stackspacer.com/locations",
  about: {
    "@type": "Organization",
    name: "StackSpacer",
    url: "https://stackspacer.com",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  },
};

export default function LocationsPage() {
  return (
    <main>
      <JsonLd data={locationSchema} />
      <PageBackHeader href="/" label="Home" />

      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.label}>{"// Locations"}</div>
          <h1>
            Software Development <br />
            <span>Across the United States</span>
          </h1>
          <p className={styles.heroDesc}>
            StackSpacer provides web development, mobile app development, AI
            automation, and machine learning services for businesses across the
            United States. Project communication, demonstrations, reviews, and
            delivery are coordinated online throughout the engagement.
          </p>
        </header>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Featured Cities</h2>
          <p className={styles.sectionIntro}>
            StackSpacer currently serves businesses in the following United
            States cities. Each city page describes how our services apply to
            businesses in that market.
          </p>

          <div className={styles.cityGrid}>
            {cities.map((city) => (
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
                  {city.introParagraphs[0].slice(0, 110)}...
                </p>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Explore by State</h2>
          <p className={styles.sectionIntro}>
            StackSpacer provides remote software development services to
            businesses in all 50 states. Click any state to learn how our
            services apply.
          </p>

          <div className={styles.stateGrid}>
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/locations/${state.slug}`}
                className={styles.stateCard}
              >
                <span className={styles.stateName}>{state.name}</span>
                <span className={styles.stateCode}>{state.stateCode}</span>
                <span className={styles.stateArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2>Our Services</h2>
          <p className={styles.sectionIntro}>
            Each location page links to our four core service areas. These
            national pages provide detailed information about what we build.
          </p>

          <div className={styles.serviceLinks}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.serviceLink}
              >
                <span className={styles.serviceName}>{service.name}</span>
                <span className={styles.serviceArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.divider} />

        <section className={styles.ctaSection}>
          <h2>Ready to start a project?</h2>
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
