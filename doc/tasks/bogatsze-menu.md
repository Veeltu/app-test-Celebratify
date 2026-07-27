---
id: bogatsze-menu
title: Bogatsze i czytelniejsze menu pakietów
source: doc/sugestions.md
source_section: "1"
in_todo_list: true
status: done
priority: P0
source_feedback: "Menu required attention — there is little too little room to customize menu. And there is too little information."
---

# Bogatsze i czytelniejsze menu pakietów

> Na podstawie sekcji **1** w [`doc/sugestions.md`](../sugestions.md).

## Problem

W zakładce „Menu” w szczegółach lokalu użytkownik widzi zbyt mało informacji. Brakuje miejsca na opis dań, wariantów dietetycznych i wizualnej prezentacji — przez to trudno porównać pakiety i poczuć jakość oferty kulinarnej. Menu wygląda jak sucha lista pozycji, a nie jak element sprzedażowy imprezy.

## Kontekst (feedback)

„Menu required attention — there is little too little room to customize menu. And there is too little information.”

## Cel

Użytkownik po wejściu w pakiet powinien w kilka sekund zrozumieć, co dostaje: kategorie dań, przykładowe pozycje, ewentualne tagi (wege, bezgluten) i różnicę między pakietami Srebrnym a Złotym.

## Sugestie

Rozszerzyć model danych o opcjonalny opis, tagi i miniaturę dania. W UI pogrupować pozycje według kategorii (zupa, danie główne, desery). Na karcie pakietu pokazać skrót 3–5 dań z linkiem „Zobacz pełne menu”. Na etapie prototypu wystarczy bogatszy mock w `mockVenues.ts` — bez pełnego CMS dla restauracji.
Dodaj dodatkowe opcje w ofertach restaruacji w mock data tez.

## Zakres techniczny

`src/types/index.ts` → `MenuItem`, `mockVenues.ts` → przykładowe menu, `MobileVenueDetailModal.tsx` → zakładka Menu.

## Kryteria akceptacji

- Każdy pakiet w mocku ma co najmniej 2 dania z opisem lub tagiem.
- Menu jest pogrupowane po kategoriach, nie jako jedna płaska lista.
- Widok pozostaje w jasnym motywie i mieści się w mobile layout.

## Checklist

- [x] Rozszerzyć typ `MenuItem`
- [x] Uzupełnić mocki menu
- [x] Przebudować UI zakładki Menu
- [x] Skrót menu na karcie pakietu
