# Praktyki implementacji w Celebratify

Ładuj ten plik, gdy potrzebujesz szczegółów UI / stanu poza skrótem w `SKILL.md`.

## Mapa plików vs typ zmiany

| Rodzaj zmiany | Gdzie |
|---------------|--------|
| Nowy typ / pole domenowe | `src/types/index.ts` |
| Słownik cech, miast, stałych | `src/data/<name>.ts` (nowy) |
| Mock lokali / rezerwacji | `src/data/mockVenues.ts` |
| Stan globalny, handlery | `src/App.tsx` |
| Lista + filtry | `MobileSearchView.tsx` |
| Szczegóły lokalu / menu / galeria | `MobileVenueDetailModal.tsx` |
| Rezerwacja | `MobileBookingModal.tsx` |
| Porównanie | `MobileCompareView.tsx` |
| Czat „AI” (regex) | `MobileAIChatView.tsx` |
| Panel managera | `MobileVenueAdminView.tsx` |
| Font / Tailwind theme | `index.html` |

## Wzorzec modału

```tsx
<div className="absolute inset-0 z-50 bg-white flex flex-col h-full">
  <div className="flex-none">{/* header */}</div>
  <div className="flex-1 overflow-y-auto no-scrollbar">{/* body */}</div>
  <div className="flex-none">{/* sticky CTA */}</div>
</div>
```

## Props z App

Widok dostaje m.in. `venues`, `bookings`, `filters`, `user`, `role` oraz callbacki (`onSelectVenue`, `onFilterChange`, `onStartBooking`, …). Nowa akcja biznesowa = handler w `App.tsx` + prop.

## Checklist jakości przed done

- [ ] Typy spójne z `src/types/index.ts` (bez `any`)
- [ ] Mocki pokrywają nową funkcjonalność (demo nie jest „puste”)
- [ ] PL copy, jasny motyw, `absolute` modale
- [ ] Jeśli filtry/cechy/miasta — zsynchronizowane Search + Compare + AI chat
- [ ] `npm run build` przechodzi
- [ ] `doc/changes/<slug>.md` utworzony

## Anti-patterns

- Duplikowanie listy cech w compare zamiast wspólnego słownika
- `fixed` overlay wychodzący poza ramkę telefonu
- Podłączanie Firebase bo jest w `package.json`
- Rozbijanie stanu na Context „dla porządku”
- Commit bez prośby użytkownika
