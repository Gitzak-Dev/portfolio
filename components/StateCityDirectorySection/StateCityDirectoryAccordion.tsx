"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openSlug = useRef<string | null>(null);

  const getSelected = useCallback(() => {
    return groups.find((g) => g.slug === openSlug.current) || null;
  }, [groups]);

  const openDrawer = useCallback(
    (slug: string, button: HTMLButtonElement) => {
      triggerRef.current = button;
      openSlug.current = slug;
      const dialog = dialogRef.current;
      if (!dialog) return;
      dialog.showModal();
    },
    []
  );

  const closeDrawer = useCallback(() => {
    openSlug.current = null;
    triggerRef.current = null;
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [closeDrawer]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      openSlug.current = null;
      triggerRef.current?.focus();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const selected = getSelected();

  return (
    <>
      <nav className={styles.grid} aria-label="States and cities">
        {groups.map((group) => (
          <button
            key={group.slug}
            type="button"
            className={`${styles.group}${selected?.slug === group.slug ? ` ${styles.groupActive}` : ""}`}
            onClick={(e) => openDrawer(group.slug, e.currentTarget)}
            aria-expanded={selected?.slug === group.slug}
            aria-controls="state-directory-drawer"
          >
            <span className={styles.sName}>{group.name}</span>
            <span className={styles.sCode}>{group.stateCode}</span>
            <span
              className={`${styles.sArrow}${selected?.slug === group.slug ? ` ${styles.sArrowOpen}` : ""}`}
              aria-hidden="true"
            >
              →
            </span>
          </button>
        ))}
      </nav>

      <dialog
        ref={dialogRef}
        id="state-directory-drawer"
        className={styles.drawer}
        aria-label={`Cities in ${selected?.name ?? ""}`}
      >
        <div className={styles.drawerInner}>
          <div className={styles.drawerHeader}>
            <div>
              <span className={styles.drawerStateName}>
                {selected?.name ?? ""}
              </span>
              <span className={styles.drawerStateCode}>
                {selected?.stateCode ?? ""}
              </span>
            </div>
            <button
              type="button"
              className={styles.drawerClose}
              onClick={closeDrawer}
              aria-label="Close directory"
            >
              ✕
            </button>
          </div>

          {selected && (
            <>
              <Link
                href={`/locations/${selected.slug}`}
                className={styles.drawerStateLink}
                onClick={closeDrawer}
              >
                View {selected.name} →
              </Link>

              {selected.cities.length > 0 && (
                <div className={styles.drawerBody}>
                  <p className={styles.drawerSectionLabel}>Cities</p>
                  <div className={styles.cityList}>
                    {selected.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/locations/${city.slug}`}
                        className={styles.cityRow}
                        onClick={closeDrawer}
                      >
                        <span className={styles.cityName}>
                          {city.cityName}
                        </span>
                        <span className={styles.cityArrow} aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
