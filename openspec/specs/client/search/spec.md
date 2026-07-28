# client/search Specification

## Purpose

Wyszukiwanie lokali po stronie klienta: filtry lokalizacji (miasto + promień), wyniki z odległością, współistnienie z innymi filtrami.

## Requirements

### Requirement: Filtrowanie lokali po punkcie i promieniu
System SHALL filtrować listę lokali względem wybranego miasta (punkt odniesienia) oraz promienia w kilometrach. Przy mieście „Wszystkie” filtr lokalizacji nie ogranicza wyników po odległości.

#### Scenario: Miasto z promieniem 50 km
- **GIVEN** użytkownik wybrał miasto Leszno oraz promień 50 km
- **WHEN** lista wyników jest wyliczana
- **THEN** widoczne są lokale, których odległość od współrzędnych Leszna jest ≤ 50 km
- **AND** lokale poza tym zasięgiem nie są widoczne

#### Scenario: Wszystkie miasta
- **GIVEN** użytkownik wybrał miasto „Wszystkie”
- **WHEN** lista wyników jest wyliczana
- **THEN** filtr lokalizacji nie odrzuca lokali z powodu odległości
- **AND** kontrolka promienia jest nieaktywna lub ukryta

#### Scenario: Łączenie z innymi filtrami
- **GIVEN** ustawione miasto, promień, liczbę gości oraz max cenę
- **WHEN** lista wyników jest wyliczana
- **THEN** lokal musi spełniać wszystkie aktywne filtry jednocześnie

### Requirement: Wybór promienia w UI wyszukiwania
System SHALL umożliwić wybór promienia spośród wartości 10, 25, 50 i 100 km po wybraniu konkretnego miasta.

#### Scenario: Zmiana promienia
- **GIVEN** wybrane miasto inne niż „Wszystkie”
- **WHEN** użytkownik wybiera promień 25 km
- **THEN** lista wyników odświeża się według nowego zasięgu
- **AND** wybrana wartość jest widoczna w filtrach

### Requirement: Odległość na karcie wyniku
System SHALL pokazywać na karcie lokalu w wynikach wyszukiwania odległość od punktu odniesienia, gdy aktywne jest konkretne miasto.

#### Scenario: Etykieta odległości
- **GIVEN** filtr miasta = Leszno oraz lokal w zasięgu
- **WHEN** użytkownik przegląda kartę wyniku
- **THEN** widoczna jest odległość w kilometrach (np. „12 km od Leszna”)

#### Scenario: Brak etykiety przy Wszystkie
- **GIVEN** filtr miasta = „Wszystkie”
- **WHEN** użytkownik przegląda kartę wyniku
- **THEN** etykieta odległości od punktu odniesienia nie jest wymagana

### Requirement: Wyróżniki marketingowe na karcie wyniku
System SHALL wyświetlać skróconą listę kluczowych wyróżników (highlights) bezpośrednio na karcie lokalu w wynikach wyszukiwania, aby umożliwić szybkie porównanie ofert.

#### Scenario: Podgląd wyróżników w wyszukiwarce
- **WHEN** użytkownik przegląda listę wyników wyszukiwania
- **THEN** na każdej karcie lokalu, pod jego nazwą, widoczna jest linia z wyróżnikami oddzielonymi kropką (np. "Ogród • Noclegi • Klimatyzacja")
- **AND** wyróżniki są ograniczone do maksymalnie 3 najważniejszych cech
