# Fotoğrafları Değiştirme Rehberi

Sitedeki tüm fotoğraflar bu klasörde (`public/images/`) durur.
Hangi fotoğrafın nerede kullanıldığı **`lib/images.ts`** dosyasında tanımlıdır.

## Bir fotoğrafı değiştirmek için

1. Yeni fotoğrafı bu klasöre yükleyin.
   GitHub'da: bu klasöre girin, "Add file" ve "Upload files" ile yükleyin, Commit edin.
   Dosya adında boşluk ve Türkçe karakter kullanmayın. Örnek: `arac-1.jpg`
2. `lib/images.ts` dosyasını açın (GitHub'da kalem simgesiyle düzenlenir).
3. İlgili bölümün `src` değerini kendi dosyanızla değiştirin:

   ```
   heroVehicle: {
     src: "/images/arac-1.jpg",
     alt: "SEFATUR minibüsü Topağaç'ta",
   },
   ```

4. Commit edin. Vercel 1-2 dakika içinde siteyi otomatik günceller.

## Fotoğraf bölümleri (lib/images.ts içindeki isimler)

| İsim | Dosya | Nerede görünür | Kırpma oranı |
|---|---|---|---|
| `heroVehicle` | `fleet-hero.jpg` | Açılış (hero) bölümündeki büyük fotoğraf | 4:3 |
| `fleet1` | `fleet-1.jpg` | Araçlarımız, Citroën Jumper kartı | 16:10 |
| `fleet2` | `fleet-2.jpg` | Araçlarımız, Opel Movano kartı | 16:10 |
| `placeMarmara` | `marmara.jpg` | Marmara Adası bölümü, büyük fotoğraf | serbest yükseklik |
| `placeTopagac` | `topagac-2.jpg` | Marmara Adası bölümü, alt sol | 16:9 |
| `placeSaraylar` | `saraylar.jpg` | Marmara Adası bölümü, alt sağ | 16:9 |

**İpuçları**
- `logo.png` üst menüdeki logodur. Tarayıcı sekmesi simgeleri `app/icon.png`
  ve `app/apple-icon.png` dosyalarıdır.
- Yatay (genişlik > yükseklik) fotoğraflar kullanın.
- Dosya boyutunu 700 KB altında tutun ([squoosh.app](https://squoosh.app) ile küçültebilirsiniz).
- `og-image.jpg` dosyası WhatsApp/sosyal medya paylaşım kartıdır; değiştirmek isterseniz
  1200x630 boyutunda aynı isimle yükleyin.
