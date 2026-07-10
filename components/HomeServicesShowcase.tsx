import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import DarkGradientWatermark from "@/components/ui/DarkGradientWatermark";
import TriangleIcon from "@/components/ui/TriangleIcon";
import ViewUp from "@/components/ui/ViewUp";
import type { ServiceItem } from "@/content/site-content";
import {
  getServiceHref,
  getServicesByCategory,
  getYgmFeaturedHref,
  getYgmFeaturedServices,
  serviceCategories,
  servicesSlogan,
} from "@/content/site-content";

function ServiceCard({ service, href }: { service: ServiceItem; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[20px] border border-[rgba(5,100,146,.10)] bg-white p-6 shadow-[0_6px_20px_rgba(4,56,72,.05)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[rgba(5,100,146,.30)] hover:shadow-[0_20px_44px_rgba(4,56,72,.12)] max-[900px]:p-5"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#e7f1f7] text-[#056492] transition-colors duration-200 group-hover:bg-[#056492] group-hover:text-white">
        <ServiceIcon icon={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="m-0 mt-4 text-[16.5px] leading-[1.35] font-extrabold tracking-[-.01em] text-[#0b2530]">
        {service.carouselTitle ?? service.title}
      </h3>
      <p className="m-0 mt-2 line-clamp-2 text-[13.5px] leading-[1.6] text-[#5c6b74]">
        {service.description}
      </p>
      <span className="mt-auto flex items-center gap-2 pt-4 text-[13px] font-extrabold text-[#056492]">
        İncele
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

function CategoryIntroCard({
  kicker,
  title,
  description,
  count,
  href,
}: {
  kicker: string;
  title: string;
  description: string;
  count: number;
  href: string;
}) {
  return (
    <div className="relative flex min-h-[260px] flex-col overflow-hidden rounded-[24px] bg-[linear-gradient(155deg,#043848_0%,#056492_100%)] p-8 max-[900px]:min-h-[240px] max-[900px]:p-6">
      <DarkGradientWatermark variant="card" />
      <div className="relative z-[2] flex flex-col">
        <p className="m-0 text-[11.5px] font-extrabold tracking-[.2em] text-[#7ec4e8] uppercase">
          {kicker}
        </p>
        <h3 className="m-0 mt-3.5 text-[26px] leading-[1.25] font-extrabold tracking-[-.015em] text-white">
          {title}
        </h3>
        <p className="m-0 mt-3 text-[14px] leading-[1.7] text-white/75">{description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-[11px] text-[13.5px] font-extrabold text-[#043848] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Tümünü Gör
            <TriangleIcon size={8} fill="#056492" className="rotate-90" />
          </Link>
          <span className="text-[12.5px] font-extrabold tracking-[.06em] text-white/60 uppercase">
            {count} hizmet
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomeServicesShowcase() {
  const ygmServices = getYgmFeaturedServices();
  const danismanlikServices = getServicesByCategory("danismanlik");
  const gumrukCategory = serviceCategories.find((c) => c.key === "gumruk")!;
  const danismanlikCategory = serviceCategories.find((c) => c.key === "danismanlik")!;

  return (
    <section className="relative overflow-hidden bg-[#f6fafc] py-24 max-[900px]:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[160px] right-[-200px] h-[480px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.09),transparent_70%)]" />
        <div className="absolute bottom-[-200px] left-[-180px] h-[440px] w-[580px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.08),transparent_70%)]" />
      </div>

      <div className="site-container relative z-[2]">
        {/* Bölüm başlığı — ortalanmış */}
        <ViewUp className="mx-auto mb-14 max-w-[680px] text-center max-[900px]:mb-10">
          <p className="m-0 text-[12.5px] font-extrabold tracking-[.22em] text-[#056492] uppercase">
            Hizmetlerimiz
          </p>
          <h2 className="m-0 mt-4 text-[42px] leading-[1.15] font-extrabold tracking-[-.02em] text-[#0b2530] max-[900px]:text-[30px]">
            İhtiyacınız olan denetim uzmanlığı,{" "}
            <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-transparent">
              tek çatı altında
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#4d5a63]">
            {servicesSlogan}
          </p>
        </ViewUp>

        {/* YGM Hizmetleri */}
        <ViewUp>
          <div className="grid grid-cols-[360px_1fr] gap-4 max-[1080px]:grid-cols-1">
            <CategoryIntroCard
              kicker="Tespit ve Raporlama"
              title={gumrukCategory.title}
              description={gumrukCategory.description}
              count={ygmServices.length}
              href={gumrukCategory.href}
            />
            <div className="grid grid-cols-3 gap-4 max-[1300px]:grid-cols-2 max-[600px]:grid-cols-1">
              {ygmServices.map((service) => (
                <ServiceCard key={service.slug} service={service} href={getYgmFeaturedHref(service)} />
              ))}
            </div>
          </div>
        </ViewUp>

        {/* Danışmanlık Hizmetleri */}
        <ViewUp className="mt-4">
          <div className="grid grid-cols-[1fr_360px] gap-4 max-[1080px]:grid-cols-1">
            <div className="grid grid-cols-3 gap-4 max-[1300px]:grid-cols-2 max-[600px]:grid-cols-1 max-[1080px]:order-2">
              {danismanlikServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  href={getServiceHref(danismanlikCategory.href, service.slug)}
                />
              ))}
            </div>
            <div className="max-[1080px]:order-1">
              <CategoryIntroCard
                kicker="Uzman Kadro"
                title={danismanlikCategory.title}
                description={danismanlikCategory.description}
                count={danismanlikServices.length}
                href={danismanlikCategory.href}
              />
            </div>
          </div>
        </ViewUp>
      </div>
    </section>
  );
}
