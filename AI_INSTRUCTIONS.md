# AI Development Instructions

이 문서는 이 저장소를 수정하는 AI를 위한 최상위 작업 지침입니다.

## 1. 프로젝트 원칙

- 이 프로젝트는 Telegram Mini App 기반 Live Game / Mini Game 프로토타입입니다.
- `index.html`은 App Shell이며 애플리케이션 로직을 직접 담지 않습니다.
- `pc.html`은 동일한 `index.html`을 보여주는 PC Preview wrapper입니다.
- 모바일과 PC는 같은 JS/data/components/pages/services 모듈을 공유합니다.
- 현재 Betting, Balance, Chat, Vote는 테스트 목적입니다.
- 실제 금전 정산이나 잔액 변경을 프론트엔드에서 구현하지 않습니다.
- 사용자가 요청하지 않은 기능을 삭제하거나 동작을 바꾸지 않습니다.

## 2. 작업 위치

기능을 수정할 때 먼저 책임에 맞는 모듈을 찾습니다.

| 작업 | 위치 |
|---|---|
| 앱 초기화 / 전역 이벤트 | `js/app.js` |
| 임시 전역 상태 | `js/state.js` |
| Home / Live / Room / Mini / Profile 화면 | `js/pages/` |
| Topbar / BottomNav / Modal / Betting Sheet | `js/components/` |
| Telegram API | `js/services/telegram.js` |
| Chat | `js/services/chat.js` |
| Betting 계산/상태 | `js/services/betting.js` |
| 게임/공급자 데이터 | `data/games.js` |
| 배팅 옵션/칩 데이터 | `data/betting.js` |
| 번역 | `data/i18n.js` |
| 공통 CSS | `css/` |
| PC 전용 presentation | `styles/desktop.css` |
| 문서 | `README.md`, `docs/` |

## 3. 모듈 경계

- `pages/`는 페이지 마크업을 생성하고 페이지별 동작에 집중합니다.
- `components/`는 여러 페이지에서 재사용되는 UI를 담당합니다.
- `services/`는 외부 API, 시뮬레이션, 기능 로직을 담당합니다.
- `data/`에는 정적 설정/콘텐츠만 둡니다.
- `app.js`는 모듈을 조합하는 얇은 composition root로 유지합니다.
- 한 파일이 다른 모듈의 내부 구현을 직접 조작하지 않도록 합니다.
- 새 전역 변수나 inline `onclick`을 추가하지 않습니다. 기존 이벤트 위임 방식을 우선합니다.

## 4. Entry Point 규칙

`index.html`에는 다음만 허용합니다.

- meta/title
- 외부 플랫폼 SDK 로드
- CSS stylesheet 연결
- App Shell container
- `js/app.js` module 로드

새로운 화면 로직, 테스트 데이터, 긴 CSS, 함수 정의를 `index.html`에 추가하지 않습니다.

`pc.html`에는 애플리케이션 로직을 복제하지 않습니다. PC Preview는 `index.html` iframe + `styles/desktop.css`만 사용합니다.

## 5. Styling 규칙

- 모바일 기본 스타일은 `css/`에 둡니다.
- 기능별 스타일은 가능한 한 기능 CSS 파일에 둡니다.
- PC 전용 presentation은 `styles/desktop.css`에 둡니다.
- 동일한 UI를 PC와 모바일용으로 복제하지 않습니다.
- inline `<style>`은 추가하지 않습니다.
- inline `style="..."`은 새로 추가하지 않습니다.

## 6. Betting 규칙

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

## 7. Live 규칙

- `https://vdo.ninja/?view=EnemyDriveL`은 Live Room의 두 번째 스트림으로 사용합니다.
- 자동재생은 브라우저 정책상 실패할 수 있음을 고려합니다.
- Live Chat의 TestUser01~04는 테스트 데이터입니다.

## 8. 보안

- secret/API key/Firebase credential을 커밋하지 않습니다.
- Telegram `initDataUnsafe`를 실제 인증의 근거로 사용하지 않습니다. 프로덕션에서는 서버 검증이 필요합니다.
- 클라이언트 상태를 잔액/거래/정산의 신뢰 가능한 원장으로 취급하지 않습니다.

## 9. README / 문서 동기화

파일 책임이나 architecture가 변경되면 `README.md`와 관련 `docs/` 문서를 함께 갱신합니다.

특히 다음 구조가 바뀌면 `docs/architecture.md`를 업데이트합니다.

- `js/pages/`
- `js/components/`
- `js/services/`
- `data/`
- `css/`
- `pc.html`

## 10. 수정 후 확인

수정 후 최소한 다음을 확인합니다.

- import 경로가 정확한가
- 파일명 대소문자가 정확한가
- `index.html`에서 module script가 로드되는가
- 페이지 navigation / Back Button이 유지되는가
- Live Room 진입/복귀가 유지되는가
- Betting Sheet가 열리고 닫히는가
- Chat 입력/테스트 메시지가 동작하는가
- 모바일 safe-area가 유지되는가
- `pc.html`이 동일한 `index.html`을 사용하는가
- PC CSS가 iframe에 적용되는가
- 실제 금전 기능이 TEST MODE 경계를 넘지 않는가

## 11. 금지 사항

- 요청하지 않은 기능 삭제
- 실제 현금 정산을 클라이언트에서 구현
- 서버 검증 없이 잔액을 신뢰하는 코드 작성
- secret/API key 노출
- 테스트 데이터를 실제 사용자 데이터처럼 취급
- `index.html`에 다시 대규모 CSS/JS를 넣는 것
- `pc.html`에 앱 로직을 복제하는 것
- Git history를 임의로 변경
