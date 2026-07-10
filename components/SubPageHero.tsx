import Image from "next/image";
import Link from "next/link";
import TriangleIcon from "@/components/ui/TriangleIcon";
import type { ReactNode } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SubPageHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  titleClassName?: string;
};

export default function SubPageHero({
  breadcrumbs,
  title,
  subtitle,
  titleClassName = "",
}: SubPageHeroProps) {
  return (
    <section className="relative z-0 -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(180deg,#e9f3f8_0%,#f7fbfd_58%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[140px] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.11),transparent_70%)]" />
        <div className="absolute top-[30px] right-[5%] h-[220px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.08),transparent_70%)] max-[900px]:hidden" />
        <span className="absolute top-[50px] right-[8%] block rotate-[10deg] max-[900px]:hidden">
          <Image
            src="/images/onlylogo-watermark.png"
            alt=""
            width={72}
            height={63}
            className="h-[63px] w-auto opacity-[.07]"
          />
        </span>
      </div>

      <div className="site-container relative z-[1] pt-[calc(var(--header-height)+48px)] pb-12 max-[900px]:pb-10">
        <nav
          className="mb-4 flex flex-wrap items-center gap-1.5 animate-rise-in"
          style={{ animationDelay: "0.05s" }}
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((item, i) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              {i > 0 ? (
                <TriangleIcon size={6} fill="#056492" className="rotate-90 opacity-35" />
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[12.5px] font-bold text-[#056492] no-underline transition-colors hover:text-[#043848]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[12.5px] font-extrabold text-[#0b2530]">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1
          className={`m-0 max-w-[820px] text-[40px] leading-[1.12] font-extrabold tracking-[-.02em] text-[#0b2530] max-[900px]:text-[32px] animate-rise-in ${titleClassName}`}
          style={{ animationDelay: "0.12s" }}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-[#4d5a63] animate-rise-in"
            style={{ animationDelay: "0.2s" }}
          >
            {subtitle}
          </p>
        ) : null}

        <div
          className="mt-8 h-[3px] w-14 rounded-full bg-[linear-gradient(90deg,#056492,#2b8ec2)] opacity-70 animate-rise-in max-[900px]:mt-6"
          style={{ animationDelay: "0.28s" }}
          aria-hidden
        />
      </div>
    </section>
  );
}

export function SubPageContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`site-container ${className}`}>{children}</div>;
}
