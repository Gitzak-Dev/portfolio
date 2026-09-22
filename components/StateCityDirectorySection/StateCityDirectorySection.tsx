import Link from "next/link";
import { states, cities } from "@/data/locations";
import styles from "./StateCityDirectorySection.module.css";

type Props = {
  variant?: "home" | "locations";
};

export default function StateCityDirectorySection({
  variant = "home",
}: Props) {
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
    <section className={styles.directory}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>
            {variant === "home"
              ? "// LOCATIONS ACROSS THE UNITED STATES"
              : "// EXPLORE LOCATIONS"}
          </span>
          <h2>
            {variant === "home" ? (
              <>
                Serving Businesses Across <br />
                <span>the United States</span>
              </>
            ) : (
              <>
                Explore by State <br />
                <span>&amp; City</span>
              </>
            )}
          </h2>
          <p className={styles.desc}>
            {variant === "home"
              ? "Explore software development services by state and city."
              : "Browse software development services across all 50 states and supported cities."}
          </p>
        </div>

        <nav className={styles.grid} aria-label="States and cities">
          {states.map((state) => {
            const stateCities = (byState.get(state.name) || []).sort((a, b) =>
              a.cityName.localeCompare(b.cityName)
            );
            return (
              <details key={state.slug} className={styles.group}>
                <summary className={styles.summary}>
                  <span className={styles.sName}>{state.name}</span>
                  <span className={styles.sCode}>{state.stateCode}</span>
                  <span className={styles.sArrow}>&rarr;</span>
                </summary>
                <div className={styles.expandedContent}>
                  <Link
                    href={`/locations/${state.slug}`}
                    className={styles.stateNavLink}
                  >
                    View {state.name} &rarr;
                  </Link>
                  {stateCities.length > 0 && (
                    <nav
                      className={styles.cityGrid}
                      aria-label={`Cities in ${state.name}`}
                    >
                      {stateCities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/locations/${city.slug}`}
                          className={styles.cityLink}
                        >
                          {city.cityName}
                          <span className={styles.cityArrow}>&rarr;</span>
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>
              </details>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
