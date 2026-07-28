## ADDED Requirements

### Requirement: Sekcja wyróżników "Dlaczego ten lokal?"
System SHALL wyświetlać dedykowaną sekcję z kluczowymi wyróżnikami (USP) lokalu w widoku szczegółów. Sekcja powinna być czytelna i używać ikon dla lepszej prezentacji wizualnej.

#### Scenario: Wyświetlanie listy USP
- **WHEN** użytkownik otwiera szczegóły lokalu
- **THEN** widoczna jest sekcja "Dlaczego ten lokal?"
- **AND** lista zawiera co najmniej 3 kluczowe cechy (np. "Ogród", "Noclegi", "Własny catering") z przypisanymi ikonami

### Requirement: Informacja o przeznaczeniu lokalu
System SHALL informować użytkownika, dla jakiego typu imprez dany lokal jest najbardziej odpowiedni (pole `bestFor`).

#### Scenario: Podgląd przeznaczenia
- **WHEN** użytkownik przegląda nagłówek szczegółów lokalu
- **THEN** widoczna jest informacja "Idealny na: [rodzaj imprezy]" (np. "Idealny na: Wesela, Chrzciny")

### Requirement: Opis atmosfery lokalu
System SHALL prezentować krótki opis klimatu/atmosfery lokalu, aby pomóc użytkownikowi "poczuć" charakter miejsca.

#### Scenario: Wyświetlanie opisu atmosfery
- **WHEN** użytkownik przegląda sekcję "O lokalu"
- **THEN** obok lub zamiast ogólnego opisu widoczna jest krótka, zachęcająca charakterystyka klimatu (np. "Eleganckie wnętrza w stylu glamour z widokiem na park")
