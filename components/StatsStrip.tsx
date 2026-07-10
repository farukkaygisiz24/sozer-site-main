"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/site-content";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || doneRef.current) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
          else doneRef.current = true;
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function StatValue({ value }: { value: string }) {
  const numeric = Number(value);
  if (!Number.isNaN(numeric) && value.trim() !== "") {
    return (
      <div className="text-[44px] leading-[1.1] font-extrabold tracking-[-.02em] text-brand-blue max-[900px]:text-[36px]">
        <CountUp value={numeric} />
      </div>
    );
  }

  const words = value.trim().split(/\s+/);
  if (words.length >= 2) {
    return (
      <div className="text-[44px] leading-[1.1] font-extrabold tracking-[-.02em] text-brand-blue max-[900px]:text-[36px]">
        <span className="block">{words[0]}</span>
        <span className="block">{words.slice(1).join(" ")}</span>
      </div>
    );
  }

  return (
    <div className="text-[44px] leading-[1.1] font-extrabold tracking-[-.02em] text-brand-blue max-[900px]:text-[36px]">
      {value}
    </div>
  );
}

function AboutStatValue({ value }: { value: string }) {
  const numeric = Number(value);
  if (!Number.isNaN(numeric) && value.trim() !== "") {
    return (
      <div className="text-[36px] leading-[1.1] font-extrabold text-brand-blue">
        <CountUp value={numeric} />
      </div>
    );
  }

  const words = value.trim().split(/\s+/);
  if (words.length >= 2) {
    return (
      <div className="text-[36px] leading-[1.1] font-extrabold text-brand-blue">
        <span className="block">{words[0]}</span>
        <span className="block text-[28px]">{words.slice(1).join(" ")}</span>
      </div>
    );
  }

  return <div className="text-[36px] leading-[1.1] font-extrabold text-brand-blue">{value}</div>;
}

type StatsStripProps = {
  variant?: "home" | "about";
};

export default function StatsStrip({ variant = "home" }: StatsStripProps) {
  if (variant === "about") {
    return (
      <div className="mb-[72px] grid grid-cols-4 rounded-[18px] border border-brand-line px-3 py-9 max-[900px]:grid-cols-2 max-[900px]:gap-y-[34px]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-5 text-center ${i > 0 ? "border-l border-brand-line max-[900px]:border-l-0" : ""}`}
          >
            <AboutStatValue value={stat.value} />
            <div className="mt-[9px] text-[13.5px] leading-[1.4] font-semibold text-brand-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[900px]:gap-y-[34px]">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-6 text-center ${i > 0 ? "border-l border-[#e9eaef] max-[900px]:border-l-0" : ""}`}
        >
          <StatValue value={stat.value} />
          <div className="mt-2.5 text-[14px] leading-[1.4] font-semibold text-brand-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
