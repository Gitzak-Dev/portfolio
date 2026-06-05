"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isDarkCursor, setIsDarkCursor] = useState(false);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      if (!dotRef.current || !outlineRef.current) return;

      const x = event.clientX;
      const y = event.clientY;

      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      outlineRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const elementUnderCursor = document.elementFromPoint(x, y) as HTMLElement | null;

      const shouldBeDark = Boolean(
        elementUnderCursor?.closest('[data-cursor="dark"]')
      );

      setIsDarkCursor(shouldBeDark);
    };

    const resetCursor = () => {
      setIsDarkCursor(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", resetCursor);

    return () => {
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
