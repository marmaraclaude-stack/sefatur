/**
 * SEFATUR — Tek doğruluk kaynağı (single source of truth).
 * Sefer saatleri, iletişim bilgileri ve duraklar burada tutulur.
 * Saat güncellemesi gerektiğinde SADECE bu dosyayı düzenlemeniz yeterlidir.
 */

export const CONTACT = {
  name: "Fuat Ercan",
  title: "Firma Yetkilisi",
  phoneDisplay: "+90 533 655 51 18",
  phoneHref: "tel:+905336555118",
  whatsappHref:
    "https://wa.me/905336555118?text=Merhaba%2C%20SEFATUR%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
  base: "Topağaç Köyü, Marmara Adası / Balıkesir",
} as const;

export type Departure = {
  /** Kalkış saati, "HH:MM" 24 saat formatında */
  time: string;
  /** Varış noktası */
  to: string;
  /** Uğranan ara noktalar, ör. "Asmalı üzerinden" (yoksa boş bırakılır) */
  via?: string;
};

export type DeparturePoint = {
  id: string;
  /** Kalkış noktası adı */
  name: string;
  departures: Departure[];
};

/**
 * Firma yetkilisinin verdiği güncel tarife.
 * Varışlar iki minibüslü işletme zincirinden türetilmiştir
 * (duraklar arası yol yaklaşık 20-25 dakikadır):
 * sabah Topağaç çıkışları Marmara'ya iner, 12:15 Marmara aracı
 * 12:40'ta Topağaç'tan Saraylar'a devam eder, 16:15 Marmara aracı
 * 18:00 Saraylar seferini yapabilmek için Saraylar'a gider,
 * Saraylar çıkışları Asmalı ve Topağaç üzerinden Marmara'ya iner.
 */
export const SCHEDULE: DeparturePoint[] = [
  {
    id: "topagac",
    name: "Topağaç",
    departures: [
      { time: "08:30", to: "Marmara" },
      { time: "10:00", to: "Marmara" },
      { time: "12:40", to: "Saraylar", via: "Asmalı üzerinden" },
      { time: "14:45", to: "Marmara" },
      { time: "18:30", to: "Marmara" },
    ],
  },
  {
    id: "marmara",
    name: "Marmara",
    departures: [
      { time: "12:15", to: "Topağaç" },
      { time: "13:30", to: "Topağaç" },
      { time: "16:15", to: "Saraylar", via: "Topağaç ve Asmalı üzerinden" },
      { time: "19:30", to: "Topağaç" },
    ],
  },
  {
    id: "saraylar",
    name: "Saraylar",
    departures: [
      { time: "14:20", to: "Marmara", via: "Asmalı ve Topağaç üzerinden" },
      { time: "18:00", to: "Marmara", via: "Asmalı ve Topağaç üzerinden" },
    ],
  },
];

export type Stop = {
  id: string;
  name: string;
  /** main: ana durak, via: ara durak */
  kind: "main" | "via";
  blurb: string;
};

/** Duraklar: 3 ana durak + güzergâh üzerinde ara durak Asmalı. */
export const STOPS: Stop[] = [
  {
    id: "marmara",
    name: "Marmara",
    kind: "main",
    blurb: "Adanın merkezi ve feribot iskelesi. Hattın batı ucu.",
  },
  {
    id: "topagac",
    name: "Topağaç",
    kind: "main",
    blurb: "SEFATUR'un merkezi. Hattın orta noktası.",
  },
  {
    id: "asmali",
    name: "Asmalı",
    kind: "via",
    blurb: "Topağaç ile Saraylar arasında ara durak.",
  },
  {
    id: "saraylar",
    name: "Saraylar",
    kind: "main",
    blurb: "Mermer ocaklarının ve Abroz'un bulunduğu mahalle.",
  },
];
