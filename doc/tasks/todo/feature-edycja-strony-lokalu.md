---
id: feature-edycja-strony-lokalu
type: feature
title: Panel Lokalu — edycja własnej strony (PAGE) lokalu
source: doc/sugestions.md
source_section: "11"
in_todo_list: true
status: todo
priority: P2
created: 2026-07-27
source_feedback: "możliwość edytowania swojego PAGE w podstawowej wersji — to jest do rozbudowania"
---

# Panel Lokalu — edycja własnej strony (PAGE) lokalu

> Na podstawie sekcji **11** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Właściciel nie edytuje publicznej strony lokalu (opis, kontakt, adres itd.) — dane są tylko w mocku. Brakuje zakładki „mój lokal / strona” obok Menu i Cennika.

## Kontekst (feedback)

„możliwość edytowania swojego PAGE w podstawowej wersji — to jest do rozbudowania”

## Cel

**v1:** menedżer w Panelu Lokalu edytuje podstawowe pola strony (tekst + kontakt); klient po przełączeniu roli widzi zmiany.  
**Później:** galeria, USP, atrybuty, sala — rozbudowa bez blokowania v1.

## Sugestie

Zakładka **Lokal** / **Strona**. Formularz mock + `onUpdateVenue`. Badge „podstawowa · rozbudowa wkrótce”. Powiązania: [`feature-menu-panel-lokalu`](./feature-menu-panel-lokalu.md), [`feature-prezentacja-lokalu`](./feature-prezentacja-lokalu.md), [`feature-atrybuty-filtry`](./feature-atrybuty-filtry.md), [`feature-galeria-sala-uklad`](./feature-galeria-sala-uklad.md).

## Zakres techniczny

`MobileVenueAdminView.tsx` (zakładka), `App.tsx` (`onUpdateVenue`), pola z `Venue` w `types/index.ts`. Bez uploadu w v1.

## Kryteria akceptacji (v1)

- Zakładka Lokal / Strona w panelu.
- Edycja min. nazwy, opisu, telefonu, e-maila, adresu — zapis w `venues`.
- Po przełączeniu na klienta widać zaktualizowane dane na karcie / w szczegółach.
- Sekcje „do rozbudowy” oznaczone lub pominięte (nie udają gotowego CMS).

## Checklist

- [ ] Zakładka Lokal w adminie
- [ ] Formularz pól podstawowych (mock)
- [ ] Handler `onUpdateVenue` w `App.tsx`
- [ ] Notatka / placeholder pod rozbudowę (galeria, USP, features)

## Notatki

Wdrażać **po** lub **obok** `feature-menu-panel-lokalu` (osobna zakładka). Nie mieszać edycji PAGE z edycją menu.
