## Context

Obecna struktura danych `Venue` ogranicza się do nazwy, opisu i podstawowych parametrów. Powoduje to, że karta lokalu w wyszukiwarce oraz widok szczegółów są mało zróżnicowane i nie eksponują unikalnych cech (USP) poszczególnych miejsc. Zmiana ma na celu wzbogacenie modelu danych i UI o elementy "sprzedażowe".

## Goals / Non-Goals

**Goals:**
- Rozszerzenie modelu danych o marketingowe wyróżniki (highlights, atmosphere, bestFor).
- Zwiększenie gęstości informacji na karcie wyszukiwania bez jej przeładowania.
- Dodanie atrakcyjnej wizualnie sekcji USP w widoku szczegółów.

**Non-Goals:**
- Zmiana istniejących pól `description` (zostają jako ogólny tekst).
- Wprowadzanie nowych ikon (używamy istniejącej biblioteki `lucide-react`).
- Zmiany w widoku porównywarki (chyba że wystarczy miejsca na nowe pola).

## Decisions

### 1. Rozszerzenie interfejsu `Venue`
W `src/types/index.ts` dodamy:
- `highlights: string[]` (max 3-5 krótkich haseł).
- `bestFor: string[]` (np. ["Wesela", "Eventy firmowe"]).
- `atmosphere: string` (krótki opis klimatu).

### 2. Formatowanie wyróżników w wyszukiwarce
W `MobileSearchView.tsx`, pod nazwą lokalu, dodamy linię tekstu renderowaną z `venue.highlights.slice(0, 3).join(' • ')`. Użyjemy małego fontu (`text-xs`) i koloru `text-slate-500`.

### 3. Nowa sekcja "Dlaczego ten lokal?" w szczegółach
W `MobileVenueDetailModal.tsx` dodamy grid (2 kolumny) prezentujący `highlights` z ikonami. Przykładowe mapowanie:
- "Ogród" -> `Trees`
- "Noclegi" -> `Hotel`
- "Catering" -> `Utensils`
- Default -> `CheckCircle2`

### 4. Aktualizacja danych mockowych
Wszystkie lokale w `src/data/mockVenues.ts` zostaną zaktualizowane o sensowne dane testowe pasujące do ich charakteru.

## Risks / Trade-offs

- **[Risk]**: Długie teksty w `highlights` mogą rozbić layout karty wyszukiwania.
  - **Mitigation**: Zastosowanie `truncate` w Tailwind CSS lub twardy limit znaków/liczby elementów w kodzie.
- **[Risk]**: Brak pasujących ikon dla specyficznych wyróżników.
  - **Mitigation**: Użycie uniwersalnej ikony (np. `CheckCircle2`) dla nieobsłużonych przypadków.
