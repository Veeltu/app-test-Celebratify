---
id: atrybuty-filtry
title: Ustrukturyzowane atrybuty lokalu i filtry
source: doc/sugestions.md
source_section: "3"
in_todo_list: true
status: todo
priority: P0
source_feedback: "We need structure of attributes for restaurants — e.g. kids playground — for easy filtering."
---

# Ustrukturyzowane atrybuty lokalu i filtry

> Na podstawie sekcji **3** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Udogodnienia (`amenities`) są zapisane jako dowolne stringi — niespójnie i trudne do filtrowania oraz porównywania w macierzy.

## Kontekst (feedback)

„We need structure of a bit more attributes for restaurants — e.g. kids playground — so we have to structure it somehow and not creating mess … for easy way to filter wanted spot.”

## Cel

Jeden słownik cech lokalu (enum + etykiety PL), wspólny dla wyszukiwarki, porównywarki i czatu AI.

## Sugestie

Plik `src/data/venueFeatures.ts`. Pole `features: VenueFeatureId[]` w `Venue`. Filtry multi-select w `MobileSearchView`. Zsynchronizować `MobileCompareView` ze słownikiem. Rozszerzyć regex w `MobileAIChatView`.

## Zakres techniczny

`types/index.ts`, `venueFeatures.ts` (nowy), `mockVenues.ts`, `MobileSearchView`, `MobileCompareView`, `MobileAIChatView`.

## Kryteria akceptacji

- Min. 8 zdefiniowanych cech w słowniku.
- Filtr cech działa na liście lokali.
- Porównywarka używa tej samej listy cech.
- Stare `amenities` zamienione lub zmapowane na `features`.

## Checklist

- [ ] Słownik `VenueFeature`
- [ ] Migracja mocków
- [ ] Filtry w wyszukiwarce
- [ ] Porównywarka + AI chat
