---
id: feature-kalendarz-zakres-dat
type: feature
title: Kalendarz — zakres dat i wiele terminów
source: doc/sugestions.md
source_section: "5"
in_todo_list: true
status: todo
priority: P1
source_feedback: "Add to calendar — set range or multiple days as option."
---

# Kalendarz — zakres dat i wiele terminów

> Na podstawie sekcji **5** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Wyszukiwanie i rezerwacja opierają się na jednej dacie. Organizatorzy często szukają okna czasowego lub kilku preferowanych sobót.

## Kontekst (feedback)

„Add to calendar — set range or multiple days as option.”

## Cel

Filtr: jedna data **lub** zakres **lub** lista preferowanych dat. Lokal pasuje, jeśli ma choć jeden wolny termin w oknie.

## Sugestie

Rozszerzyć `FilterState` o `dateFrom`/`dateTo` lub `preferredDates[]`. UI: przełącznik trybu + dwa pola daty. Logika: `availableDates.some(d => inRange(d))`.

## Zakres techniczny

`types/index.ts`, `MobileSearchView.tsx`, `MobileBookingModal.tsx`, `App.tsx`.

## Kryteria akceptacji

- Użytkownik może wybrać zakres dat w filtrze.
- Lista lokali reaguje na zakres.
- Formularz rezerwacji pozwala wpisać datę alternatywną (opcjonalnie).

## Checklist

- [ ] Rozszerzyć `FilterState`
- [ ] UI filtra dat
- [ ] Logika filtrowania
- [ ] Opcjonalne daty alternatywne w rezerwacji
