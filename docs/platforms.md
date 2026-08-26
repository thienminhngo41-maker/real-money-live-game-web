# Platform Architecture — PC Web + Telegram Mini App

## Goal

PC 브라우저와 Telegram Mini App에서 모두 자연스럽게 보이도록 합니다.

## Core rule

**기능 코드는 두 벌로 복제하지 않습니다.**

```text
index.html (Telegram / Mobile)
          │
          ├──────── shared source / feature logic ────────┐
          │                                                │
pc.html (PC Preview) ── loads index.html + desktop.css ───┘
```

`pc.html`은 PC 전용 기능을 복제한 두 번째 앱이 아니라 **동일한 앱을 데스크톱 레이아웃으로 검증하기 위한 Preview entry**입니다. 이를 통해 Live / Betting / Chat의 기능 코드를 두 벌로 유지하는 문제를 피합니다.

## Entry points

### `index.html`

Telegram Mini App / 모바일 우선 진입점입니다.

- Safe Area
- `100dvh`
- Bottom Navigation
- One-hand UX
- Telegram WebApp API
- Live Room floating actions
- Betting Bottom Sheet

Telegram API가 없는 일반 브라우저에서도 개발용 fallback을 유지합니다.

### `pc.html`

PC 브라우저에서 별도의 F12 모바일 에뮬레이션 없이 데스크톱 UI를 확인하기 위한 진입점입니다.

- `index.html`을 동일-origin iframe으로 로드
- iframe 내부에 `styles/desktop.css`를 주입
- 동일한 HTML/JavaScript와 상태 흐름 사용
- 넓은 화면 활용
- Live stream desktop layout
- Chat / Betting desktop layout
- mouse/keyboard friendly controls

이 방식은 현재 프로토타입을 안전하게 검증하기 위한 단계이며, 향후 JavaScript 모듈화가 완료되면 별도 iframe 의존 없이 공통 앱 부트스트랩을 공유하는 구조로 발전시킬 수 있습니다.

## CSS split

```text
styles/
├── base.css       # tokens/reset/common
├── mobile.css     # mobile + Telegram layout
├── desktop.css    # PC layout
├── layout.css     # shared layout primitives
├── live.css       # Live feature
├── betting.css    # Betting feature
└── chat.css       # Chat feature
```

`live.css`, `betting.css`, `chat.css`는 가능한 한 플랫폼에 독립적으로 유지합니다. 플랫폼 차이는 `mobile.css`와 `desktop.css`에서 덮어씁니다.

현재 `index.html`에는 레거시 inline CSS가 남아 있습니다. **inline CSS 완전 제거는 별도의 마이그레이션 단계**에서 진행하며, 기존 화면을 깨뜨리지 않도록 스타일 블록을 기능별 파일로 옮긴 뒤 마지막에 제거합니다.

## Responsive rule

- Mobile: 320–430px 중심
- Tablet: responsive fallback
- Desktop: 768px 이상에서 desktop layout
- Large desktop: 콘텐츠 최대 폭을 제한해 과도한 확대 방지

정확한 breakpoint는 실제 화면을 확인하면서 조정합니다.

## Telegram-specific behavior

Telegram API 호출은 `src/telegram/`에 격리합니다. Live/B​etting 모듈이 Telegram API를 직접 호출하지 않도록 합니다.

## Testing matrix

| Test | PC Browser | Mobile Browser | Telegram Mini App |
|---|---:|---:|---:|
| Home | ✅ | ✅ | ✅ |
| Live | ✅ | ✅ | ✅ |
| Live Room | ✅ | ✅ | ✅ |
| Stream autoplay fallback | ✅ | ✅ | ✅ |
| Chat | ✅ | ✅ | ✅ |
| Betting UI | ✅ | ✅ | ✅ |
| Telegram user/API | fallback | fallback | real |
| Safe Area | N/A | device dependent | required |

## Important

PC와 Telegram에서 동일한 비즈니스 규칙을 사용해야 합니다. 예를 들어 Banker commission, betting limits, test-mode state는 platform별로 다르게 구현하지 않습니다.
