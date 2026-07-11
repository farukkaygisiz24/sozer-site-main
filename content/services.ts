import type { ServiceCategoryKey } from "@/content/site-content";
import type { IconKey } from "@/components/ServiceIcon";

export type ServiceItem = {
  icon: IconKey;
  category: ServiceCategoryKey;
  /** Kurumsal / hizmet sayfası başlığı */
  title: string;
  /** Ana sayfa kart yığını kısa başlığı */
  carouselTitle?: string;
  slug: string;
  image: string;
  description: string;
};

export function slugifyService(title: string): string {
  return title
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ServiceCatalogItem = Omit<ServiceItem, "slug"> & { slug?: string };

function withSlugs(items: ServiceCatalogItem[]): ServiceItem[] {
  return items.map(({ slug, ...item }) => ({
    ...item,
    slug: slug ?? slugifyService(item.title),
  }));
}

/** Yerel hizmet görselleri */
const U = {
  customsOffice: "/images/services/customs-office.jpg",
  importPort: "/images/services/import-port.jpg",
  exportShip: "/images/services/export-ship.jpg",
  globalTrade: "/images/services/global-trade.jpg",
  digital: "/images/services/digital.jpg",
  documents: "/images/services/documents.jpg",
  laboratory: "/images/services/laboratory.jpg",
  antrepoTespit: "/images/services/antrepo-tespit.jpg",
  oksbOnInceleme: "/images/services/oksb-on-inceleme.jpg",
  yysDanismanligi: "/images/services/yys-danismanligi.jpg",
  dirTespit: "/images/services/dir-tespit.jpg",
  geciciIthalat: "/images/services/gecici-ithalat.jpg",
  menseKontrol: "/images/services/mense-kontrol.jpg",
  teamMeeting: "/images/services/team-meeting.jpg",
  inspection: "/images/services/inspection.jpg",
} as const;

/** SÖZER hizmet kataloğu */
const serviceCatalog: ServiceCatalogItem[] = [
  // —— Gümrük Hizmetleri ——
  {
    icon: "badge",
    category: "gumruk",
    title: "Gümrük Müşavirliği",
    image: U.customsOffice,
    description:
      "Dış ticaret işlemlerinizde gümrük mevzuatına uygun temsil ve takip hizmeti sunuyoruz. İthalat ve ihracat süreçlerinizin beyan, vergi ve rejim boyutlarında doğru yönetilmesi için uzman kadromuzla yanınızdayız.",
  },
  {
    icon: "warehouse",
    category: "gumruk",
    title: "İthalat Gümrükleme",
    image: U.importPort,
    description:
      "İthalat operasyonlarınızda sektörel gereklilikleri dikkate alarak beyanname, ek belge ve vergi süreçlerini uçtan uca yönetiyor; işlemlerinizin hızlı ve mevzuata uygun tamamlanmasını sağlıyoruz.",
  },
  {
    icon: "truck",
    category: "gumruk",
    title: "İhracat Gümrükleme",
    image: U.exportShip,
    description:
      "İhracat beyannamelerinizin hazırlanması, rejim ve belge uyumunun sağlanması ve gümrük idaresi nezdindeki işlemlerin takibi konusunda deneyimli ekibimizle hizmet veriyoruz.",
  },
  {
    icon: "certificate",
    category: "gumruk",
    title: "Yurt Dışı Gümrükleme Hizmeti",
    image: U.globalTrade,
    description:
      "Uluslararası ticaret ağınızdaki yurt dışı gümrükleme ihtiyaçlarınız için iş ortaklarımız ve süreç bilgimizle koordinasyon sağlıyor; sevkiyatlarınızın hedef ülkede sorunsuz tamamlanmasına destek oluyoruz.",
  },
  {
    icon: "layers",
    category: "gumruk",
    title: "Dijital Gümrük Hizmetleri",
    image: U.digital,
    description:
      "Gümrük operasyonlarınızın başlangıcından sonuçlanmasına kadar tüm aşamaları dijital altyapımız üzerinden izlenebilir şekilde yönetiyor; şeffaf ve hızlı bilgi akışı sunuyoruz.",
  },
  {
    icon: "clipboard",
    category: "gumruk",
    title: "Gümrük ve Dış Ticaret Tercüme Hizmetleri",
    image: U.documents,
    description:
      "Gümrük ve dış ticaret belgelerinizin İngilizce, Almanca, Fransızca, Rusça, Arapça ve diğer dillerde tercümesini; mevzuat terminolojisine hâkim ekibimizle gerçekleştiriyoruz.",
  },
  {
    icon: "certificate",
    category: "gumruk",
    title: "Gümrükte Laboratuvar Analiz Hizmetleri",
    image: U.laboratory,
    description:
      "Gümrük süreçlerinde talep edilen laboratuvar analiz ve test işlemlerinin koordinasyonunu sağlayarak ürünlerinizin mevzuata uygun şekilde tescil edilmesine destek veriyoruz.",
  },
  {
    icon: "warehouse",
    category: "gumruk",
    slug: "antrepo-tespit-islemleri-an1-an8",
    carouselTitle: "Antrepo Tespit İşlemleri (AN1 – AN9)",
    title: "Antrepo Tespit İşlemleri (AN1 – AN9)",
    image: U.antrepoTespit,
    description:
      "Gümrük antrepolarının açılış, genişletme, daraltma, devir ve adres değişikliği işlemleri ile antrepolara eşya giriş-çıkış ve elleçleme süreçlerinin mevzuata uygunluğunu tespit ediyor ve raporlarını eksiksiz tanzim ediyoruz.",
  },
  {
    icon: "truck",
    category: "gumruk",
    carouselTitle: "Geçici İthalat Rejimi Tespitleri (GC1 - GC2)",
    title: "Geçici İthalat Rejimine İlişkin Tespit İşlemleri (GC1, GC2)",
    image: U.geciciIthalat,
    description:
      "Geçici ithalat rejimi kapsamında Türkiye gümrük bölgesine getirilen eşyaların yasal durum ve kullanım amaçlarına uygunluğunu denetliyor, süre uzatım taleplerine esas teşkil eden raporları uzmanlıkla hazırlıyoruz.",
  },
  {
    icon: "certificate",
    category: "gumruk",
    carouselTitle: "Menşe Belgelerinin Sonradan Kontrolü (SK1)",
    title: "Menşe Belgelerinin Sonradan Kontrol Edilmesi (SK1)",
    image: U.menseKontrol,
    description:
      "İhraç edilen eşyaların menşe kurallarına uygunluğunu ve menşe ispat belgelerinin doğruluğunu mevzuat çerçevesinde inceliyor, sonradan kontrol işlemlerine esas teşkil eden raporlama süreçlerini eksiksiz yönetiyoruz.",
  },
  {
    icon: "badge",
    category: "gumruk",
    carouselTitle: "Onaylanmış Kişi Statüsü (OKSB)",
    title: "Onaylanmış Kişi Statü Belgesi (OKSB) Ön İncelemesi",
    image: U.oksbOnInceleme,
    description:
      "Dış ticaret işlemlerinde büyük kolaylıklar sağlayan OKSB müracaatlarının ön inceleme süreçlerini gerçekleştiriyor; aranan kurumsal ve mali şartları titizlikle inceleyerek gerekli tespit raporlarını hazırlıyoruz.",
  },
  {
    icon: "layers",
    category: "gumruk",
    carouselTitle: "Dahilde İşleme Rejimi (DİR) Tespit İşlemleri",
    title: "Dahilde İşleme Rejimi DR1 ve DR2 Tespit Raporları",
    image: U.dirTespit,
    description:
      "Dahilde İşleme İzin Belgesi (DİİB) kapsamındaki tüm girdi, malzeme ve bileşenlerin üretimde kullanım durumlarını tespit ediyor, ithal eşyalarının rejim şartlarına uygunluğunu inceliyor ve DR1-DR2 raporlarınızı güvenle hazırlıyoruz.",
  },

  {
    icon: "layers",
    category: "gumruk",
    carouselTitle: "Gümrük Kontrolünde İşleme Tespitleri (GK1-GK2)",
    title: "Gümrük Kontrolü Altında İşleme Rejimi Tespitleri (GK1, GK2)",
    image: "/images/services/gk-isleme-rejimi.jpg",
    description:
      "Serbest dolaşıma girmemiş eşyanın niteliğini veya durumunu değiştiren işleme faaliyetlerini yerinde denetliyor; ithalat vergilerinden muafiyet veya indirim sağlayan rejim şartlarına uygunluğu belirleyen GK1 ve GK2 raporlarını uzmanlıkla hazırlıyoruz.",
  },
  {
    icon: "certificate",
    category: "gumruk",
    carouselTitle: "Nihai Kullanım Tespitleri (NK1)",
    title: "Nihai Kullanım ve Muafiyet Tespit İşlemleri (NK1)",
    image: "/images/services/nk1-nihai-kullanim.jpg",
    description:
      "Gümrük vergisi muafiyeti veya indirimli vergi oranıyla ithal edilen eşyaların, öngörülen nihai kullanım amacına ve taahhütlere uygun şekilde tüketilip tüketilmediğini yerinde inceliyoruz. YGM yetkimizle hazırladığımız NK1 raporu sayesinde, gümrük idarelerindeki teminat çözüm ve iade süreçlerinizi güvenle hızlandırıyoruz.",
  },
  {
    icon: "truck",
    category: "gumruk",
    carouselTitle: "Serbest Dolaşım Statüsü Tespiti (AT1)",
    title: "A.TR Düzenlenmesi İçin Serbest Dolaşım Statüsü Tespiti (AT1)",
    image: "/images/services/at1-serbest-dolasim.jpg",
    description:
      "Geçmişte ithal edilerek kullanılmış ve 5 yıllık yasal belge saklama süresi dolduğu için ithalat evrakları mevcut olmayan eşyaların ihraç süreçlerini yönetiyoruz. Firmanın ticari ve muhasebe kayıtlarını inceleyerek hazırladığımız AT1 raporuyla, eşyanın serbest dolaşım statüsünü belirliyor ve AB ülkelerine ihracatta A.TR Dolaşım Belgesi almanızı sağlıyoruz.",
  },
  {
    icon: "certificate",
    category: "gumruk",
    carouselTitle: "Tercihli Ticaret Menşe Tespitleri (EU2)",
    title: "Menşe Kurallarının Doğrulanması ve Tercihli Ticaret Tespitleri (EU2)",
    image: "/images/services/eu2-tercihli-ticaret.jpg",
    description:
      "Tercihli ticaret anlaşmaları kapsamında “Onaylanmış İhracatçı Yetkisi” başvurusunda kullanılan eşyanın menşe kurallarına uygunluğunu ekiplerimizle belirliyoruz. İthalat ve ihracatta vergi avantajlarından yararlanmak için kritik bir adım olan EU2 raporumuzla; ürünün menşeini ve tercihli tarife şartlarını doğrulayarak uluslararası ticaret süreçlerinizi hızlandırıyoruz.",
  },
  {
    icon: "clipboard",
    category: "gumruk",
    carouselTitle: "Tedarikçi Beyanı Doğrulama (INF4)",
    title: "Tedarikçi Beyanı ve Menşe Doğrulama İşlemleri (INF4)",
    image: "/images/services/inf4-tedarikci-beyani.jpg",
    description:
      "İthalatçı ülkelerin gümrük idareleri tarafından kontrol talebiyle geri gönderilen kısa veya uzun dönem tedarikçi beyanlarının mevzuata uygunluğunu sahada inceliyoruz. YGM yetkimizle hazırladığımız INF4 tespit raporuyla, ihraç edilen ürünlerin beyan edilen ülke menşeini resmi olarak doğruluyor; uluslararası ticarette ceza risklerini önleyerek pazar güvenilirliğinizi koruyoruz.",
  },
  {
    icon: "badge",
    category: "gumruk",
    carouselTitle: "Çok Zor Durum Tespiti (ZD1)",
    title: "Tecil ve Taksitlendirme İçin Çok Zor Durum Tespiti (ZD1)",
    image: "/images/services/zd1-cok-zor-durum.jpg",
    description:
      "Gümrük idarelerine olan borçların tek seferde ödenmesinin firmanızı finansal açıdan zorlayacağı durumlarda yasal çözümler üretiyoruz. 6183 sayılı Kanun kapsamında firmanızın likidite oranlarını, bilanço ve mali tablolarını titizlikle inceleyerek ZD1 raporunu hazırlıyoruz. YGM yetkimizle sunduğumuz bu rapor sayesinde, gümrük borçlarınızın uygun şartlarda tecil edilmesini ve taksitlendirilmesini sağlayarak işletmenizin nakit akışını güvence altına alıyoruz.",
  },
  {
    icon: "clipboard",
    category: "gumruk",
    carouselTitle: "Beyanname Düzeltme Ön İncelemesi (BD1)",
    title: "İhracat Beyannamesinde Sonradan Düzeltme ve Ön İnceleme (BD1)",
    image: "/images/services/bd1-beyanname-duzeltme.jpg",
    description:
      "Gümrük Kanunu'nun 73. maddesi uyarınca, kapanmış ihracat beyannameleri üzerinde eşya tesliminden sonra yapılması gereken zorunlu değişiklik süreçlerini yönetiyoruz. Dahilde İşleme Rejimi kapsamında tescil edilen beyannamelerdeki yan sanayici (imalatçı) veya belge sahibi bilgilerini sahada yerinde inceliyoruz. YGM yetkimizle hazırladığımız BD1 raporu sayesinde, beyanname hatalarınızı yasal çerçevede düzelterek belge kapatma (ibra) süreçlerinizin pürüzsüz tamamlanmasını sağlıyoruz.",
  },
  {
    icon: "layers",
    category: "gumruk",
    carouselTitle: "Takas KKDF Muafiyeti Tespitleri (TK1)",
    title: "Takas İşlemlerinde KKDF Muafiyeti Tespitleri (TK1)",
    image: "/images/services/tk1-takas-kkdf.jpg",
    description:
      "Takas veya bağlı muamele yoluyla yapılan dış ticaret işlemlerinde, ithal ve ihraç edilen öncelikli eşyaların değer, miktar ve mevzuata uygunluk kontrollerini gerçekleştiriyoruz. YGM yetkimizle hazırladığımız TK1 raporu sayesinde; sürecin gümrük kurallarına uygunluğunu belgeliyor, ithalat operasyonlarınızda %6 oranındaki KKDF maliyetinden yasal muafiyet kazanmanızı sağlayarak firmanıza doğrudan finansal avantaj sunuyoruz.",
  },

  // —— Danışmanlık Hizmetleri ——
  {
    icon: "clipboard",
    category: "danismanlik",
    title: "Danışmanlık ve Denetim Hizmetleri",
    image: U.teamMeeting,
    description:
      "Firmaların dış ticaret işlemlerinin incelenerek yıllık faaliyet raporlarının düzenlenmesi; ithalat ve ihracat işlemlerinde tarife, rejim, vergi, kıymet ve belge uyumunun denetlenmesine yardımcı oluyoruz.",
  },
  {
    icon: "badge",
    category: "danismanlik",
    title: "Yetkilendirilmiş Yükümlü Statü (YYS) Danışmanlığı",
    image: U.yysDanismanligi,
    description:
      "Global ticarette en üst düzey prestij ve kolaylık sağlayan Yetkilendirilmiş Yükümlü Statüsü (YYS) belgelendirme süreçlerinizi yönetiyor; kurumsal dış ticaret risk analizleri ve önleyici iç denetim hizmetleriyle firmanızı geleceğe hazırlıyoruz.",
  },
  {
    icon: "clipboard",
    category: "danismanlik",
    title: "Sonradan Kontrol Danışmanlığı",
    image: U.inspection,
    description:
      "Gümrük idaresi nezdinde yürütülen sonradan kontrol denetimlerine hazırlık sürecinde bilgi ve belge yönetimi, mevzuat uyumu ve süreç danışmanlığı sunuyoruz.",
  },
];

export const services: ServiceItem[] = withSlugs(serviceCatalog);

export function getServiceHref(categoryHref: string, slug: string): string {
  return `${categoryHref}#${slug}`;
}

export function getServicesByCategory(category: ServiceCategoryKey): ServiceItem[] {
  return services.filter((service) => service.category === category);
}

/** Ana sayfa kart yığını ve YGM öne çıkan hizmetler (sıralı). */
const YGM_FEATURED_SLUGS = [
  "antrepo-tespit-islemleri-an1-an8",
  "onaylanmis-kisi-statu-belgesi-oksb-on-incelemesi",
  "yetkilendirilmis-yukumlu-statu-yys-danismanligi",
  "dahilde-isleme-rejimi-dr1-ve-dr2-tespit-raporlari",
  "gecici-ithalat-rejimine-iliskin-tespit-islemleri-gc1-gc2",
  "mense-belgelerinin-sonradan-kontrol-edilmesi-sk1",
] as const;

export function getYgmFeaturedHref(service: ServiceItem): string {
  return `/hizmetler/ygm#${service.slug}`;
}

export function getYgmFeaturedServices(): ServiceItem[] {
  return YGM_FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)!);
}

/** YGM hizmetleri sayfası — öne çıkanlar + tüm tespit hizmetleri (sıralı, tam liste). */
const YGM_PAGE_SLUGS = [
  ...YGM_FEATURED_SLUGS,
  "gumruk-kontrolu-altinda-isleme-rejimi-tespitleri-gk1-gk2",
  "nihai-kullanim-ve-muafiyet-tespit-islemleri-nk1",
  "a-tr-duzenlenmesi-icin-serbest-dolasim-statusu-tespiti-at1",
  "mense-kurallarinin-dogrulanmasi-ve-tercihli-ticaret-tespitleri-eu2",
  "tedarikci-beyani-ve-mense-dogrulama-islemleri-inf4",
  "tecil-ve-taksitlendirme-icin-cok-zor-durum-tespiti-zd1",
  "ihracat-beyannamesinde-sonradan-duzeltme-ve-on-inceleme-bd1",
  "takas-islemlerinde-kkdf-muafiyeti-tespitleri-tk1",
] as const;

export function getYgmPageServices(): ServiceItem[] {
  return YGM_PAGE_SLUGS.map((slug) => services.find((s) => s.slug === slug)!);
}

export const homepageCarouselServices: ServiceItem[] = getYgmFeaturedServices();
