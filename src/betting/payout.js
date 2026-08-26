/**
 * Baccarat payout helpers.
 *
 * All amounts are integer Points. Banker wins use the casino-style 5%
 * commission model. Because this project forbids decimal Points, the
 * commission result is rounded down to the nearest whole Point.
 *
 * Examples:
 *   10 -> 19 total return (9 profit)
 *   20 -> 39 total return (19 profit)
 */
(function (global) {
  'use strict';

  function normalizeAmount(amount) {
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0) return 0;
    return Math.floor(value);
  }

  function bankerReturn(betAmount) {
    const bet = normalizeAmount(betAmount);
    return Math.floor(bet * 195 / 100);
  }

  function calculateTestReturn(betType, betAmount) {
    const bet = normalizeAmount(betAmount);
    switch (betType) {
      case 'banker': return bankerReturn(bet);
      case 'player': return bet * 2;
      case 'tie': return bet * 9;
      case 'playerPair':
      case 'bankerPair': return bet * 12;
      case 'dragon7': return bet * 41;
      case 'panda8': return bet * 26;
      default: return bet;
    }
  }

  function profitFromReturn(betType, betAmount) {
    const bet = normalizeAmount(betAmount);
    return Math.max(0, calculateTestReturn(betType, bet) - bet);
  }

  global.BaccaratPayout = Object.freeze({
    normalizeAmount,
    bankerReturn,
    calculateTestReturn,
    profitFromReturn
  });
})(window);
