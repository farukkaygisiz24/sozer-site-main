// Tebliğ metnini bölüm, madde ve paragraf olarak sınıflandırır.

export type MevzuatItem = {
  text: string;
  isChapter: boolean;
  isArticleNumber: boolean;
  isArticleTitle: boolean;
  isChapterSubtitle: boolean;
  isPara: boolean;
  isListItem: boolean;
};

const ARTICLE_RE = /^(MADDE(\s\d+)?|GE[Cç][İI]C[İI]\s+MADDE(\s+\d+)?)$/i;

export function classifyMevzuat(paragraphs: string[]): MevzuatItem[] {
  return paragraphs.map((text, i) => {
    const next = paragraphs[i + 1] || "";
    const prev = i > 0 ? paragraphs[i - 1] : "";
    const isChapter = /BÖLÜM$/.test(text);
    const isArticleNumber = ARTICLE_RE.test(text.trim());
    const isChapterSubtitle = /BÖLÜM$/.test(prev) && !isChapter && !isArticleNumber;
    const isArticleTitle =
      !isChapter && !isArticleNumber && !isChapterSubtitle && ARTICLE_RE.test(next.trim());
    const isListItem = /^[a-zçğıöşü0-9ığ]{1,3}\)/i.test(text.trim());
    const isPara = !isChapter && !isArticleNumber && !isArticleTitle && !isChapterSubtitle;
    return { text, isChapter, isArticleNumber, isArticleTitle, isChapterSubtitle, isPara, isListItem };
  });
}
