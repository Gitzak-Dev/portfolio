"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ConsentBanner.module.css";

const STORAGE_KEY = "stackspacer_consent_v1";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setVisible(saved === null);
    } catch {
      setVisible(true);
    }

    const handleOpenPreferences = () => {
      setVisible(true);
    };

    window.addEventListener(
      "stackspacer:open-consent-preferences",
      handleOpenPreferences
    );

    return () => {
      window.removeEventListener(
        "stackspacer:open-consent-preferences",
        handleOpenPreferences
      );
    };
  }, []);

  const handleAllowAnalytics = () => {
    saveConsent(true);
  };

  const handleReject = () => {
    saveConsent(false);
  };

  const saveConsent = (analytics: boolean) => {
    const choice = { analytics };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    } catch {
      // Storage unavailable — consent will remain denied on reload
    }

    if (typeof window !== "undefined") {
      const analyticsStorage = analytics ? "granted" : "denied";
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("consent", "update", {
          analytics_storage: analyticsStorage,
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
    }

    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="alert" aria-live="polite">
      <div className={styles.content}>
        <p>
          We use analytics to understand site usage.{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.allowButton}
            onClick={handleAllowAnalytics}
          >
            Allow analytics
          </button>

          <button
            type="button"
            className={styles.rejectButton}
            onClick={handleReject}
          >
            Reject non-essential
          </button>
        </div>
      </div>
    </div>
  );
}
