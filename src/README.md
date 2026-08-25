# Source Modules

기능별 소스 모듈을 관리합니다.

- `core/` — 앱 초기화와 공통 상태
- `live/` — Live Game / Room / Stream / Chat / Vote
- `betting/` — Baccarat Betting
- `telegram/` — Telegram WebApp
- `profile/` — Profile
- `mini-games/` — Mini Games
- `i18n/` — 번역

현재 레거시 구현은 `index.html`에 남아 있으며, 기능별로 안전하게 이동하는 점진적 모듈화를 원칙으로 합니다.
