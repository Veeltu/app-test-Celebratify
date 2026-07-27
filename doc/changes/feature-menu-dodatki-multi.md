---
id: feature-menu-dodatki-multi
task_file: doc/tasks/feature-menu-dodatki-multi.md
source_section: "10"
completed: 2026-07-27
---

# CHANGE — Menu: wiele dodatków + „Bez dodatków”

> Log wdrożenia. Opis: [`doc/tasks/feature-menu-dodatki-multi.md`](../tasks/feature-menu-dodatki-multi.md) · sekcja [`doc/sugestions.md`](../sugestions.md).

## Podsumowanie

W grupach dodatków można zaznaczyć kilka opcji (wg `maxSelect`). Chip **„Bez dodatków”** (dashed / slate) czyści pozostałe zaznaczenia; wybór zwykłego dodatku usuwa exclusive. Dopłaty w stopce nie liczą opcji `clearsOthers`.

## Zmiany w kodzie

- `src/types/index.ts` — `MenuModifierOption.clearsOthers?: boolean`
- `src/data/menuSamples.ts` — podniesione `maxSelect`, opcja „Bez dodatków” / „Bez sosu” w kluczowych grupach (`MOD_DODATEK_GLOWNE`, `MOD_DODATKI_EXTRA`, `MOD_RYBA`, `MOD_ZUPA`, `MOD_ZIMNA`, `MOD_NOCNE`, `MOD_SOS`)
- `MobileVenueDetailModal.tsx` — `toggleModifier` z logiką exclusive; chipy exclusive wizualnie odrębne; badge „bez dodatków”; suma dopłat pomija `clearsOthers`

## Decyzje / odstępstwa od taska

- „Bez sosu” zamiast „Bez dodatków” w grupie sosów (semantyka).
- Exclusive nie wchodzi w licznik „N wybrane” w nagłówku accordionu.

## Jak sprawdzić

- [ ] Menu → danie główne → dodatki → zaznacz 2 dodatki (np. ziemniaki + kopytka)
- [ ] Klik „Bez dodatków” → tylko ta opcja aktywna, dopłata 0
- [ ] Klik ziemniaki → „Bez dodatków” znika; można dodać drugi dodatek do limitu
- [ ] Stopka: dopłaty tylko z opcji z `priceExtra`

## Notatki

`npm run build` OK.
