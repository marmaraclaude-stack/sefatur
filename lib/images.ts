/**
 * SEFATUR — Görsel yapılandırması (tek yerden düzenlenebilir).
 *
 * KENDİ FOTOĞRAFLARINIZI KOYMAK İÇİN:
 * 1. Fotoğrafı GitHub'da public/images/ klasörüne yükleyin
 *    ("Commit changes" derken bu branch'i seçtiğinizden emin olun)
 * 2. Aşağıdaki ilgili "src" değerini "/images/dosyaadi.jpg" yapın
 * 3. Commit edin; Vercel 1-2 dakika içinde siteyi günceller.
 *
 * Şu an geçici olarak Pexels stok fotoğrafları kullanılıyor (hotlink).
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
  /** Hero bölümündeki araç fotoğrafı (yerine: /images/FleetHero.jpg) */
  heroVehicle: {
    src: "https://images.pexels.com/photos/13297280/pexels-photo-13297280.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "SEFATUR minibüsü",
  },
  /** Araçlarımız: Citroën Jumper (yerine: /images/Fleet1.jpg) */
  fleet1: {
    src: "https://images.pexels.com/photos/18687549/pexels-photo-18687549.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Citroën Jumper minibüs",
  },
  /** Araçlarımız: Opel Movano (yerine: /images/Fleet2.jpg) */
  fleet2: {
    src: "https://images.pexels.com/photos/13731636/pexels-photo-13731636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Opel Movano minibüs",
  },
  /** Ada bölümü, büyük fotoğraf: Marmara (yerine: /images/Marmara.jpg) */
  placeMarmara: {
    src: "https://images.pexels.com/photos/23962081/pexels-photo-23962081.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Marmara merkezden bir görünüm",
    label: "Marmara",
  },
  /** Ada bölümü: Topağaç (yerine: /images/Topagac.jpg) */
  placeTopagac: {
    src: "https://images.pexels.com/photos/34482767/pexels-photo-34482767.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Topağaç köyünden bir görünüm",
    label: "Topağaç",
  },
  /** Ada bölümü: Saraylar (yerine: /images/Saraylar.jpg) */
  placeSaraylar: {
    src: "https://images.pexels.com/photos/13081252/pexels-photo-13081252.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Saraylar'dan bir görünüm",
    label: "Saraylar",
  },
};
