import Image from "next/image";
import Link from "next/link";
import TriangleIcon from "@/components/ui/TriangleIcon";
import { siteInfo } from "@/content/site-content";

const QUICK_LINKS = [
  {
    title: "YGM Hizmetleri",
    description: "Antrepo, tespit ve raporlama işlemleri",
    href: "/hizmetler/ygm",
  },
  {
    title: "Danışmanlık",
    description: "YYS, denetim ve sonradan kontrol",
    href: "/hizmetler/danismanlik",
  },
  {
    title: "Mevzuat",
    description: "Güncel mevzuat ve resmî duyurular",
    href: "/mevzuat",
  },
];

export default function HomeHero() {
  return (
    <section className="relative -mt-[var(--header-height)] overflow-hidden bg-[linear-gradient(180deg,#e9f3f8_0%,#f7fbfd_55%,#ffffff_100%)]">
      {/* Arka plan dokusu */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[200px] left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.13),transparent_70%)]" />
        <span className="absolute top-[120px] left-[7%] block -rotate-[12deg] max-[900px]:hidden">
          <Image
            src="/images/onlylogo-watermark.png"
            alt=""
            width={90}
            height={79}
            className="h-[79px] w-auto opacity-[.07] animate-float-y"
          />
        </span>
        <span className="absolute top-[210px] right-[8%] block rotate-[10deg] max-[900px]:hidden">
          <Image
            src="/images/onlylogo-watermark.png"
            alt=""
            width={56}
            height={49}
            className="h-[49px] w-auto opacity-[.09] animate-float-y"
            style={{ animationDelay: "0.9s" }}
          />
        </span>
      </div>

      <div className="site-container relative z-[2] pt-[calc(var(--header-height)+32px)] pb-14 min-[901px]:flex min-[901px]:min-h-[calc(100svh/var(--site-zoom,1))] min-[901px]:flex-col min-[901px]:pb-10 max-[900px]:pb-12">
        {/* Ortalanmış metin bloğu */}
        <div className="mx-auto max-w-[780px] text-center">
          <p
            className="m-0 text-[13px] font-extrabold tracking-[.22em] text-[#056492] uppercase animate-rise-in"
            style={{ animationDelay: "0.06s" }}
          >
            {siteInfo.tagline}
          </p>

          <h1 className="m-0 mt-4 text-[48px] leading-[1.08] font-extrabold tracking-[-.025em] text-[#0b2530] max-[1080px]:text-[42px] max-[900px]:text-[36px]">
            <span className="block overflow-hidden pb-[.08em] mb-[-.08em]">
              <span className="inline-block animate-word-in" style={{ animationDelay: "0.16s" }}>
                Tespitten raporlamaya,
              </span>
            </span>
            <span className="block overflow-hidden pb-[.12em] mb-[-.12em]">
              <span
                className="inline-block animate-word-in"
                style={{ animationDelay: "0.3s" }}
              >
                gümrükte{" "}
                <span className="bg-[linear-gradient(120deg,#056492,#2b8ec2)] bg-clip-text text-transparent">
                  tam güvence
                </span>
              </span>
            </span>
          </h1>

          <p
            className="mx-auto mt-4 max-w-[660px] text-[15.5px] leading-[1.65] text-[#4d5a63] animate-rise-in"
            style={{ animationDelay: "0.48s" }}
          >
            Antrepo işlemlerinden sonradan kontrole; dış ticaretinizin her adımını
            bağımsız, tarafsız ve mevzuata tam uyumlu denetimle güvence altına alıyoruz.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-3.5 animate-rise-in"
            style={{ animationDelay: "0.62s" }}
          >
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#056492,#043848)] px-8 py-[15px] text-[14.5px] font-extrabold text-white shadow-[0_10px_28px_rgba(5,100,146,.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(5,100,146,.45)]"
            >
              Hizmetlerimizi Keşfedin
              <TriangleIcon size={9} fill="#7ec4e8" className="rotate-90" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center rounded-full border-[1.5px] border-[rgba(5,100,146,.28)] bg-white/70 px-8 py-[15px] text-[14.5px] font-extrabold text-[#056492] backdrop-blur-sm transition-colors duration-200 hover:border-[#056492] hover:bg-[#f2f8fb]"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>

        {/* Panorama görsel + cam hızlı erişim barı */}
        <div
          className="relative mt-10 animate-rise-in min-[901px]:flex min-[901px]:min-h-0 min-[901px]:flex-1 min-[901px]:flex-col max-[900px]:mt-9"
          style={{ animationDelay: "0.78s" }}
        >
          <div className="relative w-full overflow-hidden rounded-[32px] shadow-[0_36px_80px_rgba(4,56,72,.24)] min-[901px]:min-h-[260px] min-[901px]:flex-1 max-[900px]:aspect-[4/3] max-[900px]:rounded-[20px]">
            <Image
              src="/images/hero/bg-02-lojistik-merkezi.jpg"
              alt="SÖZER YGM antrepo ve lojistik denetim operasyonları"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,40,54,.68)_0%,rgba(4,40,54,.14)_48%,rgba(4,40,54,.18)_100%)]"
              aria-hidden
            />
            {/* Köşe rozeti */}
            <div className="absolute top-6 left-6 flex items-center gap-2.5 rounded-full border border-white/25 bg-[rgba(4,40,54,.45)] px-4.5 py-2 backdrop-blur-[10px] max-[900px]:top-4 max-[900px]:left-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4fb3e6] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4fb3e6]" />
              </span>
              <span className="text-[12px] font-extrabold tracking-[.08em] text-white/90 uppercase">
                Türkiye genelinde aktif denetim
              </span>
            </div>
          </div>

          {/* Cam hızlı erişim barı — görselin içinde */}
          <div className="absolute right-5 bottom-5 left-5 grid grid-cols-3 gap-3 max-[900px]:static max-[900px]:mt-4 max-[900px]:grid-cols-1 max-[900px]:gap-2.5">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-4 rounded-[18px] border border-white/60 bg-white/85 px-6 py-5 shadow-[0_18px_44px_rgba(4,56,72,.14)] backdrop-blur-[16px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(4,56,72,.2)] max-[1080px]:px-5 max-[900px]:py-4"
              >
                <span>
                  <span className="block text-[15px] font-extrabold text-[#0b2530]">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug font-semibold text-[#5c6b74]">
                    {link.description}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7f1f7] transition-colors duration-200 group-hover:bg-[#056492]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#056492"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-[stroke] duration-200 group-hover:stroke-white"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
