import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.footerInner}>
        <p>
          © 2026 <span>Developer Portfolio.</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
}