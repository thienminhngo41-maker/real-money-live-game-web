# Betting UI refinement

## Goals
- Center all betting labels horizontally and vertically.
- Use clear visual hierarchy: PLAYER/BANKER largest, Dragon/Panda next, side bets smaller.
- Keep semantic colors consistent: PLAYER/P.P/Panda blue, BANKER/B.P/Dragon red, TIE green.
- Preserve large thumb-friendly touch targets and full-width grid tracks.
- Keep the streaming context visible above the bottom sheet.

## Layout
1. Dragon 7 / Panda 8 — 2 columns.
2. P.P / TIE / B.P — 3 columns.
3. PLAYER / BANKER — 2 columns and largest controls.
4. Chips, amount, summary, confirmation.

## Visual treatment
Use dark tinted backgrounds with a colored border/accent instead of overly bright solid fills. Selected controls should use a clear border/glow and `aria-pressed=true` without disruptive animation.

## Implementation notes
Keep betting state and business logic unchanged. UI changes should be isolated to betting sheet markup/CSS and remain responsive for PC and Telegram Mini App WebView.
