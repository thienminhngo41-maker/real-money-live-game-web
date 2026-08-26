# Real Money: Live Game

> **Prototype / Test Version** — Telegram Mini App + PC Web Preview

이 저장소는 Live Game / Mini Game 서비스의 **UI/UX 및 상태 흐름을 검증하는 테스트용 웹 프로토타입**입니다.

현재 실제 현금 거래, 결제, 충전, 출금, 실제 베팅 정산은 연결되어 있지 않습니다.

## 빠른 문서 안내

README를 하나의 거대한 문서로 유지하지 않고 주제별 문서로 나눕니다.

| 문서 | 내용 |
|---|---|
| [`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md) | AI가 코드를 수정할 때 지켜야 할 최상위 규칙 |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | 사람/AI 공통 개발 규칙 |
| [`CHANGELOG.md`](CHANGELOG.md) | 프로젝트 변경 이력 |
| [`docs/architecture.md`](docs/architecture.md) | 전체 아키텍처와 모듈 관계 |
| [`docs/platforms.md`](docs/platforms.md) | PC Web과 Telegram Mini App의 차이/공통 구조 |
| [`docs/development.md`](docs/development.md) | 기능 수정 및 리팩터링 절차 |
| [`docs/deployment.md`](docs/deployment.md) | Netlify/GitHub Pages 배포 정책 |
| [`docs/decisions/`](docs/decisions/) | 중요한 제품/기술 결정 기록 |

각 기능 폴더의 `README.md`는 **그 모듈만 확인하고 수정할 수 있도록** 책임과 경계를 설명합니다.

## 🖥️ 플랫폼 구조

코드를 PC용과 Telegram용으로 두 벌 복제하지 않습니다.

```text
                 Shared App
                      │
          ┌───────────┴───────────┐
          │                       │
      PC Web Preview        Telegram Mini App
        pc.html                 index.html
          │                       │
          └───────────┬───────────┘
                      │
              shared src / styles
                      │
        ┌─────────────┼─────────────┐
        │             │             │
      Live         Betting        Chat
```

- `index.html` — Telegram Mini App / 모바일 우선 진입점
- `pc.html` — 동일한 `index.html`을 PC 레이아웃으로 확인하는 Preview 진입점
- `src/` — 실제 기능 로직은 두 환경이 공유
- `styles/mobile.css` — 모바일/Telegram 레이아웃
- `styles/desktop.css` — PC 레이아웃
- `styles/live.css`, `betting.css`, `chat.css` — 기능 공통 스타일

PC에서는 더 이상 F12 모바일 에뮬레이션만 의존하지 않고 `pc.html`로 데스크톱 UI를 직접 확인합니다. F12는 추가적인 반응형 검증용으로 사용합니다.

## 📱 Telegram Mini App

Telegram 환경에서는 모바일 한손 조작을 최우선으로 합니다.

- Safe Area 대응
- `100dvh` 기반 viewport
- 하단 고정 Navigation
- Live Room 원형 Floating Action
- Betting Bottom Sheet
- Chat 입력/전송 UX
- Telegram WebApp API / Back Button
- 스트리밍 inline/autoplay 요청

Telegram API가 없는 일반 브라우저에서도 개발 화면이 깨지지 않도록 fallback을 유지합니다.

## 🖥️ PC Web Preview

`pc.html`을 열면 별도의 F12 모바일 에뮬레이션 없이 PC 화면을 확인할 수 있습니다.

- 동일한 `index.html`을 재사용
- PC 전용 `desktop.css`를 Preview iframe에 적용
- 고정된 모바일 폭을 PC에 억지로 확대하지 않음
- Live 스트림을 넓은 화면에 맞게 배치
- Chat / Betting 영역의 데스크톱 사용성 개선
- 동일한 Live / Betting / Chat 로직 공유

## 🎥 Live Room

Live Game의 스트리밍을 선택하면 Live Room으로 진입합니다.

```text
Profile / Name / ID / Balance / Deposit / Withdraw
                    ↓
               Live Stream 1
                    ↓
       Live Stream 2 (EnemyDriveL)
                    ↓
          Player / Banker Test Vote
                    ↓
                Live Chat
                    ↓
          Betting / Chat Actions
```

두 번째 테스트 스트림:

`https://vdo.ninja/?view=EnemyDriveL`

자동재생은 브라우저 정책상 항상 보장되지 않으므로 `autoplay`, `muted`, `playsinline` 및 사용자 재생 fallback을 함께 고려합니다.

### Test Vote

Player / Banker 영역은 현재 실제 투표 서버가 아니라 테스트용 랜덤 상태입니다.

### Test Chat

다음 테스트 닉네임이 랜덤 간격으로 `test` 메시지를 생성합니다.

- TestUser01
- TestUser02
- TestUser03
- TestUser04

실제 Backend 채팅이 아니며 브라우저 세션 안에서만 동작합니다.

## 💰 Baccarat Betting — Test Mode

현재 Betting은 실제 금전 베팅이 아닌 UI/상태 흐름 검증용입니다.

| 베팅 | 표시 배당 |
|---|---:|
| Player | 1:1 |
| Banker | 1:1 |
| Tie | 8:1 |
| Player Pair | 11:1 |
| Banker Pair | 11:1 |
| Dragon 7 | 40:1 |
| Panda 8 | 25:1 |

Dragon 7 / Panda 8은 사이드 베팅입니다.

### Chips

`1 / 5 / 10 / 50 / 100 / 1000`

칩 선택, 베팅 누적, 직접 금액 입력, `MAX`, 확인 팝업 및 확인 후 패널 닫기를 지원합니다.

### Banker 5% Commission Test Rule

사용자가 지정한 카지노식 Banker 5% 커미션 모델을 기준으로 합니다.

```text
10P → 총 반환 19P
20P → 총 반환 39P
```

현재 실제 잔액 차감/지급은 없습니다. 상세 결정은 [`docs/decisions/001-banker-commission.md`](docs/decisions/001-banker-commission.md)를 참고합니다.

## 💳 Balance / Cash

Balance / Point, 충전, 출금은 현재 UI 테스트 영역입니다.

실제 운영에서는 서버가 잔액과 거래 원장을 관리하고 클라이언트가 잔액이나 베팅 결과를 결정하지 않도록 해야 합니다.

## 🕹️ Mini Games

Mini Game 메뉴는 UI 및 화면 이동 테스트 목적입니다. 프로젝트 자체에서 실제 게임머니나 결과를 처리하지 않습니다.

## 🌐 Languages

현재 UI:

- 한국어 `ko`
- 中文 `cn`
- English `en`

추가 예정:

- 日本語 `ja`
- Español `es`
- Русский `ru`
- Français `fr`
- Deutsch `de`
- Português `pt`

## 🛠️ Tech Stack

- HTML5
- CSS
- JavaScript
- Telegram Mini Apps
- Tailwind CSS CDN (현재 레거시/프로토타입 의존성)
- Netlify
- GitHub Pages / PC Preview

정적 웹사이트 구조를 유지하며, 복잡한 빌드 시스템에 의존하지 않는 것을 현재 원칙으로 합니다.

## 📁 Project Structure

```text
real-money-live-game-web/
│
├── index.html                 # Telegram / Mobile entry
├── pc.html                    # PC Web Preview entry
├── README.md                  # Project overview
├── AI_INSTRUCTIONS.md         # AI development rules
├── CONTRIBUTING.md            # Contribution rules
├── CHANGELOG.md               # Change history
│
├── docs/
│   ├── architecture.md
│   ├── platforms.md
│   ├── development.md
│   ├── deployment.md
│   └── decisions/
│
├── src/
│   ├── core/
│   ├── shared/
│   ├── live/
│   ├── betting/
│   ├── telegram/
│   ├── profile/
│   ├── mini-games/
│   └── i18n/
│
├── styles/
│   ├── base.css
│   ├── mobile.css
│   ├── desktop.css
│   ├── layout.css
│   ├── live.css
│   ├── betting.css
│   └── chat.css
│
└── assets/
```

모듈별 책임은 각 폴더의 `README.md`에서 관리합니다.

## 🚧 Roadmap

### Phase 1 — UI Prototype

- [x] Telegram Mini App UI
- [x] PC Web Preview entry
- [x] PC/Mobile platform architecture documented
- [x] 다국어
- [x] Live Game / Live Room
- [x] Test Chat / Test Vote
- [x] Test Baccarat Betting UI
- [x] Banker 5% commission rule documented
- [x] Mobile / Desktop stylesheet foundation
- [ ] Inline CSS 완전 제거 및 external CSS 적용
- [ ] Live JavaScript 모듈화
- [ ] Betting JavaScript 모듈화

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

## ⚠️ Important Notice

이 저장소는 테스트 및 프로토타입 목적으로 제작되었습니다. 현재 화면에서 실제 현금, 실제 포인트, 실제 베팅, 실제 정산은 처리하지 않습니다.

프로덕션 서비스로 사용하기 위해서는 Backend, Authentication, Database, Transaction System, Game Server, 보안 시스템 및 관련 규제 검토가 필요합니다.

## 📄 License

현재 프로젝트는 테스트 및 개발 목적으로 사용됩니다. 별도의 라이선스 정책이 확정되기 전까지 소스 및 리소스를 임의의 상업적 용도로 사용하는 것을 권장하지 않습니다.

## Status

**Current Status: `Prototype / Test Version`**
