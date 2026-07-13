/**
 * SEFATUR — Görsel yapılandırması (tek yerden düzenlenebilir).
 *
 * Tüm fotoğraflar public/images/ klasöründe durur.
 * BİR FOTOĞRAFI DEĞİŞTİRMEK İÇİN:
 * 1. Yeni fotoğrafı GitHub'da public/images/ klasörüne yükleyin
 *    (dosya adında boşluk ve Türkçe karakter kullanmayın)
 * 2. Aşağıdaki ilgili "src" değerini "/images/dosyaadi.jpg" yapın
 * 3. Commit edin; Vercel 1-2 dakika içinde siteyi günceller.
 */

export type ImageSlot = {
  src: string;
  alt: string;
};

/** Konum kartlı yer fotoğrafları (Marmara Adası bölümü) */
export type PlaceSlot = ImageSlot & {
  /** Fotoğraf üzerindeki konum kartında görünen ad */
  label: string;
};

export const IMAGES: {
  heroVehicle: ImageSlot;
  fleet1: ImageSlot;
  fleet2: ImageSlot;
  placeMarmara: PlaceSlot;
  placeTopagac: PlaceSlot;
  placeSaraylar: PlaceSlot;
} = {
  /** Hero bölümündeki araç fotoğrafı */
  heroVehicle: {
    src: "/images/fleet-hero-2.jpg",
    alt: "SEFATUR'un iki minibüsü akşam saatinde meydanda yan yana",
  },
  /** Araçlarımız: Citroën Jumper (10 AOT 182) */
  fleet1: {
    src: "/images/fleet-1.jpg",
    alt: "Citroën Jumper minibüsümüz Marmara Adası iskele binasının önünde",
  },
  /** Araçlarımız: Opel Movano (10 AYC 533) */
  fleet2: {
    src: "/images/fleet-2.jpg",
    alt: "Opel Movano minibüsümüz iskele meydanında",
  },
  /** Ada bölümü, büyük fotoğraf: Marmara */
  placeMarmara: {
    src: "/images/marmara.jpg",
    alt: "Marmara merkezin ve limanın tepeden görünümü",
    label: "Marmara",
  },
  /** Ada bölümü: Topağaç */
  placeTopagac: {
    src: "/images/topagac-2.jpg",
    alt: "Topağaç köyünün, limanının ve plajının havadan görünümü",
    label: "Topağaç",
  },
  /** Ada bölümü: Saraylar */
  placeSaraylar: {
    src: "/images/saraylar.jpg",
    alt: "Saraylar sahili ve kumsalı",
    label: "Saraylar",
  },
};
