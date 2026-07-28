## 1. Typy i geo

- [x] 1.1 Dodać `lat` / `lng` do `Venue` oraz `radiusKm` do `FilterState` w `src/types/index.ts`
- [x] 1.2 Utworzyć `src/utils/geo.ts` z `distanceKm` (Haversine) + helper snapa promienia do 10/25/50/100
- [x] 1.3 Utworzyć `src/data/cityCoords.ts` ze współrzędnymi miast z listy filtrów

## 2. Dane mock

- [x] 2.1 Uzupełnić wszystkie lokale w `mockVenues.ts` o `lat` / `lng` (okolice Leszna: w i poza 50 km do demo)
- [x] 2.2 Ustawić domyślne `radiusKm: 50` w initial `filters` w `App.tsx` (jeśli potrzebne)

## 3. Wyszukiwanie (client/search)

- [x] 3.1 Zastąpić filtr równości miasta logiką: przy mieście ≠ Wszystkie — odległość ≤ `radiusKm`
- [x] 3.2 UI: chipsy / segment promienia 10·25·50·100; disabled gdy miasto = Wszystkie
- [x] 3.3 Na karcie wyniku pokazać „N km od {miasto}” gdy miasto aktywne
- [x] 3.4 (Opcjonalnie) sortować wyniki rosnąco po odległości przy aktywnym mieście

## 4. Czat AI (client/chat)

- [x] 4.1 Regex okolicy („pod …”, „w okolicy …”) → miasto + domyślny promień 50
- [x] 4.2 Regex „w promieniu N km od …” → miasto + snap N do presetu
- [x] 4.3 `onApplyFilters` przekazuje `city` + `radiusKm`; rekomendacje filtrują Haversine

## 5. Weryfikacja

- [x] 5.1 `npm run build` (tsc + vite) bez błędów
- [x] 5.2 Smoke: Leszno + 50 km pokazuje okolice; odległość na karcie; czat „pod Lesznem” ustawia filtry
