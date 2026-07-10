import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Figtree,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://sefatur.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SEFATUR — Marmara Adası Minibüs Seferleri | Sefer Saatleri",
    template: "%s | SEFATUR",
  },
  description:
    "Marmara Adası'nda Marmara–Gündoğdu–Topağaç–Asmalı–Saraylar hattında güncel minibüs sefer saatleri. Turlar, öğrenci servisi ve şoförlü araç kiralama: 0533 655 51 18",
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
    title: "SEFATUR — Marmara Adası'nın Yol Arkadaşı",
    description:
      "Marmara–Gündoğdu–Topağaç–Asmalı–Saraylar hattında tarifeli seferler, turlar, öğrenci servisi ve şoförlü araç kiralama. ☎ 0533 655 51 18",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEFATUR — Marmara Adası minibüs seferleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEFATUR — Marmara Adası Minibüs Seferleri",
    description:
      "Marmara–Topağaç–Saraylar hattı sefer saatleri ve özel taşımacılık. ☎ 0533 655 51 18",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B2239",
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
      className={`${bricolage.variable} ${figtree.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
