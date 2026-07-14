/**
 * Güzergâh haritası verisi (Leaflet).
 * Koordinatlar WGS84 [enlem, boylam] formatındadır.
 * Durak kaynakları: Wikidata (köy merkezleri) + coastguidetr.com
 * (iskeleler), iki bağımsız kaynakla çapraz doğrulandı.
 *
 * Rota çizgisi iki katmanlıdır:
 * 1. ROUTE_WAYPOINTS: ada çevre yolunu (10-85) elle örnekleyen yaklaşık
 *    yedek çizgi; harita açılır açılmaz bu gösterilir.
 * 2. fetchRoadRoute(): OSRM'den duraklardan geçen GERÇEK yol geometrisini
 *    getirir; başarılı olursa çizgi bu geometriyle güncellenir ve sonuç
 *    localStorage'da saklanır. Sunucuya ulaşılamazsa yedek çizgi kalır.
 */

export type LatLng = [number, number];

export const MAP_CENTER: LatLng = [40.618, 27.625];
export const MAP_ZOOM = 11;

/** Durak koordinatları (id'ler lib/data.ts STOPS ile eşleşir) */
export const STOP_COORDS: Record<string, LatLng> = {
  marmara: [40.5835, 27.561],
  topagac: [40.6039, 27.6639],
  asmali: [40.6165, 27.7063],
  saraylar: [40.6519, 27.6589],
};

/** Hat sırası batıdan doğuya; rota bu sırayla çizilir */
const ROUTE_STOP_ORDER = ["marmara", "topagac", "asmali", "saraylar"] as const;

/**
 * Yedek rota: Marmara > güney kıyısı (Gündoğdu) > Topağaç > kıyıdan
 * Asmalı > kuzeye tırmanış > kuzey kıyısından Saraylar. Noktalar yol
 * geometrisine yaklaşık değerlerdir; gerçek geometri fetchRoadRoute
 * ile gelir.
 */
export const ROUTE_WAYPOINTS: LatLng[] = [
  [40.5835, 27.561], // Marmara
  [40.5824, 27.5705],
  [40.5836, 27.5815],
  [40.586, 27.5925],
  [40.5893, 27.6025], // Gündoğdu
  [40.5906, 27.6135],
  [40.5926, 27.6245],
  [40.5952, 27.6355],
  [40.5985, 27.646],
  [40.601, 27.656],
  [40.6039, 27.6639], // Topağaç
  [40.6062, 27.672],
  [40.608, 27.68],
  [40.6103, 27.688],
  [40.613, 27.696],
  [40.6152, 27.7025],
  [40.6165, 27.7063], // Asmalı
  [40.6205, 27.7085],
  [40.626, 27.7075],
  [40.631, 27.704],
  [40.6355, 27.702],
  [40.64, 27.701],
  [40.6445, 27.696],
  [40.648, 27.689],
  [40.6505, 27.681],
  [40.652, 27.673],
  [40.6528, 27.666],
  [40.6519, 27.6589], // Saraylar
];

/* OSRM route isteği: duraklardan geçen sürüş rotası, GeoJSON geometrisiyle */
const OSRM_QUERY =
  ROUTE_STOP_ORDER.map(
    (id) => `${STOP_COORDS[id][1]},${STOP_COORDS[id][0]}`
  ).join(";") + "?overview=full&geometries=geojson&steps=false&alternatives=false";

/** Sırayla denenen sunucular: FOSSGIS (OSM'nin resmi yönlendiricisi), OSRM demo */
const OSRM_ENDPOINTS = [
  `https://routing.openstreetmap.de/routed-car/route/v1/driving/${OSRM_QUERY}`,
  `https://router.project-osrm.org/route/v1/driving/${OSRM_QUERY}`,
];

/** Marmara Adası sınır kutusu: bariz hatalı servis yanıtlarını eler */
const ISLAND_BOUNDS = { latMin: 40.5, latMax: 40.75, lngMin: 27.4, lngMax: 27.85 };

const ROUTE_CACHE_KEY = "sefatur:road-route:v1";
const ROUTE_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 gün

function isValidRoute(route: unknown): route is LatLng[] {
  return (
    Array.isArray(route) &&
    route.length >= 2 &&
    route.every(
      (point) =>
        Array.isArray(point) &&
        point.length === 2 &&
        typeof point[0] === "number" &&
        typeof point[1] === "number" &&
        point[0] >= ISLAND_BOUNDS.latMin &&
        point[0] <= ISLAND_BOUNDS.latMax &&
        point[1] >= ISLAND_BOUNDS.lngMin &&
        point[1] <= ISLAND_BOUNDS.lngMax
    )
  );
}

function readRouteCache(): LatLng[] | null {
  try {
    const raw = window.localStorage.getItem(ROUTE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt?: number; route?: unknown };
    if (
      typeof parsed.savedAt !== "number" ||
      Date.now() - parsed.savedAt > ROUTE_CACHE_TTL_MS
    ) {
      return null;
    }
    return isValidRoute(parsed.route) ? parsed.route : null;
  } catch {
    return null;
  }
}

function writeRouteCache(route: LatLng[]): void {
  try {
    window.localStorage.setItem(
      ROUTE_CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), route })
    );
  } catch {
    /* localStorage kapalıysa (özel gezinme vb.) önbelleksiz devam */
  }
}

type OsrmResponse = {
  routes?: { geometry?: { coordinates?: [number, number][] } }[];
};

/**
 * Duraklardan geçen gerçek yol geometrisini getirir. Yalnızca tarayıcıda
 * çağrılır; hiçbir sunucuya ulaşılamazsa null döner.
 */
export async function fetchRoadRoute(): Promise<LatLng[] | null> {
  const cached = readRouteCache();
  if (cached) return cached;

  for (const endpoint of OSRM_ENDPOINTS) {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) continue;
      const data = (await res.json()) as OsrmResponse;
      const coords = data.routes?.[0]?.geometry?.coordinates;
      // GeoJSON [boylam, enlem] > Leaflet [enlem, boylam]
      const route = coords?.map(([lng, lat]) => [lat, lng] as LatLng);
      if (route && isValidRoute(route)) {
        writeRouteCache(route);
        return route;
      }
    } catch {
      /* sıradaki sunucuyu dene */
    }
  }
  return null;
}
