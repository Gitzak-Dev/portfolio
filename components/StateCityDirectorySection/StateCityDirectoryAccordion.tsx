"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./StateCityDirectorySection.module.css";

type NavCity = {
  slug: string;
  cityName: string;
};

type NavState = {
  slug: string;
  name: string;
  stateCode: string;
  cities: NavCity[];
};

type Props = {
  groups: NavState[];
};

export default function StateCityDirectoryAccordion({ groups }: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <nav className={styles.grid} aria-label="States and cities">
      {groups.map((group) => {
        const isOpen = openSlug === group.slug;
        return (
          <div
            key={group.slug}
            className={`${styles.group}${isOpen ? ` ${styles.groupOpen}` : ""}`}
            data-state-slug={group.slug}
          >
            <button
              type="button"
              className={styles.summary}
              onClick={() => handleToggle(group.slug)}
              aria-expanded={isOpen}
              aria-controls={`state-panel-${group.slug}`}
            >
              <span className={styles.sName}>{group.name}</span>
              <span className={styles.sCode}>{group.stateCode}</span>
              <span
                className={`${styles.sArrow}${isOpen ? ` ${styles.sArrowOpen}` : ""}`}
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {isOpen && (
              <div
                id={`state-panel-${group.slug}`}
                className={styles.expandedPanel}
                role="region"
                aria-label={`Cities in ${group.name}`}
              >
                <Link
                  href={`/locations/${group.slug}`}
                  className={styles.stateNavLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  View {group.name} →
                </Link>
                {group.cities.length > 0 && (
                  <div className={styles.cityGrid}>
                    {group.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/locations/${city.slug}`}
                        className={styles.cityLink}
                      >
                        <span className={styles.cityName}>{city.cityName}</span>
                        <span className={styles.cityArrow} aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
