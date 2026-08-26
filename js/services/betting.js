import {betOptions} from '../../data/betting.js';
import {state,resetBets} from '../state.js';
export function totalBet(){return Object.values(state.betAmounts).reduce((a,b)=>a+b,0)}
export function addBet(id,amount){const value=Math.floor(Number(amount)||0);if(value<=0)return;state.betAmounts[id]=(state.betAmounts[id]||0)+value}
export function summary(){return Object.entries(state.betAmounts).filter(([,a])=>a>0).map(([id,a])=>`${betOptions.find(x=>x.id===id)?.name||id}  ${a.toLocaleString()}P`).join('\n')}
export function confirmBet(){const text=summary();resetBets();return text}
