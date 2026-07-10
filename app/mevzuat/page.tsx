import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import MevzuatPageContent from "@/components/MevzuatPageContent";
import {
  mevzuatAmendmentCitation,
  mevzuatAmendmentUrl,
  mevzuatCitation,
  mevzuatParagraphs,
  mevzuatSourceUrl,
} from "@/content/mevzuat";
import { classifyMevzuat } from "@/lib/classifyMevzuat";

export const metadata: Metadata = {
  title: "Mevzuat | SÖZER YGM",
  description: "Yetkilendirilmiş Gümrük Müşavirliği Tebliği",
};

export default function MevzuatPage() {
  const items = classifyMevzuat(mevzuatParagraphs);

  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Mevzuat" },
        ]}
        title="Yetkilendirilmiş Gümrük Müşavirliği Tebliği"
        subtitle={`${mevzuatCitation} · ${mevzuatAmendmentCitation}`}
        titleClassName="!text-[34px] !leading-[1.25] max-w-[860px] max-[900px]:!text-[28px]"
      />
      <MevzuatPageContent
        items={items}
        citation={mevzuatCitation}
        amendmentCitation={mevzuatAmendmentCitation}
        sourceUrl={mevzuatSourceUrl}
        amendmentUrl={mevzuatAmendmentUrl}
      />
    </>
  );
}
