---
id: feature-prezentacja-lokalu
type: feature
title: Lepsza prezentacja lokalu (informacje sprzedażowe)
source: doc/sugestions.md
source_section: "2"
in_todo_list: true
status: todo
priority: P0
source_feedback: "There is too little information about restaurant and it's required to find additional ways for appetizing restaurant."
---

# Lepsza prezentacja lokalu (informacje sprzedażowe)

> Na podstawie sekcji **2** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Opis restauracji jest zbyt ogólny. Użytkownik nie dostaje wystarczająco informacji, żeby „złapać” charakter miejsca — atmosferę, dla jakiego typu imprezy lokal jest idealny, co wyróżnia go na tle konkurencji.

## Kontekst (feedback)

„There is too little information about restaurant and it's required to find additional ways for appetizing restaurant.”

## Cel

Lokal ma być prezentowany jak produkt: krótkie hasła USP, informacja „najlepszy na wesele / chrzciny”, wyróżniki widoczne już na liście wyników.

## Sugestie

Dodać pola `highlights`, `bestFor`, `atmosphere` do modelu `Venue`. Sekcja „Dlaczego ten lokal?” z ikonami i 3 bulletami. Na karcie w wyszukiwarce jedna linia pod nazwą (np. „Ogród • Noclegi • do 120 os.”). Inspiracja: Booking/Airbnb — konkret zamiast długiego akapitu.

## Zakres techniczny

`types/index.ts`, `mockVenues.ts`, `MobileVenueDetailModal.tsx`, `MobileSearchView.tsx`.

## Kryteria akceptacji

- Każdy lokal w mocku ma 3 highlights i `bestFor`.
- Lista wyników pokazuje skrót wyróżników.
- Zakładka „O lokalu” ma dedykowaną sekcję USP.

## Checklist

- [ ] Nowe pola w `Venue`
- [ ] Mock data dla wszystkich lokali
- [ ] UI szczegółów + lista wyników
