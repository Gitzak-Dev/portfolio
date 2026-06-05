// "use client";

// import { useEffect, useState } from "react";
// import styles from "./Navbar.module.css";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeSection, setActiveSection] = useState("");

//   useEffect(() => {
//   const handleScroll = () => {
//     setScrolled(window.scrollY > 40);

//     const sections = ["about", "services", "work", "contact"];
//     let currentSection = "";

//     sections.forEach((sectionId) => {
//       const section = document.getElementById(sectionId);

//       if (section) {
//         const rect = section.getBoundingClientRect();

//         if (rect.top <= 160 && rect.bottom >= 160) {
//           currentSection = sectionId;
//         }
//       }
//     });

//     setActiveSection(currentSection);
//   };

//   window.addEventListener("scroll", handleScroll);
//   handleScroll();

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   const handleNavClick = (sectionId: string) => {
//     setActiveSection(sectionId);
//     closeMenu();
//   };

//   return (
//     <>
//       <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
//         <a href="#" className={styles.logo} onClick={closeMenu}>
//           Developer <span>Portfolio</span>
//         </a>

//         <nav className={styles.navLinks}>
//           <a
//             href="#work"
//             onClick={() => handleNavClick("work")}
//             className={activeSection === "work" ? styles.activeLink : ""}
//           >
//             Portfolio
//           </a>

//           <a
//             href="#services"
//             onClick={() => handleNavClick("services")}
//             className={activeSection === "services" ? styles.activeLink : ""}
//           >
//             Services
//           </a>

//           <a
//             href="#about"
//             onClick={() => handleNavClick("about")}
//             className={activeSection === "about" ? styles.activeLink : ""}
//           >
//             About
//           </a>

//           <a
//             href="#contact"
//             onClick={() => handleNavClick("contact")}
//             className={styles.button}
//             data-cursor="dark"
//           >
//             Let&apos;s Talk <span>↗</span>
//           </a>
//         </nav>

//         <button
//           type="button"
//           className={`${styles.menuButton} ${
//             menuOpen ? styles.menuActive : ""
//           }`}
//           onClick={() => setMenuOpen((prev) => !prev)}
//           aria-label="Toggle navigation menu"
//           aria-expanded={menuOpen}
//         >
//           <span />
//           <span />
//         </button>
//       </header>

//       <div
//         className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ""}`}
//         onClick={closeMenu}
//       />

//       <aside
//         className={`${styles.mobileMenu} ${
//           menuOpen ? styles.mobileMenuOpen : ""
//         }`}
//       >
//         <div className={styles.mobileMenuTop}>
//           <p>Menu</p>

//           <button
//             type="button"
//             className={styles.closeButton}
//             onClick={closeMenu}
//             aria-label="Close menu"
//           >
//             ×
//           </button>
//         </div>

//         <nav className={styles.mobileNavLinks}>
//           <a
//             href="#work"
//             onClick={() => handleNavClick("work")}
//             className={activeSection === "work" ? styles.mobileActiveLink : ""}
//           >
//             Portfolio
//           </a>

//           <a
//             href="#services"
//             onClick={() => handleNavClick("services")}
//             className={
//               activeSection === "services" ? styles.mobileActiveLink : ""
//             }
//           >
//             Services
//           </a>

//           <a
//             href="#about"
//             onClick={() => handleNavClick("about")}
//             className={activeSection === "about" ? styles.mobileActiveLink : ""}
//           >
//             About
//           </a>
//         </nav>

//         <a
//           href="#contact"
//           onClick={() => handleNavClick("contact")}
//           className={styles.mobileButton}
//         >
//           Let&apos;s Talk <span>↗</span>
//         </a>
//       </aside>
//     </>
//   );
// }
// 


"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
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
        <a href="#" className={styles.logo} onClick={handleLogoClick}>
          Developer <span>Portfolio</span>
        </a>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a
            href="#work"
            onClick={() => handleNavClick("work")}
            className={activeSection === "work" ? styles.activeLink : ""}
            aria-current={activeSection === "work" ? "page" : undefined}
          >
            Portfolio
          </a>

          <a
            href="#services"
            onClick={() => handleNavClick("services")}
            className={activeSection === "services" ? styles.activeLink : ""}
            aria-current={activeSection === "services" ? "page" : undefined}
          >
            Services
          </a>

          <a
            href="#about"
            onClick={() => handleNavClick("about")}
            className={activeSection === "about" ? styles.activeLink : ""}
            aria-current={activeSection === "about" ? "page" : undefined}
          >
            About
          </a>

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

          <a
            href="#services"
            onClick={() => handleNavClick("services")}
            className={
              activeSection === "services" ? styles.mobileActiveLink : ""
            }
            aria-current={activeSection === "services" ? "page" : undefined}
          >
            Services
          </a>

          <a
            href="#about"
            onClick={() => handleNavClick("about")}
            className={activeSection === "about" ? styles.mobileActiveLink : ""}
            aria-current={activeSection === "about" ? "page" : undefined}
          >
            About
          </a>
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