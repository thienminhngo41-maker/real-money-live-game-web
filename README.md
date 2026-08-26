# Real Money: Live Game

> **Prototype / Test Version** — Telegram Mini App + PC Web Preview

Live Game / Mini Game 서비스의 UI/UX와 상태 흐름을 검증하는 정적 웹 프로토타입입니다. 현재 실제 현금 거래, 결제, 충전, 출금, 실제 베팅 정산은 연결되어 있지 않습니다.

## 이번 구조 개편

기존에는 `index.html` 하나에 HTML, 대량의 inline CSS, 데이터, 화면 전환, Telegram 연동, Chat, Vote, Betting 로직이 집중되어 있었습니다. 이번 리팩터링에서는 **HTML은 앱 셸**, **CSS는 기능별 스타일**, **JS는 페이지/컴포넌트/서비스**, **게임·베팅 데이터는 data**로 분리했습니다.

또한 PC용 코드를 별도로 복제하지 않고 `pc.html`이 동일한 `index.html`을 iframe으로 사용하도록 정리했습니다.

### 핵심 원칙

- `index.html`은 진입점과 DOM mount point만 담당
- `css/`는 모바일 기본 스타일과 PC presentation을 담당
- `data/`는 변경 가능한 게임/베팅/번역 데이터를 담당
- `js/components/`는 재사용 UI를 담당
- `js/pages/`는 화면 렌더링을 담당
- `js/services/`는 Telegram/Chat/Betting 같은 기능을 담당
- `js/state.js`는 브라우저 세션 상태를 한곳에서 관리
- `js/app.js`는 조립과 이벤트 연결만 담당
- `pc.html`은 애플리케이션 로직을 복제하지 않음
- 실제 잔액/정산은 클라이언트에서 결정하지 않음

## Project Structure

```text
real-money-live-game-web/
│
├── index.html
├── pc.html
├── README.md
├── AI_INSTRUCTIONS.md
├── CONTRIBUTING.md
├── CHANGELOG.md
│
├── css/
│   ├── variables.css       # Theme / safe-area variables
│   ├── base.css            # Reset / common rules
│   ├── layout.css          # App shell / navigation layout
│   ├── components.css      # Hero / cards / modal / floating actions
│   ├── live.css            # Live / Room / Vote / Chat
│   ├── betting.css         # Betting bottom sheet
│   ├── profile.css         # Profile screen
│   └── desktop.css         # PC presentation / preview chrome
│
├── data/
│   ├── games.js            # Games / providers / featured content
│   ├── betting.js          # Bet options / chips / test payout rules
│   └── i18n.js             # ko / cn / en translations
│
├── js/
│   ├── app.js              # Application composition / event delegation
│   ├── state.js            # Client-side session state
│   │
│   ├── components/
│   │   ├── topbar.js
│   │   ├── bottomNav.js
│   │   ├── modal.js
│   │   └── bettingSheet.js
│   │
│   ├── pages/
│   │   ├── router.js
│   │   ├── home.js
│   │   ├── live.js
│   │   ├── room.js
│   │   ├── mini.js
│   │   └── profile.js
│   │
│   └── services/
│       ├── telegram.js      # Telegram WebApp + browser fallback
│       ├── chat.js          # Test chat simulation
│       └── betting.js       # Betting state operations
│
└── assets/                  # Existing images / static resources
```

## Architecture

```text
                         index.html
                             │
                         js/app.js
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
       components          pages             services
          │                  │                  │
   Topbar / Nav        Home / Live /      Telegram / Chat /
   Modal / Betting     Room / Mini /      Betting
                       Profile
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                           state
                             │
                            data
                 games / betting / i18n
```

## Entry Points

### `index.html`

HTML 구조를 직접 길게 보관하지 않고 다음 mount point만 제공합니다.

- `#topbar`
- `#app`
- `#float-root`
- `#bottom-nav`
- `#modal-root`

모든 애플리케이션 JavaScript는 `type="module"`로 `js/app.js`에서 시작합니다.

### `pc.html`

PC Preview는 별도의 앱이 아닙니다.

```text
pc.html
   │
   └── iframe
         │
         └── index.html
               │
               └── js/app.js
```

`pc.html`은 `css/desktop.css`를 자체적으로 사용하고 iframe 내부에도 동일한 stylesheet를 주입한 뒤 `data-platform="desktop"`을 설정합니다. 따라서 모바일/Telegram과 PC가 같은 HTML/JS/data를 공유합니다.

## JavaScript Modules

### `js/app.js`

앱의 composition root입니다. 컴포넌트와 페이지를 조립하고 `data-*` 이벤트를 연결합니다. 새로운 비즈니스 로직을 이 파일에 계속 추가하지 않는 것을 원칙으로 합니다.

### `js/pages/`

페이지는 DOM을 렌더링하지만 Telegram API나 직접적인 외부 서비스 호출을 담당하지 않습니다.

- `home.js` — 홈
- `live.js` — Live 목록
- `room.js` — Live Room
- `mini.js` — Mini Games
- `profile.js` — Profile
- `router.js` — 페이지 history / navigation

### `js/components/`

여러 페이지에서 재사용하거나 독립적으로 동작하는 UI입니다.

### `js/services/`

외부 시스템 또는 기능성 로직의 경계입니다.

`telegram.js`는 Telegram WebApp API를 감싸고 일반 브라우저에서는 fallback을 제공합니다. `chat.js`와 `betting.js`는 현재 테스트 모드 구현입니다.

프로덕션 Backend가 추가되면 API/WebSocket/인증 구현을 이 경계에 연결하는 것을 권장합니다.

### `js/state.js`

현재는 브라우저 세션에서 필요한 페이지, 언어, Live Room, Betting 상태를 한곳에서 관리합니다. 실제 사용자/지갑 데이터의 source of truth가 아닙니다.

## Data Modules

`data/`에는 화면 코드에서 하드코딩하던 변경 가능 데이터를 둡니다.

- `games.js` — 미니게임 URL, provider, feature 데이터
- `betting.js` — 배팅 옵션, 배당 표시, 칩
- `i18n.js` — 한국어/중국어/영어 문자열과 언어 감지

게임 URL이나 표시 배당을 변경할 때 페이지 코드를 수정할 필요가 없습니다.

## CSS Modules

모바일 기본 스타일은 `css/`에 기능별로 분리되어 있습니다.

- `variables.css` — design tokens / safe area
- `base.css` — reset / typography
- `layout.css` — app shell / navigation
- `components.css` — shared UI
- `live.css` — Live / Room / Chat / Vote
- `betting.css` — Betting Sheet
- `profile.css` — Profile
- `desktop.css` — PC-only presentation

새로운 스타일은 가능한 한 해당 기능 CSS에 추가하며 inline `<style>`이나 HTML `style="..."`은 사용하지 않습니다.

## Platform

### Telegram Mini App

- Safe Area
- `100dvh`
- 하단 고정 Navigation
- Live Room Floating Action
- Betting Bottom Sheet
- Telegram WebApp API / Back Button
- Live iframe autoplay 요청

Telegram API가 없는 일반 브라우저에서도 앱이 실행되도록 fallback을 유지합니다.

### PC Web Preview

`pc.html`은 동일한 앱을 PC에서 확인하기 위한 presentation wrapper입니다. PC 전용 차이는 `css/desktop.css`로 처리하며 Live, Chat, Betting 등의 JavaScript는 모바일과 동일합니다.

## Live Room

```text
Live List
   ↓
Selected Stream
   ↓
Second Test Stream
   ↓
Player / Banker Test Vote
   ↓
Test Chat
   ↓
Betting / Chat Actions
```

두 번째 테스트 스트림은 `https://vdo.ninja/?view=EnemyDriveL`입니다.

### Test Vote

서버 투표가 아니라 브라우저에서 생성되는 랜덤 테스트 상태입니다.

### Test Chat

다음 테스트 사용자가 랜덤 간격으로 `test` 메시지를 생성합니다.

- TestUser01
- TestUser02
- TestUser03
- TestUser04

실제 Backend 채팅이 아니며 브라우저 세션에서만 동작합니다.

## Baccarat Betting — Test Mode

현재 Betting은 UI/상태 흐름 검증용입니다.

| 베팅 | 표시 배당 |
|---|---:|
| Player | 1:1 |
| Banker | 1:1 |
| Tie | 8:1 |
| Player Pair | 11:1 |
| Banker Pair | 11:1 |
| Dragon 7 | 40:1 |
| Panda 8 | 25:1 |

칩은 `1 / 5 / 10 / 50 / 100 / 1000`입니다. 칩 선택, 베팅 누적, 직접 금액 입력, `MAX`, 확인 팝업을 지원합니다.

Banker 테스트 반환 규칙은 기존 프로토타입의 5% commission 모델을 유지합니다. 실제 잔액 차감이나 지급은 없습니다.

## Languages

현재 지원:

- 한국어 `ko`
- 中文 `cn`
- English `en`

언어 데이터는 `data/i18n.js`에서 관리합니다.

## Development

빌드 시스템 없이 브라우저에서 직접 실행할 수 있는 ES Module 구조를 유지합니다.

로컬에서 확인할 때는 ES Module의 보안 정책 때문에 `file://`보다 정적 HTTP 서버를 사용하는 것을 권장합니다.

```bash
python3 -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000/`으로 확인합니다.

## Refactoring Rules

새 기능을 추가할 때 다음 순서를 권장합니다.

1. 변경 가능한 값이면 `data/`에 추가
2. 재사용 UI면 `js/components/`에 추가
3. 특정 화면이면 `js/pages/`에 추가
4. 외부 API/실시간 통신이면 `js/services/`에 추가
5. 세션 상태면 `js/state.js`에 추가
6. `js/app.js`에는 마지막 조립/이벤트 연결만 추가
7. 스타일은 `css/`에 추가
8. PC 전용 presentation만 `css/desktop.css`에 추가

### 금지 사항

- `index.html`에 새로운 대규모 `<style>` 추가
- `index.html`에 새로운 대규모 `<script>` 추가
- 페이지 파일에서 Telegram WebApp API 직접 호출
- 테스트 데이터와 화면 렌더링 로직을 한 파일에 계속 누적
- `pc.html`에 앱 로직 복제
- 실제 잔액/정산을 브라우저 JavaScript에서 신뢰하는 구조

## Tech Stack

- HTML5
- CSS
- Vanilla JavaScript ES Modules
- Telegram Mini Apps
- Netlify
- GitHub Pages / PC Preview

기존 Tailwind CDN 의존성은 이번 구조 개편에서 제거했습니다. 현재 스타일은 프로젝트의 외부 CSS 모듈로 관리합니다.

## Roadmap

### Phase 1 — UI Prototype

- [x] Telegram Mini App UI
- [x] PC Web Preview entry
- [x] Live Game / Live Room
- [x] Test Chat / Test Vote
- [x] Test Baccarat Betting UI
- [x] 다국어
- [x] `index.html` 최소화
- [x] CSS external module화
- [x] JS page/component/service module화
- [x] Game / Betting / i18n data 분리
- [x] PC와 모바일 앱 로직 공유
- [x] architecture / AI / contribution 문서 동기화

### Phase 2 — Backend

- [ ] Backend 구축
- [ ] Telegram 인증 검증
- [ ] Database 연동
- [ ] 사용자 관리
- [ ] Wallet / Balance 서버 관리
- [ ] Transaction Ledger
- [ ] 실시간 Chat / Vote
- [ ] 관리자 페이지

### Phase 3 — Game System

- [ ] 실제 게임 서버
- [ ] 게임 라운드 관리
- [ ] 서버 기반 베팅 검증
- [ ] Banker commission 정산
- [ ] Tie / Pair / Dragon 7 / Panda 8 정산

### Phase 4 — Production

- [ ] 서버 권한 검증
- [ ] Audit Log
- [ ] 부정행위 방지
- [ ] 모니터링 / 장애 복구
- [ ] 운영 환경 테스트
- [ ] 관련 법규 / 라이선스 검토

## Important Notice

이 저장소는 테스트 및 프로토타입 목적으로 제작되었습니다. 현재 화면에서 실제 현금, 실제 포인트, 실제 베팅, 실제 정산은 처리하지 않습니다.

프로덕션 서비스로 사용하려면 Backend, Authentication, Database, Transaction System, Game Server, 보안 시스템 및 관련 규제 검토가 필요합니다.

## Status

**Current Status: `Prototype / Modularized Frontend`**
