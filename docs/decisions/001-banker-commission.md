# ADR 001 — Banker Commission

## Decision

바카라 Banker 승리 정산은 5% commission 모델을 기준으로 설계합니다.

예:

- 10P 베팅 → 순이익 9P → 총 반환 19P
- 20P 베팅 → 순이익 19P → 총 반환 39P

## Rationale

사용자가 말한 실제 카지노식 Banker 5% commission 모델을 기준으로 테스트 UX와 향후 서버 정산 규칙을 일치시킵니다.

## Money representation

Point는 소수점을 사용하지 않는 정수 단위로 설계합니다. 실제 운영 단계에서는 서버에서 정수 기반 계산과 원장 기록을 사용해야 합니다.

## Scope

현재는 테스트 모드이며 실제 잔액 차감/지급은 없습니다.
