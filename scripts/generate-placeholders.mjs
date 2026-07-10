/**
 * SEFATUR — Yer tutucu görsel üretici.
 * Elle çizilmiş SVG sahnelerini gerçek JPG dosyalarına dönüştürür.
 * Kendi fotoğraflarınızı koymak için public/images/ altındaki dosyaları
 * AYNI İSİMLE değiştirmeniz yeterlidir (bkz. public/images/README.md).
 *
 * Çalıştırma: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");
mkdirSync(OUT, { recursive: true });

// ————— Marka paleti —————
const C = {
  navy900: "#071426",
  navy800: "#0A1F33",
  navy700: "#0F2C47",
  navy600: "#16405F",
  sea500: "#1E6E8C",
  sea400: "#2E8FA8",
  turq: "#3FB8C9",
  turqLight: "#7FD6DE",
  foam: "#DFF3F4",
  marble: "#F7F5F0",
  marbleShade: "#E5E0D5",
  sand: "#EAD9B0",
  amber: "#F2A33C",
  amberDeep: "#D97B29",
  white: "#FFFFFF",
  ink: "#122033",
};

const rand = (() => {
  // deterministik pseudo-random — her çalıştırmada aynı görsel
  let s = 42;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
})();

// ————— Yardımcılar —————
function waves(width, y, amp, wl, color, opacity, thickness = 0) {
  let d = `M 0 ${y}`;
  for (let x = 0; x <= width + wl; x += wl) {
    d += ` q ${wl / 4} ${-amp} ${wl / 2} 0 q ${wl / 4} ${amp} ${wl / 2} 0`;
  }
  if (thickness > 0) {
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${thickness}" opacity="${opacity}" stroke-linecap="round"/>`;
  }
  d += ` L ${width} ${y + 600} L 0 ${y + 600} Z`;
  return `<path d="${d}" fill="${color}" opacity="${opacity}"/>`;
}

function seagulls(cx, cy, scale, color) {
  const g = (x, y, s) =>
    `<path d="M ${x - 14 * s} ${y} Q ${x - 7 * s} ${y - 9 * s} ${x} ${y} Q ${x + 7 * s} ${y - 9 * s} ${x + 14 * s} ${y}" fill="none" stroke="${color}" stroke-width="${2.6 * s}" stroke-linecap="round"/>`;
  return g(cx, cy, scale) + g(cx + 42 * scale, cy - 18 * scale, scale * 0.72) + g(cx - 36 * scale, cy - 30 * scale, scale * 0.55);
}

function sailboat(x, y, s, hull = C.navy800, sail = C.white) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -26 0 L 26 0 L 16 12 L -16 12 Z" fill="${hull}"/>
    <rect x="-1.6" y="-46" width="3.2" height="46" fill="${hull}"/>
    <path d="M 2 -44 L 24 -6 L 2 -6 Z" fill="${sail}"/>
    <path d="M -2 -38 L -18 -6 L -2 -6 Z" fill="${sail}" opacity="0.92"/>
  </g>`;
}

// Beyaz panelvan minibüs (Citroën Jumper tarzı) — yandan görünüm
function minibus(x, y, s, { plate = "10 ACM 359", sign = "TOPAĞAÇ" } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <!-- gölge -->
    <ellipse cx="0" cy="118" rx="245" ry="16" fill="${C.ink}" opacity="0.18"/>
    <!-- gövde -->
    <path d="M -230 108
             L -230 -8 Q -230 -78 -168 -84
             L 118 -84 Q 172 -84 204 -46
             L 228 -10 Q 232 -4 232 6
             L 232 96 Q 232 108 220 108 Z"
          fill="${C.white}" stroke="#C9CFD6" stroke-width="3"/>
    <!-- alt eşik (koyu plastik) -->
    <path d="M -230 78 L 232 78 L 232 96 Q 232 108 220 108 L -230 108 Z" fill="#2B3138"/>
    <!-- camlar bandı -->
    <rect x="-206" y="-66" width="88" height="52" rx="10" fill="${C.navy700}"/>
    <rect x="-106" y="-66" width="88" height="52" rx="10" fill="${C.navy700}"/>
    <rect x="-6" y="-66" width="88" height="52" rx="10" fill="${C.navy700}"/>
    <!-- ön cam -->
    <path d="M 96 -66 L 122 -66 Q 164 -66 190 -36 L 204 -16 L 96 -16 Z" fill="${C.sea400}" opacity="0.9"/>
    <!-- cam yansımaları -->
    <path d="M -196 -64 L -168 -14 L -184 -14 L -206 -52 Z" fill="${C.white}" opacity="0.18"/>
    <path d="M -96 -64 L -68 -14 L -84 -14 L -106 -52 Z" fill="${C.white}" opacity="0.18"/>
    <path d="M 108 -60 L 150 -20 L 128 -20 L 100 -52 Z" fill="${C.white}" opacity="0.25"/>
    <!-- tabela -->
    <rect x="112" y="-58" width="74" height="20" rx="4" fill="#1D4ED8"/>
    <text x="149" y="-43" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="${C.white}" text-anchor="middle">${sign}</text>
    <!-- kapı çizgileri -->
    <line x1="6" y1="-70" x2="6" y2="76" stroke="#C9CFD6" stroke-width="3"/>
    <line x1="92" y1="-70" x2="92" y2="76" stroke="#C9CFD6" stroke-width="3"/>
    <!-- kapı kolu -->
    <rect x="60" y="6" width="26" height="6" rx="3" fill="#9AA3AC"/>
    <!-- far -->
    <path d="M 214 -8 Q 232 -6 232 8 L 232 22 L 208 22 Q 202 6 214 -8 Z" fill="${C.sand}"/>
    <!-- tampon -->
    <path d="M 200 96 L 232 96 L 232 74 Q 218 70 206 78 Z" fill="#3A4148" opacity="0.5"/>
    <!-- şerit -->
    <path d="M -230 44 L 232 44 L 232 54 L -230 54 Z" fill="${C.turq}" opacity="0.85"/>
    <path d="M -230 58 L 232 58 L 232 62 L -230 62 Z" fill="${C.amber}" opacity="0.9"/>
    <!-- tekerlekler -->
    <g>
      <circle cx="-138" cy="104" r="34" fill="#1B2026"/>
      <circle cx="-138" cy="104" r="19" fill="#8B939B"/>
      <circle cx="-138" cy="104" r="8" fill="#4A525B"/>
      <circle cx="138" cy="104" r="34" fill="#1B2026"/>
      <circle cx="138" cy="104" r="19" fill="#8B939B"/>
      <circle cx="138" cy="104" r="8" fill="#4A525B"/>
    </g>
    <!-- plaka -->
    <rect x="8" y="82" width="92" height="20" rx="3" fill="${C.white}" stroke="#8B939B" stroke-width="2"/>
    <rect x="8" y="82" width="10" height="20" rx="2" fill="#1D4ED8"/>
    <text x="58" y="97" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="${C.ink}" text-anchor="middle">${plate}</text>
    <!-- ayna -->
    <path d="M 196 -60 L 210 -60 L 210 -34 L 202 -34 Z" fill="#2B3138"/>
  </g>`;
}

function skyGradient(id, top, mid, bottom) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${top}"/>
    <stop offset="55%" stop-color="${mid}"/>
    <stop offset="100%" stop-color="${bottom}"/>
  </linearGradient>`;
}

function sunGlow(cx, cy, r) {
  return `<radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.amber}" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="${C.amber}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${C.amber}" stop-opacity="0"/>
    </radialGradient>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sun)"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="#FFD98A"/>`;
}

function islandSilhouette(w, baseY, color, opacity, seed = 0) {
  let d = `M -50 ${baseY + 200} L -50 ${baseY}`;
  const peaks = 6;
  for (let i = 0; i <= peaks; i++) {
    const x = (w / peaks) * i;
    const h = 40 + rand() * 90 + (i === Math.floor(peaks / 2) ? 70 : 0);
    d += ` Q ${x - w / peaks / 2} ${baseY - h} ${x} ${baseY - h * (0.3 + rand() * 0.4)}`;
  }
  d += ` L ${w + 50} ${baseY} L ${w + 50} ${baseY + 200} Z`;
  return `<path d="${d}" fill="${color}" opacity="${opacity}"/>`;
}

// ————— Sahneler —————
const scenes = {};

// 1) HERO — ada & deniz panoraması (1920×1280)
scenes["hero-ada.jpg"] = {
  w: 1920,
  h: 1280,
  svg: `
  <defs>${skyGradient("sky", "#0B2A4A", "#155A78", "#2E8FA8")}</defs>
  <rect width="1920" height="1280" fill="url(#sky)"/>
  ${sunGlow(1420, 330, 380)}
  ${islandSilhouette(1920, 620, C.navy800, 0.55)}
  ${islandSilhouette(1920, 680, C.navy700, 0.75)}
  <!-- deniz -->
  <rect y="700" width="1920" height="580" fill="${C.sea500}"/>
  ${waves(1920, 700, 10, 260, C.turq, 0.5)}
  ${waves(1920, 780, 12, 320, C.sea400, 0.6)}
  ${waves(1920, 900, 14, 380, C.navy600, 0.5)}
  ${waves(1920, 1060, 16, 420, C.navy700, 0.6)}
  <!-- ay/güneş yolu -->
  <path d="M 1360 700 L 1480 700 L 1560 1280 L 1240 1280 Z" fill="${C.amber}" opacity="0.14"/>
  ${waves(1920, 760, 6, 150, C.foam, 0.35, 5)}
  ${waves(1920, 850, 7, 190, C.foam, 0.25, 5)}
  ${waves(1920, 990, 8, 230, C.foam, 0.18, 6)}
  ${sailboat(420, 860, 1.9)}
  ${sailboat(980, 800, 1.2)}
  ${sailboat(1620, 930, 1.5)}
  ${seagulls(560, 360, 1.6, "#DFF3F4")}
  ${seagulls(1120, 260, 1.2, "#DFF3F4")}
  `,
};

// 2) Liman (1600×1100)
scenes["ada-liman.jpg"] = {
  w: 1600,
  h: 1100,
  svg: `
  <defs>${skyGradient("sky2", "#F4E9D4", "#F0D9AC", "#E8B871")}</defs>
  <rect width="1600" height="1100" fill="url(#sky2)"/>
  ${sunGlow(380, 300, 300)}
  ${islandSilhouette(1600, 560, C.sea500, 0.35)}
  <rect y="600" width="1600" height="500" fill="${C.sea400}"/>
  ${waves(1600, 600, 8, 220, C.turqLight, 0.45)}
  ${waves(1600, 700, 10, 260, C.sea500, 0.55)}
  ${waves(1600, 850, 12, 300, C.navy600, 0.4)}
  <path d="M 1360 600 L 1460 600 L 1600 760 L 1600 1100 L 1200 1100 Z" fill="${C.amberDeep}" opacity="0.12"/>
  <!-- dalgakıran -->
  <path d="M 0 720 L 620 720 Q 660 720 660 760 L 660 1100 L 0 1100 Z" fill="${C.marbleShade}"/>
  <path d="M 0 720 L 620 720 Q 660 720 660 760 L 660 790 L 0 790 Z" fill="${C.marble}"/>
  <!-- fener -->
  <g transform="translate(560 540)">
    <path d="M -26 180 L 26 180 L 16 0 L -16 0 Z" fill="${C.marble}"/>
    <path d="M -26 180 L 26 180 L 22 110 L -22 110 Z" fill="${C.amber}"/>
    <rect x="-20" y="-34" width="40" height="38" rx="6" fill="${C.navy800}"/>
    <circle cx="0" cy="-16" r="9" fill="#FFD98A"/>
    <path d="M -24 -34 L 24 -34 L 0 -58 Z" fill="${C.navy800}"/>
  </g>
  ${sailboat(240, 900, 2.2)}
  ${sailboat(1010, 780, 1.5)}
  ${sailboat(1350, 900, 1.9)}
  ${seagulls(900, 300, 1.5, "${C.white}")}
  `,
};

// 3-4) Filo minibüsleri (1600×1100)
scenes["filo-minibus-1.jpg"] = {
  w: 1600,
  h: 1100,
  svg: `
  <defs>${skyGradient("sky3", "#BFE3EA", "#DFF3F4", "#F7F5F0")}</defs>
  <rect width="1600" height="1100" fill="url(#sky3)"/>
  ${islandSilhouette(1600, 560, C.sea400, 0.25)}
  <rect y="580" width="1600" height="180" fill="${C.turqLight}" opacity="0.4"/>
  ${waves(1600, 580, 8, 260, C.sea400, 0.3)}
  <rect y="740" width="1600" height="360" fill="#8FA3AD"/>
  <rect y="740" width="1600" height="14" fill="${C.marbleShade}"/>
  <rect x="120" y="900" width="180" height="10" rx="5" fill="${C.white}" opacity="0.5"/>
  <rect x="480" y="900" width="180" height="10" rx="5" fill="${C.white}" opacity="0.5"/>
  <rect x="840" y="900" width="180" height="10" rx="5" fill="${C.white}" opacity="0.5"/>
  <rect x="1200" y="900" width="180" height="10" rx="5" fill="${C.white}" opacity="0.5"/>
  ${minibus(800, 700, 2.4, { plate: "10 ACM 359", sign: "TOPAĞAÇ" })}
  ${seagulls(320, 240, 1.4, C.sea500)}
  `,
};

scenes["filo-minibus-2.jpg"] = {
  w: 1600,
  h: 1100,
  svg: `
  <defs>${skyGradient("sky4", "#0F2C47", "#16405F", "#1E6E8C")}</defs>
  <rect width="1600" height="1100" fill="url(#sky4)"/>
  ${sunGlow(1280, 260, 260)}
  ${islandSilhouette(1600, 580, C.navy800, 0.6)}
  <rect y="600" width="1600" height="160" fill="${C.sea500}" opacity="0.5"/>
  ${waves(1600, 600, 8, 260, C.turq, 0.35)}
  <rect y="740" width="1600" height="360" fill="#3D4854"/>
  <rect y="740" width="1600" height="14" fill="${C.navy600}"/>
  <rect x="200" y="900" width="180" height="10" rx="5" fill="${C.amber}" opacity="0.45"/>
  <rect x="560" y="900" width="180" height="10" rx="5" fill="${C.amber}" opacity="0.45"/>
  <rect x="920" y="900" width="180" height="10" rx="5" fill="${C.amber}" opacity="0.45"/>
  <rect x="1280" y="900" width="180" height="10" rx="5" fill="${C.amber}" opacity="0.45"/>
  ${minibus(800, 700, 2.4, { plate: "10 SFA 634", sign: "SARAYLAR" })}
  `,
};

// 5) Mermer dokusu — Saraylar (1600×1100)
scenes["saraylar-mermer.jpg"] = {
  w: 1600,
  h: 1100,
  svg: `
  <rect width="1600" height="1100" fill="${C.marble}"/>
  ${Array.from({ length: 26 }, () => {
    const x1 = rand() * 1600, y1 = rand() * 1100;
    const pts = Array.from({ length: 5 }, (_, i) => {
      const x = x1 + (rand() - 0.3) * 500 * (i + 1) * 0.4;
      const y = y1 + (rand() - 0.3) * 380 * (i + 1) * 0.4;
      return `${x} ${y}`;
    }).join(" L ");
    const w = 1 + rand() * 3.4;
    const colors = ["#C9C2B2", "#B7C4C6", "#D8D2C4", "#9FB4B8"];
    const col = colors[Math.floor(rand() * colors.length)];
    return `<path d="M ${x1} ${y1} L ${pts}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${0.25 + rand() * 0.4}" stroke-linecap="round"/>`;
  }).join("\n")}
  ${Array.from({ length: 9 }, () => {
    const x = rand() * 1600, y = rand() * 1100, r = 60 + rand() * 240;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#EDE8DC" opacity="${0.18 + rand() * 0.2}"/>`;
  }).join("\n")}
  <rect width="1600" height="1100" fill="url(#vign)"/>
  <radialGradient id="vign" cx="50%" cy="42%" r="75%">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
    <stop offset="100%" stop-color="#B9B29E" stop-opacity="0.28"/>
  </radialGradient>
  `,
};

// 6) Koy / plaj (1600×1100)
scenes["ada-koy.jpg"] = {
  w: 1600,
  h: 1100,
  svg: `
  <defs>${skyGradient("sky6", "#8FD0DC", "#BFE9EE", "#DFF3F4")}</defs>
  <rect width="1600" height="1100" fill="url(#sky6)"/>
  ${sunGlow(300, 220, 240)}
  ${islandSilhouette(1600, 480, C.sea500, 0.3)}
  <rect y="500" width="1600" height="600" fill="${C.turq}"/>
  ${waves(1600, 500, 8, 240, C.turqLight, 0.55)}
  ${waves(1600, 620, 10, 280, C.sea400, 0.5)}
  <!-- kumsal -->
  <path d="M 0 1100 L 0 880 Q 480 790 900 900 Q 1300 1000 1600 940 L 1600 1100 Z" fill="${C.sand}"/>
  <path d="M 0 900 Q 480 810 900 918 Q 1300 1015 1600 958" fill="none" stroke="${C.foam}" stroke-width="16" opacity="0.85"/>
  <!-- şemsiye -->
  <g transform="translate(430 940)">
    <line x1="0" y1="0" x2="0" y2="-120" stroke="${C.navy800}" stroke-width="7"/>
    <path d="M -95 -104 Q 0 -180 95 -104 Q 48 -122 0 -110 Q -48 -122 -95 -104 Z" fill="${C.amber}"/>
    <path d="M -95 -104 Q 0 -180 95 -104" fill="none" stroke="${C.amberDeep}" stroke-width="5"/>
  </g>
  ${sailboat(1150, 640, 1.7)}
  ${sailboat(760, 560, 1.1)}
  ${seagulls(1300, 260, 1.5, "${C.white}")}
  `,
};

// 7) OG paylaşım kartı (1200×630)
scenes["og-image.jpg"] = {
  w: 1200,
  h: 630,
  svg: `
  <defs>${skyGradient("sky7", "#071426", "#0F2C47", "#1E6E8C")}</defs>
  <rect width="1200" height="630" fill="url(#sky7)"/>
  ${sunGlow(1010, 150, 200)}
  ${islandSilhouette(1200, 400, C.navy800, 0.7)}
  <rect y="420" width="1200" height="210" fill="${C.sea500}" opacity="0.6"/>
  ${waves(1200, 420, 8, 200, C.turq, 0.4)}
  ${waves(1200, 480, 6, 150, C.foam, 0.25, 4)}
  ${sailboat(1050, 520, 1.3)}
  <text x="80" y="250" font-family="Arial, sans-serif" font-size="110" font-weight="900" fill="${C.white}" letter-spacing="4">SEFATUR</text>
  <text x="84" y="316" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="${C.turqLight}">Marmara Adası'nın Yol Arkadaşı</text>
  <text x="84" y="390" font-family="Arial, sans-serif" font-size="26" fill="${C.foam}" opacity="0.9">Marmara • Gündoğdu • Topağaç • Asmalı • Saraylar</text>
  <g transform="translate(84 460)">
    <rect x="0" y="0" width="420" height="72" rx="36" fill="${C.amber}"/>
    <text x="210" y="47" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="${C.navy900}" text-anchor="middle">+90 533 655 51 18</text>
  </g>
  ${minibus(960, 500, 0.75, { plate: "10 ACM 359", sign: "TOPAĞAÇ" })}
  `,
};

// ————— Üretim —————
for (const [name, { w, h, svg }] of Object.entries(scenes)) {
  const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${svg}</svg>`;
  const out = join(OUT, name);
  await sharp(Buffer.from(doc), { density: 72 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  console.log("✓", name, `${w}x${h}`);
}
console.log("Tüm görseller üretildi →", OUT);
