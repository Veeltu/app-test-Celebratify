## 1. Modyfikacja MobileShell (Hierarchia z-index)

- [x] 1.1 Zmiana `z-index` dla nagłówka (`header`) w `src/components/mobile/MobileShell.tsx` z `z-40` na `z-50`.
- [x] 1.2 Zmiana `z-index` dla kontenera `BottomNav` w `src/components/mobile/MobileShell.tsx` z `z-40` na `z-50`.

## 2. Dostosowanie Modali (Overlay)

- [x] 2.1 Zmiana `z-index` w `MobileVenueDetailModal.tsx` z `z-50` na `z-40`.
- [x] 2.2 Zmiana `z-index` w `MobileBookingModal.tsx` z `z-50` na `z-40`.
- [x] 2.3 Zmiana `z-index` w `MobileAuthModal.tsx` z `z-50` na `z-40`.

## 3. Implementacja logiki zamykania modali

- [x] 3.1 Dodanie funkcji `handleTabChange` w `src/App.tsx`, która czyści stany `selectedVenue`, `bookingModalData` oraz `isAuthModalOpen`.
- [x] 3.2 Podpięcie `handleTabChange` do propa `onSelectTab` w komponencie `MobileShell` wewnątrz `App.tsx`.

## 4. Weryfikacja i Build

- [x] 4.1 Sprawdzenie czy kliknięcie w dowolną zakładkę menu zamyka otwarty podgląd lokalu.
- [x] 4.2 Sprawdzenie czy kliknięcie w menu zamyka formularz rezerwacji oraz modal logowania.
- [x] 4.3 Uruchomienie `npm run build` w celu weryfikacji końcowej.
