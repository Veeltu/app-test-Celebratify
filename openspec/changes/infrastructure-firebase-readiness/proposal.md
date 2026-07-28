## Why

Obecnie aplikacja jest prototypem z danymi w pamięci (`useState`), co oznacza utratę wszystkich zmian (rezerwacje, zmiany cen, dostępności) po odświeżeniu strony. Wprowadzenie Firebase pozwoli na trwałość danych (persistence) oraz umożliwi realną interakcję między klientem a menedżerem lokalu w czasie rzeczywistym.

## What Changes

- Integracja Firebase SDK (Auth, Firestore) jako źródła prawdy dla danych.
- Migracja stanu `venues` i `bookings` z `App.tsx` do Firestore.
- Wprowadzenie prawdziwego systemu autoryzacji (Firebase Auth) zamiast obecnych mocków.
- Synchronizacja w czasie rzeczywistym dla statusów rezerwacji i dostępności terminów.
- **BREAKING**: Zmiana sposobu inicjalizacji danych — zamiast importu z `mockVenues.ts`, dane będą pobierane asynchronicznie przy starcie aplikacji.

## Capabilities

### New Capabilities
- `firebase-infrastructure`: Konfiguracja warstwy serwisu do komunikacji z Firestore i Auth.
- `persistent-bookings`: Trwałe przechowywanie i zarządzanie zapytaniami o rezerwację.
- `manager-updates-persistence`: Trwałe zapisywanie zmian w cennikach i kalendarzach przez menedżerów.

### Modified Capabilities
- `client/search`: Wyniki wyszukiwania będą pochodzić z Firestore zamiast z lokalnej zmiennej `venues`.
- `client/chat`: Asystent AI będzie operował na danych pobranych z bazy.

## Impact

- `src/App.tsx`: Znaczna refaktoryzacja zarządzania stanem.
- `src/services/firebase.ts`: Nowy plik z inicjalizacją Firebase.
- `src/data/mockVenues.ts`: Zmieni rolę na generator danych początkowych (seeding) dla Firestore.
- Wydajność: Aplikacja stanie się asynchroniczna, co wymaga obsługi stanów ładowania (loading states) w UI.

## Non-goals

- Pełne wdrożenie Firebase w tym kroku (to jest specyfikacja gotowości i planu).
- Rezygnacja z Tailwind CDN na rzecz pełnej konfiguracji (pozostajemy przy obecnym stacku UI).
- Wprowadzenie skomplikowanych Cloud Functions (logika pozostaje w kliencie).
