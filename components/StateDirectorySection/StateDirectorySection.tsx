import Link from "next/link";
import { states } from "@/data/locations";
import styles from "./StateDirectorySection.module.css";

export default function StateDirectorySection() {
  return (
    <section className={styles.stateDirectory}>
      <div className={styles.stateDirectoryInner}>
        <div className={styles.stateDirectoryHeader}>
          <span className={styles.sectionLabel}>// All 50 States</span>
          <h2>
            Serving Businesses Across <br />
            <span>the United States</span>
          </h2>
          <p className={styles.sectionDesc}>
            Explore software development services by state.
          </p>
        </div>

        <nav className={styles.stateGrid} aria-label="States">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/locations/${state.slug}`}
              className={styles.stateLink}
            >
              <span className={styles.stateName}>{state.name}</span>
              <span className={styles.stateCode}>{state.stateCode}</span>
              <span className={styles.stateArrow}>→</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
