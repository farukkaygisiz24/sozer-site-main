import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import { contact } from "@/content/site-content";

export const metadata: Metadata = {
  title: "İletişim | SÖZER YGM",
  description: "SÖZER Yetkilendirilmiş Gümrük Müşavirliği A.Ş. iletişim bilgileri.",
};

function ContactInfoCard({
  label,
  children,
  icon,
  embedded = false,
}: {
  label: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  embedded?: boolean;
}) {
  return (
    <div
      className={
        embedded
          ? "flex items-start gap-4 py-5 first:pt-0 last:pb-0"
          : "flex items-start gap-4 rounded-2xl border border-brand-line bg-white px-[26px] py-6 transition-[transform,border-color] duration-250 hover:-translate-y-[3px] hover:border-[rgba(5,100,146,.3)]"
      }
    >
      <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-brand-blue-tint text-brand-blue">
        {icon}
      </div>
      <div>
        <div
          className={`font-extrabold text-brand-ink ${children ? "mb-[5px] text-[13px]" : "text-[15px] font-semibold"}`}
        >
          {label}
        </div>
        {children && <div className="text-[15px] font-semibold text-brand-muted">{children}</div>}
      </div>
    </div>
  );
}

function AddressRow({
  address,
}: {
  address: (typeof contact.addresses)[number];
}) {
  return (
    <ContactInfoCard
      embedded
      label="Adres"
      icon={
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      }
    >
      <span className="text-[14.5px] leading-[1.65] font-medium">{address.value}</span>
    </ContactInfoCard>
  );
}

function ContactDetailsList({ address }: { address: (typeof contact.addresses)[number] }) {
  const phone = address.phone ?? contact.phone;
  const phoneHref = address.phoneHref ?? contact.phoneHref;
  const fax = address.fax ?? contact.fax;
  const faxHref = address.faxHref ?? contact.faxHref;

  return (
    <>
      <ContactInfoCard
        embedded
        label="Telefon"
        icon={
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        }
      >
        <a href={phoneHref} className="text-brand-muted no-underline hover:text-brand-blue">
          {phone}
        </a>
      </ContactInfoCard>
      <ContactInfoCard
        embedded
        label="Faks"
        icon={
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
        }
      >
        <a href={faxHref} className="text-brand-muted no-underline hover:text-brand-blue">
          {fax}
        </a>
      </ContactInfoCard>
      <ContactInfoCard
        embedded
        label="E-Posta"
        icon={
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        }
      >
        <a href={`mailto:${contact.email}`} className="text-brand-muted no-underline hover:text-brand-blue">
          {contact.email}
        </a>
      </ContactInfoCard>
      <AddressRow address={address} />
    </>
  );
}

function OfficeBox({
  title,
  address,
  className = "",
}: {
  title: string;
  address: (typeof contact.addresses)[number];
  className?: string;
}) {
  return (
    <div className={`rounded-[18px] border border-brand-line bg-[#fafbfc] p-[26px] ${className}`}>
      <p className="m-0 border-b border-brand-line pb-5 text-center text-[16px] font-extrabold tracking-[-.01em] text-brand-ink">
        {title}
      </p>
      <div className="grid grid-cols-2 items-stretch gap-[22px] pt-[22px] max-[900px]:grid-cols-1 max-[900px]:items-start">
        <div className="flex flex-col justify-center divide-y divide-brand-line">
          <ContactDetailsList address={address} />
        </div>
        <div className="border-brand-line pl-[22px] max-[900px]:mt-[22px] max-[900px]:border-t max-[900px]:border-l-0 max-[900px]:pt-[22px] max-[900px]:pl-0 min-[901px]:border-l">
          <iframe
            src={address.mapEmbedUrl}
            className="h-full min-h-[280px] w-full rounded-xl border border-brand-line bg-white"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={`${address.label} — SÖZER YGM`}
          />
        </div>
      </div>
    </div>
  );
}

export default function IletisimPage() {
  const [merkez] = contact.addresses;

  return (
    <>
      <SubPageHero
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "İletişim" },
        ]}
        title="İletişim"
        subtitle="İstanbul merkez ofisimiz ile Bursa ve İzmir ofisimiz aracılığıyla hizmetinizdeyiz."
      />
      <section className="bg-white py-16 pb-24">
        <div className="site-container">
          <OfficeBox title="İstanbul Merkez" address={merkez} />
        </div>
      </section>
    </>
  );
}
