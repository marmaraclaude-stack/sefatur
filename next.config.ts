import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stok fotoğraflar Pexels/Unsplash üzerinden hotlink edilir.
    // Kendi fotoğraflarınızı public/images/ altına koyup lib/images.ts'te
    // yolu "/images/dosya.jpg" olarak değiştirdiğinizde bu ayara gerek kalmaz.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
