## MODIFIED Requirements

### Requirement: Filtrowanie lokali po punkcie i promieniu
System SHALL filtrować listę lokali pobraną asynchronicznie z Firestore względem wybranego miasta (punkt odniesienia) oraz promienia w kilometrach. Przy mieście „Wszystkie” filtr lokalizacji nie ogranicza wyników po odległości.

#### Scenario: Miasto z promieniem 50 km
- **GIVEN** dane lokali zostały pobrane z Firestore
- **AND** użytkownik wybrał miasto Leszno oraz promień 50 km
- **WHEN** lista wyników jest wyliczana
- **THEN** widoczne są lokale, których odległość od współrzędnych Leszna jest ≤ 50 km
- **AND** lokale poza tym zasięgiem nie są widoczne

#### Scenario: Wszystkie miasta
- **GIVEN** dane lokali zostały pobrane z Firestore
- **AND** użytkownik wybrał miasto „Wszystkie”
- **WHEN** lista wyników jest wyliczana
- **THEN** filtr lokalizacji nie odrzuca lokali z powodu odległości
- **AND** kontrolka promienia jest nieaktywna lub ukryta

#### Scenario: Łączenie z innymi filtrami
- **GIVEN** ustawione miasto, promień, liczbę gości oraz max cenę
- **WHEN** lista wyników jest wyliczana z danych Firestore
- **THEN** lokal musi spełniać wszystkie aktywne filtry jednocześnie

## ADDED Requirements

### Requirement: Stan ładowania danych
System SHALL wyświetlać wskaźnik ładowania (spinner/skeleton), dopóki dane lokali nie zostaną w pełni pobrane z Firestore.

#### Scenario: Widok ładowania przy starcie
- **WHEN** aplikacja jest inicjalizowana i pobiera dane z Firestore
- **THEN** zamiast listy lokali widoczny jest wskaźnik ładowania
- **AND** filtry są nieaktywne do czasu otrzymania danych
