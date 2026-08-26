# Real Money: Live Game Web

Telegram Mini App을 기반으로 만든 **Live / Chat / Betting / Mini Game 프로토타입**입니다.

> **현재 상태: Prototype / Test Mode**
>
> 현재 프론트엔드는 실제 현금의 잔액, 입금, 출금, 베팅 정산을 신뢰 가능한 원장으로 처리하지 않습니다. 실제 금전 기능을 운영하려면 서버 검증과 서버 소유의 잔액/거래/정산 시스템이 별도로 필요합니다.

## Quick Start

### Requirements

- 현대적인 브라우저
- Node.js 및 npm
- Telegram Mini App으로 테스트하려면 Telegram WebApp 환경

### Run locally

현재 앱은 별도 번들러가 없는 정적 ES Module 앱입니다.

```bash
npm install
npm run build
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080/`을 열고, PC 미리보기는 `http://localhost:8080/pc.html`을 사용합니다.

`npm run build`는 현재 실제 번들링을 수행하지 않고 정적 사이트임을 확인하는 명령입니다.

## Current Features

| Area | Current implementation | Status |
|---|---|---|
| Home | 게임/서비스 진입 화면 | Prototype |
| Live | Live 목록 및 Live Room | Prototype |
| Live Stream | 외부 스트림 연동 구조 | Prototype |
| Chat | 테스트 사용자 기반 채팅 | Test |
| Vote | Live Room 테스트 투표 | Test |
| Betting | Baccarat 베팅 UI 및 테스트 상태 | Test |
| Balance | 표시/테스트 UI | Prototype |
| Deposit / Withdraw | UI 및 테스트 모달 | Not real money |
| Mini Game | 게임 데이터 기반 진입 | Prototype |
| Profile | Telegram 사용자 정보 기반 표시 | Prototype |
| i18n | Korean / Chinese / English | Implemented |
| PC Preview | `pc.html` → `index.html` iframe | Implemented |

## Architecture

애플리케이션은 `index.html`을 단일 App Shell로 사용합니다. 실제 애플리케이션 로직은 ES Module로 분리되어 있습니다.

```text
Telegram / Browser
        │
        ▼
   index.html
        │
        ▼
     js/app.js
        │
   ┌────┼──────────────────────────┐
   ▼    ▼          ▼               ▼
 pages components domains         data
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
        Live      Chat    Betting
          │        │        │
          └────────┼────────┘
                   ▼
               services
```

### Module responsibilities

- `js/app.js` — 앱 초기화, 모듈 조합, 전역 이벤트 위임
- `js/pages/` — 페이지 렌더링 및 라우팅
- `js/components/` — 재사용 UI 컴포넌트
- `js/domains/` — Live / Chat / Betting 도메인 오케스트레이션
- `js/services/` — Telegram 연동 및 기존 기능 서비스
- `js/state.js` — 프로토타입용 클라이언트 상태
- `data/` — 정적 게임/베팅/i18n 데이터
- `css/` — 모바일 기본 및 기능별 스타일

상세 구조는 [`docs/architecture.md`](./docs/architecture.md)를 참고하세요.

## Directory Structure

```text
.
├── index.html                 # main App Shell
├── pc.html                    # PC Preview wrapper
├── assets/images/             # static image assets
├── data/                      # games, betting, translations
├── css/                       # base/mobile/component styles
├── styles/                    # additional presentation styles
├── js/
│   ├── app.js                 # composition root
│   ├── state.js               # prototype state
│   ├── components/            # reusable UI
│   ├── domains/               # live/chat/betting domains
│   ├── pages/                 # screens and router
│   └── services/              # integrations and feature services
├── docs/                      # architecture and operational docs
├── AI_INSTRUCTIONS.md         # AI development rules
├── CHANGELOG.md               # project work log
├── package.json
└── README.md
```

## Core Flows

### Live

Live 목록에서 stream을 선택하면 Live Room으로 이동합니다. Live domain이 room lifecycle을 조정하고 Room UI에서 stream/chat/vote/betting 진입을 제공합니다.

### Chat

Chat domain은 사용자 입력과 테스트 채팅 흐름을 조정하고, 기존 `services/chat.js`가 테스트 메시지 처리를 제공합니다. 현재 데이터는 실제 사용자 메시지 저장소가 아닙니다.

### Betting

현재 Betting은 테스트 상태입니다.

- Player: 1:1
- Banker: 화면상 1:1, 5% commission 모델
- Tie: 8:1
- Player Pair: 11:1
- Banker Pair: 11:1
- Dragon 7: 40:1
- Panda 8: 25:1

베팅 금액은 클라이언트 `state`에 임시 저장됩니다. 현재 `confirmBet()`은 테스트 베팅을 요약하고 상태를 초기화할 뿐 실제 잔액 차감이나 서버 정산을 수행하지 않습니다.

상세 규칙은 [`docs/betting.md`](./docs/betting.md)를 참고하세요.

## Telegram Integration

`js/services/telegram.js`가 Telegram WebApp API와 브라우저 fallback을 담당합니다.

프로덕션 인증에서는 클라이언트 상태를 그대로 신뢰하지 말고 서버에서 Telegram WebApp `initData`를 검증해야 합니다.

## PC Preview

`pc.html`은 별도의 앱을 구현하지 않습니다.

```text
pc.html
   │
   └── iframe → index.html
                    │
                    └── desktop presentation injection
```

모바일과 PC는 같은 페이지/컴포넌트/domain/service 코드를 공유합니다.

## Assets

정적 이미지는 `assets/images/`에 보관합니다. 현재 주요 파일은 `1.png`~`6.png`, `game1.png`, `game2.jpeg`입니다.

이미지 경로는 `data/games.js` 등에서 `assets/images/...` 기준으로 참조합니다.

## Development Rules

1. `main`에 직접 개발 커밋을 하지 않고 작업 브랜치를 사용합니다.
2. 변경 전에 책임이 있는 가장 작은 모듈을 먼저 확인합니다.
3. `app.js`에 도메인 로직을 다시 넣지 않습니다.
4. 새 전역 변수와 inline `onclick`을 추가하지 않습니다.
5. 요청이 없으면 UI/CSS를 임의로 변경하지 않습니다.
6. 기존 `services/`는 특별한 이유 없이 삭제하지 않습니다.
7. 실제 금전 정산을 클라이언트에 구현하지 않습니다.
8. secret, API key, Firebase credential을 커밋하지 않습니다.
9. 기능 또는 architecture가 변경되면 관련 문서를 함께 갱신합니다.
10. 작업 내용은 `CHANGELOG.md`에 기록합니다.

상세 절차는 [`docs/development.md`](./docs/development.md), AI 작업 규칙은 [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md)를 참고하세요.

## Security Boundary

현재 `state.js`, betting service, Telegram client state 등은 **프로토타입 UI 상태**입니다.

프로덕션에서는 다음을 서버가 소유해야 합니다.

- 인증 및 사용자 식별 검증
- 포인트/잔액 원장
- 입금/출금 요청 및 상태
- 베팅 접수 및 유효성 검증
- 게임 결과 및 정산
- 거래 이력 및 감사 로그
- 필요한 경우 Live / Chat / Vote 실시간 동기화

보안 경계는 [`docs/security.md`](./docs/security.md)를 참고하세요.

## Deployment

프로젝트는 정적 사이트이며 `npm run build` 자체는 실제 번들링을 수행하지 않습니다. 현재 Netlify 정책은 [`docs/deployment.md`](./docs/deployment.md)에 기록합니다.

개발 중인 커밋을 운영 환경에 자동 배포하지 않는 것을 원칙으로 합니다.

## Documentation Map

- [`docs/architecture.md`](./docs/architecture.md) — 코드 구조와 의존성
- [`docs/development.md`](./docs/development.md) — 개발 workflow
- [`docs/deployment.md`](./docs/deployment.md) — 배포 정책
- [`docs/security.md`](./docs/security.md) — 보안 및 신뢰 경계
- [`docs/betting.md`](./docs/betting.md) — Betting TEST MODE
- [`docs/live-room.md`](./docs/live-room.md) — Live Room
- [`docs/chat.md`](./docs/chat.md) — Chat
- [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) — AI 개발 규칙
- [`CHANGELOG.md`](./CHANGELOG.md) — 변경 이력

## Project Status

이 저장소는 **서비스 아키텍처를 준비하는 프론트엔드 프로토타입 단계**입니다. 특히 실제 금전 기능은 아직 신뢰 가능한 서버 원장/정산 시스템으로 분리되지 않았으므로 UI에서 동작하는 테스트 상태를 실제 거래 기능으로 간주해서는 안 됩니다.
