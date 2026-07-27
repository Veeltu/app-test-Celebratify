---
id: bug-layout-01
task_file: doc/tasks/bug-layout-01.md
source_section: null
completed: 2026-07-27
---

# CHANGE — Bug layoutu (Szukaj → szczegóły lokalu)

> Log wdrożenia. Opis: [`doc/tasks/bug-layout-01.md`](../tasks/bug-layout-01.md).

## Podsumowanie

Modal szczegółów lokalu nie psuje się po scrollu długiej listy w Szukaj. Overlay jest poza obszarem scrolla, w stałej wysokości ramki telefonu.

## Zmiany w kodzie

- `MobileShell.tsx` — shell `flex flex-col` + `100dvh` / 844px; `main` scrolluje w `absolute inset-0`; nowy prop `overlay` (sibling, ten sam relative box)
- `App.tsx` — szczegóły lokalu, booking i auth w `overlay={…}` zamiast wewnątrz children
- `MobileBookingModal.tsx` / `MobileAuthModal.tsx` — `fixed` → `absolute inset-0` (w ramach shella)

## Decyzje / odstępstwa od taska

- Brak — naprawa zgodna z diagnozą w tasku.

## Jak sprawdzić

- [ ] Szukaj → scroll do dołu listy (wiele lokali) → klik lokal → modal pełny, poprawny header/scroll
- [ ] Zamknij → lista nadal przewijalna
- [ ] Rezerwuj / Zaloguj — sheet w ramce telefonu, nie na całym desktop viewport

## Notatki

`npm run build` przechodzi.
