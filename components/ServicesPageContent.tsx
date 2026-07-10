import Image from "next/image";
import Link from "next/link";
import TriangleIcon from "@/components/ui/TriangleIcon";
import ViewUp from "@/components/ui/ViewUp";
import type { NavMegaGroup, ServiceCategory } from "@/content/site-content";

function CategoryLinkCard({
  category,
  count,
  kicker,
}: {
  category: ServiceCategory;
  count: number;
  kicker: string;
}) {
  return (
    <Link
      href={category.href}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[24px] bg-[linear-gradient(155deg,#043848_0%,#056492_100%)] p-8 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(4,56,72,.22)] max-[900px]:min-h-0 max-[900px]:p-6"
    >
      <span className="pointer-events-none absolute -right-8 -bottom-10 opacity-[.12]" aria-hidden>
        <Image
          src="/images/brand/sozer-mark.png"
          alt=""
          width={200}
          height={175}
          className="h-[175px] w-auto"
        />
      </span>

      <div className="relative z-[2] flex flex-1 flex-col">
        <p className="m-0 text-[11.5px] font-extrabold tracking-[.2em] text-[#7ec4e8] uppercase">
          {kicker}
        </p>
        <h2 className="m-0 mt-3.5 text-[26px] leading-[1.25] font-extrabold tracking-[-.015em] text-white max-[900px]:text-[22px]">
          {category.title}
        </h2>
        <p className="m-0 mt-3 flex-1 text-[14px] leading-[1.7] text-white/75">{category.description}</p>

        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-[11px] text-[13.5px] font-extrabold text-[#043848] transition-transform duration-200 group-hover:-translate-y-0.5">
            Detayları İncele
            <TriangleIcon size={8} fill="#056492" className="rotate-90" />
          </span>
          <span className="text-[12.5px] font-extrabold tracking-[.06em] text-white/60 uppercase">
            {count} hizmet
          </span>
        </div>
      </div>
    </Link>
  );
}

function ServiceGroupPanel({ group }: { group: NavMegaGroup }) {
  return (
    <div className="rounded-[20px] border border-[rgba(5,100,146,.10)] bg-white p-6 shadow-[0_6px_20px_rgba(4,56,72,.05)] max-[900px]:p-5">
      <Link
        href={group.href}
        className="group/title inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[.14em] text-[#056492] uppercase no-underline transition-colors hover:text-[#043848]"
      >
        <TriangleIcon size={9} fill="#056492" />
        {group.title}
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        {group.links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-semibold text-[#3a3b42] no-underline transition-[background,color] duration-200 hover:bg-[#f2f8fb] hover:text-[#056492]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#e7f1f7] text-[10px] font-extrabold text-[#056492] transition-colors duration-200 group-hover:bg-[#056492] group-hover:text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="leading-[1.45]">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

type ServicesPageContentProps = {
  categories: {
    category: ServiceCategory;
    count: number;
    kicker: string;
  }[];
  navGroups: NavMegaGroup[];
  totalServices: number;
};

export default function ServicesPageContent({
  categories,
  navGroups,
  totalServices,
}: ServicesPageContentProps) {
  return (
    <section className="relative overflow-hidden bg-[#f6fafc] py-16 pb-20 max-[900px]:py-12 max-[900px]:pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[120px] right-[-160px] h-[400px] w-[540px] rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.09),transparent_70%)]" />
        <div className="absolute bottom-[-140px] left-[-120px] h-[360px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.08),transparent_70%)]" />
      </div>

      <div className="site-container relative z-[2]">
        <ViewUp>
          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            {categories.map((item) => (
              <CategoryLinkCard
                key={item.category.slug}
                category={item.category}
                count={item.count}
                kicker={item.kicker}
              />
            ))}
          </div>
        </ViewUp>

        <ViewUp className="mt-12 max-[900px]:mt-10">
          <div className="mb-8 max-w-[560px]">
            <p className="m-0 text-[12.5px] font-extrabold tracking-[.22em] text-[#056492] uppercase">
              Hizmet Kataloğu
            </p>
            <h2 className="m-0 mt-3 text-[32px] leading-[1.2] font-extrabold tracking-[-.02em] text-[#0b2530] max-[900px]:text-[26px]">
              Tüm hizmetlerimiz{" "}
              <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-transparent">
                tek listede
              </span>
            </h2>
            <p className="m-0 mt-3 text-[14.5px] leading-[1.7] text-[#4d5a63]">
              YGM ve danışmanlık alanlarında sunduğumuz {totalServices} hizmete aşağıdan
              ulaşabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            {navGroups.map((group) => (
              <ServiceGroupPanel key={group.title} group={group} />
            ))}
          </div>
        </ViewUp>
      </div>
    </section>
  );
}
