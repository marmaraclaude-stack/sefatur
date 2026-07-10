import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/ui/motion-provider";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "SEFATUR | Marmara Adası Minibüs Sefer Saatleri",
    template: "%s | SEFATUR",
  },
  description:
    "Marmara Adası'nda Marmara, Topağaç ve Saraylar arasında güncel minibüs sefer saatleri. Turlar, öğrenci servisi ve şoförlü araç kiralama: 0533 655 51 18",
  keywords: [
    "Marmara Adası minibüs",
    "Marmara Adası sefer saatleri",
    "Sefatur",
    "Topağaç minibüs",
    "Saraylar minibüs saatleri",
    "Marmara Adası ulaşım",
    "Asmalı köyü ulaşım",
    "Marmara Adası öğrenci servisi",
    "Marmara Adası araç kiralama",
    "Balıkesir Marmara ilçesi ulaşım",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "SEFATUR",
    title: "SEFATUR | Marmara Adası Minibüs Seferleri",
    description:
      "Marmara, Topağaç ve Saraylar arasında tarifeli seferler. Turlar, öğrenci servisi ve şoförlü araç kiralama. Tel: 0533 655 51 18",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEFATUR Marmara Adası minibüs seferleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEFATUR | Marmara Adası Minibüs Seferleri",
    description:
      "Marmara, Topağaç ve Saraylar arasında tarifeli seferler. Tel: 0533 655 51 18",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#13233C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        {/* JS kapalıyken motion'ın gizli başlangıç stillerini etkisizleştir */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
