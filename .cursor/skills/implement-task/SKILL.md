---
name: implement-task
description: >-
  Implements a named Celebratify task from doc/tasks/<slug>.md following repo
  best practices (types → data → App → views, light mobile UI, minimal diff),
  then marks the task done and writes doc/changes/<slug>.md. Use when the user
  says zrób, zaimplementuj, wykonaj, implement, or complete a task by slug
  (e.g. feature-atrybuty-filtry, feature-bogatsze-menu, feature-platnosci-ux).
paths:
  - doc/tasks/**
  - doc/changes/**
  - src/**
---

# Implement task (Celebratify)

Wykonaj **wskazany** task zgodnie z AC i konwencjami tego prototypu. Po kodzie **zawsze** domknij dokumentację (`status: done` + `doc/changes/`).

## When to Use

- „zrób feature-atrybuty-filtry”, „zaimplementuj feature-bogatsze-menu”, „wykonaj feature-platnosci-ux”
- `/implement-task` + slug (`feature-…` / `bug-…`)
- User wskazuje plik w `doc/tasks/`

Jeśli brak pliku taska → najpierw skill `sync-suggestions-tasks`, potem wróć tutaj.

## Workflow (kolejność obowiązkowa)

Skopiuj i odhaczaj:

```
Progress:
- [ ] 1. Resolve slug + przeczytaj task
- [ ] 2. status: in_progress
- [ ] 3. Implementacja (warstwy poniżej)
- [ ] 4. Weryfikacja (build / typy / smoke w głowie)
- [ ] 5. Domknięcie docs (task + sugestions + changes)
- [ ] 6. Odpowiedź z linkiem do doc/changes/
```

### 1. Resolve + przeczytaj

1. Ustal slug (nazwa pliku bez `.md`). Szukaj w `doc/tasks/<slug>.md`.
2. Przeczytaj w całości: **Cel**, **Zakres techniczny**, **Kryteria akceptacji**, **Checklist**, **Sugestie**.
3. Nie implementuj poza AC. Przy konflikcie: preferuj kryteria akceptacji z pliku taska.
4. Szybki kontekst kodu: otwórz tylko pliki z Zakresu technicznego (+ typy jeśli brakuje).

### 2. Status

W frontmatter taska: `status: in_progress`.

### 3. Implementacja — najlepsze praktyki tego repo

#### Kolejność warstw (zawsze ta sama)

1. **`src/types/index.ts`** — nowe / zmienione typy domenowe
2. **`src/data/*`** — słowniki, mocki (`mockVenues.ts`); nowe pliki np. `venueFeatures.ts`
3. **`src/App.tsx`** — tylko jeśli trzeba: stan, filtry, handlery; callbacki w dół jako props
4. **`src/components/mobile/views/*`** — UI
5. **Sync krzyżowy** (gdy dotyczy wyszukiwania / cech / miast):
   - `MobileSearchView.tsx`
   - `MobileCompareView.tsx`
   - `MobileAIChatView.tsx` (regex mock, nie LLM)

#### Architektura (nie łam)

- Stan tylko w `App.tsx` — bez Context / Redux / routera
- Widoki „głupie”: dane + callbacki; mutacje przez handlery w `App`
- Brak backendu, Firebase, prawdziwego AI, nowych bibliotek UI
- Minimalny diff — zero refaktoru „przy okazji”

#### UI / mobile

- Teksty **po polsku**
- Jasny motyw: `bg-white` / `bg-slate-50` / `text-slate-900`; akcent `brand-*`, drugi `amber-*`
- Modale w shellu: `absolute inset-0` + `flex flex-col h-full` (header / scroll / sticky CTA) — **nie** `fixed inset-0`
- Ikony: `lucide-react`
- Karty: `bg-white border border-slate-200 shadow-sm`
- CTA: `bg-gradient-to-r from-brand-600 to-brand-500`
- Tailwind CDN w `index.html` — nie dodawaj `tailwind.config` bez prośby

Szczegóły UI: [references/REPO-PRACTICES.md](references/REPO-PRACTICES.md) · reguła `.cursor/rules/mobile-components.mdc`.

#### Dane mock

- Zdjęcia: Unsplash w `mockVenues.ts`
- Daty: `YYYY-MM-DD`, głównie soboty 2026
- Statusy rezerwacji: `Oczekuje` | `Potwierdzona` | `Odrzucona` | `Anulowana`
- Nowe lokale: pełny `Venue` + ≥1 `OfferPackage`; ID w stylu `vL1`, `mgrL1`
- Nowe miasto w filtrach → też regex w `MobileAIChatView`

### 4. Weryfikacja przed „done”

- Spełnione **wszystkie** kryteria akceptacji z pliku taska
- Checklist taska do odhaczenia
- `npm run build` (tsc + vite) — napraw błędy typów zanim zamkniesz task
- Smoke mentalny: flow z taska (np. Szukaj → filtr → modal)

### 5. Domknięcie dokumentacji (bez tego task ≠ done)

1. `doc/tasks/<slug>.md` — checklist `[x]`, `status: done`
2. `doc/sugestions.md` — blockquote sekcji: `status: done`
3. `doc/changes/<slug>.md` ze szablonu `doc/changes/_template.md`:
   - Podsumowanie (co widać w demo)
   - Lista plików + krótkie „co”
   - Decyzje / odstępstwa od taska
   - Jak sprawdzić (checklist smoke)

### 6. Odpowiedź użytkownikowi

- Jedno zdanie: task **done**
- Link: `doc/changes/<slug>.md`
- 3–5 bulletów kluczowych zmian
- **Nie** commit / push bez prośby

## Constraints (twarde)

| Nie wolno bez prośby | Dlaczego |
|----------------------|----------|
| Commit / push / PR | User decyduje |
| Firebase / API / LLM | Prototyp in-memory |
| React Router / Context / Redux | Stan w `App.tsx` |
| Nowe lib UI (MUI, shadcn) | Stack fixed |
| Ciemny theme w głównych widokach | Demo jasne |
| Refaktor poza scope | Minimalny diff |
| Numeracja `TASK-01` | Id = `feature-…` / `bug-…` |

## Przykłady wywołań

| User | Plik taska | Log |
|------|------------|-----|
| zrób feature-atrybuty-filtry | `doc/tasks/feature-atrybuty-filtry.md` | `doc/changes/feature-atrybuty-filtry.md` |
| zaimplementuj feature-bogatsze-menu | `doc/tasks/feature-bogatsze-menu.md` | `doc/changes/feature-bogatsze-menu.md` |
| /implement-task feature-lokalizacja-promien | `doc/tasks/feature-lokalizacja-promien.md` | `doc/changes/feature-lokalizacja-promien.md` |
