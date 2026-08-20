import Link from "next/link";
import ConsentPreferencesButton from "@/components/ConsentPreferencesButton/ConsentPreferencesButton";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.footerInner}>
        <div className={styles.left}>
          <p className={styles.copyright}>
            © 2026 <span>StackSpacer.</span> All rights reserved.
          </p>
        </div>

        <span className={styles.separator} aria-hidden="true" />

        <nav className={styles.footerLinks} aria-label="Navigation">
          <Link href="/services">Services</Link>

          <span className={styles.linkDivider} aria-hidden="true">
            /
          </span>

          <Link href="/projects">Projects</Link>

          <span className={styles.linkDivider} aria-hidden="true">
            /
          </span>

          <Link href="/about">About</Link>

          <span className={styles.linkDivider} aria-hidden="true">
            /
          </span>

          <Link href="/privacy">Privacy Policy</Link>

          <span className={styles.linkDivider} aria-hidden="true">
            /
          </span>

          <Link href="/terms">Terms &amp; Conditions</Link>

          <span className={styles.linkDivider} aria-hidden="true">
            /
          </span>

          <ConsentPreferencesButton className={styles.prefLink} />
        </nav>
      </div>
    </footer>
  );
}
