import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import ServiceCard from "@/components/ServiceCard";
import { getServicesByCategory, serviceCategories } from "@/content/site-content";

const category = serviceCategories.find((c) => c.key === "danismanlik")!;

export const metadata: Metadata = {
  title: "Danışmanlık Hizmetleri | SÖZER YGM",
  description: category.description,
};

export default function DanismanlikPage() {
  const services = getServicesByCategory("danismanlik");

  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetlerimiz", href: "/hizmetler" },
          { label: "Danışmanlık Hizmetleri" },
        ]}
        title="Danışmanlık Hizmetleri"
        subtitle={category.description}
      />
      <section className="bg-brand-mist py-16 pb-24">
        <div className="site-container">
          <div className="grid grid-cols-3 gap-[22px] max-[900px]:grid-cols-1">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
