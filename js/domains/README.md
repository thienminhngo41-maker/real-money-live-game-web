# Domain modules

`domains/` owns feature-level orchestration for Live, Chat, and Betting.

- `live/` — live-room lifecycle and vote UI coordination.
- `chat/` — chat service facade and chat event handling.
- `betting/` — betting service facade and betting confirmation flow.

Existing `services/` remain intact as low-level/prototype implementations. Domain modules are the application-facing boundary so `app.js` does not need to know service internals.
