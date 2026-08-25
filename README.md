# Real Money: Live Game

Telegram Mini App 기반의 **Live Game / Mini Game 테스트용 웹 UI 프로토타입**입니다.

> ⚠️ **현재 프로젝트는 테스트 버전입니다.**
>
> 이 프로젝트는 실제 서비스가 아닌 **UI 및 화면 구성 테스트를 위한 껍데기(Prototype)**만 구현되어 있습니다.
> 실제 현금 거래, 결제, 충전, 출금, 베팅, 게임머니 처리 등의 기능은 구현되어 있지 않습니다.

## 📌 프로젝트 목적

실제 서비스 개발에 앞서 다음과 같은 **프론트엔드 화면과 사용자 흐름을 테스트**하는 것이 목적입니다.

- Telegram Mini App UI
- 사용자 프로필 표시
- 언어 선택 및 다국어 UI
- Live Game 화면
- Mini Game 메뉴
- Cash / 고객센터 메뉴
- 모바일 화면 최적화
- 페이지 이동 및 뒤로가기
- 테스트용 게임 이미지 및 영상 영역

현재는 실제 게임 및 금융 시스템을 연결하지 않고 **전체적인 화면과 UX를 확인하는 단계**입니다.

## 🧪 현재 버전

**Status: Prototype / Test Version**

### 구현된 항목

- [x] Telegram Mini App 기본 연동
- [x] Telegram 사용자 이름 표시
- [x] Telegram 사용자 ID 표시
- [x] Telegram 프로필 이미지 표시
- [x] 한국어 / 中文 / English UI
- [x] 언어 자동 감지
- [x] 메인 메뉴
- [x] Live Game 화면
- [x] Mini Game 화면
- [x] 모바일 반응형 UI
- [x] 페이지 이동
- [x] 뒤로가기
- [x] 테스트용 Popup
- [x] 테스트용 Live Stream 영역
- [x] 테스트용 게임 이미지

### 아직 구현하지 않은 항목

- [ ] 실제 회원 시스템
- [ ] 서버 인증
- [ ] 데이터베이스
- [ ] 실제 포인트 / 잔액 시스템
- [ ] 입금 시스템
- [ ] 출금 시스템
- [ ] 실제 결제 시스템
- [ ] 실제 베팅 시스템
- [ ] 실제 게임 결과 서버
- [ ] 거래 내역
- [ ] 실제 게임머니 처리
- [ ] 관리자 시스템
- [ ] 부정행위 방지 시스템

## 💰 Balance / Cash 안내

현재 화면에 표시되는 **Balance / Point는 UI 테스트를 위한 표시 영역**입니다.

현재 버전에서는 실제 잔액이 존재하지 않으며, 실제 금액이나 게임머니를 충전하거나 출금할 수 없습니다.

`Cash` 메뉴 역시 현재는 테스트 목적의 고객센터 연결 UI입니다.

따라서 현재 버전의 화면에 표시되는 금액 및 관련 정보는 **실제 금융 데이터로 간주해서는 안 됩니다.**

## 🎮 Live Game

Live Game 화면은 테스트 목적으로 외부 Live Stream을 표시하는 구조입니다.

현재는 실제 게임 진행이나 베팅 시스템과 연결되어 있지 않습니다.

Live Game 영역의 게임 기능 및 서버 연동은 향후 별도로 개발할 예정입니다.

## 🕹️ Mini Game

Mini Game 메뉴 역시 현재는 **UI 및 화면 이동 테스트 목적**입니다.

일부 게임은 테스트를 위해 외부 게임 페이지를 연결하고 있으며, 프로젝트 자체에서 게임 결과나 게임머니를 처리하지 않습니다.

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

현재 실제로 제공되는 UI 번역은 한국어, 중국어, 영어입니다.

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

현재 `build` 명령은 실제 애플리케이션 빌드가 아닌 정적 사이트 테스트용 명령입니다.

## 📁 Project Structure

```text
real-money-live-game-web/
│
├── index.html
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
├── 5.png
└── 6.png
```

현재 대부분의 UI 및 JavaScript 로직은 `index.html`에 포함되어 있습니다.

## ⚠️ Important Notice

**이 저장소는 테스트 및 프로토타입 목적으로 제작되었습니다.**

현재 버전은 실제 서비스 운영을 목적으로 하지 않습니다.

특히 다음 기능은 구현되어 있지 않습니다.

- 실제 현금 결제
- 실제 입금 및 출금
- 실제 잔액 관리
- 실제 베팅
- 실제 게임머니
- 실제 금융 거래
- 실제 게임 결과 정산

화면에 표시되는 Balance, Point 등의 값은 **UI 테스트용 데이터**입니다.

프로덕션 서비스로 사용하기 위해서는 별도의 Backend, Authentication, Database, Transaction System, Game Server 및 보안 시스템 구축이 필요합니다.

## 🚧 Development Roadmap

### Phase 1 — Prototype

- [x] UI 제작
- [x] Telegram Mini App 화면
- [x] 다국어
- [x] Live Game UI
- [x] Mini Game UI

### Phase 2 — Backend

- [ ] Backend 구축
- [ ] Telegram 인증 검증
- [ ] Database 연동
- [ ] 사용자 관리
- [ ] 관리자 페이지

### Phase 3 — Game System

- [ ] 실제 게임 서버
- [ ] 게임 세션 관리
- [ ] 게임 결과 처리
- [ ] 서버 기반 데이터 검증

### Phase 4 — Balance System

- [ ] Wallet 구조
- [ ] Transaction Ledger
- [ ] Balance 관리
- [ ] 입출금 처리
- [ ] 거래 내역

### Phase 5 — Production

- [ ] 보안 강화
- [ ] 서버 검증
- [ ] 로그 및 Audit 시스템
- [ ] 부정행위 방지
- [ ] 모니터링
- [ ] 운영 환경 테스트

## 📄 License

현재 프로젝트는 테스트 및 개발 목적으로 사용됩니다.

별도의 라이선스 정책이 확정되기 전까지 프로젝트의 소스 및 리소스를 임의의 상업적 용도로 사용하는 것을 권장하지 않습니다.

## 👨‍💻 Status

**Current Status: `Prototype / Test Version`**

현재 프로젝트는 **실제 서비스가 아닌 UI/UX 및 기능 흐름 테스트용 껍데기 버전**입니다.

Backend 및 실제 서비스 기능은 향후 개발 단계에서 별도로 구현될 예정입니다.
