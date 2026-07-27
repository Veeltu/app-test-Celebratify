---
id: feature-bogatsze-menu
task_file: doc/tasks/feature-bogatsze-menu.md
source_section: "1"
completed: 2026-07-27
---

# CHANGE — Bogatsze i czytelniejsze menu pakietów

> Log wdrożenia. Opis zadania: [`doc/tasks/feature-bogatsze-menu.md`](../tasks/feature-bogatsze-menu.md) · sekcja w [`doc/sugestions.md`](../sugestions.md).

## Podsumowanie

Zakładka Menu pokazuje dania pogrupowane po kategoriach, z opisami, tagami i miniaturami. Użytkownik **wybiera jedno danie na kategorię** (zupa, główne, zimna płyta, deser, napoje, dania nocne) oraz **dodatki** (sos, dodatek, wariant). Listy wyboru i dodatki są zwijane — po wyborze dania sekcja się zwija. Na karcie pakietu widać skrót oferty i informację o wyborach. Wszystkie lokale mają wypełnione `choiceGroups`.

## Zmiany w kodzie

### Model (`src/types/index.ts`)

- `MenuItem` — `tags`, `imageUrl`, `allergens`, opcjonalne `id`, `modifiers`
- `MenuModifierOption` / `MenuModifierGroup` — opcje dodatków z opcjonalnym `priceExtra`
- `MenuDishChoiceGroup` — grupa „wybierz jedno z wielu” (`id`, `title`, `dishes`)
- `OfferPackage.choiceGroups` — zamiast (lub obok) stałej listy `menu`

### Dane (`src/data/menuSamples.ts`, `src/data/mockVenues.ts`)

- Presety dań, grupy dodatkóów (`MOD_*`), tablice `CHOICES_*` per styl pakietu (klasyczny, złoty, VIP, BBQ…)
- Pakiety w `mockVenues` podpięte do `choiceGroups: CHOICES_*`; stałe `menu` często puste — treść oferty jest w wyborach
- Zdjęcia deserów: stary URL Unsplash (404) zastąpiony działającymi wariantami (`DESSERT_IMG`)

### UI (`MobileVenueDetailModal.tsx`)

- Zakładka Menu: sekcje `DishChoiceSection` — accordion (miniaturka + wybrane danie; rozwinięcie = lista; **po wyborze zwija się**)
- `DishModifiers` — accordion „Dodatki do: …”; badge „N wybrane” gdy zwinięte
- Suma `pricePerPerson` + dopłaty z dodatków w stopce
- Karta pakietu: skrót kategorii / dań + info o wyborach w kategoriach

## Decyzje / odstępstwa od taska

- Presety w `menuSamples.ts` zamiast rozdmuchiwać `mockVenues.ts`.
- Customizacja poszła dalej niż minimalny task: **wybór dania + dodatki** we wszystkich kategoriach, nie tylko bogatsza lista tylko do odczytu.
- Edytor menu w panelu managera (sugestia 1.4) **nie** wszedł w ten task.
- Alergeny jako drobny tekst pod daniem (bonus względem minimalnego AC).

## Jak sprawdzić

- [ ] Lokal → **Menu** → sekcje zwinięte z wybranym daniem; rozwinięcie → wybór → lista się zwija
- [ ] Pod wybranym daniem: **Dodatki do** (zwijane); dopłata w stopce przy płatnych opcjach
- [ ] Desery mają widoczne miniatury (nie puste/404)
- [ ] Karta pakietu → skrót + „Pełne menu pakietu”
- [ ] Jasny motyw, layout w ramce telefonu (`absolute inset-0`)

## Notatki

`npm run build` (tsc + vite) przechodzi po zmianach.
