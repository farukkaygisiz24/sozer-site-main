import Image from "next/image";
import type { ServiceItem } from "@/content/services";

export default function ServiceCard({ service, id }: { service: ServiceItem; id?: string }) {
  return (
    <div
      id={id ?? service.slug}
      className="group flex scroll-mt-28 flex-col overflow-hidden rounded-[18px] border border-brand-line bg-white transition-[transform,border-color,box-shadow] duration-250 hover:-translate-y-[5px] hover:border-[rgba(5,100,146,.35)] hover:shadow-[0_24px_48px_rgba(28,28,30,.1)]"
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <div className="relative h-[176px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.07]"
          sizes="(max-width: 900px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="m-0 text-[17px] leading-snug font-extrabold text-brand-ink">{service.title}</h3>
        <p className="mt-2 text-[13.8px] leading-[1.68] text-brand-muted">{service.description}</p>
      </div>
    </div>
  );
}
