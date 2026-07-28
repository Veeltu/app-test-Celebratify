## ADDED Requirements

### Requirement: Stała widoczność paska nawigacji
System SHALL zapewniać stałą widoczność i interaktywność dolnego paska nawigacji (`BottomNav`) niezależnie od otwartych modali szczegółów lokalu lub formularzy.

#### Scenario: Otwarcie szczegółów lokalu nie zakrywa menu
- **GIVEN** użytkownik znajduje się na liście wyszukiwania
- **WHEN** użytkownik kliknie w kartę wybranego lokalu
- **THEN** otwiera się karta szczegółów lokalu
- **AND** dolny panel przycisków (Szukaj, Porównaj, Czat AI, Rezerwacje) pozostaje widoczny i klikalny

### Requirement: Nakładanie modali pod stałymi elementami Shell
System SHALL renderować modale typu overlay (szczegóły lokalu, auth, rezerwacja) pod warstwą nagłówka (`Header`) oraz stopki (`BottomNav`).

#### Scenario: Przełączanie zakładki przy otwartym modalu
- **GIVEN** otwarty jest modal szczegółów lokalu
- **WHEN** użytkownik kliknie ikonę "Porównaj" na dolnym pasku nawigacji
- **THEN** aktywny widok zmienia się na Porównywarkę
- **AND** modal lokalu zostaje ukryty lub znajduje się w tle (zgodnie z logiką stanu App)
