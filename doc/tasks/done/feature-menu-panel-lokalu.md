---
id: feature-menu-panel-lokalu
type: feature
title: Menu w Panelu Lokalu — widok i funkcje dla właściciela
source: doc/sugestions.md
source_section: "9"
in_todo_list: true
status: done
priority: P1
created: 2026-07-27
source_feedback: "Menu na Panel Lokalu nie powinno wyglądać inaczej, mieć inne funkcje odpowiednie dla właściciela lokalu?"
---

# Menu w Panelu Lokalu — widok i funkcje dla właściciela

> Na podstawie sekcji **9** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Menu w szczegółach lokalu jest UX-em **klienta** (wybór dań, dodatki). W Panelu Lokalu menedżer edytuje tylko cenę pakietu w „Oferta & Cennik” — nie ma narzędzi do zarządzania kartą dań. Właściciel nie powinien dostawać tego samego UI co gość; potrzebuje prostego edytora oferty.

## Kontekst (feedback)

„Menu na Panel Lokalu nie powinno wyglądać inaczej, mieć inne funkcje odpowiednie dla właściciela lokalu?” — oraz odłożony punkt **1.4** z [`feature-bogatsze-menu`](./feature-bogatsze-menu.md) (edytor listy dań w panelu).

## Cel

Menedżer w Panelu Lokalu ma osobną zakładkę Menu: przegląda i (mockowo) edytuje dania / grupy wyborów pakietu. Po zmianie te same dane widać po stronie klienta po przełączeniu roli.

## Sugestie

Osobny layout listy + akcje edycji — **bez** kopiowania accordionów wyboru z `MobileVenueDetailModal`. Callback aktualizacji `venues` w `App.tsx`. Bez uploadu zdjęć i bez backendu.

## Zakres techniczny

`MobileVenueAdminView.tsx` (nowa zakładka), `App.tsx` (handler update menu/pakietu), ewentualnie drobne typy w `types/index.ts` jeśli potrzebne flagi `hidden` / kolejność. Dane wyjściowe: istniejące `choiceGroups` w `mockVenues` / `menuSamples`.

## Kryteria akceptacji

- [x] W Panelu Lokalu jest zakładka **Menu** osobna od cennika.
- [x] UI menedżera różni się od widoku klienta (edycja, nie wybór dań na imprezę).
- [x] Można mockowo dodać / edytować / ukryć co najmniej jedną pozycję lub grupę.
- [x] Po edycji lokal w trybie klienta pokazuje zaktualizowane menu (ten sam stan `venues`).

## Checklist

- [x] Zakładka Menu w `MobileVenueAdminView`
- [x] Lista pakietów → `choiceGroups` / dania (read)
- [x] Mock akcje: dodaj / edytuj / ukryj (lokalny stan)
- [x] Handler w `App.tsx` + odzwierciedlenie u klienta
