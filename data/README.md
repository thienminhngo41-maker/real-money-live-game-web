# Data Modules

`data/` contains static or configuration-like application data.

- `games.js` — games, providers, featured content
- `betting.js` — test betting options, odds and chips
- `i18n.js` — translations and language detection

Keep rendering and service logic out of this directory. If data becomes server-owned, replace the local source through a service/API boundary rather than mixing network code into these files.
