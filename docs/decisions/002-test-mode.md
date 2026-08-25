# ADR 002 — Test Mode Boundary

## Decision

현재 Live Vote, Live Chat, Betting은 Prototype / TEST MODE로 유지합니다.

## Rules

- 테스트 봇/랜덤 데이터는 실제 사용자 데이터로 취급하지 않습니다.
- 프론트엔드에서 실제 잔액을 신뢰하거나 변경하지 않습니다.
- 실제 정산은 향후 서버에서 검증합니다.
- UI에 실제 서비스처럼 오인될 수 있는 테스트 상태는 명확히 구분합니다.

## Rationale

현재는 UI/UX와 기능 흐름을 검증하는 단계이며 Backend가 완성되기 전 실제 금융 상태와 결합하면 데이터 무결성과 보안 문제가 발생할 수 있습니다.
