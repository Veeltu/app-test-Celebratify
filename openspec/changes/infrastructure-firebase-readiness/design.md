## Context

Aplikacja Celebratify jest obecnie mobilnym prototypem z danymi zapisanymi "na sztywno" w kodzie (`src/data/mockVenues.ts`) i stanem zarządzanym przez `useState` w `App.tsx`. Architektura opiera się na "głupich" widokach i scentralizowanej logice w głównym komponencie.

## Goals / Non-Goals

**Goals:**
- Implementacja Firebase jako źródła prawdy dla `venues` i `bookings`.
- Utrzymanie wzorca "głupich" widoków (props + callbacki).
- Minimalizacja zmian w `App.tsx` poprzez wydzielenie logiki Firebase do osobnego serwisu/hooków.

**Non-Goals:**
- Dodawanie systemów zarządzania stanem typu Redux czy Zustand.
- Zmiana struktury typów (używamy istniejących interfejsów z `src/types/index.ts`).

## Decisions

### 1. Wydzielenie serwisu Firebase (`src/services/firebase.ts`)
Zamiast wrzucać logikę `getFirestore`, `addDoc`, `onSnapshot` bezpośrednio do `App.tsx`, stworzymy warstwę abstrakcji.
- **Racja**: Łatwiejsze testowanie i możliwość powrotu do mocków (np. flaga `USE_FIREBASE`).
- **Alternatywa**: Bezpośrednie użycie SDK w `useEffect` w `App.tsx` (zbyt duży plik).

### 2. Model danych w Firestore (Schemat)

Struktura bazy w Cloud Firestore będzie odzwierciedlać istniejące typy TypeScript, z podziałem na główne kolekcje:

#### Kolekcja `venues`
- **Document ID**: `venueId` (np. `v1`, `v2`)
- **Pola**:
  - `name`: string
  - `category`: string
  - `city`: string
  - `priceFrom`: number
  - `packages`: array (nested objects)
    - `id`: string
    - `name`: string
    - `pricePerPerson`: number
    - `menu`: array
    - `choiceGroups`: array
  - `availableDates`: array of strings (ISO date)
  - `blockedDates`: array of strings (ISO date)
  - `lat`/`lng`: number
  - `managerId`: string (referencja do Auth User ID)

#### Kolekcja `bookings`
- **Document ID**: auto-generated przez Firebase
- **Pola**:
  - `venueId`: string
  - `venueName`: string
  - `clientName`: string
  - `clientEmail`: string
  - `date`: string (ISO)
  - `guestsCount`: number
  - `packageId`: string
  - `status`: string (`Oczekuje` | `Potwierdzona` | `Odrzucona` | `Anulowana`)
  - `createdAt`: timestamp
  - `specialRequests`: string

#### Kolekcja `users` (opcjonalnie)
- **Document ID**: Firebase Auth `uid`
- **Pola**:
  - `email`: string
  - `name`: string
  - `role`: string (`client` | `manager`)
  - `managedVenueId`: string (tylko dla managerów)

- **Racja**: Firestore to baza dokumentowa, co idealnie pasuje do naszych typów TypeScript. Umożliwia łatwe zapytania (np. `where("city", "==", "Kraków")`) i subskrypcje real-time.

### 3. Autentykacja
Użycie Firebase Auth z providerami Google i Apple (zgodnie z UI w `MobileAuthModal`).
- **Racja**: Firebase oferuje gotowe SDK, które integruje się z profilami użytkowników w Firestore (kolekcja `users`).

## Risks / Trade-offs

- [Risk] Asynchroniczność → [Mitigation] Dodanie flagi `isLoading` w `App.tsx` i renderowanie spinnera w `MobileSearchView`.
- [Risk] Koszty i limity darmowego planu Firebase → [Mitigation] Ograniczenie liczby odczytów przez `onSnapshot` (tylko tam, gdzie real-time jest kluczowy).

## Affected Files
- `src/App.tsx`: Refaktor `useEffect` do ładowania danych i zmiana handlerów na asynchroniczne.
- `src/services/firebase.ts`: (Nowy) Inicjalizacja i funkcje pomocnicze.
- `src/components/mobile/views/MobileSearchView.tsx`: Obsługa stanu ładowania.
