"use client";

import { useEffect } from "react";

export default function ViewportZoom() {
  useEffect(() => {
    // CSS zoom shifts getBoundingClientRect vs paint, which breaks Cursor's
    // element highlight during local development.
    if (process.env.NODE_ENV === "development") {
      document.body.style.zoom = "";
      document.body.style.setProperty("--site-zoom", "1");
      return;
    }

    const apply = () => {
      const w = window.innerWidth;
      const z = Math.max(1, Math.min(w / 1440, 1.5));
      document.body.style.zoom = z === 1 ? "" : String(z);
      document.body.style.setProperty("--site-zoom", String(z));
    };

    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      document.body.style.zoom = "";
      document.body.style.removeProperty("--site-zoom");
    };
  }, []);

  return null;
}
