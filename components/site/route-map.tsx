"use client";

/**
 * Güzergâh bölümü: gerçek harita (Leaflet) + durak listesi.
 * Leaflet window'a dokunduğu için kütüphane useEffect içinde
 * dinamik olarak yüklenir; sadece tipler statik import edilir.
 */
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { Info } from "lucide-react";
import { ROUTE_COPY } from "@/lib/copy";
import { SCHEDULE, STOPS } from "@/lib/data";
import { MAP_CENTER, MAP_ZOOM, ROUTE_WAYPOINTS, STOP_COORDS } from "@/lib/map-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const ROUTE_BLUE = "#3EB5FF";
const VIA_SAGE = "#759B9E";

function markerHtml(kind: "main" | "via"): string {
  if (kind === "main") {
    return (
      '<span style="display:block;width:18px;height:18px;border-radius:9999px;' +
      `background:${ROUTE_BLUE};border:3px solid #ffffff;box-sizing:content-box;` +
      'box-shadow:0 1px 3px rgba(15,32,21,0.35);"></span>'
    );
  }
  return (
    '<span style="display:block;width:12px;height:12px;border-radius:9999px;' +
    `background:${VIA_SAGE};"></span>`
  );
}

function popupHtml(stopId: string, stopName: string, blurb: string): string {
  const point = SCHEDULE.find((p) => p.id === stopId);
  const body = point ? `Kalkış: ${point.times.join(", ")}` : blurb;
  return `<strong>${stopName}</strong><br/>${body}`;
}

export function RouteMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    let resizeTimer: number | undefined;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current || mapRef.current) return;

      map = L.map(containerRef.current, {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        scrollWheelZoom: false,
        zoomControl: true,
        /* Mobilde tek parmak kaydırma sayfayı kaydırmalı, haritayı değil */
        dragging: !L.Browser.mobile,
      });
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.polyline(ROUTE_WAYPOINTS, {
        color: ROUTE_BLUE,
        weight: 4,
        opacity: 0.9,
      }).addTo(map);

      for (const stop of STOPS) {
        const coords = STOP_COORDS[stop.id];
        if (!coords) continue;
        const size = stop.kind === "main" ? 24 : 12;
        const icon = L.divIcon({
          className: "",
          html: markerHtml(stop.kind),
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        /* keyboard: false — isimsiz sekme durağı olmasın; durak listesi
           aynı bilgiyi klavye kullanıcılarına zaten veriyor */
        L.marker(coords, { icon, keyboard: false })
          .addTo(map)
          .bindTooltip(stop.name, {
            permanent: true,
            direction: "top",
            offset: [0, -10],
          })
          .bindPopup(popupHtml(stop.id, stop.name, stop.blurb));
      }

      resizeTimer = window.setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 0);
    })();

    return () => {
      cancelled = true;
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section id="guzergah" className="bg-marble py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            align="left"
            title={ROUTE_COPY.title}
            subtitle={ROUTE_COPY.subtitle}
          />
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start sm:mt-10">
          <FadeIn>
            <div
              ref={containerRef}
              role="region"
              aria-label="Güzergâh haritası"
              className="h-[380px] w-full overflow-hidden rounded-2xl bg-sand shadow-card sm:h-[480px]"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* Durak listesi: bağlantı çizgili zaman çizelgesi */}
            <ul className="relative flex flex-col gap-7">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[8px] w-px bg-linear-to-b from-sky/60 via-sage/40 to-sky/60"
              />
              {STOPS.map((stop) => (
                <li key={stop.id} className="relative flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 mt-1 shrink-0 rounded-full",
                      stop.kind === "main"
                        ? "size-[17px] border-[3px] border-white bg-sky shadow-sm ring-1 ring-sky/30"
                        : "mx-[2.5px] mt-1.5 size-3 bg-sage"
                    )}
                  />
                  <div>
                    <p className="text-lg font-bold tracking-tight text-ink">
                      {stop.name}
                      {stop.kind === "via" ? (
                        <span className="ml-2 text-sm font-medium text-sage">
                          ara durak
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 leading-relaxed text-ink/70">
                      {stop.blurb}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-7 flex items-start gap-2 rounded-xl bg-sand px-4 py-3 text-sm text-ink/70">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-forest"
              />
              {ROUTE_COPY.mapNote}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
