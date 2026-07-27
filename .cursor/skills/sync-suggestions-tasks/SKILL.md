---
name: sync-suggestions-tasks
description: >-
  Audits doc/sugestions.md against doc/tasks/, detects numbered sections without
  a task file, and creates slug-named markdown from _template.md. Use when editing
  doc/sugestions.md, adding product feedback, syncing suggestions to tasks, or
  when the user asks to build or refresh tasks from suggestions.
paths:
  - doc/sugestions.md
  - doc/tasks/**
---

# Sync sugestions → tasks

Agent skill: utrzymuj spójność między `doc/sugestions.md` (źródło) a `doc/tasks/<slug>.md` (zadania).

**Identyfikator taska = slug pliku** (np. `atrybuty-filtry`), **bez** numerów `TASK-01`.

## When to Use

- Użytkownik dodał lub zmienił sekcję `## N. …` w `doc/sugestions.md`
- Prośba: „zsynchronizuj sugestie”, „zbuduj taski”, „sprawdź suggestions”
- Przed implementacją kodu z sugestii — najpierw upewnij się, że istnieje plik taska
- Po zakończeniu taska — zaktualizuj `status` w pliku taska i blockquote w sekcji sugestii

## Instructions

### 1. Audyt (zrób to sam — nie czekaj na użytkownika)

1. Przeczytaj `doc/sugestions.md` i wypisz sekcje numerowane: `## N. Tytuł` (pomiń meta: *Proponowana kolejność*, *Uwagi techniczne*, *Linki*).
2. Przeczytaj `doc/tasks/*.md` (poza `_template.md`) — z frontmatter weź `source_section` i `id` (= slug).
3. Dla każdej sekcji `N` sprawdź:
   - czy istnieje plik taska z `source_section: "N"`
   - czy pod nagłówkiem sekcji jest blockquote z linkiem `> **Task:** [<slug>.md](./tasks/…)`
4. Opcjonalna walidacja:

```bash
node .cursor/skills/sync-suggestions-tasks/scripts/audit-suggestions.mjs
```

JSON: dodaj `--json`. Exit `1` = są luki do naprawy.

### 2. Utwórz brakujące taski

Dla każdej sekcji **bez** pliku taska:

1. Slug z tytułu sekcji: małe litery, myślniki, bez polskich znaków (np. `push-powiadomienia.md`).
2. `id` w frontmatter = slug (bez `.md`) — **nie** używaj `TASK-01` ani numerów.
3. Skopiuj strukturę z `doc/tasks/_template.md` i wzór jakości z `doc/tasks/atrybuty-filtry.md`.
4. Frontmatter:

```yaml
id: push-powiadomienia
title: <tytuł z sekcji>
source: doc/sugestions.md
source_section: "N"
in_todo_list: true
status: todo
priority: P0|P1|P2
created: YYYY-MM-DD
```

5. Treść — mapuj z sekcji sugestii (szczegóły: [references/REFERENCE.md](references/REFERENCE.md)):
   - *Opis problemu* → `## Problem`
   - *Zadania* → `## Checklist` + `## Kryteria akceptacji`
   - *Sugestie wdrożenia* → `## Sugestie`
   - dopisz `## Cel`, `## Zakres techniczny` (pliki repo)
6. Pod H1 dodaj: `> Na podstawie sekcji **N** w [doc/sugestions.md](../sugestions.md).`

### 3. Zaktualizuj sekcję w sugestions.md

Bezpośrednio pod `## N. Tytuł` dodaj lub popraw blockquote:

```markdown
> **Task:** [push-powiadomienia.md](./tasks/push-powiadomienia.md) · `in_todo_list: tak` · `status: todo`
```

Nie duplikuj pełnego opisu w `sugestions.md` — szczegóły tylko w pliku taska.

### 4. Zweryfikuj i podsumuj

- Uruchom ponownie skrypt audytu lub ręcznie potwierdź: każda sekcja N ↔ jeden plik taska.
- W odpowiedzi: co było brakujące, jakie pliki utworzono, co dalej (np. `/implement-task` na `atrybuty-filtry`).

## Constraints

- **Tylko dokumentacja** — ten skill nie implementuje kodu aplikacji.
- **Nie commituj** bez prośby użytkownika.
- Jedna sekcja numerowana = jeden plik `doc/tasks/<slug>.md`.
- **Bez numeracji w nazwach tasków** — slug tylko.
- Po wdrożeniu kodu (skill `implement-task`): `status: done` w tasku + blockquote + **`doc/changes/<slug>.md`**.

## Related files

| Plik | Rola |
|------|------|
| `doc/sugestions.md` | Źródło sugestii |
| `doc/tasks/_template.md` | Szablon nowego taska |
| `doc/tasks/atrybuty-filtry.md` | Wzorzec jakości |
| `.cursor/rules/workflow-changes.mdc` | Pipeline po utworzeniu taska → kod |
