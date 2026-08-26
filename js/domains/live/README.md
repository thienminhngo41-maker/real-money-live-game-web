# Live Domain

## Responsibility

`live.js`는 Live 목록에서 Live Room으로 이어지는 feature lifecycle과 room state 변경을 조정합니다.

## Depends on

- Live page/router
- existing Chat lifecycle functions
- Live Room state

## Does not own

- page markup → `js/pages/`
- reusable UI → `js/components/`
- Chat implementation → `js/domains/chat/` + `js/services/chat.js`
- Betting implementation → `js/domains/betting/`

## Rules

Live-specific orchestration은 이 domain에 두고 `app.js`에 다시 구현하지 않습니다. 실제 stream provider나 production realtime state가 추가될 때도 client를 authority로 만들지 않습니다.
