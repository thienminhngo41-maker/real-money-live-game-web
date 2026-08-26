# Deployment

현재 프로젝트는 정적 웹 애플리케이션이며 GitHub와 Netlify를 기준으로 배포합니다.

## Build

현재 `package.json`의 build script는 실제 번들링을 수행하지 않습니다.

```bash
npm install
npm run build
```

출력물을 별도로 생성하는 build pipeline이 아니라 repository root 자체가 publish 대상인 구조입니다.

## Netlify configuration

현재 문서화된 설정:

- Base directory: `/`
- Build command: `npm run build`
- Publish directory: `.`
- Functions directory: `netlify/functions`

실제 Netlify dashboard 설정이 이 문서와 다르면 dashboard의 현재 값을 source of truth로 보고 문서를 갱신합니다.

## Current release policy

개발 중에는 GitHub commit이 운영 사이트에 자동 배포되지 않도록 Build를 중지해 둔 상태를 전제로 합니다. 릴리스가 준비되면 수동 Netlify deployment를 사용합니다.

## Pre-release checklist

- `npm run build` 성공
- `/`에서 App Shell 로드 확인
- `/pc.html` 확인
- Live → Room 진입/복귀 확인
- Chat 입력 확인
- Betting Sheet 열기/닫기 및 TEST MODE 확인
- 모바일 safe-area 확인
- browser console의 module/import 오류 확인
- secret/API key/credential이 포함되지 않았는지 확인
- 실제 금전 로직이 프론트엔드에 추가되지 않았는지 확인

## Telegram Mini App release boundary

운영 Telegram Mini App에서는 HTTPS 배포와 Telegram Bot/WebApp 설정을 별도로 관리해야 합니다. 이 저장소는 현재 프론트엔드 prototype이므로 인증, balance, transaction, settlement을 Netlify 정적 호스팅만으로 해결한다고 가정하지 않습니다.

실제 금전 서비스로 전환할 경우 backend/API, database/ledger, authentication verification, webhook/transaction handling 등 운영 인프라를 별도로 구성해야 합니다.
