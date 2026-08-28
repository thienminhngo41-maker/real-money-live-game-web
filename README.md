# 🎮 Real Money: Live Game Web

Telegram Mini App을 중심으로 설계한 **Live / Chat / Betting / Mini Game 프론트엔드**입니다.

PC 브라우저와 Telegram Mini App WebView가 하나의 App Shell과 동일한 JavaScript 모듈을 공유하도록 구성되어 있으며, Live Room 안에서 스트리밍·채팅·투표·베팅 UI를 하나의 사용자 흐름으로 제공합니다.

> **Project Status: Prototype / Test Mode**
>
> 현재 저장소는 프론트엔드 프로토타입입니다. 화면에 표시되는 잔액, 입금/출금, 베팅 및 정산 상태는 실제 금융 원장이나 서버의 권위 있는 거래 결과가 아닙니다. 실제 현금 서비스로 전환하려면 서버 측 인증 검증, 사용자 권한, balance ledger, 거래 처리, 베팅 검증, 게임 결과, 정산/payout, 감사 로그 및 필요한 실시간 인프라를 별도로 구축해야 합니다.

## 📌 Overview

애플리케이션은 하나의 `index.html` App Shell을 중심으로 동작합니다.

```text
Telegram Mini App / Browser
             │
             ▼
        index.html
             │
             ▼
         js/app.js
             │
      ┌──────┼───────────────┐
      ▼      ▼               ▼
    Pages Components       Domains
      │      │          ┌────┼────┐
      │      │          ▼    ▼    ▼
      │      │        Live  Chat Betting
      │      │          │    │    │
      └──────┴──────────┴────┴────┘
                         │
                         ▼
                      Services
```

### 주요 사용자 흐름

```text
Home
 ├─ Live
 │   └─ Live Room
 │       ├─ Stream
 │       ├─ Live Chat
 │       ├─ Vote
 │       └─ Betting Sheet
 │
 ├─ Mini Game
 └─ Profile
```

Live Room의 Betting UI는 Baccarat 테스트 흐름을 중심으로 구성되어 있습니다.

## ✨ Current Features

| 기능 | 설명 | 상태 |
|---|---|---|
| 🏠 Home | Hero, 인기 게임, Provider, Featured Game | Prototype |
| 📺 Live | Live 목록 및 스트림 선택 | Prototype |
| 🎥 Live Room | 스트리밍 중심 게임 룸 | Prototype |
| 💬 Chat | Live Room 채팅 UI 및 테스트 메시지 흐름 | Test |
| 🗳 Vote | Live Room 테스트 투표 | Test |
| 🎯 Betting | Baccarat 베팅 UI 및 클라이언트 테스트 상태 | Test |
| 💰 Balance | 잔액/포인트 표시 UI | Prototype |
| 💳 Deposit | 테스트용 입금 모달 UI | Not real money |
| 💸 Withdraw | 테스트용 출금 모달 UI | Not real money |
| 🎮 Mini Game | 게임 데이터 기반 진입 | Prototype |
| 👤 Profile | Telegram 사용자 정보 기반 표시 | Prototype |
| 🌐 i18n | Korean / Chinese / English | Implemented |
| 🖥 PC Preview | `pc.html`을 이용한 PC presentation | Implemented |
| 📱 Telegram Mini App | Telegram WebApp API + browser fallback | Implemented |

## 🎯 Betting UI

Betting Sheet는 모바일에서 빠르게 조작할 수 있도록 구성되어 있습니다.

### 베팅 영역 순서

1. **Dragon 7 / Panda 8** — 2열
2. **P.P / TIE / B.P** — 3열
3. **PLAYER / BANKER** — 2열의 주요 베팅 영역
4. Chip / 금액 / 요약 / 확인

### UI 색상 규칙

| 영역 | 표시 색상 |
|---|---|
| 🐉 Dragon 7 | Red |
| 🐼 Panda 8 | Blue |
| P.P | Blue |
| TIE | Green |
| B.P | Red |
| PLAYER | Blue |
| BANKER | Red |

베팅 텍스트는 중앙 정렬하며 PLAYER/BANKER를 가장 크게 표시합니다. 선택 상태는 강조 테두리와 subtle glow를 사용하고, 모바일 터치 조작을 고려해 충분한 터치 영역을 유지합니다.

### 현재 테스트 배당

- Player: `1:1`
- Banker: 화면상 `1:1` — 5% commission 모델
- Tie: `8:1`
- Player Pair: `11:1`
- Banker Pair: `11:1`
- Dragon 7: `40:1`
- Panda 8: `25:1`

> ⚠️ 위 값은 현재 프론트엔드 테스트 UI의 표시값입니다. 실제 배당, 베팅 승인, 잔액 차감, 게임 결과 또는 지급을 의미하지 않습니다.

현재 베팅 확인은 실제 잔액을 차감하거나 서버 정산을 실행하지 않습니다. 클라이언트 테스트 상태를 요약하고 초기화하는 용도로 동작합니다.

## 📺 Live Room / Chat / Vote

Live Room은 스트리밍 영역을 중심으로 여러 상호작용을 제공합니다.

- **Chat** → 채팅 입력 영역으로 전환하고 모바일 키보드 입력 지원
- **Betting** → 하단 Betting Sheet 표시
- **Vote** → Live Room 테스트 투표 흐름
- **Sheet** → 제한된 높이와 내부 스크롤을 사용해 스트리밍 영역을 불필요하게 가리지 않도록 구성
- **PC / Telegram Mini App** → 동일한 pages/components/domains/services 모듈 공유

현재 Chat과 Vote는 production-grade realtime infrastructure가 아니라 프론트엔드 테스트 흐름입니다.

## 📱 Telegram Mini App

`js/services/telegram.js`가 Telegram WebApp API와 브라우저 fallback을 담당합니다. Telegram WebApp 환경에서는 관련 환경 정보를 초기화하고, 일반 브라우저에서도 개발/미리보기가 가능하도록 fallback을 제공합니다.

### 중요한 인증 경계

Telegram WebApp의 사용자 정보만 클라이언트에서 읽고 권한을 결정해서는 안 됩니다. 실서비스에서는 Telegram WebApp `initData`를 **서버에서 검증**하고 검증된 identity를 기준으로 사용자 권한과 거래 요청을 처리해야 합니다.

Telegram WebApp API는 버전에 따라 지원 범위가 다를 수 있으므로 unsupported API 경고가 곧 앱 렌더링 실패를 의미하지는 않습니다.

## 🖥 PC Preview

`pc.html`은 별도의 앱이 아니라 동일한 `index.html` 애플리케이션을 PC 화면에서 확인하기 위한 presentation wrapper입니다.

```text
pc.html
   │
   └── iframe
          │
          ▼
      index.html
          │
          └── desktop presentation
```

## 🏗 Architecture

### Entry Points

```text
index.html
   │
   └── js/app.js

pc.html
   │
   └── iframe → index.html
```

`index.html`은 HTML App Shell을 제공하고, `js/app.js`가 애플리케이션 composition root 역할을 합니다.

### JavaScript 구조

```text
js/
├── app.js                    # 앱 초기화 / composition / global event delegation
├── state.js                  # 임시 client-side prototype state
├── domains/
│   ├── index.js
│   ├── live/live.js          # Live 도메인
│   ├── chat/chat.js          # Chat 도메인
│   └── betting/betting.js    # Betting 도메인
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

### Module 책임

- `js/app.js` — 초기화, composition, 전역 이벤트 위임
- `js/state.js` — 프로토타입 UI 상태
- `js/pages/` — 화면 렌더링 및 라우팅
- `js/components/` — 재사용 가능한 UI 컴포넌트
- `js/domains/` — Live / Chat / Betting 기능 오케스트레이션
- `js/services/` — Telegram 및 기능별 integration/service
- `data/` — 게임, 베팅, 다국어 등의 정적 데이터
- `css/` — 기본/레이아웃/Live/Betting/Profile 관련 스타일

도메인은 필요한 경우 service를 감싸며, page/component가 service 내부 구현에 직접 의존하지 않도록 경계를 유지합니다. 상세 구조는 [`docs/architecture.md`](./docs/architecture.md)를 참고하세요.

## 📂 Directory Structure

```text
.
├── index.html                 # Main App Shell
├── pc.html                    # PC Preview wrapper
├── assets/images/             # Static image assets
├── data/                      # Games / Betting / i18n data
├── css/                       # Feature-based styles
├── styles/                    # Additional presentation styles
├── js/
│   ├── app.js
│   ├── state.js
│   ├── components/
│   ├── domains/
│   ├── pages/
│   └── services/
├── docs/                      # Architecture / deployment / security docs
├── AI_INSTRUCTIONS.md         # AI development rules
├── CHANGELOG.md               # Project work log
├── package.json
└── README.md
```

## 🔄 Runtime Data Flow

### App Startup

1. Telegram integration 초기화
2. Telegram/browser locale을 기준으로 언어 감지
3. Topbar, Bottom Navigation, Modal, Betting Sheet 렌더링
4. 현재 상태를 기준으로 page 렌더링
5. Router 및 global event delegation 연결

### Live Room

```text
Live List
   │
   ▼
Live Domain
   │
   ├── Room state / lifecycle
   ├── Chat start / stop
   └── Router transition
          │
          ▼
       Room Page
```

### Betting

```text
Betting UI
   │
   ▼
Betting Domain
   │
   ▼
Betting Service
   │
   ▼
Client State (TEST ONLY)
```

현재 이 흐름에는 실제 거래 서버가 없으므로 client state는 금전 원장이 아닙니다.

## 📊 Static Data

```text
data/
├── games.js
├── betting.js
└── i18n.js
```

- `games.js` — 게임/공급자 등 정적 게임 정의
- `betting.js` — Betting 테스트 옵션 및 관련 데이터
- `i18n.js` — Korean / Chinese / English 번역 데이터

## 🎨 Styling

모바일 기본 스타일은 `css/`에 기능별로 분리되어 있습니다. 새 스타일은 가능한 한 해당 기능 CSS에 추가하고 `index.html`에 불필요한 inline style을 추가하지 않는 것을 원칙으로 합니다.

PC Preview는 `pc.html`에서 동일한 `index.html`에 desktop presentation을 적용합니다.

## 🧩 Dependency / Development Rules

1. `app.js`는 다른 모듈을 조합하되 domain 내부 로직을 복제하지 않습니다.
2. `pages/`와 `components/`는 domain 내부 service 구현을 직접 알지 않습니다.
3. domain 간 직접 의존을 최소화합니다.
4. cross-domain orchestration은 application composition boundary에서 처리합니다.
5. `state.js`는 prototype UI state에만 사용합니다.
6. 새로운 전역 변수와 inline `onclick`을 추가하지 않습니다.
7. 관련 없는 UI/CSS를 함께 변경하지 않습니다.
8. 기존 service를 특별한 이유 없이 삭제하지 않습니다.
9. 실제 금전 정산의 authority를 클라이언트에 구현하지 않습니다.
10. secret, API key, credential을 repository에 커밋하지 않습니다.
11. architecture/behavior가 변경되면 관련 문서를 함께 갱신합니다.
12. 의미 있는 작업은 `CHANGELOG.md`에 기록합니다.
13. UI 변경 시 실제 interaction flow와 layout을 함께 검증합니다.

## 🛠 Local Development

### Requirements

- Modern browser
- Node.js / npm
- Python 3 (로컬 static server 사용 시)
- Telegram WebApp 환경 (Telegram-specific 동작 테스트 시)

### Install

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Vite 개발 서버를 사용합니다.

### Production Build Check

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Static Server 방식

프로젝트의 ES Module을 브라우저에서 테스트할 때 `file://`로 HTML을 직접 열지 말고 HTTP 서버를 사용하는 것을 권장합니다.

```bash
python3 -m http.server 8080
```

그 후 `http://localhost:8080/` 또는 `http://localhost:8080/pc.html`을 사용합니다.

> 현재 `package.json`에는 Vite `dev`, `build`, `preview` script가 정의되어 있습니다. 따라서 위 명령은 현재 repository 설정과 일치합니다.

## 🚀 Deployment

현재 저장소는 정적 웹 애플리케이션이며 GitHub Pages / Netlify 같은 정적 호스팅 환경을 대상으로 사용할 수 있습니다.

현재 문서화된 Netlify 설정은 다음과 같습니다.

| 항목 | 값 |
|---|---|
| Base directory | `/` |
| Build command | `npm run build` |
| Publish directory | `.` |
| Functions directory | `netlify/functions` |

실제 호스팅 서비스의 dashboard 설정이 이 문서와 다르면 현재 dashboard 설정을 source of truth로 보고 문서를 갱신해야 합니다.

### GitHub Pages

```text
https://thienminhngo41-maker.github.io/real-money-live-game-web/
```

GitHub Pages는 개발/검증용 정적 배포 대상으로 취급하며 production backend를 대신하지 않습니다.

### Release Checklist

- `npm install` 성공
- `npm run build` 성공
- `/`에서 App Shell 로드
- `/pc.html` 로드
- Home → Live → Room 진입/복귀
- Chat 입력 동작
- Betting Sheet 열기/닫기
- Betting TEST MODE가 실제 거래로 오인되지 않는지 확인
- 모바일 safe-area 확인
- browser console의 module/import 오류 확인
- Telegram Mini App 환경에서 WebApp 초기화 확인
- secret/API key/credential이 포함되지 않았는지 확인
- 실제 금전 로직이 프론트엔드에 추가되지 않았는지 확인

상세 배포 정책은 [`docs/deployment.md`](./docs/deployment.md)를 참고하세요.

## 🔐 Security Boundary

현재 다음 값은 모두 프로토타입 client state이며 authoritative data로 취급하면 안 됩니다.

- `state.js`
- betting state
- 표시용 balance / points
- client-side Telegram user state
- test deposit / withdraw state
- 테스트 betting 결과 및 상태

### Production 전환 시 서버가 소유해야 하는 영역

```text
Telegram WebApp initData verification
            │
            ▼
      Auth / Identity
            │
     ┌──────┴──────┐
     ▼             ▼
 Balance Ledger   User Permission
     │
     ├── Deposit
     ├── Withdrawal
     ├── Bet Validation
     ├── Game Result
     ├── Settlement / Payout
     └── Transaction / Audit Log
```

프론트엔드는 서버의 결과를 표시하고 요청을 전달할 수 있지만, **잔액·거래·베팅 승인·게임 결과·정산 결과를 결정하는 authority가 되어서는 안 됩니다.**

## 💳 Firebase / External Services

현재 `package.json`에는 Firebase dependency가 포함되어 있습니다.

```json
"firebase": "^12.18.0"
```

이 README에서는 repository에서 확인 가능한 범위를 넘어서 Firebase가 어떤 production 역할을 담당한다고 가정하지 않습니다. 실제 Firebase 사용 범위가 변경되면 관련 service 문서와 환경 변수/보안 정책을 함께 갱신해야 합니다.

## 🖼 Assets

정적 이미지는 `assets/images/`에 보관하며 게임 정의에서 repository-relative path로 참조합니다.

## 📚 Documentation Map

| 문서 | 내용 |
|---|---|
| [`docs/architecture.md`](./docs/architecture.md) | 코드 구조와 dependency boundary |
| [`docs/development.md`](./docs/development.md) | 개발 workflow |
| [`docs/deployment.md`](./docs/deployment.md) | 배포 정책 및 release checklist |
| [`docs/security.md`](./docs/security.md) | 보안 및 신뢰 경계 |
| [`docs/betting.md`](./docs/betting.md) | Betting TEST MODE |
| [`docs/live-room.md`](./docs/live-room.md) | Live Room 동작 |
| [`docs/chat.md`](./docs/chat.md) | Chat 동작 |
| [`docs/betting-ui-next.md`](./docs/betting-ui-next.md) | Betting UI 개선 방향 |
| [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) | AI 개발 규칙 |
| [`CHANGELOG.md`](./CHANGELOG.md) | 변경 이력 |

## ⚠️ Current Limitations

현재 저장소에는 다음 production 기능이 완성된 형태로 포함되어 있지 않습니다.

- 권위 있는 production backend
- 서버 기반 balance ledger
- 실제 deposit / withdrawal 처리
- 서버 측 betting validation
- 서버 측 game result / settlement
- production-grade Chat / Vote realtime infrastructure
- 외부 streaming의 완전한 production integration
- Telegram identity의 서버 측 인증 검증
- transaction history / audit log의 production 구현

## 🗺 Roadmap

1. PC / Telegram Mini App 공통 UI 안정화
2. Live Room interaction 및 WebView edge-case 검증
3. Backend API와 server-owned state 경계 확정
4. Telegram WebApp identity 서버 검증
5. Authoritative wallet / ledger 구축
6. Deposit / withdrawal transaction workflow 구축
7. 서버 측 betting validation / settlement 구축
8. Live / Chat / Vote production realtime synchronization 구축
9. Automated tests 및 deployment checks 추가
10. Production observability, audit logging 및 운영 도구 강화

## 📈 Project Status

현재 **서비스 UI/UX와 프론트엔드 아키텍처를 검증하는 프로토타입 단계**입니다.

Telegram Mini App과 PC Preview에서 동일한 앱 구조를 사용할 수 있도록 Live / Chat / Betting / Profile / Mini Game 영역을 모듈화하고 있으며, 실제 금전 서비스에 필요한 신뢰 경계는 향후 backend/API 및 ledger 계층에서 구현해야 합니다.

> **Important:** 화면에 표시되는 잔액, 입금, 출금, 베팅 및 결과는 현재 실제 금융 거래 또는 정산 완료를 의미하지 않습니다.
