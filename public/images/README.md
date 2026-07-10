# Görselleri Değiştirme Rehberi

Bu klasördeki görseller **yer tutucudur** (elle çizilmiş illüstrasyonlar).
Kendi fotoğraflarınızı koymak için yapmanız gereken tek şey:

> **Aynı dosya adıyla** yeni fotoğrafı bu klasöre yüklemek.
> GitHub'da bu klasöre girin → dosyaya tıklayın → sağ üstten çöp kutusuyla silin →
> "Add file → Upload files" ile aynı isimde yenisini yükleyin → Commit.
> Vercel otomatik olarak yeniden yayınlar (1-2 dk).

## Dosyalar ve nerede kullanıldıkları

| Dosya | Kullanıldığı yer | Önerilen boyut |
|---|---|---|
| `hero-ada.jpg` | Güzergâh bölümü arka planı (koyu tema üstünde soluk) | 1920×1280, yatay |
| `filo-minibus-1.jpg` | Filo — 1. minibüs kartı | 1600×1100, yatay |
| `filo-minibus-2.jpg` | Filo — 2. minibüs kartı | 1600×1100, yatay |
| `ada-liman.jpg` | Ada bölümü — büyük fotoğraf | 1600×1100, yatay |
| `ada-koy.jpg` | Ada bölümü — küçük üstteki fotoğraf | 1600×1100, yatay |
| `saraylar-mermer.jpg` | Ada bölümü — mermer doku çipi | 1600×1100 (kare kırpılır) |
| `og-image.jpg` | WhatsApp/sosyal medyada link paylaşım kartı | 1200×630 (bu oran önemli) |

**İpuçları**
- Minibüs fotoğraflarını gündüz, hafif yandan (3/4 açı) çekin; arkada deniz/köy görünürse harika olur.
- Dosya boyutunu 500 KB altında tutun (fotoğrafı [squoosh.app](https://squoosh.app) ile küçültebilirsiniz).
- Dosya adını ve uzantısını (`.jpg`) değiştirmeyin; kod bu adlara bakar.

## Hazır stok fotoğraf önerileri (ücretsiz, indirip aynı adla yükleyin)

- Turkuaz deniz / ada manzarası: <https://www.pexels.com/photo/turquoise-water-by-a-rocky-shore-23962081/>
- Deniz kıyısı panorama: <https://www.pexels.com/photo/15598031/>
- Liman & tekneler (Mersin, Türkiye): <https://www.pexels.com/photo/boats-moored-at-a-sea-harbor-mersin-turkey-13081252/>
- Beyaz panelvan minibüs: <https://www.pexels.com/photo/white-van-parked-on-the-street-13297280/>
- Beyaz minibüs (yol kenarı): <https://www.pexels.com/photo/a-white-van-is-parked-on-the-side-of-the-road-18687549/>
- Beyaz Sprinter (Unsplash): <https://unsplash.com/photos/p_ILi6tlMwM>
- Beyaz mermer doku: <https://www.pexels.com/photo/white-marble-surface-texture-6634145/>
- Sahil yolu: <https://www.pexels.com/photo/road-on-sea-coast-16891801/>
- Berrak koy: <https://www.pexels.com/photo/scenic-beach-cove-with-turquoise-waters-31934689/>

> Yer tutucu illüstrasyonları yeniden üretmek isterseniz:
> `node scripts/generate-placeholders.mjs`
