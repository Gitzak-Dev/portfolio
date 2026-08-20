import Link from "next/link";
import styles from "./PageBackHeader.module.css";

type PageBackHeaderProps = {
  href: string;
  label?: string;
};

export default function PageBackHeader({
  href,
  label = "Back",
}: PageBackHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href={href} className={styles.backLink}>
        <span>←</span> {label}
      </Link>
    </header>
  );
}
