# Betting

## Status

Betting은 현재 **TEST MODE**입니다. UI에서 선택/금액/요약을 확인하기 위한 프로토타입이며 실제 잔액이나 현금 정산을 수행하지 않습니다.

## Current odds

| Option | Display odds |
|---|---:|
| Player | 1:1 |
| Banker | 1:1 display, 5% commission model |
| Tie | 8:1 |
| Player Pair | 11:1 |
| Banker Pair | 11:1 |
| Dragon 7 | 40:1 |
| Panda 8 | 25:1 |

Banker 테스트 정산 예시는 문서상 5% commission 모델을 사용합니다.

## Code flow

```text
Betting Sheet
     │
     ▼
Betting domain
     │
     ▼
services/betting.js
     │
     ▼
state.betAmounts
```

`js/services/betting.js`는 현재 금액을 client state에 저장하고 합계를 계산합니다. `confirmBet()`은 현재 선택 내용을 요약한 뒤 테스트 상태를 초기화합니다.

## Production boundary

실제 서비스로 전환할 때 프론트엔드는 bet request를 보내는 역할만 수행해야 합니다. 서버가 다음을 검증하고 기록해야 합니다.

1. 사용자 인증
2. betting 권한
3. 현재 game/round
4. betting option과 amount
5. balance availability
6. duplicate/idempotency
7. round close 상태
8. game result
9. payout/settlement
10. transaction/audit record

클라이언트가 계산한 payout이나 balance를 서버가 그대로 받아들이면 안 됩니다.

## Future API shape

구체적인 endpoint는 backend 설계 시 결정하되 개념적으로는 다음 경계를 유지합니다.

```text
POST /bets
  client → server: game/round, option, amount, request id
  server → client: accepted bet + authoritative state

GET /games/{round}
  server → client: authoritative round/result state

GET /wallet
  server → client: authoritative balance/ledger summary
```

위 endpoint는 현재 구현되어 있지 않은 예시이며, 이 문서가 실제 API 계약을 의미하지 않습니다.
