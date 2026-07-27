**Werdykt:** jeden feature = jedna gałąź Git + jeden PR; docs i kod jadą razem, `main` tylko przez merge.

### Flow end-to-end

1. **Sugestia** — sekcja w `doc/sugestions.md` (np. ## 12).
2. **Task** — `doc/tasks/todo/feature-<slug>.md` (`type: feature`, `status: todo`).
3. **Branch z aktualnego `main`:**
   ```bash
   git checkout main && git pull
   git checkout -b feature/menu-panel-lokalu
   ```
4. **Kod** — `/implement-task feature-menu-panel-lokalu` (tylko ten scope).
5. **Domknięcie docs na branchu:** `status: done`, przeniesienie taska `todo/` → `done/`, `doc/changes/feature-….md`, blockquote w `sugestions`.
6. **Commit(y) na branchu** — nie na `main`.
7. **Push + PR:**
   ```bash
   git push -u origin HEAD
   gh pr create --title "feature: menu panel lokalu" …
   ```
8. **Review → merge do `main`** (squash albo merge — jedna konwencja na zawsze).
9. **Po merge:** lokalnie `git checkout main && git pull`; stary branch usuń.

### Żeby wersji nie mieszać

- **Nigdy nie rozwijaj 2 feature’ów na tym samym branchu.**
- Nazwy: `feature/<slug>`, `bug/<slug>` — jak pliki tasków.
- PR = **jeden** slug (np. tylko menu panel, bez płatności „przy okazji”).
- Zanim zaczniesz kolejny: `main` zpullowany, nowy branch od `main`, nie od starego feature brancha.
- Demo / Vercel: preview z PR (osobny URL), produkcja / `main` = to, co zmergowane.
- Lokalnie: nie commituj na `main` work-in-progress kilku tasków naraz (u Ciebie teraz właśnie tak wygląda working tree — warto to rozdzielić przed pierwszym PR).

### Mapowanie docs ↔ Git

| Docs | Git |
|------|-----|
| `tasks/todo/feature-X.md` | branch `feature/X` w toku |
| `tasks/done/feature-X.md` + `changes/feature-X.md` | PR zmergowany (lub gotowy do merge) |
| `bug-Y.md` | branch `bug/Y` |

### Minimalna konwencja commitów

- `feat: …` / `fix: …` / `docs: …`
- Opis = *dlaczego* + slug taska w body (`feature-menu-panel-lokalu`).

### Czego unikać

- Push bezpośrednio na `main` z półką feature’ów.
- Amend / rebase po wspólnym pushu bez uzgodnienia.
- Łączenie `feature-platnosci-ux` i `feature-menu-panel-lokalu` w jednym PR „bo i tak panel”.

Jak chcesz, w następnym kroku mogę to dopisać jako krótką sekcję do `doc/sugestions.md` albo `doc/changes/README.md` (workflow GitHub).