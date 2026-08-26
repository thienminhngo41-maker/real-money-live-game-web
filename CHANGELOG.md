# Changelog

## 2026-08-26

### Documentation restructure
- Rewrote the root `README.md` to describe the current prototype architecture, features, local run flow, security boundary, deployment model, and documentation map.
- Updated `docs/architecture.md` to match the current `app.js` / pages / components / domains / services structure.
- Reworked `docs/development.md` around the current module-first workflow and manual verification flow.
- Clarified the static Netlify deployment model in `docs/deployment.md`.
- Updated `AI_INSTRUCTIONS.md` so AI-assisted changes follow the current module boundaries and documentation sync rules.
- Added `docs/security.md` for authentication, balance, transaction, betting and secret-handling boundaries.
- Added `docs/betting.md` for the current Betting TEST MODE and production server boundary.
- Added `docs/live-room.md` for Live Room lifecycle, stream, chat, vote and betting responsibilities.
- Added `docs/chat.md` for the current test Chat implementation and production considerations.

### Project structure
- Added `AI_INSTRUCTIONS.md` for AI-assisted development.
- Added module-level README files.
- Added architecture, development and deployment documentation.
- Added contribution rules.
- Added decision-record documentation structure.

### Domain modules
- Added independent `Live`, `Chat`, and `Betting` domain modules under `js/domains/`.
- Reduced `app.js` toward a thin application composition layer.
- Removed direct Chat service coupling from the router.
- Routed the betting sheet through the Betting domain while keeping the existing betting service intact.

### Assets
- Moved the root image assets into `assets/images/` without recreating or recompressing the binary files.
- Updated `data/games.js` image references to `assets/images/...`.
- Consolidated `1.png` through `6.png`, `game1.png`, and `game2.jpeg`.

### UI fixes
- Fixed the initial `준비중` modal appearing on page load by explicitly honoring the HTML `hidden` state.
- Stabilized the Telegram profile topbar for narrow Chrome/Telegram viewports.
- Added a profile-avatar fallback when Telegram does not provide `photo_url` or the image fails to load.
- Fixed the root cause of the broken topbar: `#topbar` was rendered without the `.topbar` class.
- Made modal visibility explicit in JavaScript so the popup remains hidden until `openModal()` is called.

### Live Room
- Documented Live Stream / Live Room responsibilities.
- Documented test chat and test vote behavior.

### Betting
- Documented Baccarat betting options.
- Documented Banker 5% commission test payout.
- Documented test-mode boundary between UI and future server settlement.

> This changelog records project-level changes. Feature-specific behavior belongs in the relevant documentation.
