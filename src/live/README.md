# Live Module

## Responsibility

Live Game, Live Room, external streams, test vote and test chat를 관리합니다.

## Streams

- Live Room second stream: `https://vdo.ninja/?view=EnemyDriveL`
- Existing stream URLs should not be changed without an explicit request.

## Test vote

Player / Banker 비율은 현재 테스트용 랜덤 상태입니다. 실제 투표 서버와 연결되어 있지 않습니다.

## Test chat

TestUser01~04가 랜덤 간격으로 `test` 메시지를 생성합니다. 실제 Backend chat이 아닙니다.

## UX

- Mobile-first
- One-hand operation
- Telegram Back Button
- Safe-area support
- Live Room floating actions

## Modification boundary

Live 관련 요청은 우선 이 폴더를 확인합니다. Betting 정산 규칙은 `src/betting/`에서 관리합니다.
