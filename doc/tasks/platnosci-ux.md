---
id: platnosci-ux
title: Jasny model płatności (UX bez bramki w MVP)
source: doc/sugestions.md
source_section: "4"
in_todo_list: true
status: todo
priority: P1
source_feedback: "Paying system — required additional look, I still don't understand how we will make payments work."
---

# Jasny model płatności (UX bez bramki w MVP)

> Na podstawie sekcji **4** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Nie wiadomo, jak w produkcie mają działać płatności — kiedy użytkownik płaci, ile, czy w aplikacji czy poza nią. Obecny disclaimer jest mało czytelny.

## Kontekst (feedback)

„Paying system — required additional look, I still don't understand how we will make payments work.”

## Cel

Użytkownik rozumie ścieżkę: rezerwacja → akceptacja lokalu → zaliczka (na razie poza appką lub mock). Timeline kroków bez wrażenia ukrytych opłat.

## Sugestie

**MVP:** bez Stripe/PayU — komunikacja i statusy mock. Ekran „Jak działa płatność?” w `MobileBookingModal`. Po `Potwierdzona` — mock „Opłać zaliczkę”. **v2:** Stripe Connect / PayU.

## Zakres techniczny

`MobileBookingModal.tsx`, `MobileBookingsView.tsx`, opcjonalnie `PaymentStatus` w `types/index.ts`.

## Kryteria akceptacji

- Timeline płatności widoczny przy rezerwacji.
- Po potwierdzeniu widać kwotę zaliczki i następny krok.
- Brak wrażenia natychmiastowej płatności kartą w MVP.

## Checklist

- [ ] Opis flow v1 w dokumencie
- [ ] UI timeline w modalu rezerwacji
- [ ] Mock ekran / stan zaliczki po Potwierdzona
