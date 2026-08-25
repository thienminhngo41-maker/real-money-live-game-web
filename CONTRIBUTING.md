# Contributing

## 기본 원칙

- 기능 단위로 작게 변경합니다.
- 관련 없는 파일을 함께 수정하지 않습니다.
- 기존 사용자 흐름과 모바일 UX를 보존합니다.
- 기능 변경 시 관련 모듈 README를 갱신합니다.
- 실제 금전 기능은 Backend 설계와 서버 검증 없이 구현하지 않습니다.
- 테스트 기능에는 TEST MODE 경계를 유지합니다.

## AI 작업

AI는 `AI_INSTRUCTIONS.md`를 먼저 읽고, 해당 모듈 README를 확인한 뒤 최소 범위로 수정합니다.

## Commit

가능하면 하나의 목적을 하나의 커밋으로 만듭니다.

예:
- `feat: improve live chat`
- `fix: banker payout calculation`
- `docs: update betting module`
- `refactor: extract live room module`

## 금지

- 요청 없이 대규모 전체 재작성
- 다른 모듈의 무관한 수정
- secret/API key 커밋
- Git history 강제 변경
