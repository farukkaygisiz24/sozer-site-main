import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import DarkGradientWatermark from "@/components/ui/DarkGradientWatermark";
import TriangleIcon from "@/components/ui/TriangleIcon";
import ViewUp from "@/components/ui/ViewUp";
import { faqIntro } from "@/content/site-content";

export default function HomeFaqSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6fafc] py-24 max-[900px]:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[140px] left-[-160px] h-[460px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.09),transparent_70%)]" />
        <div className="absolute right-[-180px] bottom-[-180px] h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.08),transparent_70%)]" />
      </div>

      <div className="site-container relative z-[2]">
        <ViewUp className="mx-auto mb-14 max-w-[680px] text-center max-[900px]:mb-10">
          <p className="m-0 text-[12.5px] font-extrabold tracking-[.22em] text-[#056492] uppercase">
            SSS
          </p>
          <h2 className="m-0 mt-4 text-[42px] leading-[1.15] font-extrabold tracking-[-.02em] text-[#0b2530] max-[900px]:text-[30px]">
            Sık Sorulan{" "}
            <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-transparent">
              Sorular
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#4d5a63]">
            {faqIntro}
          </p>
        </ViewUp>

        <ViewUp>
          <div className="grid grid-cols-[340px_1fr] items-start gap-5 max-[1080px]:grid-cols-1">
            <div className="relative flex min-h-[260px] flex-col overflow-hidden rounded-[24px] bg-[linear-gradient(155deg,#043848_0%,#056492_100%)] p-8 max-[900px]:min-h-[240px] max-[1080px]:p-6 max-[900px]:p-6 max-[900px]:static sticky top-[120px]">
              <DarkGradientWatermark variant="compact" />

              <div className="relative z-[2] max-[900px]:pr-[108px]">
                <h3 className="m-0 text-[24px] leading-[1.3] font-extrabold tracking-[-.015em] text-white max-[900px]:text-[22px]">
                  YGM süreçleri hakkında{" "}
                  <span className="bg-[linear-gradient(120deg,#7ec4e8,#4fb3e6)] bg-clip-text text-transparent">
                    net yanıtlar
                  </span>
                </h3>

                <p className="m-0 mt-4 text-[13.5px] leading-[1.75] text-white/70">
                  Mevzuat, yetki kapsamı ve denetim süreçleriyle ilgili temel soruları burada
                  topladık. Daha detaylı bilgi için ekibimizle iletişime geçebilirsiniz.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-[11px] text-[13.5px] font-extrabold text-[#043848] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Bize Ulaşın
                    <TriangleIcon size={8} fill="#056492" className="rotate-90" />
                  </Link>
                  <Link
                    href="/mevzuat"
                    className="inline-flex items-center rounded-full border-[1.5px] border-white/25 px-6 py-[11px] text-[13.5px] font-extrabold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
                  >
                    Mevzuat
                  </Link>
                </div>
              </div>
            </div>

            <FaqAccordion />
          </div>
        </ViewUp>
      </div>
    </section>
  );
}
