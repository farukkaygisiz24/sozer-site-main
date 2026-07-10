import Image from "next/image";
import MagneticLink from "@/components/ui/MagneticLink";
import TriangleIcon from "@/components/ui/TriangleIcon";
import ViewUp from "@/components/ui/ViewUp";
import { contact } from "@/content/site-content";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-[#141418] py-[110px]">
      <div className="pointer-events-none absolute top-[14%] left-[7%]" aria-hidden>
        <span className="-rotate-[8deg]">
          <Image src="/images/onlylogo-watermark.png" alt="" width={120} height={120} className="h-[120px] w-auto animate-float-y opacity-[.12]" />
        </span>
      </div>
      <div className="pointer-events-none absolute right-[6%] -bottom-[46px]" aria-hidden>
        <span className="rotate-[9deg]">
          <Image
            src="/images/onlylogo-watermark.png"
            alt=""
            width={200}
            height={200}
            className="h-[200px] w-auto animate-float-y opacity-10"
            style={{ animationDuration: "12s", animationDelay: "1s" }}
          />
        </span>
      </div>

      <ViewUp className="site-container relative z-[2] text-center" range="entry 0% cover 40%">
        <div className="mb-[18px] flex items-center justify-center gap-[9px]">
          <TriangleIcon fill="#2b8ec2" />
          <span className="text-[13px] font-extrabold tracking-[.18em] text-[#7ec4e8] uppercase">İletişim</span>
        </div>
        <h2 className="m-0 text-[56px] leading-[1.1] font-extrabold tracking-[-.02em] text-white max-[900px]:text-[36px]">
          Bize Ulaşın
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.7] text-[#b7b8c2]">
          Yetkilendirilmiş gümrük müşavirliği ve danışmanlık hizmetlerimiz hakkında bilgi almak için bizimle
          iletişime geçin.
        </p>
        <div className="mt-[26px] flex flex-wrap items-center justify-center gap-x-9 gap-y-[18px]">
          <a
            href={contact.phoneHref}
            className="border-b-2 border-[rgba(62,165,220,.4)] pb-[3px] text-[16px] font-extrabold text-white no-underline transition-colors hover:border-[#3ea5dc]"
          >
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="border-b-2 border-[rgba(62,165,220,.4)] pb-[3px] text-[16px] font-extrabold text-white no-underline transition-colors hover:border-[#3ea5dc]"
          >
            {contact.email}
          </a>
        </div>
        <MagneticLink
          href="/iletisim"
          className="mt-10 rounded-xl bg-brand-blue px-[42px] py-[17px] text-[15.5px] font-extrabold text-white hover:bg-brand-blue-dark hover:shadow-[0_20px_48px_rgba(5,100,146,.5)]"
        >
          İletişime Geçin
        </MagneticLink>
      </ViewUp>
    </section>
  );
}
