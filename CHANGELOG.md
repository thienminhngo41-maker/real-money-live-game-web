# Changelog

## 2026-08-26

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
- Fixed the initial `준비중` modal appearing on page load by explicitly honoring the HTML `hidden` state with `.popup[hidden]{display:none}`.
- Stabilized the Telegram profile topbar layout for narrow screens.
- Added a profile-avatar fallback when Telegram does not provide `photo_url` or the image fails to load.
- Preserved the existing deposit, withdrawal, balance, name, and ID controls while preventing them from collapsing into the profile area.

### Live Room
- Documented Live Stream / Live Room responsibilities.
- Documented test chat and test vote behavior.

### Betting
- Documented Baccarat betting options.
- Documented Banker 5% commission test payout.
- Documented test-mode boundary between UI and future server settlement.

> This changelog records project-level changes. Feature-specific behavior belongs in the relevant module README.
