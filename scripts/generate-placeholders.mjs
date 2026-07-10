/**
 * SEFATUR — Sosyal medya paylaşım kartı üretici (og-image.jpg).
 * WhatsApp ve sosyal medyada link paylaşıldığında görünen karttır.
 * Çalıştırma: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const C = {
  navy: "#13233C",
  deep: "#0B1728",
  white: "#FFFFFF",
  mist: "#9FB1C4",
  glow: "#2DD4BF",
  amber: "#F5A524",
  ink: "#101D30",
};

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.navy}"/>
      <stop offset="100%" stop-color="${C.deep}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <text x="80" y="230" font-family="Arial, sans-serif" font-size="104" font-weight="900" fill="${C.white}" letter-spacing="2">SEFATUR</text>
  <text x="84" y="300" font-family="Arial, sans-serif" font-size="32" fill="${C.mist}">Marmara Adası minibüs seferleri</text>
  <!-- Rota: 3 ana durak + ara durak -->
  <g font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="${C.white}">
    <line x1="84" y1="400" x2="1120" y2="400" stroke="${C.glow}" stroke-width="3" opacity="0.5"/>
    <circle cx="100" cy="400" r="12" fill="${C.glow}"/>
    <text x="70" y="450">Marmara</text>
    <circle cx="470" cy="400" r="12" fill="${C.glow}"/>
    <text x="410" y="450">Topağaç</text>
    <circle cx="790" cy="400" r="8" fill="${C.mist}"/>
    <text x="740" y="450" font-weight="normal" fill="${C.mist}">Asmalı</text>
    <circle cx="1100" cy="400" r="12" fill="${C.glow}"/>
    <text x="1010" y="450">Saraylar</text>
  </g>
  <g transform="translate(84 510)">
    <rect x="0" y="0" width="430" height="72" rx="16" fill="${C.amber}"/>
    <text x="215" y="47" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="${C.ink}" text-anchor="middle">+90 533 655 51 18</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg), { density: 72 })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(join(OUT, "og-image.jpg"));
console.log("✓ og-image.jpg", `${W}x${H}`);
