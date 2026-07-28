## ADDED Requirements

### Requirement: Zarządzanie statusem rezerwacji w czasie rzeczywistym
System SHALL umożliwiać zmianę statusu rezerwacji (Akceptacja/Odrzucenie) przez menedżera, a zmiana ta MUST być natychmiast widoczna u klienta.

#### Scenario: Akceptacja rezerwacji przez managera
- **WHEN** menedżer klika "Akceptuj" w panelu admina
- **THEN** status rezerwacji w Firestore zmienia się na "Potwierdzona"
- **AND** klient widzi zaktualizowany status w zakładce "Moje Rezerwacje" w czasie rzeczywistym
