## Why

Demo Celebratify ma jasny motyw (`bg-white` / `slate-50`) we wszystkich widokach wewnątrz ramki telefonu, podczas gdy otoczenie desktopowe jest już ciemne — niespójny wygląd. Task `doc/tasks/todo/tryb-lokalu/feature-change-color.md` wymaga przejścia na ciemny theme w całej aplikacji mobilnej.

## What Changes

- **BREAKING** (wizualnie): domyślny motyw UI zmienia się z jasnego na ciemny we wszystkich widokach klienta i menedżera.
- Tła, karty, teksty, obramowania, inputy i modale dostosowane do palety ciemnej (`slate-900` / `slate-950`, jasny tekst).
- Shell (header, bottom nav, notch, tło obszaru treści) spójny z ciemnym motywem.
- Akcenty marki (`brand-*`, `amber-*`) zachowane jako CTA i wyróżnienia.

## Non-goals

- Przełącznik light/dark i zapamiętywanie preferencji użytkownika
- Synchronizacja z `prefers-color-scheme` systemu
- Backend, Firebase, router, prawdziwe AI
- Nowe biblioteki UI / Tailwind config (nadal CDN w `index.html`)
- Refaktor architektury stanu (`App.tsx`) poza ewentualnym brakiem potrzeby stanu theme

## Capabilities

### New Capabilities
- `client/ui-theme`: Wygląd aplikacji — ciemny motyw jako domyślny wygląd shella i wszystkich widoków/modali w demo.

### Modified Capabilities
- (brak — istniejące specs `client/search`, `client/chat`, `client/venue-details` nie zmieniają wymagań behawioralnych, tylko warstwa wizualna)

## Impact

- `src/components/mobile/MobileShell.tsx` — tło ramki treści, header, notch
- `src/components/mobile/BottomNav.tsx`, `NotificationBanner.tsx`
- Wszystkie widoki w `src/components/mobile/views/*` (search, compare, chat, bookings, admin, detail, booking, auth)
- Ewentualnie `src/index.css` (utility classes typu `glass-nav`) oraz kolory w `index.html` jeśli potrzebne podciągnięcie kontrastu
- Reguły Cursor (`project-overview`, `mobile-components`) po implementacji powinny odzwierciedlać ciemny motyw jako obowiązujący — poza scope tej zmiany OpenSpec (aktualizacja reguł opcjonalna przy archive)
