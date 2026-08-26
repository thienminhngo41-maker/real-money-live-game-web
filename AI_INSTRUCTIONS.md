# AI Development Instructions

이 문서는 이 저장소를 수정하는 AI를 위한 최상위 작업 지침입니다. 모든 변경은 현재 코드와 문서의 실제 상태를 먼저 확인한 뒤 최소 범위로 수행합니다.

## 1. Project state

- 프로젝트는 Telegram Mini App 기반 Live Game / Mini Game 프론트엔드 프로토타입입니다.
- `index.html`은 App Shell입니다.
- `pc.html`은 `index.html`을 iframe으로 보여주는 PC Preview wrapper입니다.
- 모바일과 PC는 동일한 JS/data/components/pages/services를 공유합니다.
- Betting, Balance, Deposit, Withdraw, Chat, Vote는 현재 prototype/test 경계를 가집니다.
- 실제 금전 정산이나 잔액 변경을 프론트엔드에서 구현하지 않습니다.
- 클라이언트 상태를 실제 원장이나 권한의 source of truth로 취급하지 않습니다.

## 2. Before editing

1. `README.md`를 읽습니다.
2. 관련 `docs/` 문서를 읽습니다.
3. 이 파일의 규칙을 확인합니다.
4. 요청과 가장 가까운 모듈을 찾습니다.
5. 직접 의존하는 service/data/state만 추가로 읽습니다.
6. 변경 후 필요한 문서와 changelog를 함께 갱신합니다.

## 3. Work locations

| Responsibility | Location |
|---|---|
| App initialization / global events | `js/app.js` |
| Temporary shared state | `js/state.js` |
| Home / Live / Room / Mini / Profile | `js/pages/` |
| Router | `js/pages/router.js` |
| Topbar / BottomNav / Modal / Betting Sheet | `js/components/` |
| Live domain | `js/domains/live/` |
| Chat domain | `js/domains/chat/` |
| Betting domain | `js/domains/betting/` |
| Telegram API / fallback | `js/services/telegram.js` |
| Test chat implementation | `js/services/chat.js` |
| Test betting implementation | `js/services/betting.js` |
| Game/provider data | `data/games.js` |
| Betting options/chips | `data/betting.js` |
| Translations | `data/i18n.js` |
| Mobile/common CSS | `css/` |
| PC presentation | desktop stylesheet actually referenced by `pc.html` |
| Documentation | `README.md`, `docs/`, this file |

## 4. Module boundaries

- `app.js`는 thin Composition Root로 유지합니다.
- pages는 화면 마크업/페이지 동작을 담당합니다.
- components는 재사용 UI를 담당합니다.
- domains는 feature orchestration을 담당합니다.
- services는 외부 연동 및 기존 feature primitives를 담당합니다.
- data에는 정적 설정/콘텐츠만 둡니다.
- domain 내부 구현을 다른 domain/page/component가 직접 조작하지 않습니다.
- domain 간 결합을 최소화합니다.
- 새 전역 변수나 inline `onclick`을 추가하지 않습니다.
- 기존 `services/`는 특별한 이유 없이 삭제하지 않습니다.

## 5. Entry point rules

`index.html`에는 다음 수준의 내용만 둡니다.

- meta/title
- Telegram SDK
- CSS stylesheet links
- App Shell containers
- `js/app.js` module script

새 화면 로직, 긴 CSS/JS, test state, 함수 정의를 `index.html`에 넣지 않습니다.

`pc.html`에는 앱 로직을 복제하지 않습니다. PC Preview는 `index.html` iframe과 presentation styling만 제공합니다.

## 6. Betting rules

현재 Betting은 TEST MODE입니다.

- Player: 1:1
- Banker: 1:1 표시, 5% commission 모델
- Tie: 8:1
- Player Pair: 11:1
- Banker Pair: 11:1
- Dragon 7: 40:1
- Panda 8: 25:1

현재 클라이언트 `state.betAmounts`는 테스트 상태입니다. 실제 잔액을 차감하거나 실제 payout을 확정하는 코드를 추가하지 않습니다.

실제 운영 전환 시 bet validation, balance reservation/debit, game result, settlement은 서버에서 검증하고 기록해야 합니다.

## 7. Live / Chat rules

- Live Room lifecycle은 `js/domains/live/`가 담당합니다.
- Chat orchestration은 `js/domains/chat/`가 담당하고 기존 `js/services/chat.js`를 유지합니다.
- Live Room의 테스트 stream과 TestUser 데이터는 실제 사용자/실제 방송 데이터로 간주하지 않습니다.
- 외부 stream autoplay는 브라우저 정책상 실패할 수 있습니다.

## 8. Telegram / security

- secret/API key/Firebase credential을 커밋하지 않습니다.
- Telegram `initDataUnsafe` 또는 client-only state를 실제 인증의 근거로 사용하지 않습니다.
- production에서는 Telegram WebApp `initData`를 서버에서 검증해야 합니다.
- balance, transaction, settlement은 client state에 의존하지 않습니다.
- 사용자가 제공하지 않은 실제 credential이나 운영 비밀값을 문서에 예시로 넣지 않습니다.

## 9. Styling rules

- 모바일 기본 스타일은 `css/`에 둡니다.
- 기능별 스타일은 가능한 해당 CSS 파일에 둡니다.
- inline `<style>`을 새로 추가하지 않습니다.
- inline `style="..."`을 새로 추가하지 않습니다.
- 동일 UI를 PC/mobile용으로 복제하지 않습니다.

## 10. Documentation synchronization

다음 변경 시 문서를 함께 수정합니다.

- architecture/directory/dependency 변경 → `docs/architecture.md`
- 개발 workflow/rules 변경 → `docs/development.md` 및 필요 시 이 파일
- 배포 변경 → `docs/deployment.md`
- 인증/금전 trust boundary 변경 → `docs/security.md`
- Betting behavior 변경 → `docs/betting.md`
- Live behavior 변경 → `docs/live-room.md`
- Chat behavior 변경 → `docs/chat.md`
- 사용자에게 보이는 기능/status 변경 → `README.md`
- 모든 작업 완료 → `CHANGELOG.md`

## 11. Verification

수정 후 최소 다음을 확인합니다.

- import 경로와 파일명 대소문자
- `index.html` module loading
- page navigation / Back Button
- Live Room 진입/복귀
- Chat 입력/테스트 메시지
- Betting Sheet open/close
- mobile safe-area
- `pc.html`의 동일 App 사용 여부
- console/module errors
- TEST MODE 경계
- secret/credential 노출 여부

자동 테스트가 추가되기 전까지 브라우저 수동 확인과 `npm run build`를 기본 검증으로 사용합니다.

## 12. Forbidden changes

- 요청하지 않은 기능 삭제
- 실제 현금 정산을 클라이언트에서 구현
- 서버 검증 없이 balance/transaction을 신뢰
- secret/API key 노출
- 테스트 데이터를 실제 사용자 데이터처럼 취급
- `index.html`에 대규모 CSS/JS 추가
- `pc.html`에 앱 로직 복제
- Git history 임의 변경
