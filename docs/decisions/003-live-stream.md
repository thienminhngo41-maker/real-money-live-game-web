# ADR 003 — Live Stream Structure

## Decision

Live Game에서 선택한 스트림을 Live Room으로 열고, Room에는 기존 스트림과 `https://vdo.ninja/?view=EnemyDriveL` 보조 스트림을 표시하는 구조를 사용합니다.

## UX

- 모바일 inline playback
- 가능한 경우 autoplay
- autoplay 실패 시 사용자 재생 fallback 고려
- Live Room에서 Chat / Betting floating actions 제공

## Scope

스트림 URL은 명시적인 변경 요청이 있을 때만 수정합니다.
