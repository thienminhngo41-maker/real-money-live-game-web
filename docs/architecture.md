# Architecture

## Current state

The project is a static Telegram Mini App prototype. Existing implementation is still concentrated in `index.html`; modular extraction is planned as a controlled refactor rather than a full rewrite.

## Target modules

```text
src/
├── core/        app initialization, shared state, constants
├── live/        live game, room, streams, chat, vote
├── betting/     betting UI, rules, state, payout test logic
├── telegram/    Telegram WebApp and user information
├── profile/     profile UI
├── mini-games/  mini game navigation/UI
└── i18n/        translations
```

## Styling

`styles/` owns shared, layout, live, betting and chat styles.

## Assets

`assets/` owns module-specific images/icons. Asset directories should have their own README when they become non-trivial.

## Future backend

Frontend modules must not become the source of truth for money, bets or settlement. Future backend modules will own authentication, wallet, transaction ledger, game rounds, settlement, chat and vote state.
