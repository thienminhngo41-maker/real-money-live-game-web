# Betting Domain

## Responsibility

Betting domain은 Betting Sheet와 기존 Betting service 사이의 feature orchestration을 담당합니다.

## Current status

Betting은 TEST MODE입니다. 클라이언트 `state.betAmounts`에 테스트 금액을 저장하고 요약/초기화하는 흐름이며 실제 잔액 차감이나 서버 settlement은 없습니다.

## Depends on

- `data/betting.js` for static test options/chips
- `js/state.js` for prototype state
- `js/services/betting.js` for current calculations/state helpers
- Betting UI component

## Production boundary

실제 운영에서는 bet request만 서버로 전달하고, bet validation, balance, round state, result, payout, settlement은 서버가 authoritative source가 되어야 합니다.

Betting odds나 settlement 규칙을 변경할 때는 UI와 service뿐 아니라 `docs/betting.md`, `README.md`, `CHANGELOG.md`의 동기화 여부를 확인합니다.
