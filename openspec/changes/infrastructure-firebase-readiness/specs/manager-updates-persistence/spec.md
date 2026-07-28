## ADDED Requirements

### Requirement: Trwałość zmian w lokalu
System SHALL zapisywać wszelkie zmiany w konfiguracji lokalu (ceny pakietów, zablokowane daty) w dokumencie lokalu w Firestore.

#### Scenario: Zmiana ceny pakietu
- **WHEN** menedżer aktualizuje cenę pakietu w panelu "Cennik"
- **THEN** nowa cena jest zapisywana w Firestore
- **AND** wszyscy klienci widzą nową cenę podczas przeglądania tego lokalu

#### Scenario: Blokowanie terminów w kalendarzu
- **WHEN** menedżer blokuje datę w kalendarzu lokalu
- **THEN** data ta zostaje dopisana do `blockedDates` w Firestore
- **AND** data staje się niedostępna w formularzu rezerwacji dla wszystkich klientów
