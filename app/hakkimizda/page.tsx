import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "Hakkımızda | SÖZER YGM",
  description: "SÖZER Yetkilendirilmiş Gümrük Müşavirliği A.Ş. hakkında bilgi edinin.",
};

export default function HakkimizdaPage() {
  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hakkımızda" },
        ]}
        title="Hakkımızda"
        subtitle="2008'den bu yana bağımsızlık, tarafsızlık ve güvenilirlik ilkeleriyle hizmet veriyoruz."
      />
      <AboutPageContent />
    </>
  );
}
