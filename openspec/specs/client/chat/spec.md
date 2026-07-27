# client/chat Specification

## Purpose

Czat AI (mock regex) po stronie klienta — przekształcanie opisu w filtry i rekomendacje lokali.

## Requirements

### Requirement: Rozpoznawanie lokalizacji z kontekstem okolicy
Czat AI (mock regex) SHALL rozpoznawać frazy wskazujące miasto oraz opcjonalnie okolice lub promień i przekładać je na filtry lokalizacji klienta.

#### Scenario: „pod Lesznem”
- **GIVEN** użytkownik pisze wiadomość zawierającą „pod Lesznem” (lub równoważną frazę okolicy)
- **WHEN** asystent przetwarza wiadomość
- **THEN** ustawiane jest miasto Leszno oraz sensowny domyślny promień (np. 50 km)
- **AND** rekomendowane lokale spełniają filtr lokalizacji

#### Scenario: „w promieniu 30 km od Krakowa”
- **GIVEN** użytkownik pisze o promieniu w km względem miasta z listy
- **WHEN** asystent przetwarza wiadomość
- **THEN** ustawiane jest wskazane miasto
- **AND** promień jest ustawiony na najbliższą dostępną wartość spośród 10 / 25 / 50 / 100 km (np. 30 → 25 lub 50 — zgodnie z regułą w design)

#### Scenario: samo miasto bez okolicy
- **GIVEN** użytkownik wymienia tylko miasto (np. „w Krakowie”)
- **WHEN** asystent przetwarza wiadomość
- **THEN** ustawiane jest to miasto
- **AND** promień może pozostać domyślny produktu (np. 50 km) albo poprzednia wartość filtrów — spójnie z implementacją
