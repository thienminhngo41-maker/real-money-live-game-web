# AI Development Instructions

이 문서는 이 저장소를 수정하는 AI를 위한 최상위 작업 지침입니다.

## 1. 프로젝트 원칙

- 이 프로젝트는 Telegram Mini App 기반 Live Game / Mini Game 프로토타입입니다.
- 현재 Betting, Balance, Chat, Vote는 테스트 목적입니다.
- 실제 금전 정산이나 잔액 변경을 프론트엔드에서 구현하지 않습니다.
- 사용자가 요청하지 않은 기능을 삭제하거나 동작을 바꾸지 않습니다.
- 기존 모바일 UX, Telegram WebApp 동작, 다국어 구조를 우선 보존합니다.

## 2. 작업 범위 제한

사용자가 특정 기능을 지정하면 해당 모듈과 필요한 공통 파일만 확인/수정합니다.

- Live / Live Room / Stream / Chat / Vote → `src/live/`
- Baccarat Betting → `src/betting/`
- Telegram 사용자 / WebApp → `src/telegram/`
- Profile → `src/profile/`
- Mini Games → `src/mini-games/`
- 공통 상태 / 앱 초기화 → `src/core/`
- 번역 → `src/i18n/`
- 스타일 → `styles/`

작업 전 반드시 해당 폴더의 `README.md`를 먼저 읽습니다.

## 3. 수정 규칙

- 가능하면 한 작업에서 하나의 기능 모듈만 수정합니다.
- 관련 없는 파일을 리팩터링하지 않습니다.
- 기존 URL, 사용자 흐름, 버튼 동작을 임의로 변경하지 않습니다.
- 모바일 safe-area와 한손 조작 UX를 유지합니다.
- 테스트 기능과 실제 운영 기능을 명확히 구분합니다.
- 비밀키, API key, Firebase credential을 코드에 하드코딩하지 않습니다.
- `index.html`을 전체 재작성하는 방식은 피하고 점진적으로 모듈화합니다.

## 4. Betting 규칙

현재 Betting은 TEST MODE입니다.

- Player: 1:1
- Banker: 1:1 표시, 5% commission 정산 모델
- Tie: 8:1
- Player Pair: 11:1
- Banker Pair: 11:1
- Dragon 7: 40:1
- Panda 8: 25:1

Banker 승리 예:

- 10P → 총 19P 반환
- 20P → 총 39P 반환

프론트엔드는 실제 잔액을 차감하거나 지급하지 않습니다. 실제 정산은 향후 서버에서 권한 검증 후 처리합니다.

## 5. Live 규칙

- `https://vdo.ninja/?view=EnemyDriveL`은 Live Room의 두 번째 스트림으로 사용합니다.
- 자동재생은 `autoplay`, `muted`, `playsinline` 및 iframe autoplay 권한을 사용하되 브라우저 정책상 실패할 수 있음을 고려합니다.
- Live Chat의 TestUser01~04는 테스트 데이터입니다.

## 6. README 동기화

기능 동작이나 파일 책임이 변경되면 해당 모듈의 README를 함께 업데이트합니다.

Root `README.md`에는 사용자 관점의 전체 기능/상태를 기록하고, 모듈 README에는 AI가 해당 모듈만 이해하고 수정할 수 있도록 책임, 의존성, 데이터 흐름, 수정 금지 범위를 기록합니다.

## 7. 수정 후 확인

수정 후 다음을 확인합니다.

- 기존 기능이 유지되는가
- JavaScript 오류 가능성이 없는가
- 모바일 레이아웃이 깨지지 않는가
- Telegram WebApp Back Button과 Safe Area가 유지되는가
- 파일 경로와 import가 정확한가
- Netlify 정적 빌드 구조와 충돌하지 않는가
- 실제 금전 기능이 테스트 모드 경계를 넘지 않는가

## 8. 금지 사항

- 요청하지 않은 기능 삭제
- 실제 현금 정산을 클라이언트에서 구현
- 서버 검증 없이 잔액을 신뢰하는 코드 작성
- secret/API key 노출
- 테스트 데이터를 실제 사용자 데이터처럼 취급
- Git history를 임의로 변경
- 모듈 README 없이 큰 기능 변경을 완료했다고 판단
