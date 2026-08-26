# Platform Architecture — PC Web + Telegram Mini App

## Goal

PC 브라우저와 Telegram Mini App에서 모두 자연스럽게 보이도록 합니다.

## Core rule

**기능 코드는 두 벌로 복제하지 않습니다.**

```text
index.html (Telegram / Mobile)
          │
          ├──────── shared src ────────┐
          │                             │
pc.html (PC Preview)                    │
          │                             │
          └──────── shared styles ──────┘
```

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

- 넓은 화면 활용
- Live stream desktop layout
- Chat / Betting desktop layout
- mouse/keyboard friendly controls
- 동일한 `src/` 기능 로직 사용

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
