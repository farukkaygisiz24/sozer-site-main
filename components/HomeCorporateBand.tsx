import Image from "next/image";
import Link from "next/link";
import TriangleIcon from "@/components/ui/TriangleIcon";
import DarkGradientWatermark from "@/components/ui/DarkGradientWatermark";
import ViewUp from "@/components/ui/ViewUp";
import { aboutHomeSummary } from "@/content/site-content";

const PRINCIPLES = [
  {
    title: "Bağımsızlık",
    description: "Tarafların değil, mevzuatın yanında dururuz.",
  },
  {
    title: "Tarafsızlık",
    description: "Objektif tespit, güvenilir raporlama.",
  },
  {
    title: "Şeffaflık",
    description: "İzlenebilir ve hesap verebilir denetim süreçleri.",
  },
  {
    title: "Tam Uyum",
    description: "4458 sayılı Gümrük Kanunu ve ilgili mevzuata uygunluk.",
  },
];

const LOCATIONS = ["İstanbul Merkez", "Bursa Ofis", "İzmir Ofis"];

export default function HomeCorporateBand() {
  return (
    <section className="bg-white py-24 max-[900px]:py-14">
      <div className="site-container">
        <ViewUp range="entry 0% cover 26%">
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#032836_0%,#043848_48%,#05506a_100%)] px-14 py-16 max-[1080px]:px-9 max-[900px]:rounded-[22px] max-[900px]:px-6 max-[900px]:py-9">
            <DarkGradientWatermark variant="hero" />

            <div className="relative z-[2] grid grid-cols-[1fr_.95fr] items-center gap-16 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
              {/* Sol — hikâye */}
              <div>
                <h2 className="m-0 text-[38px] leading-[1.16] font-extrabold tracking-[-.02em] text-white max-[900px]:text-[28px]">
                  2008&apos;den bu yana{" "}
                  <span className="bg-[linear-gradient(120deg,#7ec4e8,#4fb3e6)] bg-clip-text text-transparent">
                    güvenin tarafındayız
                  </span>
                </h2>

                <p className="m-0 mt-5 max-w-[520px] text-[14.5px] leading-[1.8] text-white/70">
                  {aboutHomeSummary}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/hakkimizda"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-[13px] text-[14px] font-extrabold text-[#043848] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Devamını Oku
                    <TriangleIcon size={8} fill="#056492" className="rotate-90" />
                  </Link>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center rounded-full border-[1.5px] border-white/25 px-7 py-[13px] text-[14px] font-extrabold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10"
                  >
                    Bize Ulaşın
                  </Link>
                </div>
              </div>

              {/* Sağ — logo + ilkeler + lokasyonlar */}
              <div>
                <div className="mb-3.5 flex items-center justify-center rounded-[18px] border border-white/12 bg-white/[.07] px-8 py-7 backdrop-blur-sm">
                  <Image
                    src="/images/brand/sozer-logo-white.png"
                    alt="SÖZER Yetkilendirilmiş Gümrük Müşavirliği A.Ş."
                    width={300}
                    height={61}
                    className="h-auto w-full max-w-[300px] opacity-95"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3.5 max-[600px]:grid-cols-1">
                  {PRINCIPLES.map((principle) => (
                    <div
                      key={principle.title}
                      className="rounded-[18px] border border-white/12 bg-white/[.07] p-5 backdrop-blur-sm transition-colors duration-200 hover:bg-white/[.12]"
                    >
                      <div className="flex items-center gap-2.5">
                        <TriangleIcon size={9} fill="#4fb3e6" />
                        <h3 className="m-0 text-[15.5px] font-extrabold text-white">
                          {principle.title}
                        </h3>
                      </div>
                      <p className="m-0 mt-2 text-[12.5px] leading-[1.6] text-white/60">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  {LOCATIONS.map((location) => (
                    <span
                      key={location}
                      className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[.06] px-4 py-2 text-[12px] font-bold text-white/75"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4fb3e6]" aria-hidden />
                      {location}
                    </span>
                  ))}
                  <span className="text-[12px] font-bold text-white/45">
                    + Türkiye geneli hizmet ağı
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ViewUp>
      </div>
    </section>
  );
}
