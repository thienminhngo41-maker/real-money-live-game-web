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
├── app.js                 # thin application composition root + global delegation
├── state.js               # shared client-side prototype state
│
├── domains/
│   ├── index.js           # domain facade exports
│   ├── live/live.js       # live room lifecycle and vote behavior
│   ├── chat/chat.js       # chat facade and chat input behavior
│   └── betting/betting.js # betting facade and confirmation behavior
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
    ├── telegram.js        # Telegram WebApp + browser fallback
    ├── chat.js            # test chat simulation implementation
    └── betting.js         # test betting state/calculations implementation
```

### Domain boundaries

- `domains/live/` owns live-room behavior and live-specific lifecycle orchestration.
- `domains/chat/` owns chat interaction orchestration while preserving the existing chat service implementation.
- `domains/betting/` owns betting orchestration while preserving the existing betting service calculations.
- `services/` remains the implementation layer for reusable integrations/feature primitives. Existing services are intentionally retained during this refactor.
- `components/` renders reusable UI blocks and handles component-level presentation.
- `pages/` owns page-specific markup and page navigation behavior.
- `state.js` is the temporary client-side source of truth for prototype UI state only.
- `app.js` composes domains/components/pages and owns only application-wide event delegation. Domain behavior must not be reimplemented in `app.js`.

### Dependency direction

```text
                         app.js
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
       Live domain      Chat domain     Betting domain
          │                │                │
          ▼                ▼                ▼
       services         services         services
```

Domains may wrap existing services, but pages/components should not need to know how a domain's internal service implementation works. Domain-to-domain coupling should be avoided; cross-domain orchestration belongs at the application composition boundary.

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
 ┌─────┼────────────────────────┐
 ▼     ▼          ▼             ▼
Data  Pages    Components     Domains
 │      │          │        ┌────┼────┐
 └──────┴──────────┴────────▼────▼────▼
                         Live Chat Betting
                            │     │    │
                            └─────┼────┘
                                  ▼
                               Services
```

## PC Preview

`pc.html` must only provide:

1. desktop preview chrome;
2. an iframe pointing at `index.html`;
3. the `desktop` platform flag and desktop stylesheet injection.

The same JavaScript modules, HTML markup, data, domains, and services are therefore exercised on mobile and PC.

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
