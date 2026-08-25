# Real Money: Live Game

Telegram Mini App 기반의 **Live Game / Mini Game 테스트용 웹 UI 프로토타입**입니다.

> ⚠️ **현재 프로젝트는 테스트 버전입니다.**
>
> 실제 현금 거래, 결제, 충전, 출금, 실제 베팅 정산은 아직 연결되어 있지 않습니다. 현재의 Live Room, 투표, 채팅, 베팅 기능은 UI/UX와 상태 흐름을 검증하기 위한 테스트 모드입니다.

## 📌 프로젝트 목적

실제 서비스 개발에 앞서 다음과 같은 프론트엔드 화면과 사용자 흐름을 테스트합니다.

- Telegram Mini App UI
- Telegram 사용자 프로필 표시
- 한국어 / 中文 / English UI
- Live Game / Live Room
- 외부 Live Stream 표시
- 테스트용 Player / Banker 투표
- 테스트용 Live Chat
- 테스트용 Baccarat Betting UI
- Mini Game 메뉴
- 모바일 한손 조작 UX
- Telegram Back Button
- Netlify 정적 배포

## 🧪 현재 버전

**Status: Prototype / Test Version**

### 구현 / 테스트 대상

- [x] Telegram Mini App 기본 연동
- [x] Telegram 사용자 이름 / ID / 프로필 이미지
- [x] 한국어 / 中文 / English UI
- [x] 언어 자동 감지
- [x] Home / Live / Mini Game / Profile
- [x] Live Game 스트리밍 영역
- [x] Live Room 구조
- [x] Live Room 두 번째 스트림 `https://vdo.ninja/?view=EnemyDriveL`
- [x] 모바일 Live Stream 자동재생 요청 및 inline 재생 설정
- [x] Player / Banker 테스트 투표 비율
- [x] 테스트 Live Chat
- [x] 4개 테스트 닉네임 자동 `test` 메시지
- [x] 우측 하단 원형 Chat 액션 버튼
- [x] 우측 하단 원형 Betting 액션 버튼
- [x] Bottom Sheet 방식 Betting Panel
- [x] Player / Banker / Tie
- [x] Player Pair / Banker Pair
- [x] Dragon 7 / Panda 8 사이드 베팅
- [x] 칩 `1 / 5 / 10 / 50 / 100 / 1000`
- [x] 직접 금액 입력
- [x] MAX 버튼
- [x] 베팅 누적 및 총액 표시
- [x] 베팅 확인 팝업
- [x] 확인 후 Betting Panel 닫기

## 🎰 Live Room

Live Game의 스트리밍을 선택하면 Live Room으로 진입합니다.

```text
Topbar: Profile / Name / ID / Balance / Deposit / Withdraw
        ↓
Live Stream 1
        ↓
Live Stream 2 (EnemyDriveL)
        ↓
Player / Banker test vote
        ↓
Live Chat
        ↓
Floating Betting / Chat buttons
```

### Test Vote

현재 Player / Banker 영역은 실제 투표 서버가 아니라 테스트용 랜덤 상태입니다. Live Room 진입 시 테스트 비율을 생성하며 실제 베팅 결과와 연결되지 않습니다.

### Test Chat

다음 테스트 닉네임이 랜덤 간격으로 `test` 메시지를 생성합니다.

- TestUser01
- TestUser02
- TestUser03
- TestUser04

실제 Backend 채팅이 아니며 브라우저 세션 안에서만 동작합니다.

## 💰 Baccarat Betting Test Mode

현재 Betting Panel은 **실제 금전 베팅이 아닌 테스트 UI**입니다.

### Betting options

| 베팅 | 표시 배당 |
|---|---:|
| Player | 1:1 |
| Banker | 1:1 |
| Tie | 8:1 |
| Player Pair | 11:1 |
| Banker Pair | 11:1 |
| Dragon 7 | 40:1 |
| Panda 8 | 25:1 |

Dragon 7과 Panda 8은 사이드 베팅으로 구분합니다.

### Chips

```text
1 / 5 / 10 / 50 / 100 / 1000
```

칩을 선택한 뒤 베팅 영역을 눌러 금액을 올립니다. 같은 베팅 영역을 여러 번 선택하면 금액이 누적됩니다. 직접 금액 입력과 `MAX`도 지원합니다.

### Banker payout / commission rule

실제 카지노식 Banker 5% 커미션 방식의 테스트 정산을 사용합니다.

사용자가 **10P를 Banker에 베팅하고 Banker가 승리하면 총 반환액은 19P**입니다.

```text
10P 베팅
→ 원금 10P + 순이익 9P
→ 총 반환 19P

20P 베팅
→ 원금 20P + 순이익 19P
→ 총 반환 39P
```

즉 Banker 승리 시 순이익은 베팅액의 95%이며, 반환액은 **베팅 원금 + 95% 순이익**입니다. 실제 운영 Backend에서는 금액을 floating point로 계산하지 않고 정수 기반으로 검증/정산해야 합니다.

소수점이 없는 Point 시스템을 유지하기 위해 실제 운영 단계에서는 Banker 베팅 금액의 최소 단위를 5P로 제한하는 방식을 권장합니다. 그러면 5% 커미션 적용 후에도 정산액이 항상 정수가 됩니다.

> **중요:** 현재 `index.html`의 Betting Test Mode는 실제 잔액을 차감하거나 실제 지급을 수행하지 않습니다. 위 규칙은 향후 Backend 정산 로직의 명세로 사용합니다.

### Tie 처리 기준

향후 실제 게임 서버를 연결할 때 일반적인 바카라 규칙을 기준으로 Player / Banker 베팅은 Tie 결과에서 Push(원금 반환), Tie 베팅은 해당 배당으로 정산하는 구조를 사용합니다. 실제 서비스 적용 전에는 최종 게임 규칙과 라이선스/규제 요구사항을 확정해야 합니다.

## 🧩 Betting UI UX

- 한 손 조작을 고려한 하단 Bottom Sheet
- 오른손 엄지 접근성을 고려한 우측 하단 원형 Betting 버튼
- 우측 하단 Chat 버튼을 이용한 메시지 전송
- 선택 칩 표시
- 선택 베팅 및 총액 표시
- 직접 입력 / MAX
- 확인 팝업
- 확인 완료 후 Betting Panel 자동 닫힘
- 모바일 safe-area 대응

## 💳 Balance / Cash 안내

현재 화면의 Balance / Point는 UI 테스트 영역입니다. 실제 잔액, 충전, 출금, 결제, 베팅 원장 및 금융 거래는 구현되어 있지 않습니다.

프로덕션에서는 서버에서 잔액과 거래 원장을 관리하고, 클라이언트가 임의로 잔액이나 베팅 결과를 결정하지 못하도록 해야 합니다.

## 🕹️ Mini Game

Mini Game 메뉴는 UI 및 화면 이동 테스트 목적입니다. 일부 게임은 외부 테스트 페이지로 연결되며 프로젝트 자체에서 실제 게임머니나 결과를 처리하지 않습니다.

## 🌐 Supported Languages

| Language | Code | Status |
|---|---|---|
| 한국어 | `ko` | ✅ |
| 中文 | `cn` | ✅ |
| English | `en` | ✅ |
| 日本語 | `ja` | 🚧 |
| Español | `es` | 🚧 |
| Русский | `ru` | 🚧 |
| Français | `fr` | 🚧 |
| Deutsch | `de` | 🚧 |
| Português | `pt` | 🚧 |

## 🛠️ Tech Stack

- HTML5
- CSS
- JavaScript
- Tailwind CSS CDN
- Telegram Mini Apps
- Firebase dependency 준비
- Netlify

현재 프로젝트는 별도의 복잡한 빌드 과정 없이 정적 웹사이트 형태로 구성되어 있습니다.

```bash
npm install
npm run build
```

## 📁 Project Structure

```text
real-money-live-game-web/
│
├── index.html
├── README.md
├── netlify.toml
├── package.json
├── package-lock.json
├── .gitignore
│
├── game1.png
├── game2.jpeg
├── 1.png
├── 2.png
├── 3.png
├── 4.png
└── 5.png / 6.png
```

향후 Betting 이미지가 추가되면 다음 규칙을 사용합니다.

```text
bet-player.png
bet-tie.png
bet-banker.png
bet-player-pair.png
bet-banker-pair.png
bet-dragon7.png
bet-panda8.png
chip-1.png
chip-5.png
chip-10.png
chip-50.png
chip-100.png
chip-1000.png
```

현재 대부분의 UI 및 JavaScript 로직은 `index.html`에 포함되어 있습니다.

## 🚧 Development Roadmap

### Phase 1 — UI Prototype

- [x] Telegram Mini App UI
- [x] 다국어
- [x] Live Game
- [x] Live Room
- [x] Test Chat
- [x] Test Vote
- [x] Test Baccarat Betting UI
- [x] Banker 5% commission payout rule documented

### Phase 2 — Backend

- [ ] Backend 구축
- [ ] Telegram 인증 검증
- [ ] Database 연동
- [ ] 사용자 관리
- [ ] Wallet / Balance 서버 관리
- [ ] Transaction Ledger
- [ ] 실시간 Chat
- [ ] 실시간 Vote
- [ ] 관리자 페이지

### Phase 3 — Game System

- [ ] 실제 게임 서버
- [ ] 게임 라운드 관리
- [ ] 게임 결과 검증
- [ ] 서버 기반 베팅 검증
- [ ] Banker commission 정산
- [ ] Tie / Pair / Dragon 7 / Panda 8 정산

### Phase 4 — Production

- [ ] 서버 권한 검증
- [ ] Audit Log
- [ ] 부정행위 방지
- [ ] 모니터링
- [ ] 장애 복구
- [ ] 운영 환경 테스트
- [ ] 관련 법규 / 라이선스 검토

## ⚠️ Important Notice

이 저장소는 테스트 및 프로토타입 목적으로 제작되었습니다. 현재 화면에서 실제 현금, 실제 포인트, 실제 베팅, 실제 정산은 처리하지 않습니다.

프로덕션 서비스로 사용하기 위해서는 별도의 Backend, Authentication, Database, Transaction System, Game Server, 보안 시스템 및 관련 규제 검토가 필요합니다.

## 📄 License

현재 프로젝트는 테스트 및 개발 목적으로 사용됩니다.

별도의 라이선스 정책이 확정되기 전까지 프로젝트의 소스 및 리소스를 임의의 상업적 용도로 사용하는 것을 권장하지 않습니다.

## 👨‍💻 Status

**Current Status: `Prototype / Test Version`**

Backend 및 실제 서비스 기능은 향후 개발 단계에서 별도로 구현될 예정입니다.
