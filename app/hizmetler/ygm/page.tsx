import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import ServiceCard from "@/components/ServiceCard";
import { getYgmPageServices, serviceCategories } from "@/content/site-content";

const category = serviceCategories.find((c) => c.key === "gumruk")!;

export const metadata: Metadata = {
  title: "YGM Hizmetleri | SÖZER YGM",
  description: category.description,
};

export default function YgmHizmetleriPage() {
  const services = getYgmPageServices();

  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetlerimiz", href: "/hizmetler" },
          { label: "YGM Hizmetleri" },
        ]}
        title="YGM Hizmetleri"
        subtitle={category.description}
      />
      <section className="bg-brand-mist py-16 pb-24">
        <div className="site-container">
          <div className="grid grid-cols-3 gap-[22px] max-[900px]:grid-cols-1 max-[600px]:grid-cols-1">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
