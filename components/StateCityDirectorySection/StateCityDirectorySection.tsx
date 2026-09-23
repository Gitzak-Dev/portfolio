import Link from "next/link";
import { states, cities } from "@/data/locations";
import styles from "./StateCityDirectorySection.module.css";
import StateCityDirectoryAccordion from "./StateCityDirectoryAccordion";

type Props = {
  variant?: "home" | "locations";
};

// Derive compact navigation data on the server — no heavy content shipped to client
const buildNavGroups = () => {
  const byState = new Map<string, { slug: string; cityName: string }[]>();
  for (const city of cities) {
    const existing = byState.get(city.stateName) || [];
    existing.push({ slug: city.slug, cityName: city.cityName });
    byState.set(city.stateName, existing);
  }

  const sortedStates = [...byState.entries()].sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  return states.map((state) => {
    const stateCities = (byState.get(state.name) || []).sort((a, b) =>
      a.cityName.localeCompare(b.cityName)
    );
    return {
      slug: state.slug,
      name: state.name,
      stateCode: state.stateCode,
      cities: stateCities,
    };
  });
};

export default function StateCityDirectorySection({
  variant = "home",
}: Props) {
  const navGroups = buildNavGroups();

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

        <StateCityDirectoryAccordion groups={navGroups} />
      </div>
    </section>
  );
}
