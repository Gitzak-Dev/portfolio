import Link from "next/link";
import { cities } from "@/data/locations";
import styles from "./CityDirectorySection.module.css";

export default function CityDirectorySection() {
  const byState = new Map<string, typeof cities>();
  for (const city of cities) {
    const existing = byState.get(city.stateName) || [];
    existing.push(city);
    byState.set(city.stateName, existing);
  }

  const sortedStates = [...byState.entries()].sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  return (
    <section className={styles.cityDirectory}>
      <div className={styles.cityDirectoryInner}>
        <div className={styles.cityDirectoryHeader}>
          <span className={styles.sectionLabel}>// Cities Across the US</span>
          <h2>
            Explore Software Development <br />
            <span>by City</span>
          </h2>
          <p className={styles.sectionDesc}>
            Find development services in your market. All 50 states covered.
          </p>
        </div>

        <div className={styles.directoryGrid}>
          {sortedStates.map(([stateName, stateCities]) => (
            <details key={stateName} className={styles.stateGroup}>
              <summary className={styles.stateSummary}>
                <span className={styles.stateSummaryName}>{stateName}</span>
                <span className={styles.stateSummaryCount}>
                  {stateCities.length}
                </span>
                <span className={styles.stateSummaryArrow}>&#9654;</span>
              </summary>
              <nav
                className={styles.stateCityLinks}
                aria-label={`Cities in ${stateName}`}
              >
                {stateCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className={styles.cityLink}
                  >
                    {city.cityName}
                  </Link>
                ))}
              </nav>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
