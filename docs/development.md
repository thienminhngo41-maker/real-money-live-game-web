# Development Workflow

이 문서는 현재 저장소 구조를 기준으로 기능을 수정하고 검증하는 방법을 정의합니다.

## 1. Before changing code

1. `AI_INSTRUCTIONS.md`를 읽습니다.
2. `README.md`와 관련 `docs/` 문서를 확인합니다.
3. 변경 책임이 있는 가장 작은 모듈을 찾습니다.
4. 해당 모듈과 직접 연결된 service/data/state만 먼저 읽습니다.
5. 변경 목적과 영향 범위를 정합니다.

## 2. Module-first rule

| Request | Start here |
|---|---|
| 앱 초기화 / 전역 이벤트 | `js/app.js` |
| 페이지 / navigation | `js/pages/` |
| 재사용 UI | `js/components/` |
| Live Room lifecycle | `js/domains/live/` |
| Chat interaction | `js/domains/chat/` |
| Betting interaction | `js/domains/betting/` |
| Telegram | `js/services/telegram.js` |
| 테스트 Chat 구현 | `js/services/chat.js` |
| 테스트 Betting 구현 | `js/services/betting.js` |
| 게임 목록/공급자 | `data/games.js` |
| Betting 옵션/칩 | `data/betting.js` |
| 번역 | `data/i18n.js` |
| 모바일 CSS | `css/` |
| PC presentation | `styles/` 또는 실제 참조되는 desktop CSS |

예: Banker payout을 수정한다면 `app.js`부터 건드리지 말고 Betting service/domain과 관련 데이터를 먼저 확인합니다.

## 3. Architecture rules

- `app.js`는 Composition Root로 유지합니다.
- domain의 내부 구현을 page/component에서 직접 호출하지 않습니다.
- domain 간 결합은 최소화하고 애플리케이션 경계에서 조정합니다.
- 새 전역 변수를 만들지 않습니다.
- 새 inline `onclick`을 만들지 않고 기존 event delegation을 우선합니다.
- 정적 데이터는 `data/`에 둡니다.
- 재사용 UI는 `components/`, 화면별 마크업은 `pages/`에 둡니다.
- 기존 `services/`는 호환성 때문에 유지되므로 특별한 이유 없이 삭제하지 않습니다.
- `index.html`에 애플리케이션 로직이나 대규모 CSS/JS를 넣지 않습니다.
- `pc.html`에 앱 로직을 복제하지 않습니다.

## 4. Test-mode boundary

현재 Betting, Balance, Deposit, Withdraw, Chat, Vote는 프로토타입/테스트 경계를 가집니다.

특히 다음을 프론트엔드에서 실제 기능으로 구현하지 않습니다.

- 실제 잔액 차감/지급
- 실제 거래 원장
- 최종 베팅 정산
- 인증 권한 판정

실제 금전 기능은 서버가 source of truth가 되어야 합니다.

## 5. Validation after changes

자동 테스트 프레임워크가 현재 저장소에 정의되어 있지 않으므로, 변경 후 최소한 다음을 수동 확인합니다.

### Static checks

```bash
npm install
npm run build
```

### Browser checks

- `/`에서 App Shell이 정상 로드되는가
- 페이지 navigation과 Back Button이 유지되는가
- Live 목록 → Live Room 진입/복귀가 되는가
- Chat 입력/테스트 메시지가 동작하는가
- Betting Sheet가 열리고 닫히는가
- 베팅 금액 표시와 테스트 상태 초기화가 정상인가
- 모바일 safe-area가 유지되는가
- `pc.html`이 동일한 `index.html`을 표시하는가
- ES Module import 경로와 파일명 대소문자가 정확한가

### Security checks

- secret/API key/Firebase credential이 추가되지 않았는가
- client state가 실제 금전의 source of truth로 사용되지 않는가
- Telegram client data를 인증 근거로 사용하지 않는가

## 6. Documentation sync

다음 변경은 문서도 함께 갱신합니다.

- module 책임 변경 → 해당 module README
- 디렉터리/의존성 변경 → `docs/architecture.md`
- 개발 규칙 변경 → `AI_INSTRUCTIONS.md`, `docs/development.md`
- 사용자 기능/status 변경 → `README.md`
- 배포 구조 변경 → `docs/deployment.md`
- 금전/인증 신뢰 경계 변경 → `docs/security.md`
- 작업 완료 → `CHANGELOG.md`

## 7. Commit discipline

- 작업 브랜치를 사용합니다.
- 하나의 커밋은 가능한 한 하나의 논리적 변경을 담습니다.
- 기능 변경과 대규모 구조 변경을 불필요하게 섞지 않습니다.
- binary asset은 특별한 이유 없이 재압축/재생성하지 않습니다.
