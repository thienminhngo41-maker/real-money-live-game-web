# Live Room

## Responsibilities

Live domain은 Live 목록에서 Room으로 진입하는 흐름과 room lifecycle을 조정합니다. 실제 화면 마크업은 `js/pages/live.js`와 `js/pages/room.js`가 담당합니다.

## Flow

```text
Live page
   │
   ▼
stream selection
   │
   ▼
Live domain
   │
   ▼
router → live-room
   │
   ├── stream
   ├── chat
   ├── vote
   └── betting entry
```

Room을 나갈 때 domain lifecycle에 맞춰 테스트 Chat을 정리하고 router history를 유지합니다.

## Stream

현재 프로젝트는 외부 stream provider를 사용하는 prototype입니다. 자동재생은 브라우저/Telegram 정책에 따라 실패할 수 있으므로 사용자 interaction 또는 fallback UI를 고려합니다.

현재 AI 개발 규칙에 기록된 두 번째 stream은 `https://vdo.ninja/?view=EnemyDriveL`입니다.

## Chat and vote

Live Room의 Chat과 Vote는 테스트 목적입니다. TestUser 데이터와 테스트 투표 결과를 실제 사용자/운영 데이터로 간주하지 않습니다.

## Betting entry

Room에서 Betting UI를 열 수 있지만 현재 Betting은 TEST MODE입니다. 실제 베팅 승인이나 잔액 변경은 수행하지 않습니다.

## Production considerations

실제 Live Room으로 전환할 경우 stream session, room state, chat moderation, vote integrity, betting round synchronization을 서버/실시간 인프라와 연결해야 합니다.
