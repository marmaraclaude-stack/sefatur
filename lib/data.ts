/**
 * SEFATUR — Tek doğruluk kaynağı (single source of truth).
 * Sefer saatleri, iletişim bilgileri ve rota burada tutulur.
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
  /** Kalkış saatleri — "HH:MM" 24 saat formatında */
  times: string[];
  /** Kısa açıklama */
  note: string;
};

/** Fotoğraftaki resmi tarifeden birebir alınmıştır. */
export const SCHEDULE: DeparturePoint[] = [
  {
    id: "topagac",
    name: "Topağaç",
    times: ["08:30", "10:00", "12:40", "14:30", "18:30"],
    note: "Topağaç'tan Marmara yönüne kalkış",
  },
  {
    id: "marmara",
    name: "Marmara",
    times: ["10:30", "12:15", "13:30", "16:15", "19:30"],
    note: "Marmara merkezden Topağaç yönüne kalkış",
  },
  {
    id: "saraylar",
    name: "Saraylar",
    times: ["14:00", "18:00"],
    note: "Saraylar'dan Marmara yönüne kalkış",
  },
];

export type RouteStop = {
  id: string;
  name: string;
  blurb: string;
};

/** Ana hat güzergâhı — batıdan doğuya */
export const ROUTE_STOPS: RouteStop[] = [
  {
    id: "marmara",
    name: "Marmara",
    blurb:
      "Adanın merkezi ve feribot iskelesi — İstanbul ve Erdek bağlantılarının kalbi.",
  },
  {
    id: "gundogdu",
    name: "Gündoğdu",
    blurb: "Güney kıyısının sakin köyü; zeytinlikler ve deniz manzarası.",
  },
  {
    id: "topagac",
    name: "Topağaç",
    blurb: "SEFATUR'un evi — adanın iç kesimindeki şirin köyümüz.",
  },
  {
    id: "asmali",
    name: "Asmalı",
    blurb: "Doğu yamaçlarında bağların ve asmaların köyü.",
  },
  {
    id: "saraylar",
    name: "Saraylar",
    blurb:
      "Dünyaca ünlü Prokonnesos mermerinin başkenti; açık hava mermer müzesi.",
  },
];
