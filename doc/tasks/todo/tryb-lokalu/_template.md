---
id: feature-slug-zadania
type: feature   # feature | bug | chore
title: Krótki tytuł sugestii
source: doc/sugestions.md
source_section: "X"          # numer sekcji w sugestions.md
in_todo_list: false
status: —
priority: —
created: YYYY-MM-DD
task_file: null
---

# Tytuł sugestii

> Utworzony na podstawie sekcji **X** w [`doc/sugestions.md`](../sugestions.md).

## Problem

Opisz, co nie działa lub czego brakuje.

## Kontekst (feedback)

Cytat lub źródło (ekran, link, rozmowa).

## Cel

Co ma się zmienić z perspektywy użytkownika / biznesu.

## Sugestie

Jak to rozwiązać w prototypie vs w produkcji.

## Zakres techniczny (szacunek)

Pliki w repo, które prawdopodobnie trzeba ruszyć.

## Kryteria akceptacji (propozycja)

- [ ] …

## Notatki

Dowolne uwagi przed wrzuceniem do TODO-list.

---

**Nazewnictwo pliku:** `feature-<slug>.md` | `bug-<slug>.md` (grupy w `doc/tasks/`).

**Promocja do TODO-list:**
1. Uzupełnij sekcję w `doc/sugestions.md` (jeśli jeszcze nie ma).
2. W tym pliku: `in_todo_list: true`, `id` = nazwa pliku bez `.md`, `status: todo`, `type: feature|bug`.
3. Dodaj link do taska w sekcji `doc/sugestions.md` (skill `sync-suggestions-tasks`).
