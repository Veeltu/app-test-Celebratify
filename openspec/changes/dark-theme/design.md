## Context

Celebratify ma jasny motyw w obszarze aplikacji (ramka telefonu: `bg-slate-50`, karty `bg-white`, tekst `text-slate-900`), podczas gdy tło desktopowe wokół ramki jest już ciemne (`slate-950`). Task wymaga pełnego przejścia UI na ciemny theme. Brak stanu theme — zmiana to zamiana klas Tailwind i utility CSS we wszystkich komponentach mobilnych.

## Goals / Non-Goals

**Goals:**
- Spójny ciemny wygląd shella (header, notch, tło treści, bottom nav) oraz wszystkich widoków i modali.
- Zachowanie czytelności (kontrast tekstu) i akcentów `brand-*` / `amber-*` dla CTA.
- Aktualizacja klas `glass-nav` / `glass-card` w `index.css` pod ciemne tła.

**Non-Goals:**
- Toggle light/dark, localStorage, `prefers-color-scheme`
- Zmiany w `App.tsx`, typach, mockach danych
- Nowe zależności, `tailwind.config`, Firebase

## Decisions

1. **Stały ciemny motyw (bez stanu)**  
   - Zamiana klas w miejscu zamiast `theme` w `App.tsx` / Context.  
   - Alternatywa (odrzuciona): przełącznik + `dark:` — zbędna złożoność względem briefu „zmień theme na ciemny”.

2. **Mapowanie kolorów (konwencja)**  
   - Tło shell / main: `bg-slate-950` lub `bg-slate-900`  
   - Karty / panele: `bg-slate-900` / `bg-slate-800` + `border-slate-700`  
   - Tekst główny: `text-slate-100` / `text-white`; drugorzędny: `text-slate-400`  
   - Inputy: `bg-slate-800 border-slate-600 text-slate-100`  
   - CTA: bez zmian (`brand-600` / gradient)  
   - Statusy sukcesu/ostrzeżeń: istniejące `emerald` / `amber` / `rose` — dostosować tła do ciemnych wariantów (`*-900/40` + jasny tekst)

3. **Pliki do zmiany**  
   - Shell: `MobileShell.tsx`, `BottomNav.tsx`, `NotificationBanner.tsx`  
   - Widoki: `MobileSearchView`, `MobileCompareView`, `MobileAIChatView`, `MobileBookingsView`, `MobileVenueAdminView`, `MobileVenueDetailModal`, `MobileBookingModal`, `MobileAuthModal`  
   - CSS: `src/index.css` (`glass-card`, `glass-nav`, scrollbar)  
   - Bez zmian: `App.tsx`, `types/`, `data/`

4. **Modale**  
   - Nadal `absolute inset-0` w shellu; tło overlay `bg-black/70` zamiast `bg-white/80`; panel `bg-slate-900 border-slate-700`.

## Risks / Trade-offs

- **[Risk] Niskokontrastowe miejsca** (jasny tekst na jasnym chipie) → Mitigation: przejść wszystkie `bg-slate-50`/`bg-white` + sprawdzić wizualnie każdą zakładkę i modal.
- **[Risk] Zdjęcia Unsplash na ciemnym tle wyglądają „okienkowo”** → Mitigation: zachować obecne ramki kart; bez nowych overlayi na zdjęciach.
- **[Trade-off] Reguły Cursor nadal mówią o jasnym motywie** → po archive warto zaktualizować `.cursor/rules` (osobny krok, nie blokuje demo).

## Migration Plan

- Jednorazowa zamiana klas w PR/branchu `feature/dark-theme`; rollback = revert commitów.
- Weryfikacja: wszystkie zakładki client + manager + 3 modale + `npm run build`.

## Open Questions

- Brak — brief jest jednoznaczny (ciemny theme, bez toggle).
