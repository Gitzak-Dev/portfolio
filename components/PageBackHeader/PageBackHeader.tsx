import Link from "next/link";
import styles from "./PageBackHeader.module.css";

type PageBackHeaderProps = {
  href: string;
  label?: string;
  inline?: boolean;
};

export default function PageBackHeader({
  href,
  label = "Back",
  inline = false,
}: PageBackHeaderProps) {
  const className = inline ? styles.backInline : styles.backLink;
  const Wrapper = inline ? "div" : "header";

  return (
    <Wrapper className={inline ? styles.inlineWrap : styles.header}>
      <Link href={href} className={className}>
        <span>←</span> {label}
      </Link>
    </Wrapper>
  );
}
