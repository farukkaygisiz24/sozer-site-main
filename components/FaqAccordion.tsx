"use client";

import { useId, useState } from "react";
import TriangleIcon from "@/components/ui/TriangleIcon";
import { faq } from "@/content/site-content";

function FaqItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const contentId = useId();
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`overflow-hidden rounded-[20px] border bg-white transition-[transform,border-color,box-shadow,background-color] duration-200 ${
        open
          ? "border-[rgba(5,100,146,.30)] bg-[#f7fbfd] shadow-[0_20px_44px_rgba(4,56,72,.10)]"
          : "border-[rgba(5,100,146,.10)] shadow-[0_6px_20px_rgba(4,56,72,.05)] hover:-translate-y-0.5 hover:border-[rgba(5,100,146,.25)] hover:shadow-[0_16px_36px_rgba(4,56,72,.10)]"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-4 border-none bg-transparent px-6 py-5 text-left font-[inherit] max-[600px]:px-5 max-[600px]:py-4"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-[12px] font-extrabold tracking-[.04em] transition-colors duration-200 ${
            open ? "bg-[#056492] text-white" : "bg-[#e7f1f7] text-[#056492]"
          }`}
          aria-hidden
        >
          {number}
        </span>

        <span className="min-w-0 flex-1 text-[16px] font-extrabold leading-[1.4] tracking-[-.01em] text-[#0b2530]">
          {question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-[transform,background,border-color] duration-[350ms] ${
            open
              ? "rotate-180 border-[#056492] bg-[#056492]"
              : "border-[rgba(5,100,146,.15)] bg-white"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          aria-hidden
        >
          <TriangleIcon
            size={9}
            fill={open ? "#ffffff" : "#056492"}
            className="rotate-180"
          />
        </span>
      </button>

      <div
        id={contentId}
        className="grid transition-[grid-template-rows] duration-[400ms]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[rgba(5,100,146,.08)] px-6 pb-6 pt-1 max-[600px]:px-5">
            <p className="m-0 pl-14 text-[14.5px] leading-[1.78] text-[#3a3b42] max-[600px]:pl-0">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {faq.map((item, i) => (
        <FaqItem
          key={item.question}
          index={i}
          question={item.question}
          answer={item.answer}
          open={openIndex === i}
          onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
        />
      ))}
    </div>
  );
}
