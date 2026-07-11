/**
 * SEFATUR — Tüm site metinleri (tek yerden düzenlenebilir).
 * Bir metni değiştirmek için sadece bu dosyayı düzenleyin.
 * Kural: sade ve net dil; em dash (—) kullanılmaz.
 */

export const BRAND = {
  name: "SEFATUR",
  subtitle: "Marmara Adası'nda tarifeli minibüs seferleri ve taşımacılık hizmetleri",
} as const;

export const HERO = {
  headline: "Adanın Yolu Bizden Sorulur",
  highlight: "Bizden",
  subheadline:
    "Marmara, Topağaç ve Saraylar arasında her gün karşılıklı minibüs seferleri. Turlar, öğrenci servisi ve şoförlü araç kiralama için bizi arayın.",
  ctaPrimary: "Sefer Saatleri",
  ctaSecondary: "Hemen Ara",
  /** Pill değil, düz satır olarak gösterilir */
  facts: ["Günde 12 sefer", "3 ana durak", "Her gün hizmette"],
} as const;

export const SCHEDULE_COPY = {
  title: "Sefer Saatleri",
  subtitle:
    "Saatler kalkış noktasına göredir. Asmalı, Topağaç ile Saraylar arasında ara duraktır.",
  notes: [
    "Ara duraklara varış saati yol durumuna göre birkaç dakika değişebilir.",
    "Yoğun yaz sezonunda ek sefer konulabilir ve saatlerde güncelleme yapılabilir.",
    "Kalkış saatinden birkaç dakika önce durakta olmanızı rica ederiz.",
  ],
  callNote: "Güncel saat bilgisi için bizi arayabilirsiniz.",
  nextLabel: "Sıradaki sefer",
  doneToday: "Bugünkü seferler tamamlandı",
  firstTomorrow: "İlk sefer yarın",
} as const;

export const ROUTE_COPY = {
  title: "Güzergâh",
  subtitle:
    "Batıda Marmara, ortada Topağaç, kuzeydoğuda Saraylar. Asmalı güzergâh üzerinde ara duraktır.",
  mapNote: "Haritadaki duraklara dokunarak kalkış saatlerini görebilirsiniz.",
} as const;

export const SERVICES = {
  title: "Hizmetlerimiz",
  subtitle: "Ana işimiz tarifeli hat seferleridir. Bunun yanında üç ek hizmet sunuyoruz.",
  items: [
    {
      id: "hat",
      name: "Tarifeli Hat Seferleri",
      description:
        "Marmara, Topağaç ve Saraylar arasında her gün belirli saatlerde kalkan minibüs seferleri. Saatimiz bellidir, sözümüz sözdür.",
      highlights: [
        "Günde 12 sefer",
        "Sabit ve net saatler",
        "Feribot saatlerine uyumlu plan",
      ],
    },
    {
      id: "tur",
      name: "Şehirler Arası Turlar ve Geziler",
      description:
        "Günübirlik geziler ve şehirler arası yolculuklar için güzergâhı birlikte planlıyor, sizi adresinizden alıyoruz.",
      highlights: [
        "Kişiye özel güzergâh",
        "Deneyimli şoförler",
        "Grup ve aile dostu fiyat",
      ],
    },
    {
      id: "servis",
      name: "Öğrenci Servisi",
      description:
        "Öğrencilerimizi her sabah okullarına güvenle götürüyor, akşam evlerine bırakıyoruz. Kayıtlar her eğitim dönemi öncesinde telefonla alınır.",
      highlights: [
        "Kapıdan okula ulaşım",
        "Sabit güzergâh ve saat",
        "Velilerle bire bir iletişim",
      ],
    },
    {
      id: "kiralama",
      name: "Özel Taşımacılık ve Şoförlü Kiralama",
      description:
        "Düğün, misafir karşılama, ekip taşıma veya özel gezi için minibüslerimiz şoförüyle birlikte kiralanır.",
      highlights: [
        "Şoförüyle birlikte kiralama",
        "16+1 oturma düzeni",
        "Net fiyat, esnek saat",
      ],
    },
  ],
  pricingNote: "Tur, öğrenci servisi ve kiralama fiyatları için",
  pricingLink: "bize ulaşın",
} as const;

export const FLEET = {
  title: "Araçlarımız",
  subtitle:
    "İki adet 16+1 koltuklu, klimalı Citroën Jumper minibüs ile hizmet veriyoruz. Araçlarımız düzenli bakımdan geçer ve her sefere temiz çıkar.",
  vehicles: [
    {
      id: "jumper-1",
      name: "Citroën Jumper",
      role: "Hat seferleri",
      specs: ["16+1 koltuk", "Klima", "Geniş bagaj"],
    },
    {
      id: "jumper-2",
      name: "Citroën Jumper",
      role: "Tur ve özel taşımacılık",
      specs: ["16+1 koltuk", "Klima", "USB şarj"],
    },
  ],
} as const;

export const ISLAND = {
  title: "Marmara Adası",
  subtitle:
    "Antik adı Prokonnesos olan Marmara Adası; mermeri, zeytinlikleri ve berrak koylarıyla Türkiye'nin ikinci büyük adasıdır.",
  paragraphs: [
    "Marmara Denizi adını bu adadan alır. Saraylar'daki mermer ocakları iki bin beş yüz yıldır işletilir; Ayasofya'nın mermerleri de buradan çıkarılmıştır. Bugün Saraylar'daki Açık Hava Mermer Müzesi ücretsiz gezilebilir.",
    "Adaya İstanbul'dan sezonluk deniz otobüsü, Erdek ve Tekirdağ'dan yıl boyu feribot seferleri vardır. Ada içinde köyler arası ulaşımı minibüs hatları sağlar. Marmara iskelesine inen yolcular, seferlerimizle Topağaç ve Saraylar yönüne aktarma yapabilir.",
  ],
  stats: [
    { value: 3, suffix: "", label: "Ana durak" },
    { value: 12, suffix: "", label: "Günlük sefer" },
    { value: 16, suffix: "+1", label: "Koltuk düzeni" },
    { value: 117, suffix: " km²", label: "Ada yüzölçümü" },
  ],
} as const;

export const FAQ = {
  title: "Sık Sorulan Sorular",
  subtitle: "Aklınıza takılan başka bir şey olursa bir telefon uzaktayız.",
  items: [
    {
      q: "Bagajım için yer var mı?",
      a: "Elbette. Minibüslerimizin bagaj hacmi valiz ve günlük eşyalarınız için yeterlidir. Büyük hacimli eşya taşıyacaksanız binmeden önce haber vermeniz yeterli.",
    },
    {
      q: "Evcil hayvanımla seyahat edebilir miyim?",
      a: "Taşıma kabı veya kafes içinde, diğer yolcuları rahatsız etmeyecek şekilde evcil hayvanınızla seyahat edebilirsiniz. Sefer öncesi kısa bir telefonla bilgi verirseniz yer düzenini ona göre yaparız.",
    },
    {
      q: "Seferler feribot saatleriyle uyumlu mu?",
      a: "Saatlerimizi feribot hareketlerini gözeterek planlıyoruz. Marmara iskelesinde çoğunlukla bekleme yaşanmaz. Feribotun rötar yaptığı günlerde kalkıştan önce arayıp teyit almanızı öneririz.",
    },
    {
      q: "Asmalı'dan binebilir miyim?",
      a: "Evet. Asmalı, Topağaç ile Saraylar arasındaki seferlerde ara duraktır. Saraylar kalkışlı seferler Asmalı'ya uğrar.",
    },
    {
      q: "Şoförlü araç kiralama nasıl yapılıyor?",
      a: "Bizi arıyorsunuz; tarih ve güzergâh netleşince size net bir fiyat veriyoruz. Araçlar her zaman deneyimli şoförümüzle birlikte kiralanır.",
    },
    {
      q: "Öğrenci servisine kayıt nasıl oluyor?",
      a: "Her eğitim dönemi öncesinde telefonla kayıt alıyoruz. Güzergâh ve saatleri velilerle birlikte planlıyor, dönem boyunca aynı düzenle taşıyoruz.",
    },
    {
      q: "Sefer saatleri değişir mi?",
      a: "Kış ve yaz dönemlerinde saatlerde güncelleme olabilir; yoğun sezonda ek sefer konulabilir. En güncel tarife için bu sayfaya bakabilir veya bizi arayabilirsiniz.",
    },
    {
      q: "Kaç kişilik grupları taşıyabilirsiniz?",
      a: "Minibüslerimiz 16+1 koltukludur. Daha kalabalık gruplar için iki aracımızla birlikte plan yapabiliyoruz; tarihiniz netleşince bizi aramanız yeterli.",
    },
  ],
} as const;

export const CONTACT_COPY = {
  title: "İletişim",
  subtitle:
    "Sefer saatleri, turlar, öğrenci servisi ve araç kiralama için arayabilir veya WhatsApp'tan yazabilirsiniz.",
  callCta: "Hemen Ara",
  whatsappCta: "WhatsApp'tan Yaz",
} as const;

/** Hero altındaki akan şerit (marquee) öğeleri */
export const MARQUEE_ITEMS = [
  "Günde 12 sefer",
  "3 ana durak",
  "Klimalı araçlar",
  "16+1 koltuk",
  "Sigortalı taşımacılık",
  "Yerel şoförler",
  "Feribot saatlerine uyumlu",
] as const;

export const NAV_LINKS = [
  { href: "#seferler", label: "Seferler" },
  { href: "#guzergah", label: "Güzergâh" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#araclar", label: "Araçlar" },
  { href: "#ada", label: "Ada" },
  { href: "#sss", label: "SSS" },
] as const;
