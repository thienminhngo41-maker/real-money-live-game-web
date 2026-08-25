# Styles

전역 및 기능별 CSS를 관리합니다.

## Modules

- `base.css` — 브라우저 초기화와 디자인 토큰
- `layout.css` — viewport, content spacing, fixed bottom navigation
- `live.css` — Live / Live Room / vote presentation
- `betting.css` — Baccarat betting presentation
- `chat.css` — Live Chat presentation

## Extraction strategy

기존 `index.html`의 inline CSS는 현재 작동 중인 UI를 깨지 않도록 단계적으로 분리합니다.

1. 공통 토큰/레이아웃 모듈 생성
2. Live / Betting / Chat 모듈 생성
3. `index.html`에서 각 모듈을 `<link rel="stylesheet">`로 연결
4. 중복 inline CSS 제거
5. 모바일/Telegram UI 회귀 확인

현재 저장소에는 1~2단계가 완료되어 있습니다. 실제 동작 연결과 inline CSS 제거는 전체 `index.html`을 안전하게 검증할 수 있는 단계에서 수행합니다.

## Rule

시각적 변경 요청이 없는 경우 레이아웃/색상/spacing을 임의 변경하지 않습니다. 모듈 CSS가 연결된 뒤에는 동일 selector의 inline 정의를 새로 추가하지 않습니다.
