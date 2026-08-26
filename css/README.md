# CSS Modules

## Responsibility

`css/` contains presentation only.

- `variables.css` — design tokens and safe-area variables
- `base.css` — reset and typography
- `layout.css` — app shell and navigation
- `components.css` — reusable UI
- `live.css` — Live / Room / Vote / Chat
- `betting.css` — Betting Sheet
- `profile.css` — Profile
- `desktop.css` — PC presentation

## Rules

- Do not add large inline `<style>` blocks to `index.html`.
- Avoid new HTML `style="..."` attributes.
- Keep desktop presentation in `desktop.css`.
- Do not duplicate feature UI solely for PC.
- Preserve Telegram safe-area behavior on mobile.
