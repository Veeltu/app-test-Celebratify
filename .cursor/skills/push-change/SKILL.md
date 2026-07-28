---
name: push-change
description: Pushes current changes to the remote repository using git add, commit, and push. Use when the user explicitly asks to commit and push changes using the push-change skill.
---

# Push Change

Ten skill służy do szybkiego zatwierdzania i wysyłania zmian do dedykowanego brancha w repozytorium git zgodnie z prośbą użytkownika.

## Instrukcje

Kiedy użytkownik poprosi o użycie tego skilla:

1.  **Sprawdź branch**:
    - Sprawdź aktualną gałąź: `git branch --show-current`
    - Upewnij się, że pracujesz na dedykowanym branchu `feature/<nazwa-taska>` (np. `feature/venue-presentation`). Jeśli jesteś na `main`/`master`, utwórz branch: `git checkout -b feature/<nazwa-taska>`.
2.  **Przygotuj wiadomość commitu**:
    - Użyj nazwy aktualnie realizowanej zmiany OpenSpec (np. `venue-presentation`).
    - Jeśli nie pracujesz w kontekście konkretnej zmiany OpenSpec, użyj opisu zadania podanego przez użytkownika.
3.  **Wykonaj komendy**:
    ```bash
    git add .
    git commit -m "<nazwa-taska>"
    git push -u origin <aktualny-branch>
    ```
    *Gdzie `<nazwa-taska>` to identyfikator zmiany lub krótki opis zadania.*

4.  **Weryfikacja**:
    - Poinformuj użytkownika o wyniku operacji i nazwie gałęzi, na którą wysłano zmiany.
    - W razie problemów z `git push` (np. odrzucenie z powodu braku powiązania zdalnego), użyj `-u origin <branch>`.

## Przykład

Użytkownik: "Zrób push-change dla tego zadania"
Agent: "Zatwierdzam i wysyłam zmiany na branch 'feature/venue-presentation'..."
[Shell: git add . && git commit -m "venue-presentation" && git push -u origin feature/venue-presentation]
