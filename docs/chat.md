# Chat

## Responsibilities

Chat domain은 사용자 입력과 Live Room 내 Chat interaction을 조정합니다. 실제 테스트 메시지 구현은 기존 `js/services/chat.js`가 담당합니다.

## Current behavior

- Test users/messages are used for prototype behavior.
- 입력은 현재 client-side flow입니다.
- Live Room lifecycle에 맞춰 Chat을 시작/중지합니다.
- 현재 서버 저장소나 실시간 production message broker와 연결되어 있지 않습니다.

## Flow

```text
Chat input
   │
   ▼
Chat domain
   │
   ▼
services/chat.js
   │
   ▼
prototype UI state/rendering
```

## Production considerations

실제 서비스에서는 인증된 사용자 identity, message persistence, ordering, rate limiting, moderation, blocking/reporting, abuse prevention, reconnect handling이 필요합니다.

특히 client가 sender identity나 moderation 결과를 임의로 결정할 수 없어야 합니다.
