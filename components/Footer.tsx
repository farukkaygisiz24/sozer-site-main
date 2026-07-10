import Image from "next/image";
import Link from "next/link";
import { contact, siteInfo } from "@/content/site-content";

const QUICK_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "YGM Hizmetleri", href: "/hizmetler/ygm" },
  { label: "Danışmanlık", href: "/hizmetler/danismanlik" },
  { label: "İletişim", href: "/iletisim" },
];

const CORPORATE_LINKS = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Mevzuat", href: "/mevzuat" },
  { label: "Yasal Bilgilendirme", href: "/yasal-bilgilendirme" },
];

const footerLink =
  "text-[13px] font-medium text-white/60 no-underline transition-colors duration-150 hover:text-white";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="m-0 mb-3 text-[10.5px] font-extrabold tracking-[.16em] text-[#7ec4e8] uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function Footer() {
  const [merkez] = contact.addresses;

  return (
    <footer className="relative mt-auto overflow-hidden bg-[linear-gradient(180deg,#032836_0%,#043848_55%,#032836_100%)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(79,179,230,.45),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[100px] right-[8%] h-[280px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.16),transparent_70%)]" />
        <div className="absolute bottom-[-120px] left-[5%] h-[240px] w-[340px] rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.14),transparent_70%)]" />
        <span className="absolute right-[4%] bottom-[-20px] block rotate-[8deg] opacity-[.05] max-[900px]:right-[-40px]">
          <Image
            src="/images/brand/sozer-mark.png"
            alt=""
            width={200}
            height={175}
            className="h-[175px] w-auto"
          />
        </span>
      </div>

      <div className="site-container relative z-[2] py-8 max-[900px]:py-6">
        <div className="grid grid-cols-[1.35fr_1fr_1fr_1.1fr] gap-8 max-[1080px]:grid-cols-2 max-[1080px]:gap-6 max-[600px]:grid-cols-1">
          <div className="max-[1080px]:col-span-2 max-[600px]:col-span-1">
            <Link href="/" className="inline-block max-w-[280px]">
              <Image
                src="/images/brand/sozer-logo-white.png"
                alt={siteInfo.name}
                width={280}
                height={56}
                className="h-auto w-full max-w-[280px] opacity-95"
              />
            </Link>
            <p className="m-0 mt-3 max-w-[280px] text-[12.5px] leading-[1.6] text-white/55">
              {siteInfo.description}
            </p>
          </div>

          <FooterColumn title="Hızlı Erişim">
            <nav className="flex flex-col gap-1.5">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="Kurumsal">
            <nav className="flex flex-col gap-1.5">
              {CORPORATE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="İletişim">
            <div className="flex flex-col gap-3 text-[13px] font-medium">
              <div>
                <a
                  href={merkez.phoneHref ?? contact.phoneHref}
                  className="text-white/70 no-underline transition-colors hover:text-white"
                >
                  <span className="text-[10.5px] font-bold tracking-[.06em] text-white/40 uppercase">
                    {merkez.label} ·{" "}
                  </span>
                  {merkez.phone ?? contact.phone}
                </a>
                <p className="m-0 mt-1.5 max-w-[260px] text-[11.5px] leading-[1.55] font-normal text-white/50">
                  {merkez.value}
                </p>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-white/70 no-underline transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-4 text-[11.5px] text-white/40 min-[601px]:flex-row min-[601px]:items-center">
          <p className="m-0">
            © {new Date().getFullYear()} {siteInfo.name}
          </p>
          <p className="m-0">Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
