"use client";

import { useEffect } from "react";

const ZOOM_ROOT_ID = "site-zoom-root";
const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 820;
const MOBILE_MAX_WIDTH = 900;
const MIN_ZOOM = 0.84;
const MAX_ZOOM = 1.28;
const LAPTOP_MIN_ZOOM = 1.12;

function isLaptopViewport(width: number, height: number) {
  return width > MOBILE_MAX_WIDTH && width < 1600 && height >= 760 && height < 1080;
}

function isWideShortDesktop(width: number, height: number) {
  return height <= 1080 && width >= 1600;
}

function computeZoom(width: number, height: number) {
  if (width <= MOBILE_MAX_WIDTH) return 1;

  const scaleW = width / DESIGN_WIDTH;
  const scaleH = height / DESIGN_HEIGHT;
  let zoom = Math.min(scaleW, scaleH);

  if (isLaptopViewport(width, height)) {
    zoom = Math.max(zoom, LAPTOP_MIN_ZOOM);
  }

  if (isWideShortDesktop(width, height)) {
    zoom = Math.min(zoom, 1);
  }

  zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
  return Math.round(zoom * 1000) / 1000;
}

function applyZoom(root: HTMLElement, zoom: number) {
  const supportsZoom = typeof CSS !== "undefined" && CSS.supports("zoom", "1");

  root.style.setProperty("--site-zoom", String(zoom));

  if (zoom === 1) {
    root.style.zoom = "";
    root.style.transform = "";
    root.style.width = "";
    return;
  }

  if (supportsZoom) {
    root.style.zoom = String(zoom);
    root.style.transform = "";
    root.style.width = "";
    return;
  }

  root.style.zoom = "";
  root.style.transform = `scale(${zoom})`;
  root.style.transformOrigin = "top center";
  root.style.width = `${100 / zoom}%`;
}

export default function ViewportZoom() {
  useEffect(() => {
    const apply = () => {
      const root = document.getElementById(ZOOM_ROOT_ID);
      if (!root) return;

      applyZoom(root, computeZoom(window.innerWidth, window.innerHeight));
    };

    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      const root = document.getElementById(ZOOM_ROOT_ID);
      if (root) {
        root.style.zoom = "";
        root.style.transform = "";
        root.style.width = "";
        root.style.removeProperty("--site-zoom");
      }
    };
  }, []);

  return null;
}
