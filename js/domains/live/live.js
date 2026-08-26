import {state} from '../../state.js';
import {haptic} from '../../services/telegram.js';

export function randomizeVote(){
  const p=Math.floor(Math.random()*81)+10;
  const b=100-p;
  const pp=document.querySelector('#player-pct');
  const bp=document.querySelector('#banker-pct');
  const pf=document.querySelector('#player-fill');
  const bf=document.querySelector('#banker-fill');
  if(pp)pp.textContent=`${p}%`;
  if(bp)bp.textContent=`${b}%`;
  if(pf)pf.style.width=`${p}%`;
  if(bf)bf.style.width=`${b}%`;
}

export function openRoom(url,label,router){
  state.room={url,label};
  state.history.push('live-room');
  router.show('live-room');
  haptic();
}

export function handleRoomChange(page,{startChat,stopChat}){
  if(page==='live-room'){
    randomizeVote();
    startChat();
  }else{
    stopChat();
  }
}
