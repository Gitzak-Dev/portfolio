"use client";

import { useEffect } from "react";

export default function DisableContextMenu() {
  useEffect(() => {
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const disableDrag = (event: DragEvent) => {
      event.preventDefault();
    };

    const disableKeys = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const isDevTools =
        key === "f12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key));

      const isViewSource = event.ctrlKey && key === "u";
      const isSavePage = event.ctrlKey && key === "s";
      const isPrintPage = event.ctrlKey && key === "p";

      if (isDevTools || isViewSource || isSavePage || isPrintPage) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("dragstart", disableDrag);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("dragstart", disableDrag);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  return null;
}