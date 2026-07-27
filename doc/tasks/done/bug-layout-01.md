---
id: bug-layout-01
type: bug
title: Bug layoutu — szczegóły lokalu po długiej liście w Szukaj
source: doc/tasks/bug-layout-01.md
source_section: null
in_todo_list: true
status: done
priority: P0
created: 2026-07-27
source_feedback: "Jak jest wiecej restauracji np 10 w TAB szukaj, jak wybiore restaruacje, kolejny ekran sie buguje. Nie ma tego problemu jak jest jedna restauracja."
---

# Bug layoutu — szczegóły lokalu po długiej liście w Szukaj

> Bug zgłoszony bezpośrednio (plik taska); nie mapuje się na sekcję w `sugestions.md`.

## Problem

Przy wielu lokalach na liście (np. 10+) w zakładce Szukaj, po wybraniu restauracji (zwłaszcza niżej na liście) ekran szczegółów „się buguje” — układ jest zepsuty / modal nie wypełnia widocznego obszaru. Przy jednej restauracji problem nie występuje.

## Kontekst (feedback)

„Jak jest wiecej restauracji np 10 w TAB ; szukaj, jak wybiore restaruacje, kolejny ekran sie buguje. Nie ma tego problemu jak jest jedna restauracja w TAB:szukaj.”

## Cel

Modal szczegółów lokalu zawsze wypełnia widoczny obszar treści w ramce telefonu, niezależnie od długości listy i pozycji scrolla.

## Sugestie

Przyczyna: `MobileVenueDetailModal` (`absolute inset-0`) był renderowany **wewnątrz** scrollowanego `main`. Przy wysokiej treści `main` rosnął razem z listą — overlay pozycjonował się względem całej wysokości treści, nie viewportu shella.

Naprawa: warstwa `overlay` w `MobileShell` (sibling scrollowanego `main`, wspólny `relative` box o stałej wysokości) + stała wysokość shella (`100dvh` / 844px).

## Zakres techniczny

`MobileShell.tsx`, `App.tsx` (prop `overlay`), ewentualnie `MobileBookingModal` / `MobileAuthModal` (`fixed` → `absolute`).

## Kryteria akceptacji

- [x] Po scrollu do dołu listy (≥10 lokali) otwarcie lokalu pokazuje pełny, poprawny modal w ramce.
- [x] Zamknięcie modala wraca do listy (scroll może zostać).
- [x] Booking / auth też mieszczą się w shellu (nie `fixed` na całym viewportcie przeglądarki).

## Checklist

- [x] Overlay poza scrollowanym `main`
- [x] Shell ze stałą wysokością obszaru treści
- [x] Smoke: Szukaj → scroll → lokal → modal OK
