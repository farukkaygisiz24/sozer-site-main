import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import ServicesPageContent from "@/components/ServicesPageContent";
import {
  buildServicesNavGroups,
  getServicesByCategory,
  getYgmFeaturedServices,
  serviceCategories,
} from "@/content/site-content";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | SÖZER YGM",
  description:
    "SÖZER Yetkilendirilmiş Gümrük Müşavirliği A.Ş. YGM ve danışmanlık hizmetleri: antrepo, geçici ithalat, dahilde işleme, onaylanmış kişi statüsü tespit işlemleri ve daha fazlası.",
};

export default function HizmetlerPage() {
  const navGroups = buildServicesNavGroups();
  const totalServices = navGroups.reduce((n, g) => n + g.links.length, 0);
  const gumrukCategory = serviceCategories.find((c) => c.key === "gumruk")!;
  const danismanlikCategory = serviceCategories.find((c) => c.key === "danismanlik")!;

  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetlerimiz" },
        ]}
        title="Hizmetlerimiz"
        subtitle="YGM Tespit ve Raporlama Hizmetleri ile Dış Ticaret Danışmanlık Çözümlerimiz."
      />
      <ServicesPageContent
        categories={[
          {
            category: gumrukCategory,
            count: getYgmFeaturedServices().length,
            kicker: "Tespit ve Raporlama",
          },
          {
            category: danismanlikCategory,
            count: getServicesByCategory("danismanlik").length,
            kicker: "Uzman Kadro",
          },
        ]}
        navGroups={navGroups}
        totalServices={totalServices}
      />
    </>
  );
}
