"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

export type MevzuatChapterNavItem = {
  id: string;
  title: string;
  subtitle: string;
  navLabel: string;
};

const MevzuatScrollSpyContext = createContext<string>("");

function getZoomContext() {
  const zoomRoot = document.getElementById("site-zoom-root");
  if (!zoomRoot) {
    return { zoom: 1, rootLeft: 0, rootTop: 0 };
  }

  const rect = zoomRoot.getBoundingClientRect();
  const zoom = parseFloat(zoomRoot.style.zoom) || 1;

  return { zoom, rootLeft: rect.left, rootTop: rect.top };
}

function viewportToLocal(viewportX: number, viewportY: number) {
  const { zoom, rootLeft, rootTop } = getZoomContext();

  return {
    x: (viewportX - rootLeft) / zoom,
    y: (viewportY - rootTop) / zoom,
  };
}

function getPinTop() {
  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    ) || 84;
  return headerHeight + 20;
}

function getScrollOffset() {
  return getPinTop() + 4;
}

function getActiveChapterId(chapterIds: string[]) {
  if (!chapterIds.length) return "";

  const scrollOffset = getScrollOffset();
  let activeId = chapterIds[0];

  for (const id of chapterIds) {
    const el = document.getElementById(id);
    if (!el) continue;

    if (el.getBoundingClientRect().top <= scrollOffset) {
      activeId = id;
    }
  }

  const scrollBottom = window.scrollY + window.innerHeight;
  const pageBottom = document.documentElement.scrollHeight - 8;

  if (scrollBottom >= pageBottom) {
    return chapterIds[chapterIds.length - 1];
  }

  return activeId;
}

function useChapterScrollSpy(chapterIds: string[]) {
  const [activeId, setActiveId] = useState(chapterIds[0] ?? "");
  const chapterKey = chapterIds.join("|");

  useEffect(() => {
    if (!chapterIds.length) return;

    let frame = 0;

    const updateActiveId = () => {
      frame = 0;
      const nextId = getActiveChapterId(chapterIds);
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveId);
    };

    updateActiveId();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chapterKey, chapterIds]);

  return activeId;
}

export function MevzuatScrollSpyProvider({
  chapterIds,
  children,
}: {
  chapterIds: string[];
  children: ReactNode;
}) {
  const activeId = useChapterScrollSpy(chapterIds);
  return (
    <MevzuatScrollSpyContext.Provider value={activeId}>{children}</MevzuatScrollSpyContext.Provider>
  );
}

function useActiveChapterId() {
  return useContext(MevzuatScrollSpyContext);
}

function ChapterNavLink({
  chapter,
  index,
  active,
}: {
  chapter: MevzuatChapterNavItem;
  index: number;
  active: boolean;
}) {
  return (
    <a
      href={`#${chapter.id}`}
      data-chapter={chapter.id}
      className={`group flex items-start gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] leading-[1.4] no-underline transition-[background,color] duration-200 ${
        active
          ? "bg-[#e7f1f7] font-extrabold text-[#056492]"
          : "font-semibold text-[#5c6b74] hover:bg-[#f2f8fb] hover:text-[#056492]"
      }`}
      aria-current={active ? "location" : undefined}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] text-[9px] font-extrabold transition-colors duration-200 ${
          active
            ? "bg-[#056492] text-white"
            : "bg-[#e7f1f7] text-[#056492] group-hover:bg-[#056492] group-hover:text-white"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>{chapter.navLabel || chapter.subtitle || chapter.title}</span>
    </a>
  );
}

function scrollNavItemIntoView(nav: HTMLElement, activeId: string) {
  const activeLink = nav.querySelector<HTMLElement>(`[data-chapter="${activeId}"]`);
  if (!activeLink) return;

  const navRect = nav.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
    activeLink.scrollIntoView({ block: "nearest", behavior: "auto" });
  }
}

function usePinnedSidebar(panelRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const column = panel.parentElement;
    const container = panel.closest<HTMLElement>(".mevzuat-layout-grid");
    if (!column || !container) return;

    column.style.position = "relative";

    let frame = 0;

    const update = () => {
      frame = 0;

      const stickyTop = getPinTop();
      const panelHeight = panel.offsetHeight;
      const panelWidth = column.offsetWidth;
      const columnRect = column.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (columnRect.top >= stickyTop) {
        panel.style.position = "";
        panel.style.top = "";
        panel.style.left = "";
        panel.style.width = "";
        return;
      }

      if (containerRect.bottom <= stickyTop + panelHeight) {
        panel.style.position = "absolute";
        panel.style.top = `${column.offsetHeight - panelHeight}px`;
        panel.style.left = "0";
        panel.style.width = `${panelWidth}px`;
        return;
      }

      const { x: localLeft, y: localTop } = viewportToLocal(columnRect.left, stickyTop);
      const zoomRoot = document.getElementById("site-zoom-root");
      const hasZoom = Boolean(zoomRoot?.style.zoom);

      panel.style.position = "fixed";
      panel.style.top = hasZoom ? `${localTop}px` : `${stickyTop}px`;
      panel.style.left = hasZoom ? `${localLeft}px` : `${columnRect.left}px`;
      panel.style.width = `${panelWidth}px`;
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      panel.style.position = "";
      panel.style.top = "";
      panel.style.left = "";
      panel.style.width = "";
      column.style.position = "";
    };
  }, [panelRef]);
}

export function MevzuatSidebar({ chapters }: { chapters: MevzuatChapterNavItem[] }) {
  const activeId = useActiveChapterId();
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  usePinnedSidebar(panelRef);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    scrollNavItemIntoView(nav, activeId);
  }, [activeId]);

  return (
    <aside className="relative self-stretch max-[1080px]:hidden">
      <div
        ref={panelRef}
        className="rounded-[20px] border border-[rgba(5,100,146,.10)] bg-white p-5 shadow-[0_6px_20px_rgba(4,56,72,.05)]"
      >
        <p className="m-0 mb-4 text-[10.5px] font-extrabold tracking-[.16em] text-[#056492] uppercase">
          Bölümler
        </p>
        <nav
          ref={navRef}
          className="flex max-h-[calc(100vh-var(--header-height)-48px)] flex-col gap-1 overflow-y-auto pr-1"
          aria-label="Tebliğ bölümleri"
        >
          {chapters.map((chapter, index) => (
            <ChapterNavLink
              key={chapter.id}
              chapter={chapter}
              index={index}
              active={activeId === chapter.id}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function MevzuatMobileNav({ chapters }: { chapters: MevzuatChapterNavItem[] }) {
  const activeId = useActiveChapterId();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    scrollNavItemIntoView(nav, activeId);
  }, [activeId]);

  return (
    <div className="mb-6 hidden max-[1080px]:block">
      <div ref={navRef} className="flex gap-2 overflow-x-auto pb-1">
        {chapters.map((chapter, index) => {
          const active = activeId === chapter.id;
          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-chapter={chapter.id}
              className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold no-underline transition-colors duration-200 ${
                active
                  ? "border-[#056492] bg-[#056492] text-white"
                  : "border-[rgba(5,100,146,.15)] bg-white text-[#056492]"
              }`}
              aria-current={active ? "location" : undefined}
            >
              {index + 1}. {chapter.navLabel.split(",")[0]}
            </a>
          );
        })}
      </div>
    </div>
  );
}
