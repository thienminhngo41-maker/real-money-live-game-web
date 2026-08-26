# JavaScript Modules

## Responsibility

`js/` contains application behavior only.

- `app.js` — composition root and global event delegation
- `state.js` — prototype session state
- `components/` — reusable UI
- `pages/` — page rendering and routing
- `services/` — integrations and feature logic

## Rules

- Prefer ES module imports/exports.
- Do not add inline `onclick` handlers to HTML.
- Keep `app.js` thin.
- Page modules should not directly depend on Telegram WebApp APIs.
- External integrations belong in `services/`.
- Static configuration belongs in `data/`.
- Do not treat client state as a production wallet or transaction ledger.
