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

export type DeparturePoint = {
  id: string;
  /** Kalkış noktası adı */
  name: string;
  /** Varış / yön */
  to: string;
  /** Kalkış saatleri, "HH:MM" 24 saat formatında */
  times: string[];
  /** Kısa açıklama (ara durak bilgisi vb.) */
  note: string;
};

/** Firma yetkilisinin verdiği güncel tarife. */
export const SCHEDULE: DeparturePoint[] = [
  {
    id: "topagac",
    name: "Topağaç",
    to: "Marmara",
    times: ["08:30", "10:00", "12:40", "14:45", "18:30"],
    note: "Topağaç kalkışlı seferler Marmara merkeze gider.",
  },
  {
    id: "marmara",
    name: "Marmara",
    to: "Topağaç",
    times: ["12:15", "13:30", "16:15", "19:30"],
    note: "Marmara kalkışlı seferler Topağaç yönüne gider.",
  },
  {
    id: "saraylar",
    name: "Saraylar",
    to: "Marmara",
    times: ["14:20", "18:00"],
    note: "Saraylar kalkışlı seferler Asmalı ve Topağaç üzerinden Marmara merkeze gider.",
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
