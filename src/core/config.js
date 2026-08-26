// Central configuration for the prototype.
// Keep feature flags here so TEST MODE can be disabled independently later.
export const APP_CONFIG = Object.freeze({
  testMode: true,
  testChat: true,
  testVote: true,
  testBetting: true,
  streams: Object.freeze({
    secondary: 'https://vdo.ninja/?view=EnemyDriveL'
  })
});

export const BETTING_CONFIG = Object.freeze({
  player: { label: 'PLAYER', odds: '1:1' },
  banker: { label: 'BANKER', odds: '1:1', commissionPercent: 5 },
  tie: { label: 'TIE', odds: '8:1' },
  playerPair: { label: 'PLAYER PAIR', odds: '11:1' },
  bankerPair: { label: 'BANKER PAIR', odds: '11:1' },
  dragon7: { label: 'DRAGON 7', odds: '40:1', sideBet: true },
  panda8: { label: 'PANDA 8', odds: '25:1', sideBet: true }
});

export const CHIP_VALUES = Object.freeze([1, 5, 10, 50, 100, 1000]);
