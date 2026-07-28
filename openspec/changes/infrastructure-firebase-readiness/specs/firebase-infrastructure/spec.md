## ADDED Requirements

### Requirement: Inicjalizacja Firebase i Auth
System SHALL inicjalizować połączenie z usługami Firebase (Firestore, Auth) podczas startu aplikacji. Użytkownik powinien zostać automatycznie zalogowany, jeśli posiada aktywną sesję.

#### Scenario: Automatyczne logowanie po odświeżeniu
- **WHEN** użytkownik odświeża stronę
- **THEN** system sprawdza stan autentykacji w Firebase Auth
- **AND** jeśli użytkownik był zalogowany, przywraca jego sesję i profil (rola, managedVenueId)

### Requirement: Persistence dla Bookings (Firestore)
System SHALL zapisywać każde nowe zapytanie o rezerwację w kolekcji `bookings` w Firestore.

#### Scenario: Zapis nowej rezerwacji
- **WHEN** użytkownik wysyła formularz rezerwacji
- **THEN** system tworzy nowy dokument w Firestore w kolekcji `bookings`
- **AND** rezerwacja staje się widoczna w zakładce "Moje Rezerwacje" u klienta oraz w panelu menedżera danego lokalu

### Requirement: Real-time Updates dla Managera
System SHALL automatycznie aktualizować listę rezerwacji w panelu menedżera, gdy pojawi się nowa rezerwacja lub zmieni się status istniejącej.

#### Scenario: Natychmiastowe powiadomienie managera
- **WHEN** klient składa nową rezerwację
- **THEN** menedżer lokalu widzi nową pozycję na liście rezerwacji bez konieczności odświeżania strony
- **AND** licznik oczekujących rezerwacji w BottomNav aktualizuje się automatycznie
