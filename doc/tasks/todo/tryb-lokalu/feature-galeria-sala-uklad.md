---
id: feature-galeria-sala-uklad
type: feature
title: Galeria zdjęć i zakładka „Sala / układ stołów”
source: doc/sugestions.md
source_section: "7"
in_todo_list: true
status: todo
priority: P1
source_feedback: "More pictures. Tab with room structure, tables, spacing. Mock images."
---

# Galeria zdjęć i zakładka „Sala / układ stołów”

> Na podstawie sekcji **7** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Za mało zdjęć; brak wizualizacji sali, układu stołów i przestrzeni — kluczowe przy weselu / chrzcinach.

## Kontekst (feedback)

„Additional bottom — more pictures of a restaurant. Additional tab with room structure, tables, spacing. Add mock images with tables and surrounding.”

## Cel

Rozbudowana galeria + zakładka z planem sali, pojemnością i układami stołów (mock).

## Sugestie

Model `RoomLayout`. Zakładka „Sala i układ” w `MobileVenueDetailModal`. 6–10 zdjęć w galerii. Bez edytora układu w v1.

## Zakres techniczny

`types/index.ts`, `mockVenues.ts`, `MobileVenueDetailModal.tsx`.

## Kryteria akceptacji

- Min. 2 lokale mają pełny `RoomLayout` w mocku.
- Nowa zakładka czytelna na mobile.
- Galeria ma więcej niż 3 zdjęcia na wybranych lokalach.

## Checklist

- [ ] Typ `RoomLayout`
- [ ] Mock images + dane sali
- [ ] Zakładka + rozszerzona galeria
