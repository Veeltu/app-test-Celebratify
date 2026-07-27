---
id: lokalizacja-promien
title: Lokalizacja z promieniem (np. 50 km)
source: doc/sugestions.md
source_section: "6"
in_todo_list: true
status: todo
priority: P1
source_feedback: "After setting location — option to set range around that location like 50km."
---

# Lokalizacja z promieniem (np. 50 km)

> Na podstawie sekcji **6** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Filtr miasta jest binarny — „Leszno” nie obejmuje okolicznych miejscowości w zasięgu organizatora.

## Kontekst (feedback)

„After setting location you have to have option to set additional range around that location like 50km range.”

## Cel

Punkt odniesienia + promień (10 / 25 / 50 / 100 km). Wyniki z odległością. Czat AI rozumie „pod Lesznem”.

## Sugestie

`lat`, `lng` w `Venue`, słownik miast, Haversine w `src/utils/geo.ts`, suwak promienia. Mapa — P2.

## Zakres techniczny

`types/index.ts`, `mockVenues.ts`, `MobileSearchView.tsx`, `MobileAIChatView.tsx`, `utils/geo.ts`.

## Kryteria akceptacji

- Promień 50 km obejmuje lokale z okolic.
- Odległość widoczna na karcie wyniku.
- Filtr miasta + promień działa z innymi filtrami.

## Checklist

- [ ] Współrzędne w mockach
- [ ] `distanceKm()` + filtr
- [ ] UI promienia
- [ ] Odległość na karcie
