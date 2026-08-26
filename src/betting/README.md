# Betting Module

## Responsibility

Baccarat Betting UI와 테스트 상태/정산 규칙을 관리합니다.

## Betting options

- Player — 1:1
- Banker — 1:1 표시, 5% commission model
- Tie — 8:1
- Player Pair — 11:1
- Banker Pair — 11:1
- Dragon 7 — 40:1
- Panda 8 — 25:1

## Banker payout rule

Banker 승리 시 **베팅금의 5% commission을 제외한 순이익 + 원금**을 총 반환합니다.

Point는 소수점을 사용하지 않으므로 Banker 총 반환액은 정수로 내림합니다.

- 10P 베팅 → commission 0.5P → 소수점 제거 → 순이익 9P → **총 반환 19P**
- 20P 베팅 → commission 1P → 순이익 19P → **총 반환 39P**

구현:

- `betting-rules.js` — 베팅 타입/배당 규칙
- `payout.js` — 정수 기반 테스트 정산 계산

`payout.js`의 `BaccaratPayout.bankerReturn()`이 Banker 정산의 기준 계산식입니다.

## Other test payout

- Player 승리 → 2배 총 반환
- Tie → 9배 총 반환
- Player Pair / Banker Pair → 12배 총 반환
- Dragon 7 → 41배 총 반환
- Panda 8 → 26배 총 반환

## Current scope

현재는 테스트 모드이며 실제 잔액 차감/지급, 서버 정산, 거래 원장 처리는 없습니다.
클라이언트에서 계산된 결과를 실제 금전/포인트의 최종 정산 근거로 사용해서는 안 됩니다.

## Planned integration

현재 `index.html`에 존재하는 테스트 베팅 UI의 인라인 규칙을 이후 `betting-rules.js`와 `payout.js`로 완전히 연결하고, 인라인 바카라 로직을 제거합니다.

- [x] Banker 5% commission 규칙 정의
- [x] 정수 Point 정산 함수 정의
- [x] 베팅 타입/배당 규칙 중앙화
- [ ] Betting UI를 외부 모듈에 연결
- [ ] 실제 서버 정산 API 연결

## Modification boundary

바카라 기능 요청은 우선 이 폴더를 확인합니다. Telegram, Live Chat, Profile 코드를 불필요하게 수정하지 않습니다.
