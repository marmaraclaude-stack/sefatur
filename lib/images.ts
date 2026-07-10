/**
 * SEFATUR — Görsel yapılandırması (tek yerden düzenlenebilir).
 *
 * KENDİ FOTOĞRAFLARINIZI KOYMAK İÇİN:
 * 1. Fotoğrafı GitHub'da public/images/ klasörüne yükleyin
 *    (örnek dosya adı: arac-1.jpg)
 * 2. Aşağıdaki ilgili "src" değerini "/images/arac-1.jpg" yapın
 * 3. Commit edin; Vercel 1-2 dakika içinde siteyi günceller.
 *
 * Şu an geçici olarak Pexels stok fotoğrafları kullanılıyor (hotlink).
 * Bir stok fotoğraf açılmazsa src'yi başka bir Pexels fotoğrafının
 * adresiyle veya kendi dosyanızla değiştirmeniz yeterli.
 */

export type ImageSlot = {
  src: string;
  alt: string;
};

export const IMAGES: Record<
  "heroVehicle" | "fleet1" | "fleet2" | "islandSea" | "islandHarbor" | "islandVillage",
  ImageSlot
> = {
  /** Hero bölümündeki araç fotoğrafı */
  heroVehicle: {
    src: "https://images.pexels.com/photos/13297280/pexels-photo-13297280.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Beyaz panelvan minibüs",
  },
  /** Araçlarımız bölümü, 1. araç */
  fleet1: {
    src: "https://images.pexels.com/photos/18687549/pexels-photo-18687549.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Beyaz minibüs, hat seferleri aracı",
  },
  /** Araçlarımız bölümü, 2. araç */
  fleet2: {
    src: "https://images.pexels.com/photos/13731636/pexels-photo-13731636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Beyaz minibüs, tur ve özel taşımacılık aracı",
  },
  /** Marmara Adası bölümü, deniz fotoğrafı */
  islandSea: {
    src: "https://images.pexels.com/photos/23962081/pexels-photo-23962081.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Kayalık kıyıda berrak turkuaz deniz",
  },
  /** Marmara Adası bölümü, liman fotoğrafı */
  islandHarbor: {
    src: "https://images.pexels.com/photos/13081252/pexels-photo-13081252.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Limanda demirli balıkçı tekneleri",
  },
  /** Marmara Adası bölümü, köy fotoğrafı */
  islandVillage: {
    src: "https://images.pexels.com/photos/34482767/pexels-photo-34482767.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Taş evli bir Ege köyü sokağı",
  },
};
