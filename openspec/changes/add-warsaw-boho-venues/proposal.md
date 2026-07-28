## Why

Obecna baza lokali w Warszawie zawiera tylko jeden obiekt (`Rezydencja Cristal & Spa`), co ogranicza możliwość testowania filtrów i porównywarki w stolicy. Dodanie 4 atrakcyjnych lokali w popularnym stylu boho w Warszawie zwiększy różnorodność bazy demo oraz uatrakcyjni wyszukiwanie i porównywanie ofert.

## What Changes

- **Baza lokali (`src/data/mockVenues.ts`)**: Dodanie 4 nowych obiektów zlokalizowanych w Warszawie (oraz bliskiej okolicy) w klimacie boho / ogrodowym:
  1. *Szklararnia & Ogród Boho Warszawski* (Szklarnia / Oranżeria z girlandami i drewnem)
  2. *Słoneczna Polana nad Wisłą* (Plenerowa strefa boho, namiot stretch, klimatyczne oświetlenie)
  3. *Stodoła Boho Wilanów* (Nowoczesna stodoła weselna z wiejskim stołem i wyplatanymi makramami)
  4. *Studio Loft & Garden Praga* (Postindustrialna przestrzeń z roślinnością i miedzianymi akcentami)
- **Kompletne dane**: Wszystkie nowe lokale zawierają pełną strukturę (pakiety, menu, opcje modyfikatorów, wyróżniki `highlights`, `bestFor`, `atmosphere`, dostępne daty oraz atrakcyjne zdjęcia z Unsplash).

## Capabilities

### New Capabilities
<!-- Brak nowych możliwości systemowych -->

### Modified Capabilities
<!-- Brak zmian w wymaganiach specyfikacji - nowe lokale wpisują się w istniejące specyfikacje client/search oraz client/venue-details -->

## Impact

- `src/data/mockVenues.ts`: Dodanie 4 nowych wpisów do tablicy `INITIAL_VENUES`.

## Non-goals

- Zmiany w widokach UI czy filtrach (nowe lokale automatycznie pojawią się w wynikach dla Warszawy).
- Integracja z zewnętrznym backendem.
