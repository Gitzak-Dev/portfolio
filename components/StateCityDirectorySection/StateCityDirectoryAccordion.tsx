"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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

export default function StateCityDirectoryDrawer({ groups }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const previousBodyOverflow = useRef<string | null>(null);
  const triggerRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const selected =
    groups.find((g) => g.slug === selectedSlug) ?? null;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const openDrawer = useCallback(
    (slug: string, btn: HTMLButtonElement) => {
      triggerRef.current.set(slug, btn);
      setSelectedSlug(slug);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    if (previousBodyOverflow.current !== null) {
      document.body.style.overflow = previousBodyOverflow.current;
      previousBodyOverflow.current = null;
    }
    const slug = selectedSlug;
    setSelectedSlug(null);
    const btn = triggerRef.current.get(slug ?? "") ?? null;
    if (btn) {
      btn.focus();
    }
  }, [selectedSlug]);

  useEffect(() => {
    if (!mounted || !selectedSlug) return;

    previousBodyOverflow.current = document.body.style.overflow ?? "";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (selectedSlug === null && previousBodyOverflow.current !== null) {
        document.body.style.overflow = previousBodyOverflow.current;
        previousBodyOverflow.current = null;
      }
    };
  }, [mounted, selectedSlug, closeDrawer]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).classList.contains(styles.drawerOverlay)) {
        closeDrawer();
      }
    },
    [closeDrawer]
  );

  const handleLinkNavigate = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return (
    <>
      <nav className={styles.grid} aria-label="States and cities">
        {groups.map((group) => (
          <button
            key={group.slug}
            type="button"
            ref={(el) => {
              if (el) {
                triggerRef.current.set(group.slug, el);
              } else {
                triggerRef.current.delete(group.slug);
              }
            }}
            className={`${styles.group}${selectedSlug === group.slug ? ` ${styles.groupActive}` : ""}`}
            onClick={(e) =>
              openDrawer(group.slug, e.currentTarget as HTMLButtonElement)
            }
            aria-expanded={selectedSlug === group.slug}
            aria-controls="state-location-drawer"
          >
            <span className={styles.sName}>{group.name}</span>
            <span className={styles.sCode}>{group.stateCode}</span>
            <span
              className={`${styles.sArrow}${selectedSlug === group.slug ? ` ${styles.sArrowOpen}` : ""}`}
              aria-hidden="true"
            >
              →
            </span>
          </button>
        ))}
      </nav>

      {mounted && selectedSlug && selected &&
        createPortal(
          <>
            <div
              className={styles.drawerOverlay}
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
            <div
              id="state-location-drawer"
              className={styles.drawerPanel}
              role="dialog"
              aria-modal="true"
              aria-labelledby="state-location-drawer-title"
            >
              <div className={styles.drawerInner}>
                <div className={styles.drawerHeader}>
                  <div>
                    <h2 id="state-location-drawer-title">
                      {selected.name}
                    </h2>
                    <span className={styles.drawerStateCode}>
                      {selected.stateCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.drawerClose}
                    onClick={closeDrawer}
                    aria-label="Close locations drawer"
                  >
                    ×
                  </button>
                </div>

                <Link
                  href={`/locations/${selected.slug}`}
                  className={styles.drawerStateLink}
                  onClick={handleLinkNavigate}
                >
                  View {selected.name} →
                </Link>

                {selected.cities.length > 0 && (
                  <div className={styles.drawerBody}>
                    <p className={styles.drawerSectionLabel}>Cities</p>
                    <nav
                      className={styles.cityList}
                      aria-label={`Cities in ${selected.name}`}
                    >
                      {selected.cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/locations/${city.slug}`}
                          className={styles.cityRow}
                          onClick={handleLinkNavigate}
                        >
                          <span className={styles.cityName}>
                            {city.cityName}
                          </span>
                          <span
                            className={styles.cityArrow}
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
