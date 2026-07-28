import type { GeoPoint } from '../utils/geo';

/** Współrzędne centrów miast z listy filtrów (mock). */
export const CITY_COORDS: Record<string, GeoPoint> = {
  Kraków: { lat: 50.0647, lng: 19.945 },
  Warszawa: { lat: 52.2297, lng: 21.0122 },
  Gdańsk: { lat: 54.352, lng: 18.6466 },
  Wrocław: { lat: 51.1079, lng: 17.0385 },
  Leszno: { lat: 51.8403, lng: 16.5749 },
};

export function getCityCoords(city: string): GeoPoint | null {
  return CITY_COORDS[city] ?? null;
}
