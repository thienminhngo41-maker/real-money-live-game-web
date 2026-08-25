# Shared Module

여러 기능에서 재사용되는 순수 유틸리티와 공통 DOM/검증/포맷 함수를 관리합니다.

## Rules

- 특정 기능의 비즈니스 규칙을 넣지 않습니다.
- Betting 규칙은 `src/betting/`에 둡니다.
- Live 동작은 `src/live/`에 둡니다.
- 의존성이 가능한 한 적은 순수 함수부터 배치합니다.

예정 파일:
- `formatters.js`
- `validators.js`
- `dom.js`
