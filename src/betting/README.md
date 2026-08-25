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

## Test payout

Banker 승리 시 총 반환액:

- 10P → 19P
- 20P → 39P

현재 실제 잔액 차감/지급은 없습니다.

## Planned files

- `betting-panel.js` — UI
- `betting-rules.js` — 베팅 타입/배당 규칙
- `betting-state.js` — 선택 베팅 상태
- `payout.js` — 테스트 정산 계산

## Modification boundary

바카라 기능 요청은 우선 이 폴더를 확인합니다. Telegram, Live Chat, Profile 코드를 불필요하게 수정하지 않습니다.
