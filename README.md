# SEFATUR — Marmara Adası Minibüs Seferleri

Marmara Adası'nda **Marmara – Gündoğdu – Topağaç – Asmalı – Saraylar** hattında
yolcu taşımacılığı yapan SEFATUR'un tek sayfalık tanıtım sitesi.

## ✏️ Sık yapılacak güncellemeler (kod bilgisi gerektirmez)

| Ne değişecek? | Hangi dosya? |
|---|---|
| **Sefer saatleri** | [`lib/data.ts`](lib/data.ts) → `SCHEDULE` içindeki `times` dizileri |
| Telefon / WhatsApp | [`lib/data.ts`](lib/data.ts) → `CONTACT` |
| Site metinleri (başlıklar, hizmetler, SSS...) | [`lib/copy.ts`](lib/copy.ts) |
| Fotoğraflar | [`public/images/`](public/images/) — aynı dosya adıyla değiştirin, rehber klasörün içinde |

GitHub'da dosyaya girip kalem simgesine tıklayın, düzenleyin, **Commit changes**
deyin — Vercel 1-2 dakika içinde siteyi otomatik günceller.

## 🚀 Vercel'e ilk kurulum

1. [vercel.com](https://vercel.com) → **Add New Project** → bu GitHub deposunu seçin.
2. Framework otomatik algılanır (Next.js). Hiçbir ayar değiştirmeden **Deploy**.
3. Yayın sonrası kendi alan adınızı (örn. `sefatur.com`) Project → Domains'ten bağlayabilirsiniz.
4. Alan adı bağlarsanız `app/layout.tsx`, `app/robots.ts` ve `app/sitemap.ts`
   içindeki `sefatur.vercel.app` adreslerini kendi adresinizle değiştirin.

## 🛠 Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
```

**Teknolojiler:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 ·
Motion (animasyonlar) · Lucide (ikonlar)

## 📁 Yapı

```
app/            sayfa, layout, SEO (robots, sitemap, favicon)
components/
  site/         sayfa bölümleri (hero, sefer panosu, güzergâh, filo, ...)
  ui/           ortak parçalar (başlık, dalga ayracı, sayaç, kayan şerit)
lib/            veriler (data.ts), metinler (copy.ts), yardımcılar
public/images/  fotoğraflar (değiştirme rehberi klasörde)
scripts/        yer tutucu görsel üretici
```
