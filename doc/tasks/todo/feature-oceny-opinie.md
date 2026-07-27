---
id: feature-oceny-opinie
type: feature
title: Oceny i opinie — prościej, bez negatywnego nacisku
source: doc/sugestions.md
source_section: "8"
in_todo_list: true
status: todo
priority: P2
source_feedback: "Star system and opinions — simpler, without negativity."
---

# Oceny i opinie — prościej, bez negatywnego nacisku

> Na podstawie sekcji **8** w [`doc/sugestions.md`](../sugestions.md).

## Problem

System gwiazdek i opinii wymaga dopracowania — pełna lista recenzji może odstraszać; potrzebny social proof bez negatywnego nacisku.

## Kontekst (feedback)

„Star system required additional attention — same as opinions — how make it better, simpler without negativity.”

## Cel

Agregat zaufania, tagi „Co chwalą goście”, jedna mocna strona w porównywarce — bez ściany 1★.

## Sugestie

Model `ReviewHighlight { label, count }`. Copy „Polecany przez 94% gości”. Spokojne, złote badge zamiast czerwieni.

## Zakres techniczny

`types/index.ts`, `mockVenues.ts`, `MobileVenueDetailModal.tsx`, `MobileSearchView.tsx`, `MobileCompareView.tsx`.

## Kryteria akceptacji

- Brak listy negatywnych opinii w UI publicznym.
- Widoczne tagi pozytywne lub agregat zaufania.
- Spójny wizualnie blok oceny.

## Checklist

- [ ] Typ `ReviewHighlight`
- [ ] Mock highlights opinii
- [ ] UI w szczegółach i na liście
