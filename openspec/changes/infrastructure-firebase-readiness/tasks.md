## 1. Konfiguracja i Infrastruktura

- [ ] 1.1 Inicjalizacja projektu Firebase (Auth i Firestore) w konsoli Firebase
- [ ] 1.2 Utworzenie pliku `src/services/firebase.ts` z konfiguracją SDK
- [ ] 1.3 Implementacja funkcji `initializeData()` do migrowania `INITIAL_VENUES` do Firestore (one-time seeding)

## 2. Refaktoryzacja stanu w App.tsx

- [ ] 2.1 Dodanie stanu `isLoading` do `App` i obsługa asynchronicznego ładowania `venues` z Firestore
- [ ] 2.2 Zamiana `useState<Venue[]>(INITIAL_VENUES)` na subskrypcję `onSnapshot` w `useEffect`
- [ ] 2.3 Zamiana `useState<BookingRequest[]>(INITIAL_BOOKINGS)` na subskrypcję Firestore dla kolekcji `bookings`

## 3. Implementacja Akcji (Handlers)

- [ ] 3.1 Aktualizacja `handleSubmitBooking` — zapis do Firestore zamiast `setBookings`
- [ ] 3.2 Aktualizacja `handleAcceptBooking` / `handleRejectBooking` — update dokumentu w Firestore
- [ ] 3.3 Aktualizacja `handleUpdateVenuePrice` / `handleToggleDateAvailability` — update dokumentu lokalu

## 4. Autentykacja i UI

- [ ] 4.1 Integracja Firebase Auth w `MobileAuthModal` (logowanie/wylogowanie)
- [ ] 4.2 Dodanie szkieletów ładowania (skeletons) w `MobileSearchView`
- [ ] 4.3 Testy end-to-end: rezerwacja przez klienta → akceptacja przez managera → widoczność u obu stron

## 5. Finalizacja

- [ ] 5.1 Usunięcie niepotrzebnych importów `INITIAL_VENUES` z komponentów
- [ ] 5.2 Weryfikacja spójności typów w `src/types/index.ts`
- [ ] 5.3 Uruchomienie `npm run build` w celu sprawdzenia błędów kompilacji
