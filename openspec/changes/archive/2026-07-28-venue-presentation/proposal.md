## Why

Obecne opisy lokali są zbyt ogólne i generyczne, co utrudnia potencjalnym klientom szybkie zrozumienie charakteru miejsca oraz jego unikalnych zalet (USP). Zmiana wprowadza bardziej konkretną i "apetyczną" prezentację lokali, inspirowaną standardami serwisów takich jak Booking.com czy Airbnb, aby zwiększyć atrakcyjność oferty (kontekst: sekcja 2 w `doc/sugestions.md`).

## What Changes

- **Model danych**: Rozszerzenie typu `Venue` o pola `highlights` (kluczowe wyróżniki), `bestFor` (główne przeznaczenie) oraz `atmosphere` (krótki opis klimatu).
- **Dane mockowe**: Aktualizacja `src/data/mockVenues.ts` o nowe informacje sprzedażowe dla wszystkich dostępnych lokali.
- **Widok wyszukiwania**: Dodanie linii z kluczowymi wyróżnikami (np. "Ogród • Noclegi • do 120 os.") pod nazwą lokalu na karcie w wynikach wyszukiwania.
- **Widok szczegółów**: Wprowadzenie nowej sekcji "Dlaczego ten lokal?" z ikonami i listą USP, zastępującej lub uzupełniającej ogólny opis.

## Capabilities

### New Capabilities
- `client/venue-details`: Szczegółowa prezentacja lokalu skupiona na jego unikalnych cechach, atmosferze i przeznaczeniu, ułatwiająca podjęcie decyzji o rezerwacji.

### Modified Capabilities
- `client/search`: Prezentacja listy lokali wzbogacona o szybki podgląd kluczowych wyróżników marketingowych bezpośrednio na wynikach wyszukiwania.

## Impact

- `src/types/index.ts`: Zmiana struktury interfejsu `Venue`.
- `src/data/mockVenues.ts`: Aktualizacja danych wszystkich lokali.
- `src/components/mobile/views/MobileSearchView.tsx`: UI kart lokali.
- `src/components/mobile/views/MobileVenueDetailModal.tsx`: Layout strony lokalu.

## Non-goals

- Integracja z zewnętrznym backendem lub Firebase.
- Użycie prawdziwego AI do generowania opisów.
- Zmiana logiki filtrowania (bazujemy na istniejących filtrach).
