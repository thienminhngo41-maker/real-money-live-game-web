export const state={lang:'en',page:'home',history:['home'],room:null,chatTimer:null,selectedChip:10,selectedBet:null,betAmounts:{},balance:0};
export function resetBets(){state.selectedBet=null;state.betAmounts={};state.selectedChip=10}
