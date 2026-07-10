/**
 * Güzergâh haritası verisi (Leaflet).
 * Koordinatlar WGS84 [enlem, boylam] formatındadır.
 * Kaynaklar: Wikidata (köy merkezleri) + coastguidetr.com (iskeleler),
 * iki bağımsız kaynakla çapraz doğrulandı.
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

/**
 * Rota çizgisi: Marmara > güney kıyısı > Topağaç > Asmalı > kuzey > Saraylar.
 * Ara noktalar yol geometrisine yaklaşık değerlerdir.
 */
export const ROUTE_WAYPOINTS: LatLng[] = [
  [40.5835, 27.561],
  [40.587, 27.578],
  [40.59, 27.595],
  [40.592, 27.608],
  [40.595, 27.625],
  [40.5985, 27.644],
  [40.601, 27.657],
  [40.6039, 27.6639],
  [40.608, 27.68],
  [40.612, 27.694],
  [40.6165, 27.7063],
  [40.624, 27.712],
  [40.633, 27.711],
  [40.642, 27.703],
  [40.649, 27.688],
  [40.653, 27.672],
  [40.6519, 27.6589],
];
