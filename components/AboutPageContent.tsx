import Image from "next/image";
import AboutStatsRow from "@/components/AboutStatsRow";
import TriangleIcon from "@/components/ui/TriangleIcon";
import ViewUp from "@/components/ui/ViewUp";
import { aboutPage } from "@/content/site-content";

const LOCATIONS = ["İstanbul Merkez", "Bursa Ofis", "İzmir Ofis"];

export default function AboutPageContent() {
  return (
    <>
      {/* İstatistikler */}
      <section className="relative overflow-hidden bg-[#f6fafc] py-14 max-[900px]:py-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-[100px] right-[-120px] h-[280px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.08),transparent_70%)]" />
        </div>
        <div className="site-container relative z-[2]">
          <ViewUp>
            <AboutStatsRow />
          </ViewUp>
        </div>
      </section>

      {/* Giriş + lokasyonlar */}
      <section className="bg-white py-16 max-[900px]:py-12">
        <div className="site-container">
          <ViewUp>
            <div className="grid grid-cols-[1.15fr_.85fr] items-start gap-10 max-[1080px]:grid-cols-1 max-[1080px]:gap-8">
              <div>
                <p className="m-0 text-[12.5px] font-extrabold tracking-[.22em] text-[#056492] uppercase">
                  Kurumsal Kimlik
                </p>
                <p className="m-0 mt-5 text-[21px] leading-[1.75] font-semibold text-[#0b2530] max-[900px]:text-[18px]">
                  {aboutPage.intro[0]}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(155deg,#043848_0%,#056492_100%)] p-7 max-[900px]:p-6">
                <span className="pointer-events-none absolute -right-6 -bottom-8 opacity-[.1]" aria-hidden>
                  <Image
                    src="/images/brand/sozer-mark.png"
                    alt=""
                    width={160}
                    height={140}
                    className="h-[140px] w-auto"
                  />
                </span>
                <div className="relative z-[2]">
                  <p className="m-0 text-[11px] font-extrabold tracking-[.18em] text-[#7ec4e8] uppercase">
                    2008&apos;den bu yana
                  </p>
                  <p className="m-0 mt-2 text-[18px] font-extrabold leading-[1.35] text-white">
                    Türkiye genelinde{" "}
                    <span className="bg-[linear-gradient(120deg,#7ec4e8,#4fb3e6)] bg-clip-text text-transparent">
                      hizmet ağı
                    </span>
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    {LOCATIONS.map((location) => (
                      <span
                        key={location}
                        className="flex items-center gap-2.5 rounded-[12px] border border-white/12 bg-white/[.07] px-4 py-2.5 text-[13px] font-bold text-white/80"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4fb3e6]" aria-hidden />
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ViewUp>
        </div>
      </section>

      {/* Alt bölümler — timeline */}
      <section className="relative overflow-hidden bg-[#f6fafc] py-16 max-[900px]:py-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute bottom-[-120px] left-[-100px] h-[300px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.07),transparent_70%)]" />
        </div>
        <div className="site-container relative z-[2]">
          <div className="mx-auto max-w-[820px]">
            {aboutPage.subsections.map((section, index) => (
              <ViewUp key={section.title} className={index > 0 ? "mt-10" : ""}>
                <div className="relative pl-10 max-[600px]:pl-8">
                  <span
                    className="absolute top-1 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#056492] text-[11px] font-extrabold text-white"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < aboutPage.subsections.length - 1 ? (
                    <span
                      className="absolute top-9 left-[13px] h-[calc(100%+16px)] w-px bg-[rgba(5,100,146,.15)]"
                      aria-hidden
                    />
                  ) : null}

                  <h3 className="m-0 text-[19px] font-extrabold tracking-[-.01em] text-[#0b2530] max-[900px]:text-[17px]">
                    {section.title}
                  </h3>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="mt-3.5 text-[14.5px] leading-[1.8] text-[#4d5a63]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ViewUp>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="bg-white py-16 pb-20 max-[900px]:py-12 max-[900px]:pb-16">
        <div className="site-container">
          <ViewUp>
            <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#032836_0%,#043848_48%,#05506a_100%)] px-10 py-10 max-[900px]:rounded-[22px] max-[900px]:px-6 max-[900px]:py-8">
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute -top-[80px] -right-[60px] h-[240px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.2),transparent_70%)]" />
              </div>
              <div className="relative z-[2] grid grid-cols-2 gap-5 max-[800px]:grid-cols-1">
                {[aboutPage.mission, aboutPage.vision].map((block) => (
                  <div
                    key={block.title}
                    className="rounded-[20px] border border-white/12 bg-white/[.07] p-6 backdrop-blur-sm max-[900px]:p-5"
                  >
                    <div className="flex items-center gap-2.5">
                      <TriangleIcon size={9} fill="#4fb3e6" />
                      <h3 className="m-0 text-[14px] font-extrabold tracking-[.12em] text-[#7ec4e8] uppercase">
                        {block.title}
                      </h3>
                    </div>
                    <p className="m-0 mt-4 text-[14px] leading-[1.75] text-white/70">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ViewUp>
        </div>
      </section>

      {/* Değerler */}
      <section className="relative overflow-hidden bg-[#f6fafc] py-16 pb-20 max-[900px]:py-12 max-[900px]:pb-16">
        <div className="site-container relative z-[2]">
          <ViewUp className="mb-10 text-center max-[900px]:mb-8">
            <p className="m-0 text-[12.5px] font-extrabold tracking-[.22em] text-[#056492] uppercase">
              {aboutPage.values.title}
            </p>
            <h2 className="m-0 mt-3 text-[32px] font-extrabold tracking-[-.02em] text-[#0b2530] max-[900px]:text-[26px]">
              Hizmet anlayışımızı belirleyen{" "}
              <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-transparent">
                ilkeler
              </span>
            </h2>
          </ViewUp>

          <div className="grid grid-cols-4 gap-3 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            {aboutPage.values.items.map((value, index) => (
              <ViewUp key={value.title}>
                <div className="group h-full rounded-[18px] border border-[rgba(5,100,146,.10)] bg-white p-5 shadow-[0_4px_16px_rgba(4,56,72,.04)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[rgba(5,100,146,.22)] hover:shadow-[0_12px_32px_rgba(4,56,72,.08)]">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f1f7] text-[11px] font-extrabold text-[#056492] transition-colors duration-200 group-hover:bg-[#056492] group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="m-0 text-[14.5px] font-extrabold text-[#0b2530]">{value.title}</h4>
                      <p className="m-0 mt-1.5 text-[12.5px] leading-[1.65] text-[#5c6b74]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ViewUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
