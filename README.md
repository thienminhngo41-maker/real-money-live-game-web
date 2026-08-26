# Real Money: Live Game Web

Telegram Mini App을 중심으로 설계한 **Live / Chat / Betting / Mini Game 프론트엔드 프로토타입**입니다.

> **Status: Prototype / Test Mode**
>
> 현재 프로젝트의 잔액, 입금, 출금, 베팅 및 정산 상태는 신뢰 가능한 서버 원장이 아닙니다. 실제 현금 서비스를 운영하려면 서버 측 인증 검증, 잔액 원장, 거래 처리, 베팅 검증, 결과 정산 및 감사 로그가 별도로 필요합니다.

## Overview

하나의 App Shell을 기반으로 PC 브라우저와 Telegram Mini App WebView에서 같은 애플리케이션 코드를 공유하도록 구성되어 있습니다.

```text
Home → Live → Live Room
                 ├─ Stream
                 ├─ Live Chat
                 ├─ Vote
                 └─ Betting Sheet
                    ├─ 🐉 Dragon 7 / 🐼 Panda 8
                    ├─ P.P / TIE / B.P
                    └─ PLAYER / BANKER
```

## Current Features

| 기능 | 설명 | 상태 |
|---|---|---|
| Home | Hero, 인기 게임, Provider, Featured Game | Prototype |
| Live | Live 목록 및 스트림 선택 | Prototype |
| Live Room | 스트리밍 중심 게임 룸 | Prototype |
| Live Stream | 외부 스트림 연결 구조 | Prototype |
| Chat | Live Room 채팅 UI 및 테스트 메시지 흐름 | Test |
| Vote | Live Room 테스트 투표 | Test |
| Betting | Baccarat 베팅 UI 및 클라이언트 테스트 상태 | Test |
| Balance | 잔액/포인트 표시 UI | Prototype |
| Deposit / Withdraw | 테스트용 모달 UI | Not real money |
| Mini Game | 게임 데이터 기반 진입 | Prototype |
| Profile | Telegram 사용자 정보 기반 표시 | Prototype |
| i18n | Korean / Chinese / English | Implemented |
| PC Preview | `pc.html`을 통한 PC presentation | Implemented |
| Telegram Mini App | Telegram WebApp API + browser fallback | Implemented |

## Betting UI

베팅 Sheet는 모바일에서 엄지손가락으로 조작하기 쉽도록 구성되어 있습니다.

### 순서

1. **Dragon 7 / Panda 8** — 2열
2. **P.P / TIE / B.P** — 3열
3. **PLAYER / BANKER** — 2열, 가장 큰 주요 베팅 영역
4. Chip / 금액 / 요약 / 확인

### 시각 규칙

| 영역 | 색상 |
|---|---|
| 🐉 Dragon 7 | Red |
| 🐼 Panda 8 | Blue |
| P.P | Blue |
| TIE | Green |
| B.P | Red |
| PLAYER | Blue |
| BANKER | Red |

각 베팅 텍스트는 중앙 정렬하고 PLAYER/BANKER를 가장 크게 표시합니다. 색상은 어두운 tint와 컬러 border를 사용하며 선택 상태는 강조 테두리와 subtle glow로 표시합니다. 터치 영역은 모바일 조작을 고려해 충분한 크기를 유지합니다.

현재 테스트 배당은 Player 1:1, Banker 화면상 1:1(5% commission 모델), Tie 8:1, Player Pair 11:1, Banker Pair 11:1, Dragon 7 40:1, Panda 8 25:1입니다.

현재 베팅 확인은 실제 잔액을 차감하거나 서버 정산을 수행하지 않습니다. 클라이언트 테스트 상태를 요약하고 초기화하는 동작입니다.

## Chat / Room UX

Live Room에서는 스트리밍 영역을 중심으로 Chat과 Betting을 별도 조작 흐름으로 제공합니다.

- Chat 버튼 → 채팅 입력 영역으로 전환하고 모바일 키보드 입력 지원
- Betting 버튼 → 하단 Sheet가 올라오며 스트리밍 컨텍스트를 최대한 유지
- Sheet → 제한된 높이와 내부 스크롤로 화면을 불필요하게 가리지 않음
- PC와 Telegram Mini App → 같은 pages/components/domains/services 코드 공유

## Architecture

`index.html`을 단일 App Shell로 사용하며 ES Module로 기능을 분리합니다.

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

- `js/app.js` — 앱 초기화, 라우터 구성, 전역 이벤트 위임
- `js/pages/` — 화면 렌더링 및 라우팅
- `js/components/` — Topbar, BottomNav, Modal, Betting Sheet 등 재사용 UI
- `js/domains/` — Live / Chat / Betting 도메인 오케스트레이션
- `js/services/` — Telegram 및 기능 서비스 연동
- `js/state.js` — 프로토타입 클라이언트 상태
- `data/` — 게임, 베팅, 다국어 데이터
- `css/` — 기본, 레이아웃, Live, Betting, Profile 스타일

상세 구조는 [`docs/architecture.md`](./docs/architecture.md)를 참고하세요.

## Directory Structure

```text
.
├── index.html                 # main App Shell
├── pc.html                    # PC Preview wrapper
├── assets/images/             # static image assets
├── data/                      # games, betting, translations
├── css/                       # base/layout/feature styles
├── styles/                    # additional presentation styles
├── js/
│   ├── app.js                 # composition root
│   ├── state.js               # prototype state
│   ├── components/            # reusable UI components
│   ├── domains/               # live/chat/betting domains
│   ├── pages/                 # screens and router
│   └── services/              # integrations/services
├── docs/                      # architecture and operational docs
├── AI_INSTRUCTIONS.md         # AI development rules
├── CHANGELOG.md               # project work log
├── package.json
└── README.md
```

## Local Development

### Requirements

- Modern browser
- Node.js / npm
- Python 3 for a local static server
- Telegram WebApp environment for Telegram-specific testing

### Run

```bash
npm install
npm run build
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080/`을 열고, PC presentation은 `http://localhost:8080/pc.html`을 사용합니다.

`npm run build`는 실제 번들링을 수행하지 않는 정적 사이트 확인 명령입니다. ES Module 테스트를 위해 `file://`로 HTML을 직접 열지 말고 HTTP 서버를 사용하세요.

## GitHub Pages

정적 사이트이므로 별도 Node 번들링 없이 GitHub Pages에서 제공할 수 있습니다.

Project Pages:

`https://thienminhngo41-maker.github.io/real-money-live-game-web/`

GitHub Pages는 현재 개발/검증용 배포 대상으로 취급하며, 운영 배포와 동일시하지 않습니다.

## Telegram Mini App

`js/services/telegram.js`가 Telegram WebApp API와 브라우저 fallback을 담당합니다. Telegram 환경에서는 theme, viewport, safe-area 등의 정보를 요청하고 WebApp 초기화 메서드를 사용합니다.

Telegram WebApp API는 버전에 따라 지원 범위가 다르므로 unsupported API 경고가 앱 렌더링 실패를 의미하지는 않습니다.

실서비스 인증에서는 Telegram WebApp `initData`를 서버에서 검증해야 하며, 클라이언트의 사용자 정보만으로 권한을 결정해서는 안 됩니다.

## PC Preview

`pc.html`은 별도 앱이 아니라 같은 애플리케이션을 PC 화면에 맞게 보여주는 wrapper입니다.

```text
pc.html
   │
   └── iframe → index.html
                    │
                    └── desktop presentation
```

## Security Boundary

현재 다음 값은 모두 프로토타입 클라이언트 상태이며 권위 있는 데이터로 취급하면 안 됩니다.

- `state.js`
- betting state
- 표시용 balance/points
- client-side Telegram user state
- test deposit/withdraw state

프로덕션에서는 서버가 인증/Telegram identity, balance ledger, 입출금, bet validation, game result/settlement, transaction history/audit log 및 필요한 실시간 동기화를 소유해야 합니다.

상세 내용은 [`docs/security.md`](./docs/security.md)를 참고하세요.

## Development Rules

1. 작업 브랜치를 사용하고 feature commit을 `main`에 직접 만들지 않습니다.
2. 변경 전에 책임이 있는 가장 작은 모듈을 확인합니다.
3. 도메인 로직을 필요 이상으로 `app.js`에 넣지 않습니다.
4. 새 전역 변수와 inline `onclick`을 추가하지 않습니다.
5. 집중 작업에서 관련 없는 UI/CSS를 변경하지 않습니다.
6. 기존 서비스를 특별한 이유 없이 삭제하지 않습니다.
7. 권위 있는 실제 금전 정산을 클라이언트에 구현하지 않습니다.
8. secret, API key, credential을 커밋하지 않습니다.
9. architecture/behavior가 변경되면 관련 문서를 갱신합니다.
10. 의미 있는 작업은 `CHANGELOG.md`에 기록합니다.
11. UI 변경은 병합 전에 레이아웃과 실제 interaction flow를 함께 검증합니다.

## Assets

정적 이미지는 `assets/images/`에 보관하며 게임 정의에서 repository-relative path로 참조합니다.

## Documentation Map

- [`docs/architecture.md`](./docs/architecture.md) — 코드 구조와 의존성
- [`docs/development.md`](./docs/development.md) — 개발 workflow
- [`docs/deployment.md`](./docs/deployment.md) — 배포 정책
- [`docs/security.md`](./docs/security.md) — 보안 및 신뢰 경계
- [`docs/betting.md`](./docs/betting.md) — Betting TEST MODE
- [`docs/live-room.md`](./docs/live-room.md) — Live Room
- [`docs/chat.md`](./docs/chat.md) — Chat
- [`docs/betting-ui-next.md`](./docs/betting-ui-next.md) — Betting UI 개선 방향
- [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) — AI 개발 규칙
- [`CHANGELOG.md`](./CHANGELOG.md) — 변경 이력

## Current Limitations

- 권위 있는 production backend 및 실제 잔액 원장 없음
- Betting은 client-state 기반 테스트 모드
- Chat/Vote는 production real-time infrastructure가 아님
- 외부 streaming은 integration structure 중심의 prototype
- Telegram WebView 동작은 WebApp API 버전/호스트 환경에 영향받음
- `npm run build`는 bundle artifact를 생성하지 않음

## Roadmap

1. PC / Telegram Mini App 공통 UI 안정화
2. Live Room interaction 및 WebView edge-case 검증
3. backend API와 server-owned state 경계 정의
4. authoritative wallet/ledger 및 transaction workflow 구축
5. 서버 측 betting validation/settlement 구축
6. Live / Chat / Vote production real-time synchronization 구축
7. production 전 automated tests와 deployment checks 추가

## Project Status

현재 저장소는 **서비스 아키텍처와 사용자 경험을 검증하는 프론트엔드 프로토타입 단계**입니다. UI에 표시되는 잔액, 입금, 출금, 베팅 상태와 결과는 실제 거래 또는 정산 완료를 의미하지 않습니다.
