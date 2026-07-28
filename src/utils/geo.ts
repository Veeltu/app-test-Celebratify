export type GeoPoint = { lat: number; lng: number };

export const RADIUS_PRESETS_KM = [10, 25, 50, 100] as const;
export type RadiusPresetKm = (typeof RADIUS_PRESETS_KM)[number];

/** Haversine distance in kilometres */
export function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Snap arbitrary km to nearest preset; ties round up (e.g. 30 → 25, 37.5 → 50). */
export function snapRadiusKm(km: number): RadiusPresetKm {
  let best: RadiusPresetKm = RADIUS_PRESETS_KM[0];
  let bestDist = Math.abs(km - best);
  for (const preset of RADIUS_PRESETS_KM) {
    const d = Math.abs(km - preset);
    if (d < bestDist || (d === bestDist && preset > best)) {
      best = preset;
      bestDist = d;
    }
  }
  return best;
}
