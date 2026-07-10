import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import { legalNotice } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Yasal Bilgilendirme | SÖZER YGM",
  description: "SÖZER Yetkilendirilmiş Gümrük Müşavirliği A.Ş. yasal uyarı metni.",
};

export default function YasalBilgilendirmePage() {
  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Yasal Bilgilendirme" },
        ]}
        title="Yasal Bilgilendirme"
      />
      <section className="bg-white py-16 pb-24">
        <div className="site-container mx-auto max-w-[780px]">
          {legalNotice.map((paragraph, i) => (
            <p key={i} className="mb-4 text-[14.5px] leading-[1.8] text-[#3a3b42]">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
