# Security Boundary

## Current status

이 저장소는 프론트엔드 프로토타입입니다. 브라우저에 존재하는 값은 신뢰할 수 없다는 전제로 설계합니다.

현재 `state.js`와 Betting service의 상태는 UI/test state이며 실제 금전 원장이 아닙니다.

## Trust boundaries

```text
Telegram / Browser
       │  untrusted client input
       ▼
   Frontend App
       │
       ▼
 Trusted Backend
       │
 ┌─────┼─────────────┐
 ▼     ▼             ▼
Auth  Ledger       Settlement
```

## Telegram authentication

Telegram WebApp에서 전달되는 client-side user information을 인증 근거로 직접 사용하지 않습니다.

프로덕션에서는 서버가 Telegram WebApp `initData`를 검증하고 검증된 사용자 identity를 이후 API 요청의 기준으로 사용해야 합니다.

## Money and balance

프로덕션 balance는 서버 소유 원장이 되어야 합니다.

- 모든 잔액 변경은 서버에서 검증
- 거래마다 감사 가능한 기록 유지
- 중복 요청에 대한 idempotency 처리
- client가 임의로 balance를 설정할 수 없음
- 입금/출금 상태를 서버가 결정

## Betting and settlement

클라이언트는 선택한 betting option과 amount를 서버에 요청할 수 있지만 최종 잔액, 베팅 승인 여부, 게임 결과, payout, settlement status를 결정할 권한이 없어야 합니다.

서버는 사용자 권한, 베팅 한도, 현재 round, 중복 bet, 잔액, 결과 및 settlement을 검증해야 합니다.

## Secrets

다음 값을 repository에 커밋하지 않습니다.

- API keys
- Firebase service credentials
- database credentials
- signing secrets
- private tokens
- production wallet/payment credentials

## Prototype limitations

현재 Balance, Deposit, Withdraw, Betting confirmation, Test Chat, Test Vote는 실제 거래 시스템이 아닙니다.

이 기능들을 production money flow로 연결할 때는 backend API와 server-side authorization을 별도로 구성해야 합니다.
