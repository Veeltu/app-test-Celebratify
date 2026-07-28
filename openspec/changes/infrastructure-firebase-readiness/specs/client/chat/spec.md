## MODIFIED Requirements

### Requirement: Rozpoznawanie lokalizacji z kontekstem okolicy
Czat AI SHALL rozpoznawać frazy wskazujące miasto oraz opcjonalnie okolice lub promień i filtrować dane pobrane z Firestore pod kątem rekomendacji.

#### Scenario: „pod Lesznem”
- **GIVEN** dane lokali są dostępne z Firestore
- **AND** użytkownik pisze wiadomość zawierającą „pod Lesznem”
- **WHEN** asystent przetwarza wiadomość
- **THEN** ustawiane jest miasto Leszno oraz promień 50 km
- **AND** rekomendowane lokale są filtrowane z aktualnej bazy Firestore

#### Scenario: „w promieniu 30 km od Krakowa”
- **GIVEN** dane lokali są dostępne z Firestore
- **AND** użytkownik pisze o promieniu w km
- **WHEN** asystent przetwarza wiadomość
- **THEN** ustawiane jest wskazane miasto i dopasowany promień
- **AND** rekomendacje pochodzą z aktualnej bazy Firestore
