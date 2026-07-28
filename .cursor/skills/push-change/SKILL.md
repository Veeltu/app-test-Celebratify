---
name: push-change
description: Pushes current changes to the remote repository using git add, commit, and push. Use when the user explicitly asks to commit and push changes using the push-change skill.
---

# Push Change

Ten skill służy do szybkiego zatwierdzania i wysyłania zmian do repozytorium git zgodnie z prośbą użytkownika.

## Instrukcje

Kiedy użytkownik poprosi o użycie tego skilla:

1.  **Przygotuj wiadomość commitu**:
    - Użyj nazwy aktualnie realizowanej zmiany OpenSpec (np. `venue-presentation`).
    - Jeśli nie pracujesz w kontekście konkretnej zmiany OpenSpec, użyj opisu zadania podanego przez użytkownika.
2.  **Wykonaj komendy**:
    ```bash
    git add .
    git commit -m "<nazwa-taska>"
    git push
    ```
    *Gdzie `<nazwa-taska>` to identyfikator zmiany lub krótki opis zadania.*

3.  **Weryfikacja**:
    - Poinformuj użytkownika o wyniku operacji.
    - W razie problemów z `git push` (np. brak gałęzi zdalnej), zaproponuj rozwiązanie.

## Przykład

Użytkownik: "Zrób push-change dla tego zadania"
Agent: "Zatwierdzam i wysyłam zmiany dla zadania 'venue-presentation'..."
[Shell: git add . && git commit -m "venue-presentation" && git push]
