"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const HERO_SLIDE_INTERVAL_MS = 7000;
export const HERO_CARD_SLIDE_INTERVAL_MS = 5500;
export const HERO_SLIDE_FADE_MS = 1600;

type HeroFadeSliderProps = {
  slides: readonly string[];
  variant: "background" | "card";
  intervalMs?: number;
  startDelayMs?: number;
  sizes?: string;
  alt?: string;
};

export default function HeroFadeSlider({
  slides,
  variant,
  intervalMs = HERO_SLIDE_INTERVAL_MS,
  startDelayMs = 0,
  sizes = "100vw",
  alt = "",
}: HeroFadeSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, intervalMs);
    }, startDelayMs);

    return () => {
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [slides.length, intervalMs, startDelayMs]);

  if (slides.length === 0) return null;

  if (variant === "background") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {slides.map((src, i) => (
          <div
            key={`${variant}-${i}`}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: i === index ? 1 : 0,
              transitionDuration: `${HERO_SLIDE_FADE_MS}ms`,
              zIndex: i === index ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-[-4%] animate-kenburns max-[900px]:inset-0 max-[900px]:animate-none"
              style={{ animationDelay: `${i * 6}s` }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes={sizes}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {slides.map((src, i) => (
        <div
          key={`${variant}-${i}`}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${HERO_SLIDE_FADE_MS}ms`,
            zIndex: i === index ? 1 : 0,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes={sizes}
          />
        </div>
      ))}
    </>
  );
}
