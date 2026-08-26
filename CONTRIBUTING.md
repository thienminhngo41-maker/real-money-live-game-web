# Contributing

## 기본 원칙

- 기능 단위로 작게 변경합니다.
- 관련 없는 파일을 함께 수정하지 않습니다.
- 기존 사용자 흐름과 모바일 UX를 보존합니다.
- 실제 금전 기능은 Backend 설계와 서버 검증 없이 구현하지 않습니다.
- 테스트 기능에는 `TEST MODE` 경계를 유지합니다.
- `index.html`에 기능 코드를 다시 집중시키지 않습니다.

## 모듈 선택

```text
UI 재사용 컴포넌트  → js/components/
페이지             → js/pages/
외부 연동/서비스    → js/services/
정적 데이터         → data/
공통 상태           → js/state.js
앱 조합             → js/app.js
공통 모바일 CSS     → css/
PC presentation     → styles/desktop.css
```

페이지와 컴포넌트가 직접 Telegram API를 호출하거나 betting/chat 내부 상태를 임의로 소유하지 않도록 합니다. 가능한 경우 service를 통해 접근합니다.

## PC / Mobile

PC와 모바일에 별도 애플리케이션을 만들지 않습니다.

- `index.html`이 유일한 앱 진입점입니다.
- `pc.html`은 `index.html`을 iframe으로 표시합니다.
- PC 전용 차이는 `styles/desktop.css`에서 presentation으로 처리합니다.
- 기능 로직과 데이터는 두 환경에서 공유합니다.

## AI 작업

AI는 `AI_INSTRUCTIONS.md`를 먼저 읽고, 작업 대상 모듈과 `docs/architecture.md`를 확인한 뒤 최소 범위로 수정합니다.

## 문서

파일 책임 또는 architecture가 변경되면 관련 문서를 함께 수정합니다.

- `README.md` — 사용자 관점의 프로젝트 전체 설명
- `docs/architecture.md` — 모듈 관계와 runtime flow
- `AI_INSTRUCTIONS.md` — AI 수정 규칙
- `CONTRIBUTING.md` — 개발 규칙

## Commit

가능하면 하나의 목적을 하나의 커밋으로 만듭니다.

예:

- `feat: improve live chat`
- `fix: banker payout calculation`
- `docs: update architecture`
- `refactor: extract live room module`

## 수정 후 확인

- import 경로가 정상인지 확인합니다.
- 페이지 이동과 Back Button을 확인합니다.
- Live Room / Chat / Betting 흐름을 확인합니다.
- 모바일 safe-area와 하단 navigation을 확인합니다.
- `pc.html`에서 동일한 앱이 로드되는지 확인합니다.
- 새 inline CSS/JS가 생기지 않았는지 확인합니다.
- 실제 금전 처리 코드가 들어가지 않았는지 확인합니다.

## 금지

- 요청 없이 대규모 전체 재작성
- 다른 모듈의 무관한 수정
- secret/API key 커밋
- Git history 강제 변경
- `index.html`에 대규모 CSS/JS 재집중
- `pc.html`에 애플리케이션 로직 복제
