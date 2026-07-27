---
id: feature-menu-panel-lokalu
task_file: doc/tasks/done/feature-menu-panel-lokalu.md
source_section: "9"
completed: 2026-07-27
---

# CHANGE — Menu w Panelu Lokalu (właściciel)

> Log wdrożenia. Opis: [`doc/tasks/done/feature-menu-panel-lokalu.md`](../tasks/done/feature-menu-panel-lokalu.md) · sekcja [`doc/sugestions.md`](../sugestions.md).

## Podsumowanie

W **trybie managera** dolny pasek (`BottomNav`) pokazuje inne zakładki niż u klienta: **Zapytania · Kalendarz · Cennik · Menu** (zamiast Szukaj / Porównaj / Czat / Rezerwacje). Sekcja Menu pozwala edytować / ukrywać / dodawać dania; ukryte nie widać u klienta.

## Zmiany w kodzie

- `BottomNav.tsx` — osobny nav dla `role === 'manager'`; taby `admin` / `adminCalendar` / `adminPricing` / `adminMenu`
- `MobileVenueAdminView.tsx` — treść wg `section` z bottom nav (bez górnych zakładek)
- `App.tsx` — `handleUpdatePackageMenu`; mapowanie tab → section
- `types/index.ts` — `MenuItem.hidden`
- `MobileVenueDetailModal.tsx` — filtr ukrytych dań

## Decyzje / odstępstwa od taska

- Zakładki właściciela są w **bottom nav**, nie jako drugi rząd tabów w środku ekranu (doprecyzowanie UX).
- Brak drag-and-drop i edycji dodatków w v1.

## Jak sprawdzić

- [ ] **Tryb Lokalu** → dół: Zapytania / Kalendarz / Cennik / Menu (nie Szukaj…)
- [ ] Menu → edytuj / ukryj / dodaj → Tryb Klienta → lokal → widać zmiany
- [ ] **Tryb Klienta** → dół wraca do Szukaj / Porównaj / Czat / Rezerwacje

## Notatki

`npm run build` OK.
