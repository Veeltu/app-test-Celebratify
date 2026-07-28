## Why

Po wybraniu konkretnej restauracji otwiera się karta danego lokalu (`MobileVenueDetailModal`), która zakrywa dolny panel przycisków nawigacyjnych (`BottomNav`). Dodatkowo, użytkownik oczekuje, że kliknięcie dowolnej zakładki w dolnym menu spowoduje automatyczne zamknięcie otwartej karty lokalu, umożliwiając płynne przejście do nowej sekcji.

## What Changes

- Zapewnienie, że dolny pasek nawigacji (`BottomNav`) jest zawsze na wierzchu i interaktywny.
- Dodanie logiki automatycznego zamykania wszystkich aktywnych modali (szczegóły lokalu, formularz rezerwacji, auth) w momencie zmiany zakładki w dolnym menu.
- Usprawnienie UX poprzez redukcję liczby kliknięć potrzebnych do wyjścia z podglądu lokalu.

## Capabilities

### New Capabilities
- `client/ui-shell`: Zarządzanie globalnym układem ramki aplikacji oraz koordynacja zamykania modali przy nawigacji.

### Modified Capabilities
- Brak zmian w wymaganiach biznesowych; zmiana dotyczy ergonomii przepływu użytkownika.

## Impact

- `src/App.tsx`: Wprowadzenie funkcji `handleTabChange`, która resetuje stan modali przed zmianą zakładki.
- `src/components/mobile/MobileShell.tsx`: Poprawna hierarchia warstw (z-index), aby menu było zawsze dostępne.
- `src/components/mobile/views/MobileVenueDetailModal.tsx` i inne modale: Dostosowanie `z-index`.
