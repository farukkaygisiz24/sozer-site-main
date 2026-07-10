"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  buildServicesNavGroups,
  contact,
  headerNav,
  isMegaMenu,
  isNavGroup,
  siteInfo,
  type NavItem,
  type NavLink,
} from "@/content/site-content";
import TriangleIcon from "@/components/ui/TriangleIcon";

function isLink(item: NavItem): item is NavLink {
  return "href" in item;
}

function isHrefActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (isLink(item)) return isHrefActive(pathname, item.href);
  if (isMegaMenu(item)) {
    return (
      isHrefActive(pathname, item.href) ||
      item.groups.some(
        (group) =>
          isHrefActive(pathname, group.href) ||
          group.links.some((child) => isHrefActive(pathname, child.href)),
      )
    );
  }
  if (isNavGroup(item)) {
    return item.children.some((child) => isHrefActive(pathname, child.href));
  }
  return false;
}

function NavItemLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-[15px] py-2 text-[13.5px] font-bold tracking-[.01em] transition-colors duration-150 ${
        active
          ? "bg-[#e7f1f7] text-brand-blue"
          : "text-brand-ink hover:text-brand-blue"
      }`}
    >
      {children}
    </Link>
  );
}

function ServicesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const groups = buildServicesNavGroups();
  const active =
    isHrefActive(pathname, "/hizmetler") ||
    groups.some(
      (g) =>
        isHrefActive(pathname, g.href) || g.links.some((l) => isHrefActive(pathname, l.href)),
    );

  return (
    <div
      className="relative z-[210]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/hizmetler"
        className={`inline-flex items-center gap-2 rounded-full px-[15px] py-2 text-[13.5px] font-bold tracking-[.01em] transition-colors duration-150 ${
          active || open
            ? "bg-[#e7f1f7] text-brand-blue"
            : "text-brand-ink hover:text-brand-blue"
        }`}
      >
        Hizmetlerimiz
        <svg
          viewBox="0 0 20 20"
          className={`h-[10px] w-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          aria-hidden
        >
          <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div
        className={`absolute top-full left-1/2 z-[220] -translate-x-1/2 pt-3.5 transition-[opacity,visibility] duration-[180ms] ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="w-[600px] overflow-hidden rounded-[18px] border border-brand-line bg-white shadow-[0_24px_56px_rgba(4,56,72,.18)]">
          <div className="h-[3px] bg-[linear-gradient(to_right,#043848,#056492,#2b8ec2)]" aria-hidden />
          <div className="grid grid-cols-[1.2fr_1fr]">
            {groups.map((group, gi) => (
              <div
                key={group.title}
                className={`px-6 py-5 ${gi === 0 ? "border-r border-[#e9eef2]" : ""}`}
              >
                <Link
                  href={group.href}
                  className="mb-3 block text-[11.5px] font-extrabold tracking-[.14em] text-[#043848] uppercase hover:text-brand-blue"
                >
                  {group.title}
                </Link>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="-mx-2.5 block rounded-[8px] px-2.5 py-[7px] text-[13.5px] leading-[1.4] font-semibold text-[#3a3b42] transition-all hover:translate-x-1 hover:bg-[#f2f8fb] hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Link
            href="/hizmetler"
            className="flex items-center justify-between bg-[#043848] px-6 py-3.5 text-[13px] font-extrabold text-white transition-colors hover:bg-[#05506a]"
          >
            Tüm Hizmetlerimiz
            <TriangleIcon size={9} fill="#4fb3e6" className="rotate-90" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const MOBILE_LINKS: { label: string; href: string; sub?: boolean }[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "YGM Hizmetleri", href: "/hizmetler/ygm", sub: true },
  { label: "Danışmanlık Hizmetleri", href: "/hizmetler/danismanlik", sub: true },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Mevzuat", href: "/mevzuat" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [updateScroll, pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none sticky top-0 z-[200] px-4 pt-4">
      {/* Yüzen kapsül bar */}
      <div
        className={`pointer-events-auto relative mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-8 rounded-[22px] border border-[rgba(4,56,72,.10)] pr-3 pl-6 transition-shadow duration-300 max-[900px]:transition-[opacity,visibility] ${
          mobileOpen ? "max-[900px]:invisible max-[900px]:opacity-0" : ""
        } ${
          scrolled
            ? "shadow-[0_18px_44px_rgba(4,56,72,.16)]"
            : "shadow-[0_8px_28px_rgba(4,56,72,.08)]"
        }`}
      >
        <div
          className={`absolute inset-0 overflow-hidden rounded-[inherit] transition-[background,backdrop-filter] duration-300 ${
            scrolled ? "header-glass--scrolled" : "header-glass"
          }`}
          aria-hidden
        />

        <Link href="/" className="relative z-[1] shrink-0">
          <Image
            src="/images/logo-horizontal.png"
            alt={siteInfo.name}
            width={215}
            height={43}
            className="h-[43px] w-auto max-[900px]:h-[38px]"
            priority
          />
        </Link>

        <nav
          className="relative z-[1] flex items-center gap-1.5 max-[1080px]:gap-0.5 max-[900px]:hidden"
          aria-label="Ana menü"
        >
          {headerNav.map((item) => {
            if (isMegaMenu(item)) {
              return <ServicesMenu key={item.label} pathname={pathname} />;
            }
            if (isLink(item)) {
              return (
                <NavItemLink
                  key={item.href}
                  href={item.href}
                  active={isHrefActive(pathname, item.href)}
                >
                  {item.label}
                </NavItemLink>
              );
            }
            if (isNavGroup(item)) {
              return (
                <NavItemLink
                  key={item.label}
                  href={item.children[0].href}
                  active={isNavItemActive(item, pathname)}
                >
                  {item.label}
                </NavItemLink>
              );
            }
            return null;
          })}

          <Link
            href="/iletisim"
            className="ml-3 inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#056492,#043848)] px-6 py-[11px] text-[13.5px] font-extrabold text-white shadow-[0_6px_18px_rgba(5,100,146,.35)] transition-[box-shadow,transform] duration-200 hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(5,100,146,.45)]"
          >
            Bize Ulaşın
            <TriangleIcon size={9} fill="#7ec4e8" className="rotate-90" />
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-[1] hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[12px] border border-[rgba(4,56,72,.10)] bg-white/70 p-0 text-brand-ink backdrop-blur-sm max-[900px]:flex"
          aria-label="Menüyü aç"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M4 7h16M4 12h10M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Mobil tam ekran menü */}
      {mobileOpen ? (
        <div className="pointer-events-auto fixed inset-0 z-[300] flex flex-col overflow-hidden overscroll-none bg-[linear-gradient(160deg,#043848,#032836)] min-[901px]:hidden">
          <div className="shrink-0 px-4 pt-4">
            <div className="flex h-[68px] items-center justify-between pl-6 pr-3">
              <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/images/brand/sozer-logo-white.png"
                  alt={siteInfo.name}
                  width={215}
                  height={43}
                  className="h-[38px] w-auto max-w-[280px]"
                />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[12px] border border-white/15 bg-transparent p-0 text-white"
                aria-label="Menüyü kapat"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center gap-0.5 overflow-y-auto px-8 py-6"
            aria-label="Mobil menü"
          >
            {MOBILE_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`animate-rise-in flex items-baseline gap-3.5 py-[9px] no-underline ${
                  link.sub
                    ? "pl-9 text-[15.5px] font-bold text-white/60"
                    : "text-[24px] font-extrabold text-white"
                } ${isHrefActive(pathname, link.href) && !link.sub ? "text-[#7ec4e8]" : ""}`}
                style={{ animationDelay: `${i * 55}ms`, animationFillMode: "both" }}
              >
                {!link.sub ? (
                  <span className="w-6 shrink-0 text-[12px] font-bold tracking-[.08em] text-[#4fb3e6]">
                    {String(MOBILE_LINKS.filter((l) => !l.sub).indexOf(link) + 1).padStart(2, "0")}
                  </span>
                ) : null}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 border-t border-white/10 px-8 py-6">
            <a href={contact.phoneHref} className="block text-[15px] font-bold text-white no-underline">
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1.5 block text-[13.5px] font-semibold text-white/55 no-underline"
            >
              {contact.email}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
