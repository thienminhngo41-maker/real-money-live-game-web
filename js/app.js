import {i18n,detectLanguage} from '../data/i18n.js';
import {games} from '../data/games.js';
import {state} from './state.js';
import {initTelegram,tg,getTelegramUser,openExternal,openSupport} from './services/telegram.js';
import {startChat,stopChat,handleSubmit,focusInput} from './domains/chat/chat.js';
import {liveDomain,bettingDomain} from './domains/index.js';
import {renderTopbar} from './components/topbar.js';
import {renderBottomNav} from './components/bottomNav.js';
import {renderModal,openModal,closeModal} from './components/modal.js';
import {renderBettingSheet,openBetting,closeBetting,handleBetClick,updateBetUI} from './components/bettingSheet.js';
import {renderHome} from './pages/home.js';
import {renderLive} from './pages/live.js';
import {renderRoom} from './pages/room.js';
import {renderMini} from './pages/mini.js';
import {renderProfile} from './pages/profile.js';
import {createRouter} from './pages/router.js';

initTelegram();
state.lang=detectLanguage(getTelegramUser()?.language_code||navigator.language||'en');
renderTopbar();renderBottomNav();renderModal();renderBettingSheet();
const app=document.querySelector('#app');
const t=()=>i18n[state.lang];
function renderPages(){const tr=t();app.innerHTML=renderHome(tr)+renderLive(tr)+(state.room?renderRoom(state.room):'')+renderMini()+renderProfile(tr);document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${state.page}`));document.querySelector('#float-root').innerHTML=state.page==='live-room'?'<div class="float-stack"><button class="float-action float-bet" data-open-bet>🪙</button><button class="float-action" data-chat-focus>💬</button></div>':''}
const router=createRouter(renderPages,(page)=>liveDomain.handleRoomChange(page,{startChat,stopChat}));
function applyLang(){const d=t();const map={'balance-label':d.balance,'point-label':d.point,'deposit-label':d.deposit,'withdraw-label':d.withdraw,'nav-home':d.home,'nav-live':d.live,'nav-mini':d.mini,'nav-profile':d.profile};Object.entries(map).forEach(([id,text])=>{const el=document.getElementById(id);if(el)el.textContent=text});renderPages()}
function openAction(type){openModal(type==='deposit'?t().deposit:t().withdraw,state.lang==='ko'?'현재 테스트 버전에서는 실제 충전/출금 기능이 연결되어 있지 않습니다.':'Real deposit and withdrawal are not connected in this test version.')}
function handleGame(id){const game=games.find(g=>g.id===id);if(game?.enabled)openExternal(game.url)}

document.addEventListener('click',e=>{const nav=e.target.closest('[data-page]');if(nav&&nav.closest('#bottom-nav')){router.navigate(nav.dataset.page);return}const pageLink=e.target.closest('[data-page-link]');if(pageLink){router.navigate(pageLink.dataset.pageLink);return}const game=e.target.closest('[data-game]');if(game){handleGame(game.dataset.game);return}const stream=e.target.closest('[data-stream]');if(stream){liveDomain.openRoom(stream.dataset.stream,stream.dataset.label,router);return}if(e.target.closest('[data-back]')){router.back();return}if(e.target.closest('[data-action="deposit"]')){openAction('deposit');return}if(e.target.closest('[data-action="withdraw"]')){openAction('withdraw');return}if(e.target.closest('[data-disabled]')){return}if(e.target.closest('[data-support]')){openSupport('https://t.me/asd2567');return}if(e.target.closest('[data-language]')){state.lang=state.lang==='ko'?'cn':state.lang==='cn'?'en':'ko';applyLang();return}if(e.target.closest('[data-open-bet]')){openBetting();return}if(e.target.closest('[data-bet-close]')){closeBetting();return}if(e.target.closest('[data-bet-max]')){bettingDomain.setMaxBet();return}if(e.target.closest('[data-bet-confirm]')){bettingDomain.confirmBet();return}if(e.target.closest('[data-modal-close]')){closeModal();return}if(e.target.closest('[data-chat-focus]')){focusInput();return}if(e.target.closest('#bet-grid')||e.target.closest('#chip-row'))handleBetClick(e)});
document.addEventListener('submit',handleSubmit);
document.querySelector('#bet-overlay').addEventListener('click',e=>{if(e.target.id==='bet-overlay')closeBetting()});
tg.BackButton.onClick(()=>router.back());
renderPages();applyLang();
