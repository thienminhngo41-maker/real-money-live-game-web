# Architecture

## Current state

The project is a static Telegram Mini App prototype with a shared modular application shell.

`index.html` is intentionally kept as an App Shell. UI rendering, page behavior, test state, Telegram integration, chat simulation, and betting UI are implemented through ES modules.

## Entry points

```text
index.html
   │
   └── js/app.js

pc.html
   │
   └── iframe → index.html + styles/desktop.css
```

There is only one application implementation. `pc.html` is a presentation wrapper and must not contain a second copy of application logic.

## JavaScript modules

```text
js/
├── app.js                 # application composition and event delegation
├── state.js               # shared client-side prototype state
│
├── components/
│   ├── topbar.js          # profile/balance/action header
│   ├── bottomNav.js       # primary navigation
│   ├── modal.js           # generic test modal
│   └── bettingSheet.js    # betting UI rendering/interaction
│
├── pages/
│   ├── router.js          # page history and navigation
│   ├── home.js            # home page markup
│   ├── live.js            # live list markup
│   ├── room.js            # live room markup
│   ├── mini.js            # mini-game markup
│   └── profile.js         # profile markup
│
└── services/
    ├── telegram.js       # Telegram WebApp + browser fallback
    ├── chat.js            # test chat simulation
    └── betting.js         # test betting state/calculations
```

### Module boundaries

- `components/` renders reusable UI blocks and handles component-level presentation.
- `pages/` owns page-specific markup and page navigation behavior.
- `services/` owns integrations and feature logic that should not be embedded in page markup.
- `state.js` is the temporary client-side source of truth for prototype UI state only.
- `app.js` composes modules and owns global event delegation. It should stay small.

## Data modules

```text
data/
├── games.js              # mini-game and provider definitions
├── betting.js            # test betting options and chip definitions
└── i18n.js               # ko/cn/en translations and language detection
```

Static product/configuration data belongs in `data/`, not in page modules.

## CSS modules

```text
css/
├── variables.css         # design tokens and safe-area variables
├── base.css              # reset, typography, body defaults
├── layout.css            # app shell, pages, navigation layout
├── components.css        # shared cards, modal, common components
├── live.css              # live and room UI
├── betting.css           # betting sheet/chips/options
└── profile.css           # profile-specific UI
```

Desktop presentation is intentionally separate:

```text
styles/desktop.css
```

It is injected only into the `index.html` iframe used by `pc.html`. Desktop CSS must not duplicate application markup or behavior.

## Runtime flow

```text
Browser / Telegram
       │
       ▼
   index.html
       │
       ▼
     app.js
       │
 ┌─────┼───────────────┐
 ▼     ▼               ▼
Data  Pages       Components
 │      │               │
 └──────┴───────┬───────┘
                 ▼
             Services
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
    Telegram    Chat     Betting
```

## PC Preview

`pc.html` must only provide:

1. desktop preview chrome;
2. an iframe pointing at `index.html`;
3. the `desktop` platform flag and desktop stylesheet injection.

The same JavaScript modules, HTML markup, data, and services are therefore exercised on mobile and PC.

## Backend boundary

The current services are prototype services. They do not represent secure production infrastructure.

In production:

- authentication must be server-verified;
- balance must be server-owned;
- bets must be validated server-side;
- settlement must be server-owned;
- chat/vote state must be synchronized through a trusted backend;
- clients must never be trusted to determine money or payout results.

The frontend may display server results, but must not become the source of truth for money, transactions, or settlement.
