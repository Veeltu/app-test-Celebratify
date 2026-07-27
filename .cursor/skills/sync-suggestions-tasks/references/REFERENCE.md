# Mapowanie sekcji sugestions → plik taska

## Wzorzec sekcji w doc/sugestions.md

```markdown
## 9. Krótki tytuł sugestii

> **Task:** [krotki-tytul.md](./tasks/krotki-tytul.md) · `in_todo_list: tak` · `status: todo`

**Priorytet:** P1

### Opis problemu
...

### Zadania
- [ ] **9.1** ...

### Sugestie wdrożenia
...
```

## Mapowanie treści

| Źródło (sugestions.md) | Cel (`<slug>.md`) |
|------------------------|-------------------|
| Opis problemu | ## Problem |
| (opcjonalny cytat EN z feedbacku) | ## Kontekst (feedback) |
| Zadania + opis problemu | ## Cel (1–2 zdania, użytkownik) |
| Sugestie wdrożenia | ## Sugestie |
| Zadania (lista `- [ ]`) | ## Checklist |
| Zadania (przekształcone na mierzalne) | ## Kryteria akceptacji |
| Szacunek plików w repo | ## Zakres techniczny |

## Nazewnictwo

- Plik: `doc/tasks/<slug>.md` — **bez** `TASK-01`
- `id` frontmatter = slug
- Log wdrożenia: `doc/changes/<slug>.md`

## Aktualizacja po wdrożeniu

1. `doc/tasks/<slug>.md` → `status: done`, checklist odhaczona
2. `doc/sugestions.md` → blockquote: `status: done`
3. `doc/changes/<slug>.md` → log zmian

## Sekcje do ignorowania w audycie

- Proponowana kolejność wdrożenia (sprinty)
- Uwagi techniczne (dla agenta / dev)
- Linki
