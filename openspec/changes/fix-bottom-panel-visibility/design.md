## Context

Głównym problemem zgłoszonym przez użytkownika jest to, że karta lokalu zakrywa dolny panel, a po jego odsłonięciu (poprzez z-index), kliknięcie w menu nie zamyka karty. Rozwiązanie musi obejmować zarówno widoczność paska, jak i reakcję na kliknięcie w nim.

## Goals / Non-Goals

**Goals:**
- Dolny panel nawigacyjny musi być zawsze na wierzchu (`z-index`).
- Kliknięcie w dowolną ikonę dolnego menu musi zamykać `MobileVenueDetailModal`, `MobileBookingModal` oraz `MobileAuthModal`.
- Płynne przejście między widokami bez "wiszących" modali w tle.

**Non-Goals:**
- Nie zmieniamy struktury stanu w `App.tsx` (nadal `useState`).
- Nie wprowadzamy globalnego systemu zarządzania modalitami.

## Decisions

1. **Centralna obsługa nawigacji w App.tsx**:
   - Zamiast przekazywać bezpośrednio `setActiveTab` do `MobileShell`, wprowadzimy funkcję `handleTabChange`.
   - Funkcja ta będzie:
     1. Wywoływać `setSelectedVenue(null)`
     2. Wywoływać `setBookingModalData(null)`
     3. Wywoływać `setIsAuthModalOpen(false)`
     4. Wywoływać `setActiveTab(tab)`

2. **Hierarchia warstw (z-index)**:
   - Utrzymujemy `z-50` dla `Header` i `BottomNav` w `MobileShell.tsx`.
   - Utrzymujemy `z-40` dla modali overlay, aby znajdowały się pod paskiem nawigacji.

## Risks / Trade-offs

- [Risk] Użytkownik może stracić postęp w formularzu rezerwacji przy przypadkowym kliknięciu w menu → [Mitigation] Formularz rezerwacji jest krótki, a stała dostępność menu jest priorytetem UX w tym prototypie.
