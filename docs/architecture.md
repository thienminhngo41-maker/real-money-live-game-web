# Architecture

## Overview

이 프로젝트는 Telegram Mini App을 위한 정적 ES Module 프론트엔드 프로토타입입니다. 하나의 App Shell을 모바일과 PC Preview가 공유하며, Live / Chat / Betting 기능을 domain 단위로 분리합니다.

현재 서버 기반의 인증/잔액/거래/정산 시스템은 이 저장소의 source of truth가 아닙니다.

## Entry points

```text
index.html
   │
   └── js/app.js

pc.html
   │
   └── iframe → index.html
                    │
                    └── desktop presentation injection
```

`index.html`은 HTML shell만 제공합니다. `pc.html`은 동일한 앱을 PC에서 확인하기 위한 presentation wrapper입니다.

## Runtime composition

```text
                       index.html
                           │
                           ▼
                         app.js
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
     pages            components           domains
       │                   │            ┌──────┼──────┐
       │                   │            ▼      ▼      ▼
       │                   │          Live   Chat  Betting
       │                   │            │      │      │
       └───────────────────┴────────────┼──────┼──────┘
                                       ▼
                                   services
                                       │
                                       ▼
                                  external APIs
```

## JavaScript structure

```text
js/
├── app.js
├── state.js
├── domains/
│   ├── index.js
│   ├── live/live.js
│   ├── chat/chat.js
│   └── betting/betting.js
├── components/
│   ├── topbar.js
│   ├── bottomNav.js
│   ├── modal.js
│   └── bettingSheet.js
├── pages/
│   ├── router.js
│   ├── home.js
│   ├── live.js
│   ├── room.js
│   ├── mini.js
│   └── profile.js
└── services/
    ├── telegram.js
    ├── chat.js
    └── betting.js
```

### Responsibility boundaries

- `app.js`: initialization, composition, global event delegation.
- `state.js`: temporary client-side UI/prototype state.
- `pages/`: screen markup and routing.
- `components/`: reusable UI rendering and component interaction.
- `domains/`: feature orchestration and domain-specific behavior.
- `services/`: integrations and retained feature primitives.
- `data/`: static configuration/content.

Domains may wrap services, but page/component code should not depend on service internals when a domain boundary exists.

## Current data flow

### App startup

1. Telegram integration is initialized.
2. Language is detected from Telegram/browser locale.
3. Topbar, bottom navigation, modal and betting sheet are rendered.
4. Pages are rendered from current state.
5. Router and global event delegation connect navigation and interactions.

### Live Room

```text
Live list
   │
   ▼
Live domain
   │
   ├── room state / lifecycle
   ├── chat start/stop
   └── router transition
        │
        ▼
     Room page
```

### Betting

```text
Betting UI
   │
   ▼
Betting domain
   │
   ▼
Betting service
   │
   ▼
client state (TEST ONLY)
```

이 흐름에는 현재 실제 거래 서버가 없습니다. 따라서 클라이언트 상태는 돈의 원장이 아닙니다.

## Data modules

```text
data/
├── games.js
├── betting.js
└── i18n.js
```

정적 게임/공급자 정의, 테스트 Betting 옵션, 번역 데이터는 `data/`에서 관리합니다.

## Styling

모바일 기본 스타일은 `css/`에 기능별로 분리되어 있습니다. PC Preview는 `pc.html`에서 동일한 `index.html`에 desktop presentation을 주입합니다.

새 스타일은 가능하면 해당 기능 CSS에 두고, `index.html` inline style은 추가하지 않습니다.

## Dependency rules

1. `app.js`는 다른 모듈을 조합하지만 domain 내부 로직을 복제하지 않습니다.
2. `pages/`와 `components/`는 domain의 내부 service 구현을 직접 알지 않습니다.
3. domain 간 직접 의존을 최소화합니다.
4. cross-domain orchestration은 application composition boundary에서 처리합니다.
5. `state.js`는 prototype UI state에만 사용합니다.

## Backend boundary

프로덕션 전환 시 다음은 반드시 신뢰 가능한 서버 경계로 이동해야 합니다.

- Telegram WebApp 인증 검증
- 사용자 권한
- balance / ledger
- deposit / withdrawal state
- bet validation
- game result
- settlement / payout
- transaction history / audit log
- 필요한 실시간 Chat / Vote state

프론트엔드는 서버 결과를 표시하고 요청을 전달할 수 있지만, 금전/거래/정산 결과를 결정하는 authority가 되어서는 안 됩니다.
