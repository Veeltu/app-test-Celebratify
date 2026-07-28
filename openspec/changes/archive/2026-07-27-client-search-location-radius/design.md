## Context

Dziś `FilterState.city` + porównanie `venue.city === filters.city` w `MobileSearchView`. Czat AI robi to samo po regexie miast. Brak współrzędnych i zasięgu. Źródło: sekcja 6 `doc/sugestions.md`, task `feature-lokalizacja-promien`. Taxonomy specs: `client/*` (ta zmiana), `restaurant/*` poza scope.

## Goals / Non-Goals

**Goals:**
- Punkt odniesienia (miasto) + promień 10/25/50/100 km
- Haversine w czystej funkcji, odległość na karcie
- Sync czatu AI z tymi samymi filtrami

**Non-Goals:**
- Mapa, GPS, backend
- Panel `restaurant/*`
- Zmiana porównywarki

## Decisions

1. **Model**
   - `Venue`: wymagane `lat: number`, `lng: number` w mockach
   - `FilterState`: `radiusKm: number` (domyślnie `50`); ignorowane gdy `city === 'Wszystkie'`
   - Alternatywa odrzucona: osobny typ `GeoPoint` — zbędna abstrakcja w prototypie

2. **Słownik miast**
   - `src/data/cityCoords.ts` (lub obok mocków): mapa nazwa → `{ lat, lng }` dla Kraków, Warszawa, Gdańsk, Wrocław, Leszno
   - Współrzędne lokali w `mockVenues.ts` — okolice Leszna muszą być w/out 50 km dla AC

3. **Geo**
   - `src/utils/geo.ts`: `distanceKm(a, b)` Haversine
   - Filtrowanie w `MobileSearchView` (jak dziś city/guests/price) — bez wyciągania store’a

4. **UI promienia**
   - Segment / chipsy 10 · 25 · 50 · 100 obok selecta miasta; disabled gdy „Wszystkie”
   - Bez nowych bibliotek UI

5. **Etykieta na karcie**
   - `Math.round(distanceKm(...))` + „km od {miasto}”
   - Sortowanie po odległości: opcjonalne, nie wymagane w AC — jeśli tanie, sortuj rosnąco przy aktywnym mieście

6. **Czat AI**
   - Regex okolicy: `pod <miastem>`, `w okolicy`, `w promieniu N km od <miasto>`
   - Mapowanie N → najbliższy z `[10,25,50,100]` (np. 30 → 25; remis w górę → 50)
   - `onApplyFilters({ city, radiusKm, ... })`

7. **App.tsx**
   - Tylko jeśli initial `filters` nie ma `radiusKm` — dodać default `50`

## Risks / Trade-offs

- [Fake coords] → Mitigation: świadomie dobrane mocki wokół Leszna do demo 50 km
- [Niespójność city string] → Mitigation: te same etykiety co lista miast w search
- [Chat „30 km” ≠ dokładne 30] → Mitigation: snap do presetów; komunikat asystenta może podać użyty promień

## Migration Plan

- Czysta zmiana typów + mocków; brak persystencji
- Rollback: revert plików zmiany

## Open Questions

- (rozstrzygnięte w decisions) snap 30 km → 25
- Sortowanie po odległości: tak, jeśli ≤ kilka linii w filtrze
