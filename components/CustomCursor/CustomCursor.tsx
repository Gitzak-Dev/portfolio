"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isDarkCursor, setIsDarkCursor] = useState(false);

  useEffect(() => {
    let rafId: number;
    let lastX = -1;
    let lastY = -1;
    let lastIsDark = false;

    const moveCursor = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      if (x === lastX && y === lastY) return;
      lastX = x;
      lastY = y;

      rafId = requestAnimationFrame(() => {
        if (!dotRef.current || !outlineRef.current) return;

        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        const target =
          event.target instanceof Element ? event.target : null;

        const shouldBeDark = Boolean(
          target?.closest('[data-cursor="dark"]')
        );

        if (shouldBeDark !== lastIsDark) {
          lastIsDark = shouldBeDark;
          setIsDarkCursor(shouldBeDark);
        }
      });
    };

    const resetCursor = () => {
      setIsDarkCursor(false);
      lastIsDark = false;
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseleave", resetCursor, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", resetCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.cursorDot} ${
          isDarkCursor ? styles.cursorDark : ""
        }`}
      />

      <div
        ref={outlineRef}
        className={`${styles.cursorOutline} ${
          isDarkCursor ? styles.cursorOutlineDark : ""
        }`}
      />
    </>
  );
}
