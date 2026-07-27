# Celebratify — sugestie i feedback (źródło)

**Ten plik jest źródłem prawdy dla sugestii.** Wszystko w `doc/tasks/` powstaje **na podstawie sekcji poniżej**.

| Krok | Gdzie |
|------|-------|
| 1. Nowa sugestia | Dodaj sekcję tutaj (`doc/sugestions.md`) |
| 2. Wydzielenie taska | Utwórz `doc/tasks/<slug>.md` z tej sekcji (szablon: `_template.md`) |
| 3. Sync tasków | Skill `/sync-suggestions-tasks` lub agent przy edycji tego pliku |
| 4. Wdrożenie | Kod (skill `/implement-task`) + `status: done` |
| 5. Log zmian | Opis wdrożenia w [`doc/changes/`](./changes/) |

**Skille:** `/sync-suggestions-tasks` · `/implement-task` (wykonanie taska + `doc/changes/`)  
**Prototyp:** [app-test-celebratify.vercel.app](https://app-test-celebratify.vercel.app/)

Legenda: **P0** (demo) · **P1** (ważne) · **P2** (później)  
`in_todo_list: tak` = task wydzielony i gotowy do kodu · `nie` = tylko sugestia w tym pliku

---

## 1. Ustandaryzowane menu — więcej treści i elastyczności

> **Task:** [bogatsze-menu.md](./tasks/bogatsze-menu.md) · `in_todo_list: tak` · `status: done`

**Priorytet:** P0

### Opis problemu
Zakładka „Menu” jest zbyt uboga: mało miejsca na prezentację dań, brak szczegółów (składniki, warianty wege/bezgluten, zdjęcia), trudno pokazać różnice między pakietami. Użytkownik nie czuje „apetytowości” oferty.

### Zadania
- [ ] **1.1** Rozszerzyć model `MenuItem` o opcjonalne pola: `description`, `tags` (wege, bezgluten, premium), `imageUrl`, `allergens[]`.
- [ ] **1.2** W widoku menu dodać sekcje per kategoria (Zupa → Danie główne → …) z rozwijanymi kartami zamiast płaskiej listy.
- [ ] **1.3** Pokazać skrót menu na karcie pakietu (3–5 pozycji) + link „Pełne menu pakietu”.
- [ ] **1.4** Dla panelu lokalu (manager): prosty edytor listy dań w pakiecie (mock — lokalny stan).

### Sugestie wdrożenia
- Na etapie prototypu wystarczy **bogatszy mock** w `mockVenues.ts` (2–3 dania z opisem i tagiem na pakiet).
- W UI: karty z miniaturą dania (Unsplash) + badge „WEGE” / „BEZGLUTEN”.
- Nie budować pełnego CMS menu — trzymać się szablonu kategorii z `types/index.ts`.

---

## 2. Prezentacja lokalu — więcej informacji „sprzedażowych”

> **Task:** [prezentacja-lokalu.md](./tasks/prezentacja-lokalu.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P0

### Opis problemu
Opis restauracji jest krótki i mało angażujący. Brakuje elementów budujących zaufanie i apetyt na wybór lokalu (atmosfera, specjalizacja, dla kogo idealny).

### Zadania
- [ ] **2.1** Dodać pola do `Venue`: `highlights[]` (3 bullet pointy USP), `bestFor[]` (wesele / chrzciny / firmowa), `atmosphere` (krótki tagline).
- [ ] **2.2** Sekcja „Dlaczego ten lokal?” na zakładce „O lokalu” — ikony + krótkie hasła.
- [ ] **2.3** Na liście wyników: 1 linia highlightu pod nazwą (np. „Ogród 200 m² • Noclegi • Parkiet”).
- [ ] **2.4** Opcjonalnie: wideo / wirtualny spacer jako placeholder (link lub mock thumbnail).

### Sugestie wdrożenia
- Inspiracja: Booking / Airbnb — **3 mocne hasła** zamiast długiego bloku tekstu.
- Copy w języku polskim, konkretnie: „Idealny na wesela 80–120 os.” zamiast ogólników.
- Zdjęcia hero + galeria na dole (patrz zadanie 7).

---

## 3. Strukturyzowane atrybuty i filtry (udogodnienia)

> **Task:** [atrybuty-filtry.md](./tasks/atrybuty-filtry.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P0

### Opis problemu
`amenities` to płaska lista stringów — trudno filtrować i porównywać. „Plac zabaw” powinien być jednym z wielu **zdefiniowanych** atrybutów, a nie przypadkowym tekstem w opisie.

### Zadania
- [ ] **3.1** Wprowadzić enum / słownik `VenueFeature` (np. `kids_playground`, `garden`, `parking_50plus`, `accommodation`, `live_music`, `outdoor_ceremony`, `wheelchair_access`).
- [ ] **3.2** W `Venue` zamienić lub uzupełnić `amenities: string[]` o `features: VenueFeature[]` + mapowanie na etykiety PL.
- [ ] **3.3** Filtry w wyszukiwarce: chipsy „Plac zabaw”, „Ogród”, „Noclegi” (multi-select).
- [ ] **3.4** Porównywarka: stała macierz cech (check / brak) zamiast fuzzy match po substringu.
- [ ] **3.5** Rozszerzyć mock AI o rozpoznawanie cech („z ogródkiem”, „z noclegami”).

### Sugestie wdrożenia
- Jedna tablica `VENUE_FEATURES` w `src/data/venueFeatures.ts` — id, label PL, icon (lucide).
- Migracja mocków: każdy lokal dostaje 4–8 feature id zamiast wolnych opisów.
- W compare view już jest sztywna lista `comparisonFeatures` — **zsynchronizować** ją ze słownikiem.

---

## 4. System płatności — jasny model i UX (nawet bez integracji)

> **Task:** [platnosci-ux.md](./tasks/platnosci-ux.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P1

### Opis problemu
Niejasne, jak płatności mają działać w produkcie. Użytkownik nie wie, kiedy płaci, ile i czym — mimo że w MVP rezerwacja może być bez płatności online.

### Zadania
- [ ] **4.1** Zdefiniować **flow płatności v1** w dokumencie (1 strona): rezerwacja → akceptacja lokalu → link do zaliczki / przelew tradycyjny.
- [ ] **4.2** W UI rezerwacji: krok „Jak działa płatność?” (timeline 3 kroki) zamiast samego disclaimeru.
- [ ] **4.3** Po statusie `Potwierdzona`: mock przycisk „Opłać zaliczkę” → ekran z kwotą, terminem, danymi do przelewu (lub „Stripe — wkrótce”).
- [ ] **4.4** Dla managera: informacja „Zaliczka oczekuje / opłacona” (status płatności obok statusu rezerwacji).

### Sugestie wdrożenia
- **MVP (jak w opis.md):** brak realnej bramki — tylko **przejrzysta komunikacja** i statusy mock.
- **v2:** Stripe Connect / PayU — zaliczka % po akceptacji; escrow poza scope MVP.
- W prototypie wystarczy ekran „Instrukcja płatności” + badge „Płatność poza aplikacją”.

---

## 5. Kalendarz — zakres dat i wiele dni

> **Task:** [kalendarz-zakres-dat.md](./tasks/kalendarz-zakres-dat.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P1

### Opis problemu
Użytkownik może wybrać tylko jedną datę. Imprezy często szukane są w **oknie** (np. sierpień 2026) lub kilku preferowanych sobotach.

### Zadania
- [ ] **5.1** Rozszerzyć `FilterState`: `dateFrom`, `dateTo` lub `preferredDates: string[]`.
- [ ] **5.2** UI filtra: przełącznik „Jedna data” / „Zakres dat” / „Kilka terminów”.
- [ ] **5.3** Logika filtrowania: lokal pasuje, jeśli ma **co najmniej jeden** wolny termin w zakresie.
- [ ] **5.4** W formularzu rezerwacji: możliwość podania 2–3 alternatywnych dat (pole opcjonalne).
- [ ] **5.5** Panel lokalu: widok tygodniowy / miesięczny zamiast samej listy sobót.

### Sugestie wdrożenia
- Na mobile: date range picker (dwa pola `type="date"`) — bez ciężkich bibliotek na start.
- W mocku: `availableDates` już jest tablicą — filtrowanie to `some(date in range && !blocked)`.

---

## 6. Lokalizacja + promień wokół miejsca (np. 50 km)

> **Task:** [lokalizacja-promien.md](./tasks/lokalizacja-promien.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P1

### Opis problemu
Filtr „miasto” jest zbyt sztywny. Użytkownik chce: „Leszno + 50 km” albo „w promieniu od miejsca”, żeby złapać okoliczne miejscowości (Rydzyna, Osieczna itd.).

### Zadania
- [ ] **6.1** Dodać do `Venue`: `lat`, `lng` (mock współrzędne dla każdego lokalu).
- [ ] **6.2** Filtr: miasto / punkt odniesienia + suwak promienia (10 / 25 / 50 / 100 km).
- [ ] **6.3** Funkcja `distanceKm(a, b)` (Haversine) — filtrowanie listy.
- [ ] **6.4** Na karcie wyniku: odległość od wybranego punktu („12 km od Leszna”).
- [ ] **6.5** W czacie AI: rozpoznawanie „pod Lesznem”, „w promieniu 30 km od Krakowa”.

### Sugestie wdrożenia
- Bez map w MVP — wystarczy **promień liczony po współrzędnych**; mapa (Google Maps / Leaflet) jako P2.
- Centrum: wybór miasta z listy → przypisanie domyślnych lat/lng z małego słownika miast.
- Leszno i okolice już są w mocku — dobry zestaw testowy.

---

## 7. Galeria zdjęć + zakładka „Sala i układ stołów”

> **Task:** [galeria-sala-uklad.md](./tasks/galeria-sala-uklad.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P1

### Opis problemu
Za mało zdjęć; brak wizualizacji sali, stołów i przestrzeni — kluczowe przy decyzji o weselu / chrzcinach.

### Zadania
- [ ] **7.1** Rozszerzyć galerię: poziomy scroll lub grid pod hero (6–10 zdjęć na lokal).
- [ ] **7.2** Nowa zakładka **„Sala i układ”** (`layout` obok packages/menu/dates/about).
- [ ] **7.3** Model `RoomLayout`: `name`, `capacity`, `images[]`, `description`, `tableConfigs[]` (okrągłe 10 os., prostokątne 8 os. itd.).
- [ ] **7.4** Mock: 2–3 zdjęcia sali + schemat stołów (obrazki Unsplash / prosty SVG placeholder).
- [ ] **7.5** Informacje: powierzchnia sali, wysokość, dostęp do tarasu, max stołów.

### Sugestie wdrożenia
- Mock images: sale bankietowe, układy stołów z stocków (Unsplash / generyczne plany).
- UI: karuzela + podpis pod każdym zdjęciem („Sala główna — 120 miejsc na krzesłach bankietowych”).
- Nie implementować edytora układu stołów — tylko **prezentacja** w v1.

---

## 8. Oceny i opinie — prostszy system bez negatywnego nacisku

> **Task:** [oceny-opinie.md](./tasks/oceny-opinie.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P2

### Opis problemu
Gwiazdki i opinie wymagają dopracowania: unikać „negatywnego” wrażenia (niskie oceny, długie skargi), a jednocześnie budować zaufanie.

### Zadania
- [ ] **8.1** Zamiast pełnej listy opinii: **agregat** — średnia + liczba rezerwacji / „X par wybrało ten lokal”.
- [ ] **8.2** Sekcja „Co chwalą goście” — 3–5 krótkich tagów pozytywnych (np. „świetna obsługa”, „pyszne jedzenie”) zamiast cytatów 1★.
- [ ] **8.3** Opcjonalnie: tylko opinie 4–5★ w widoku publicznym; reszta ukryta lub bez treści tekstowej.
- [ ] **8.4** W porównywarce: gwiazdka + jedna linia „mocnej strony” zamiast surowego `rating` + `reviewCount`.
- [ ] **8.5** Model `ReviewHighlight { label, count }` w typach — mock w danych lokalu.

### Sugestie wdrożenia
- Wzorzec: **social proof** bez Yelp-style wall of shame.
- Rating nadal może być `4.7`, ale UI podkreśla „Polecany przez 94% gości” (wyliczone z mocka).
- Unikać czerwonych akcentów przy ocenach; neutralne / złote badge.


---

