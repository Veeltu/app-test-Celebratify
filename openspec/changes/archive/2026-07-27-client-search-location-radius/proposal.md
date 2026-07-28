## Why

Filtr miasta jest binarny — wybór „Leszno” nie pokazuje lokali w okolicznych miejscowościach (Rydzyna, Osieczna itd.), choć organizator szuka w **promieniu** od punktu odniesienia. Feedback (sekcja **6** w `doc/sugestions.md` / task `feature-lokalizacja-promien`): po ustawieniu lokalizacji musi być opcja zasięgu, np. 50 km.

## What Changes

- Punkt odniesienia (miasto z listy) + **promień** 10 / 25 / 50 / 100 km w filtrach wyszukiwania
- Współrzędne `lat` / `lng` na lokalach + słownik współrzędnych miast
- Filtrowanie Haversine: lokal w wynikach, jeśli odległość ≤ promień (przy mieście ≠ „Wszystkie”)
- Na karcie wyniku: odległość od punktu („12 km od Leszna”)
- Czat AI (mock regex): frazy typu „pod Lesznem”, „w promieniu 30 km od Krakowa” ustawiają miasto + promień

## Non-goals

- Mapa (Google Maps / Leaflet) — P2
- Geolokalizacja GPS użytkownika
- Backend, Firebase, prawdziwe LLM
- Zmiany w trybie `restaurant/*` (panel lokalu)
- Porównywarka — bez obowiązkowej kolumny odległości w v1

## Capabilities

### New Capabilities

- `client/search`: wyszukiwanie lokali — filtr lokalizacji z promieniem, odległość na karcie wyniku, współistnienie z innymi filtrami
- `client/chat`: czat AI (mock) — rozpoznawanie lokalizacji z kontekstem „pod / w okolicy / w promieniu X km”

### Modified Capabilities

- (brak — `openspec/specs/` jest puste; pierwsze living specs powstaną po archive)

## Impact

- Typy: `Venue` (`lat`, `lng`), `FilterState` (`radiusKm`)
- Dane: `mockVenues.ts`, słownik miast (lat/lng)
- Nowy util: `src/utils/geo.ts` (`distanceKm`)
- UI: `MobileSearchView.tsx`
- Sync: `MobileAIChatView.tsx` (regex + apply filters)
- Ewentualnie `App.tsx` tylko jeśli domyślny stan filtrów wymaga `radiusKm`
- Źródło: sekcja 6 `doc/sugestions.md` · `doc/tasks/todo/feature-lokalizacja-promien.md`
