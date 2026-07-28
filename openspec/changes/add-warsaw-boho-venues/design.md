## Context

Warszawa jako stolica wymaga bogatszego wyboru lokali w celach prezentacyjnych. Styl boho / stodoła / szklarnia jest obecnie bardzo popularny przy rezerwacjach weselnych i imprezach jubileuszowych.

## Goals / Non-Goals

**Goals:**
- Dodanie 4 nowych obiektów w Warszawie zunifikowanych ze strukturą typu `Venue` (w tym `highlights`, `bestFor`, `atmosphere`).
- Zapewnienie poprawnych punktów geograficznych (lat/lng) wokół Warszawy, aby filtrowanie wg promienia wyliczało rzetelne odległości.

**Non-Goals:**
- Tworzenie nowych komponentów UI ani edycja istniejącej logiki biznesowej.

## Decisions

1. **Współrzędne geograficzne w Warszawie**:
   - Szklarnia Boho: `52.2300, 21.0110` (Śródmieście / Mokotów)
   - Słoneczna Polana nad Wisłą: `52.2150, 21.0500` (Saska Kępa / Wisła)
   - Stodoła Boho Wilanów: `52.1650, 21.0900` (Wilanów)
   - Studio Loft & Garden Praga: `52.2500, 21.0350` (Praga Północ)

2. **Pakiety i Menu**:
   - Każdy lokal otrzyma unikalne ID (np. `vW1`, `vW2`, `vW3`, `vW4`) oraz pakiety wykorzystujące istniejące próbniki menu z `menuSamples.ts` (`MENU_BBQ`, `MENU_MORSKI`, `MENU_ZLOTY`, `MENU_KAMERALNY`, `MENU_FINE`).

## Risks / Trade-offs

- **[Risk]**: Brak wpływu na architekturę — minimalne ryzyko dotyczące wyłącznie struktur danych w pamięci.
