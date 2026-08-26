# Real Money Live Game Web

Telegram Mini App 기반의 Live / Chat / Betting 게임 웹 프로토타입입니다.

## Current Architecture

```text
js/
├── app.js                    # application composition / global coordination
├── domains/
│   ├── live/live.js          # Live domain
│   ├── chat/chat.js          # Chat domain
│   └── betting/betting.js    # Betting domain
├── components/              # reusable UI components
├── pages/                   # page rendering / routing
├── services/                # existing integrations and feature services
└── state.js                 # temporary client-side state
```

`app.js`는 가능한 한 얇은 Composition Root로 유지하고, Live / Chat / Betting의 도메인 동작은 `js/domains/`에서 담당합니다. 기존 `services/`는 호환성과 점진적 마이그레이션을 위해 삭제하지 않습니다.

## Assets

이미지와 기타 정적 미디어는 `assets/images/`에 모읍니다.

```text
assets/
└── images/
    ├── 1.png
    ├── 2.png
    ├── 3.png
    ├── 4.png
    ├── 5.png
    ├── 6.png
    ├── game1.png
    └── game2.jpeg
```

이미지 경로는 `data/games.js` 등에서 `assets/images/...` 기준으로 참조합니다. 새 이미지 파일도 특별한 이유가 없으면 이 디렉터리에 추가합니다.

## Development Rules

- `main` 브랜치를 직접 수정하지 않습니다.
- 작업 전 현재 `main` 기준점과 작업 브랜치를 확인합니다.
- 원본 손상을 방지하기 위해 필요한 부분만 패치합니다.
- 기능 변경과 구조 변경을 가능한 한 분리합니다.
- 기존 `services/`는 특별한 이유 없이 삭제하지 않습니다.
- UI/CSS는 요청이 없는 한 변경하지 않습니다.
- Betting 정산 규칙은 임의로 변경하지 않습니다.
- 실제 금전 관련 로직은 서버를 신뢰 경계로 사용해야 하며 frontend를 source of truth로 만들지 않습니다.
- 이미지 이동 시 파일 이동과 모든 참조 경로 변경을 같은 변경 세트에서 처리합니다.
- 작업 후 `CHANGELOG.md`에 작업 내용을 기록합니다.

## Work Log

상세 작업 인수인계 기록은 [`CHANGELOG.md`](./CHANGELOG.md)에서 관리합니다.
