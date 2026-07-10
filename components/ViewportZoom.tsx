"use client";

import { useEffect } from "react";

const ZOOM_ROOT_ID = "site-zoom-root";

export default function ViewportZoom() {
  useEffect(() => {
    const apply = () => {
      const root = document.getElementById(ZOOM_ROOT_ID);
      if (!root) return;

      const w = window.innerWidth;
      const z = Math.max(1, Math.min(w / 1440, 1.5));
      root.style.zoom = z === 1 ? "" : String(z);
    };

    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      const root = document.getElementById(ZOOM_ROOT_ID);
      if (root) root.style.zoom = "";
    };
  }, []);

  return null;
}
