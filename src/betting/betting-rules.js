/**
 * Baccarat betting rules.
 *
 * Test-mode rule source of truth for bet types and displayed odds.
 * Point amounts are integers; no decimal point is used.
 */
(function (global) {
  'use strict';

  const BETTING_RULES = Object.freeze({
    player: Object.freeze({ id: 'player', name: 'PLAYER', odds: '1:1', multiplier: 2 }),
    tie: Object.freeze({ id: 'tie', name: 'TIE', odds: '8:1', multiplier: 9 }),
    banker: Object.freeze({ id: 'banker', name: 'BANKER', odds: '1:1', commission: 5 }),
    playerPair: Object.freeze({ id: 'playerPair', name: 'PLAYER PAIR', odds: '11:1', multiplier: 12 }),
    bankerPair: Object.freeze({ id: 'bankerPair', name: 'BANKER PAIR', odds: '11:1', multiplier: 12 }),
    dragon7: Object.freeze({ id: 'dragon7', name: 'DRAGON 7', odds: '40:1', multiplier: 41 }),
    panda8: Object.freeze({ id: 'panda8', name: 'PANDA 8', odds: '25:1', multiplier: 26 })
  });

  global.BaccaratBettingRules = BETTING_RULES;
})(window);
