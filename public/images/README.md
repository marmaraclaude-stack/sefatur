# Fotoğrafları Değiştirme Rehberi

Sitedeki fotoğraflar şu an **Pexels stok fotoğrafları** olarak internetten geliyor.
Hangi fotoğrafın nerede kullanıldığı **`lib/images.ts`** dosyasında tanımlıdır.

## Kendi fotoğrafınızı koymak için

1. Fotoğrafı bu klasöre (`public/images/`) yükleyin.
   GitHub'da: bu klasöre girin, "Add file" ve "Upload files" ile yükleyin, Commit edin.
   Örnek dosya adı: `arac-1.jpg`
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

| İsim | Nerede görünür | Önerilen kare |
|---|---|---|
| `heroVehicle` | Açılış (hero) bölümündeki büyük araç fotoğrafı | Aracın 3/4 açıdan, gündüz çekimi |
| `fleet1` | Araçlarımız bölümü, 1. araç | Araç dış çekim |
| `fleet2` | Araçlarımız bölümü, 2. araç | Araç dış veya iç çekim |
| `islandSea` | Marmara Adası bölümü, 1. fotoğraf | Deniz veya koy |
| `islandHarbor` | Marmara Adası bölümü, 2. fotoğraf | İskele veya liman |
| `islandVillage` | Marmara Adası bölümü, 3. fotoğraf | Köyden bir görünüm |

**İpuçları**
- Yatay (genişlik > yükseklik) fotoğraflar kullanın; alanlar 4:3 ve 16:10 oranında kırpılır.
- Dosya boyutunu 500 KB altında tutun ([squoosh.app](https://squoosh.app) ile küçültebilirsiniz).
- `og-image.jpg` dosyası WhatsApp/sosyal medya paylaşım kartıdır; değiştirmek isterseniz
  1200x630 boyutunda aynı isimle yükleyin.
