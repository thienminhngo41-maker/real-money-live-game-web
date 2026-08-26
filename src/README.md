# Source Architecture

`src/`는 PC Web과 Telegram Mini App이 공유하는 기능 로직의 영역입니다.

## Platform rule

플랫폼별 UI는 entry point와 CSS에서 분리하지만, Live / Betting / Chat / Profile 같은 기능 로직은 가능한 한 하나만 유지합니다.

```text
index.html ─┐
            ├── shared src/
pc.html ────┘
```

## Modules

- `core/` — app state/config
- `shared/` — platform-independent helpers
- `live/` — Live / Stream / Chat / Vote
- `betting/` — Baccarat betting/rules/payout test logic
- `telegram/` — Telegram-only API adapter
- `profile/` — profile UI/state
- `mini-games/` — mini-game navigation
- `i18n/` — translations

## Boundary

`src/telegram/`만 Telegram API에 직접 접근합니다. 다른 모듈은 가능한 한 브라우저 표준 API 또는 추상화된 shared API를 사용합니다.

## Migration

현재 레거시 구현은 `index.html`에 남아 있습니다. CSS와 JavaScript는 기능별로 점진적으로 분리하며, 각 이동 단계에서 기존 화면 동작을 보존합니다.
