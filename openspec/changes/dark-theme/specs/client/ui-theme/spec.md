## ADDED Requirements

### Requirement: Ciemny motyw domyślny w shellu aplikacji
System SHALL renderować ramkę aplikacji (obszar treści telefonu, nagłówek, notch desktopowy oraz dolną nawigację) w ciemnym motywie: ciemne tła i jasny tekst, spójnie z otoczeniem desktopowym.

#### Scenario: Widok startowy w ciemnym motywie
- **GIVEN** użytkownik otwiera aplikację Celebratify
- **WHEN** widoczny jest shell z listą wyszukiwania
- **THEN** tło obszaru treści i nagłówek są ciemne (nie białe / slate-50)
- **AND** nazwa „Celebratify” oraz etykiety nawigacji są czytelne na ciemnym tle

#### Scenario: Dolna nawigacja w ciemnym motywie
- **GIVEN** użytkownik jest w trybie klienta lub menedżera
- **WHEN** widoczny jest pasek `BottomNav`
- **THEN** pasek ma ciemne tło i jasne etykiety/ikony
- **AND** aktywna zakładka pozostaje wyróżniona akcentem marki

### Requirement: Ciemny motyw we wszystkich widokach i modalach
System SHALL stosować ciemny motyw we wszystkich zakładkach (wyszukiwanie, porównanie, czat AI, rezerwacje, panel lokalu) oraz w modalach (szczegóły lokalu, rezerwacja, logowanie).

#### Scenario: Przeglądanie zakładek klienta
- **GIVEN** użytkownik w trybie klienta
- **WHEN** przełącza zakładki Szukaj, Porównaj, Czat AI i Rezerwacje
- **THEN** każdy widok ma ciemne tła kart/paneli i jasny tekst
- **AND** przyciski CTA zachowują kolory marki (`brand-*`)

#### Scenario: Modal szczegółów lokalu
- **GIVEN** użytkownik otwiera szczegóły lokalu
- **WHEN** modal jest widoczny
- **THEN** tło modala i paneli jest ciemne
- **AND** tekst opisów oraz ceny pozostają czytelne

#### Scenario: Panel menedżera
- **GIVEN** użytkownik przełącza się na tryb lokalu
- **WHEN** przegląda zakładki panelu (zapytania, kalendarz, cennik, menu)
- **THEN** widoki admina są w ciemnym motywie spójnym z resztą aplikacji
