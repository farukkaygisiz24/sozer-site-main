import TriangleIcon from "@/components/ui/TriangleIcon";
import {
  MevzuatMobileNav,
  MevzuatScrollSpyProvider,
  MevzuatSidebar,
} from "@/components/MevzuatChapterNav";
import type { MevzuatItem } from "@/lib/classifyMevzuat";

type MevzuatChapter = {
  id: string;
  title: string;
  subtitle: string;
  navLabel: string;
  items: MevzuatItem[];
};

const CHAPTER_NAV_LABELS = [
  "Amaç, Kapsam, Dayanak ve Tanımlar",
  "Nitelikler ve Yetki Belgesi İşlemleri",
  "Tespit İşlemleri, Ücret ve Genel Hükümler",
  "Sözleşme, Rapor ve Çalışma Düzeni",
  "Sorumluluk ve Cezai Hükümler",
  "Çeşitli ve Son Hükümler",
] as const;

function groupMevzuatChapters(items: MevzuatItem[]): MevzuatChapter[] {
  const chapters: MevzuatChapter[] = [];
  let current: MevzuatChapter | null = null;

  for (const item of items) {
    if (item.isChapter) {
      const index = chapters.length;
      current = {
        id: `bolum-${index + 1}`,
        title: item.text,
        subtitle: "",
        navLabel: CHAPTER_NAV_LABELS[index] ?? item.text,
        items: [],
      };
      chapters.push(current);
      continue;
    }

    if (item.isChapterSubtitle && current) {
      current.subtitle = item.text;
      continue;
    }

    if (current) {
      current.items.push(item);
    }
  }

  return chapters;
}

function MevzuatParagraph({ item }: { item: MevzuatItem }) {
  if (item.isArticleTitle) {
    return (
      <h4 className="m-0 mt-6 text-[15px] font-extrabold tracking-[-.01em] text-[#0b2530]">
        {item.text}
      </h4>
    );
  }

  if (item.isArticleNumber) {
    return (
      <p className="m-0 mt-5 mb-1 inline-flex rounded-full bg-[#e7f1f7] px-3.5 py-1 text-[12px] font-extrabold tracking-[.04em] text-[#056492]">
        {item.text}
      </p>
    );
  }

  if (item.isListItem) {
    return (
      <p className="m-0 mb-2 border-l-2 border-[rgba(5,100,146,.22)] py-0.5 pl-4 text-[14px] leading-[1.78] text-[#3a3b42]">
        {item.text}
      </p>
    );
  }

  return (
    <p className="m-0 mb-3 text-[14.5px] leading-[1.8] text-[#3a3b42]">{item.text}</p>
  );
}

type MevzuatPageContentProps = {
  items: MevzuatItem[];
  citation: string;
  amendmentCitation: string;
  sourceUrl: string;
  amendmentUrl: string;
};

export default function MevzuatPageContent({
  items,
  citation,
  amendmentCitation,
  sourceUrl,
  amendmentUrl,
}: MevzuatPageContentProps) {
  const chapters = groupMevzuatChapters(items);

  return (
    <section className="relative bg-[#f6fafc] py-14 pb-20 max-[900px]:py-10 max-[900px]:pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[100px] left-[-120px] h-[320px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(5,100,146,.07),transparent_70%)]" />
      </div>

      <div className="site-container relative z-[2]">
        <MevzuatScrollSpyProvider chapterIds={chapters.map((chapter) => chapter.id)}>
          <div className="mevzuat-layout-grid grid grid-cols-[240px_1fr] items-start gap-10 max-[1080px]:grid-cols-1 max-[1080px]:gap-8">
            <MevzuatSidebar chapters={chapters} />

            <div className="min-w-0">
              <MevzuatMobileNav chapters={chapters} />

              {/* Kaynak bilgisi */}
              <div className="mb-8 rounded-[20px] border border-[rgba(5,100,146,.12)] bg-white p-6 shadow-[0_6px_20px_rgba(4,56,72,.06)] max-[900px]:p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-[520px]">
                    <p className="m-0 text-[12px] font-extrabold tracking-[.14em] text-[#056492] uppercase">
                      Resmî Gazete
                    </p>
                    <p className="m-0 mt-2 text-[13.5px] leading-[1.65] text-[#4d5a63]">{citation}</p>
                    <p className="m-0 mt-1.5 text-[13px] leading-[1.65] text-[#5c6b74]">{amendmentCitation}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(5,100,146,.18)] bg-[#f7fbfd] px-4 py-2 text-[12.5px] font-extrabold text-[#056492] no-underline transition-colors hover:border-[#056492] hover:bg-[#e7f1f7]"
                    >
                      Ana tebliğ
                      <TriangleIcon size={7} fill="#056492" className="rotate-90" />
                    </a>
                    <a
                      href={amendmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(5,100,146,.18)] bg-[#f7fbfd] px-4 py-2 text-[12.5px] font-extrabold text-[#056492] no-underline transition-colors hover:border-[#056492] hover:bg-[#e7f1f7]"
                    >
                      Değişiklik
                      <TriangleIcon size={7} fill="#056492" className="rotate-90" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bölüm içerikleri */}
              <div className="flex flex-col gap-6">
              {chapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  className="scroll-mt-[calc(var(--header-height)+24px)] rounded-[22px] border border-[rgba(5,100,146,.12)] bg-white p-7 shadow-[0_6px_20px_rgba(4,56,72,.06)] max-[900px]:rounded-[18px] max-[900px]:p-5"
                >
                    <header className="mb-5 border-b border-[rgba(5,100,146,.08)] pb-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#056492,#2b8ec2)] text-[12px] font-extrabold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="m-0 text-[10.5px] font-extrabold tracking-[.14em] text-[#056492] uppercase">
                            {chapter.title}
                          </p>
                          {chapter.subtitle ? (
                            <h2 className="m-0 mt-1 text-[18px] font-extrabold leading-[1.35] tracking-[-.01em] text-[#0b2530] max-[900px]:text-[16px]">
                              {chapter.subtitle}
                            </h2>
                          ) : null}
                        </div>
                      </div>
                    </header>

                    <div className="mevzuat-body">
                      {chapter.items.map((item, itemIndex) => (
                        <MevzuatParagraph key={`${chapter.id}-${itemIndex}`} item={item} />
                      ))}
                    </div>
                  </article>
              ))}
              </div>

              <div className="mt-8">
                <div className="rounded-[18px] border border-[rgba(5,100,146,.12)] bg-white px-6 py-5 text-[12.5px] leading-[1.7] text-[#3a3b42] shadow-[0_4px_16px_rgba(4,56,72,.05)]">
                  <span className="font-extrabold text-[#0b2530]">Kaynaklar: </span>
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#056492] no-underline hover:underline"
                  >
                    Ana tebliğ (31240)
                  </a>
                  {" · "}
                  <a
                    href={amendmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#056492] no-underline hover:underline"
                  >
                    Değişiklik tebliği (32426)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MevzuatScrollSpyProvider>
      </div>
    </section>
  );
}
