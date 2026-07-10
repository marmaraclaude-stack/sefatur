/**
 * SEFATUR — Tüm site metinleri (tek yerden düzenlenebilir).
 * Bir metni değiştirmek için sadece bu dosyayı düzenleyin.
 */

export const BRAND = {
  name: "SEFATUR",
  tagline: "Marmara Adası'nın yol arkadaşı",
  subtitle:
    "Topağaç merkezli minibüs ve taşımacılık hizmetleri • Marmara Adası, Balıkesir",
} as const;

export const HERO = {
  headline: "Adanın Yolu Bizden Sorulur",
  /** Başlıkta turkuazla vurgulanacak kelime */
  highlight: "Bizden",
  subheadline:
    "Marmara'dan Saraylar'a beş durak, günde on iki tarifeli sefer. Topağaç merkezli SEFATUR ile ada içinde dakik, güvenli ve güler yüzlü ulaşım.",
  ctaPrimary: "Sefer Saatlerine Bak",
  ctaSecondary: "Hemen Ara",
  badges: [
    "Günde 12 tarifeli sefer",
    "5 durak, tek hat",
    "Topağaç merkezli yerli ekip",
  ],
} as const;

export const SCHEDULE_COPY = {
  eyebrow: "Tarife",
  title: "Sefer Saatleri",
  subtitle:
    "Saatlerimiz kalkış noktasına göredir. Hangi duraktan bineceğinizi seçin, gerisini bize bırakın.",
  notes: [
    "Tüm saatler kalkış noktası bazlıdır; ara duraklara varış, yol durumuna göre birkaç dakika farklılık gösterebilir.",
    "Yoğun yaz sezonunda ve feribot hareketliliğine göre ek sefer koyabilir, saatlerde küçük güncellemeler yapabiliriz.",
    "Minibüslerimiz dakiktir; kalkış saatinden birkaç dakika önce durakta olmanızı rica ederiz.",
  ],
  callNote: "Güncel saat bilgisi için Fuat Ercan'a her zaman ulaşabilirsiniz.",
} as const;

export const ROUTE_COPY = {
  eyebrow: "Güzergâh",
  title: "Hattımız: Marmara'dan Saraylar'a",
  subtitle:
    "Ada kıyısı boyunca beş durak — her biri Marmara Adası'nın başka bir yüzü.",
} as const;

export const SERVICES = {
  eyebrow: "Hizmetler",
  title: "Hizmetlerimiz",
  subtitle:
    "Ada içinde her gün, ada dışında ihtiyacınız olan her yerde: dört başlıkta taşımacılık.",
  items: [
    {
      id: "hat",
      name: "Hat Taşımacılığı",
      description:
        "Marmara–Gündoğdu–Topağaç–Asmalı–Saraylar hattında her gün tarifeli seferler. Adada işiniz nereye düşerse düşsün, saatimiz bellidir, sözümüz sözdür.",
      highlights: [
        "Günde 12 tarifeli sefer",
        "5 durakta güvenilir kalkış",
        "Feribot saatleriyle uyumlu planlama",
      ],
    },
    {
      id: "tur",
      name: "Şehirlerarası Turlar & Geziler",
      description:
        "Ada dışına mı çıkıyorsunuz? Günübirlik gezilerden şehirlerarası turlara, güzergâhı birlikte planlıyor, sizi kapınızdan alıyoruz.",
      highlights: [
        "Kişiye özel güzergâh",
        "Adayı ve yolları bilen deneyimli şoförler",
        "Grup ve aile dostu fiyatlar",
      ],
    },
    {
      id: "servis",
      name: "Öğrenci Servisi",
      description:
        "Ada içinde öğrencilerimizi her sabah ailelerin içi rahat, okula götürüyor; akşam güvenle evlerine bırakıyoruz.",
      highlights: [
        "Kapıdan okula güvenli ulaşım",
        "Sabit güzergâh, düzenli saatler",
        "Velilerle birebir iletişim",
      ],
    },
    {
      id: "kiralama",
      name: "Özel Taşımacılık & Şoförlü Kiralama",
      description:
        "Düğün, misafir karşılama, ekip taşıma ya da özel gezi... Minibüsümüz şoförüyle birlikte, istediğiniz saatte, istediğiniz yerde.",
      highlights: [
        "Şoförüyle birlikte kiralama",
        "16+1 ferah oturma düzeni",
        "Esnek saat, net fiyat",
      ],
    },
  ],
} as const;

export const FLEET = {
  eyebrow: "Filo",
  title: "Beyaz Filomuz",
  subtitle:
    "İki beyaz Citroën Jumper; adanın yollarını ezbere bilen, bakımlı ve tertemiz.",
  vehicleBlurb:
    "16+1 koltuklu panelvan minibüslerimiz düzenli bakımdan geçer, her sefere temiz ve hazır çıkar. Yüksek tavanı, geniş bagajı ve konforlu koltuklarıyla kısa hat yolculuğunda da şehirlerarası turda da rahat edersiniz.",
  vehicles: [
    {
      id: "jumper-1",
      name: "Jumper 1",
      role: "Hat seferleri",
      image: "/images/filo-minibus-1.jpg",
      specs: ["16+1 Koltuk", "Klima", "Geniş Bagaj"],
    },
    {
      id: "jumper-2",
      name: "Jumper 2",
      role: "Tur & özel taşımacılık",
      image: "/images/filo-minibus-2.jpg",
      specs: ["16+1 Koltuk", "Klima", "USB Şarj"],
    },
  ],
  marquee: [
    "Klimalı Araçlar",
    "16+1 Koltuk",
    "Sigortalı Taşımacılık",
    "Yerel Şoförler",
    "Her Gün Seferde",
    "Bakımlı Filo",
  ],
} as const;

export const ISLAND = {
  eyebrow: "Marmara Adası",
  title: "Adını Denize Veren Ada",
  subtitle:
    "Antik Prokonnesos'tan bugünün Marmara'sına — mermerin, zeytinin ve berrak koyların adası.",
  pullQuote: "Topağaç'tan Saraylar'a, bu yollar bizim mahallemiz.",
  pullQuoteAuthor: "Fuat Ercan",
  pullQuoteRole: "SEFATUR Firma Yetkilisi",
  paragraphs: [
    "Marmara Denizi'nin ortasında, adını koca bir denize vermiş bir ada düşünün: Türkiye'nin ikinci büyük adası Marmara; zeytinlikleri, çam ormanları ve berrak koylarıyla Balıkesir'in denizdeki incisidir.",
    "Antik çağdaki adı Prokonnesos'tu; buradan çıkarılan beyaz mermer Ayasofya'dan Roma saraylarına kadar taşındı. Bugün Saraylar'daki ocaklar ve Açık Hava Mermer Müzesi, bu binlerce yıllık hikâyeyi hâlâ anlatıyor.",
    "Adada hayat sakindir ama yollar hiç boş kalmaz: köyler arasında işe, okula, pazara, iskeleye gidenlerin yolu mutlaka bir yerde SEFATUR'la kesişir. Biz de bu yolları, komşularımızı taşır gibi özenle gidip geliyoruz.",
  ],
  stats: [
    { value: 5, suffix: "", label: "Durak: Marmara'dan Saraylar'a" },
    { value: 12, suffix: "", label: "Günlük tarifeli sefer" },
    { value: 17, suffix: "", label: "Koltuk: 16+1 oturma düzeni" },
    { value: 117, suffix: " km²", label: "Türkiye'nin 2. büyük adası" },
  ],
  images: {
    harbor: "/images/ada-liman.jpg",
    cove: "/images/ada-koy.jpg",
    marble: "/images/saraylar-mermer.jpg",
  },
} as const;

export const FAQ = {
  eyebrow: "SSS",
  title: "Merak Edilenler",
  subtitle: "Aklınıza takılan başka bir şey varsa bir telefon uzaktayız.",
  items: [
    {
      q: "Bagajım için yer var mı?",
      a: "Elbette. Minibüslerimizin bagaj hacmi valiz, pazar arabası ve günlük eşyalarınız için fazlasıyla yeterli. Büyük hacimli bir eşya taşıyacaksanız binmeden önce 0533 655 51 18'den haber vermeniz yeterli.",
    },
    {
      q: "Evcil hayvanımla seyahat edebilir miyim?",
      a: "Taşıma kabı veya kafes içinde, diğer yolcularımızı rahatsız etmeyecek şekilde evcil dostlarınızı ağırlıyoruz. Sefer öncesi kısa bir telefonla bilgi verirseniz yerinizi buna göre ayarlarız.",
    },
    {
      q: "Seferler feribot saatleriyle uyumlu mu?",
      a: "Hattımızı feribot hareketlerini gözeterek planlıyoruz; Marmara iskelesine iniş ve binişlerde çoğunlukla bekleme yaşanmaz. Yine de feribot rötarı olabilen günlerde kalkıştan önce bizi arayıp teyit almanızı öneririz.",
    },
    {
      q: "Şoförlü araç kiralama nasıl yapılıyor?",
      a: "Fuat Ercan'ı arıyorsunuz; tarih ve güzergâh netleşince size net bir fiyat veriyoruz, o kadar. Araçlarımız her zaman deneyimli şoförümüzle birlikte kiralanır; siz sadece yolculuğun keyfini çıkarırsınız.",
    },
    {
      q: "Öğrenci servisine kayıt nasıl oluyor?",
      a: "Her eğitim dönemi öncesinde telefonla kayıt alıyoruz. Güzergâh ve saatleri velilerimizle birlikte planlıyor, dönem boyunca aynı düzenle, aynı özenle taşıyoruz.",
    },
    {
      q: "Sefer saatleri değişir mi?",
      a: "Kış ve yaz dönemlerinde ada hayatının ritmine göre saatlerde güncelleme olabilir; yoğun sezonda ek sefer de koyabiliyoruz. En güncel tarife için sayfamızdaki saatlere bakabilir veya 0533 655 51 18'i arayabilirsiniz.",
    },
  ],
} as const;

export const CONTACT_COPY = {
  eyebrow: "İletişim",
  title: "Yerinizi Ayırtın, Gerisini Bize Bırakın",
  subtitle:
    "Sefer, tur, öğrenci servisi ya da şoförlü kiralama... Tek telefon yeter. Yetkilimiz Fuat Ercan tüm sorularınızı yanıtlıyor.",
  callCta: "Hemen Ara",
  whatsappCta: "WhatsApp'tan Yaz",
  closingLine: "Saraylar mermeri kadar sağlam söz: vaktinde kalkar, güvenle varırız.",
} as const;

export const NAV_LINKS = [
  { href: "#seferler", label: "Seferler" },
  { href: "#guzergah", label: "Güzergâh" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#filo", label: "Filo" },
  { href: "#ada", label: "Ada" },
  { href: "#sss", label: "SSS" },
] as const;
