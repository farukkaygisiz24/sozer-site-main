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

function StatDisplay({ value }: { value: string }) {
  const numeric = Number(value);
  if (!Number.isNaN(numeric) && value.trim() !== "") {
    return (
      <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-[32px] leading-none font-extrabold tracking-[-.02em] text-transparent max-[900px]:text-[28px]">
        <CountUp value={numeric} />
      </span>
    );
  }

  const words = value.trim().split(/\s+/);
  if (words.length >= 2) {
    return (
      <span className="block bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-[22px] leading-[1.15] font-extrabold tracking-[-.01em] text-transparent max-[900px]:text-[19px]">
        <span className="block">{words[0]}</span>
        <span className="block">{words.slice(1).join(" ")}</span>
      </span>
    );
  }

  return (
    <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-[32px] leading-none font-extrabold tracking-[-.02em] text-transparent">
      {value}
    </span>
  );
}

export default function AboutStatsRow() {
  return (
    <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[18px] border border-[rgba(5,100,146,.10)] bg-white px-4 py-5 text-center shadow-[0_6px_20px_rgba(4,56,72,.05)]"
        >
          <StatDisplay value={stat.value} />
          <p className="m-0 mt-2.5 text-[12.5px] leading-[1.4] font-semibold text-[#5c6b74]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
