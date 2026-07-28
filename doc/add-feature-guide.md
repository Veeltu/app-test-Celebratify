**Werdykt:** jeden feature = jedna zmiana OpenSpec + jedna gałąź Git + jeden PR; specs i kod jadą razem, `main` tylko przez merge.

### Flow end-to-end

1. **Explore (opcjonalnie)** — `/opsx:explore` (możesz wskazać sekcję z `doc/sugestions.md`).
2. **Propose** — `/opsx:propose <kebab-name>` → folder `openspec/changes/<name>/` (`proposal.md`, `design.md`, `tasks.md`, delta specs).
3. **Review** planu w chat / PR docs — zanim kod.
4. **Branch z aktualnego `main`:**
   ```bash
   git checkout main && git pull
   git checkout -b feature/<kebab-name>
   ```
5. **Apply** — `/opsx:apply` (tylko ten scope; checklist w `tasks.md`).
6. **Archive** — `/opsx:archive` (merge do `openspec/specs/`, folder → `openspec/changes/archive/`).
7. **Commit(y) na branchu** — nie na `main`.
8. **Push + PR:**
   ```bash
   git push -u origin HEAD
   gh pr create --title "feature: …" …
   ```
9. **Review → merge do `main`**. Po merge: `git checkout main && git pull`; stary branch usuń.

### Żeby wersji nie mieszać

- **Nigdy nie rozwijaj 2 feature’ów na tym samym branchu.**
- Nazwy: branch `feature/<kebab-name>` = nazwa change w OpenSpec.
- PR = **jedna** zmiana OpenSpec.
- Zanim zaczniesz kolejny: `main` zpullowany, nowy branch od `main`.

### Mapowanie OpenSpec ↔ Git

| OpenSpec | Git |
|----------|-----|
| `openspec/changes/<name>/` (aktywna) | branch `feature/<name>` w toku |
| `openspec/changes/archive/…-<name>/` + zaktualizowane `openspec/specs/` | PR zmergowany (lub gotowy) |

### Minimalna konwencja commitów

- `feat: …` / `fix: …` / `docs: …`
- Opis = *dlaczego* + nazwa change OpenSpec w body.

### Czego unikać

- Starych skilli `/implement-task` i sync `doc/tasks/` — wycofane.
- Push bezpośrednio na `main` z półką feature’ów.
- Łączenia wielu change’ów w jednym PR.
