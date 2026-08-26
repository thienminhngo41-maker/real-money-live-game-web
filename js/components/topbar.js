import {getTelegramUser} from '../services/telegram.js';

export function renderTopbar(){
  const u=getTelegramUser();
  const fullName=[u?.first_name,u?.last_name].filter(Boolean).join(' ');
  const name=fullName||u?.username||'VIP Guest';
  const id=u?.id||'777888999';
  const photo=u?.photo_url||'';
  const initials=(name||'V').trim().slice(0,1).toUpperCase();
  const root=document.querySelector('#topbar');
  root.className='topbar';
  root.innerHTML=`<div class="user"><div class="avatar-wrap"><span class="avatar-fallback">${initials}</span>${photo?`<img id="user-photo" class="avatar" src="${photo}" alt="Profile" onerror="this.remove()">`:''}</div><div class="user-meta"><div id="user-name" class="name">${name}</div><div class="uid">ID: <span id="user-id">${id}</span></div></div></div><div class="balance"><span id="balance-label" class="balance-label">잔액</span><span id="user-balance" class="balance-value">0</span><span id="point-label" class="balance-unit">P</span></div><button class="action" data-action="deposit"><span class="ico">▣</span><span id="deposit-label">충전</span></button><button class="action" data-action="withdraw"><span class="ico">◉</span><span id="withdraw-label">출금</span></button>`;
}
