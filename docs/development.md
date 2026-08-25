# Development Workflow

1. Read `AI_INSTRUCTIONS.md`.
2. Identify the smallest relevant module.
3. Read that module's `README.md`.
4. Inspect only the necessary source and shared dependencies.
5. Make the smallest safe change.
6. Update the module README if responsibility or behavior changed.
7. Update root README only when the user-facing feature/status changed.
8. Check mobile layout, Telegram behavior, paths/imports and test-mode boundaries.

## Module-first rule

A request such as "fix Banker payout" should primarily inspect `src/betting/` rather than the entire repository.

A request such as "fix Live Chat" should primarily inspect `src/live/`.

Do not create unnecessary cross-module dependencies.
