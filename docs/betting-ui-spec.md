# Betting UI specification

## Order
1. 🐉 Dragon 7 / 🐼 Panda 8
2. P.P / TIE / B.P
3. PLAYER / BANKER
4. Bet amount / chips
5. Confirm bet

## UX rules
- PLAYER and BANKER are the primary, largest thumb targets.
- TIE is green; PLAYER/P.P/Panda 8 are blue; BANKER/B.P/Dragon 7 are red.
- Special bets sit above side bets; main bets sit below them.
- Touch targets stay at least 44px high, with 48–64px preferred for primary actions.
- The sheet is limited to roughly 70vh so streaming remains visible.
- Bottom safe-area padding is preserved for Telegram/iOS WebViews.
- Selected bets must have an unmistakable visual state.
- Existing betting/business logic should remain unchanged while presentation is refined.
