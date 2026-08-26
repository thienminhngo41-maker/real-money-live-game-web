# Styles

전역, 플랫폼별, 기능별 CSS를 관리합니다.

## Modules

- `base.css` — 브라우저 초기화와 디자인 토큰
- `mobile.css` — 모바일 / Telegram Mini App layout
- `desktop.css` — PC Web Preview layout
- `layout.css` — shared viewport, spacing, fixed navigation primitives
- `live.css` — Live / Live Room / vote presentation
- `betting.css` — Baccarat betting presentation
- `chat.css` — Live Chat presentation

## Platform rule

```text
Common
  ├── base.css
  ├── layout.css
  ├── live.css
  ├── betting.css
  └── chat.css

Platform
  ├── mobile.css   → index.html / Telegram
  └── desktop.css  → pc.html / PC Web
```

기능 스타일은 가능한 한 플랫폼 독립적으로 유지합니다. 화면 폭, Bottom Navigation, Safe Area, desktop columns 같은 차이는 플랫폼 stylesheet에서 처리합니다.

## Extraction strategy

기존 `index.html`의 inline CSS는 현재 작동 중인 UI를 깨뜨리지 않도록 단계적으로 분리합니다.

1. 공통 토큰/레이아웃 모듈 생성
2. Live / Betting / Chat 모듈 생성
3. Mobile / Desktop stylesheet 생성
4. `index.html`과 향후 `pc.html`에서 각 모듈을 `<link rel="stylesheet">`로 연결
5. 중복 inline CSS 제거
6. PC / Mobile / Telegram 회귀 확인

현재 저장소에는 모듈 파일과 플랫폼 문서가 준비되어 있으며, 실제 `<link>` 연결 및 inline CSS 제거는 entry point가 확정된 뒤 수행합니다.

## Rule

시각적 변경 요청이 없는 경우 레이아웃/색상/spacing을 임의 변경하지 않습니다. 모듈 CSS가 연결된 뒤에는 동일 selector의 inline 정의를 새로 추가하지 않습니다.
