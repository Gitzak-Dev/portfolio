"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";
import PageBackHeader from "@/components/PageBackHeader/PageBackHeader";

type BackConfig = { href: string; label: string };

const BACK_MAP: Record<string, BackConfig> = {
  "/about": { href: "/", label: "Back" },
  "/services": { href: "/", label: "Back" },
  "/services/web-development": { href: "/services", label: "Back" },
  "/services/mobile-app-development": { href: "/services", label: "Back" },
  "/services/ai-automation": { href: "/services", label: "Back" },
  "/services/machine-learning": { href: "/services", label: "Back" },
  "/projects": { href: "/", label: "Back" },
  "/insights": { href: "/", label: "Back" },
  "/locations": { href: "/", label: "Home" },
  "/privacy": { href: "/", label: "Back" },
  "/terms": { href: "/", label: "Back" },
};

function getBackConfig(pathname: string): BackConfig | null {
  const exact = BACK_MAP[pathname];
  if (exact) return exact;

  if (pathname.startsWith("/projects/")) return { href: "/#work", label: "Back" };
  if (pathname.startsWith("/insights/")) return { href: "/insights", label: "Back" };
  if (pathname.startsWith("/locations/")) return { href: "/locations", label: "Locations" };

  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const backConfig = getBackConfig(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = 0;

        const sections = ["about", "services", "work", "contact"];
        let currentSection = "";

        sections.forEach((sectionId) => {
          const section = document.getElementById(sectionId);

          if (section) {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 160 && rect.bottom >= 160) {
              currentSection = sectionId;
            }
          }
        });

        setActiveSection((prev) =>
          prev === currentSection ? prev : currentSection
        );
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    closeMenu();
  };

  const handleLogoClick = () => {
    setActiveSection("");
    closeMenu();
  };

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo} onClick={handleLogoClick}>
          Stack <span>Spacer</span>
        </Link>

        {backConfig && (
          <PageBackHeader
            href={backConfig.href}
            label={backConfig.label}
            inline
          />
        )}

        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a
            href="#work"
            onClick={() => handleNavClick("work")}
            className={activeSection === "work" ? styles.activeLink : ""}
            aria-current={activeSection === "work" ? "page" : undefined}
          >
            Portfolio
          </a>

          <Link
            href="/services"
            className={styles.navLink}
            onClick={closeMenu}
          >
            Services
          </Link>

          <Link
            href="/about"
            className={styles.navLink}
            onClick={closeMenu}
          >
            About
          </Link>

          <a
            href="#contact"
            onClick={() => handleNavClick("contact")}
            className={styles.button}
            data-cursor="dark"
          >
            Let&apos;s Talk <span>↗</span>
          </a>
        </nav>

        <button
          type="button"
          className={`${styles.menuButton} ${
            menuOpen ? styles.menuActive : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </header>

      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuTop}>
          <p>Menu</p>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation">
          <a
            href="#work"
            onClick={() => handleNavClick("work")}
            className={activeSection === "work" ? styles.mobileActiveLink : ""}
            aria-current={activeSection === "work" ? "page" : undefined}
          >
            Portfolio
          </a>

          <Link href="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>
        </nav>

        <a
          href="#contact"
          onClick={() => handleNavClick("contact")}
          className={styles.mobileButton}
          data-cursor="dark"
        >
          Let&apos;s Talk <span>↗</span>
        </a>
      </aside>
    </>
  );
}
