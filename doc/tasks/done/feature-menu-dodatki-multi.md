---
id: feature-menu-dodatki-multi
type: feature
title: Menu — wiele dodatków + opcja „Bez dodatków”
source: doc/sugestions.md
source_section: "10"
in_todo_list: true
status: done
priority: P0
created: 2026-07-27
source_feedback: "Menu - dodaj mozliwosc zaznaczania wielu dodatkow, ale jak zaznaczysz bez dodatkow to kasuje pozostale zaznaczenia."
---

# Menu — wiele dodatków + opcja „Bez dodatków”

> Na podstawie sekcji **10** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Dodatki do dań są w większości single-choice. Brakuje multi-selectu kilku dodatków oraz opcji „Bez dodatków”, która kasuje pozostałe zaznaczenia.

## Kontekst (feedback)

„Menu - dodaj mozliwosc zaznaczania wielu dodatkow, ale jak zaznaczysz bez dodatkow to kasuje pozostale zaznaczenia.”

## Cel

Użytkownik może zaznaczyć kilka dodatków w grupie; wybór „Bez dodatków” czyści inne opcje w tej grupie (i odwrotnie — wybór dodatku usuwa „Bez dodatków”).

## Sugestie

Rozszerzyć `MenuModifierOption` o flagę exclusive (np. `clearsOthers`). W `toggleModifier` obsłużyć: exclusive → `[id]`; zwykły → bez exclusive + limitu `maxSelect`. W mockach podnieść `maxSelect` i dodać chip „Bez dodatków”.

## Zakres techniczny

`types/index.ts`, `menuSamples.ts`, `MobileVenueDetailModal.tsx` (`toggleModifier`, ewentualnie UI chipa).

## Kryteria akceptacji

- [x] W co najmniej jednej grupie można zaznaczyć ≥2 dodatki (gdy `maxSelect` > 1).
- [x] „Bez dodatków” czyści inne zaznaczenia w grupie.
- [x] Wybór zwykłego dodatku usuwa „Bez dodatków” z selekcji.
- [x] Dopłaty w stopce nie liczą exclusive (0 zł).

## Checklist

- [x] Flaga exclusive na opcji w typach
- [x] Logika toggle (multi + clearsOthers)
- [x] Mock: maxSelect + „Bez dodatków” w kluczowych grupach
- [x] UI czytelne dla exclusive
