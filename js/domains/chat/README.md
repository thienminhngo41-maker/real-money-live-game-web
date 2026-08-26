# Chat Domain

## Responsibility

Chat domain은 Live Room의 Chat interaction과 입력 lifecycle을 조정합니다.

## Depends on

- `js/services/chat.js` for current test implementation
- shared prototype state/rendering

## Current status

현재 Chat은 테스트 메시지와 client-side interaction을 사용하는 prototype입니다. 실제 message persistence, authentication, moderation, rate limiting은 구현되어 있지 않습니다.

## Rules

Chat behavior를 수정할 때 `app.js`에 직접 구현을 추가하지 말고 이 domain과 기존 service의 책임을 먼저 확인합니다.

Production에서는 sender identity와 message ordering/moderation을 client가 결정하지 않도록 서버 경계를 추가해야 합니다.
