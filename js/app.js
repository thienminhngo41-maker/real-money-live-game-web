import {i18n,detectLanguage} from '../data/i18n.js';
import {games} from '../data/games.js';
import {state} from './state.js';
import {initTelegram,tg,getTelegramUser,openExternal,openSupport,haptic} from './services/telegram.js';
import {addChat,startChat,stopChat} from './services/chat.js';
import {totalBet,summary,addBet} from './services/betting.js';
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
const router=createRouter(renderPages,(page)=>{if(page==='live-room'){randomizeVote();startChat()}});
function randomizeVote(){const p=Math.floor(Math.random()*81)+10;const b=100-p;const pp=document.querySelector('#player-pct');const bp=document.querySelector('#banker-pct');const pf=document.querySelector('#player-fill');const bf=document.querySelector('#banker-fill');if(pp)pp.textContent=`${p}%`;if(bp)bp.textContent=`${b}%`;if(pf)pf.style.width=`${p}%`;if(bf)bf.style.width=`${b}%`}
function applyLang(){const d=t();const map={'balance-label':d.balance,'point-label':d.point,'deposit-label':d.deposit,'withdraw-label':d.withdraw,'nav-home':d.home,'nav-live':d.live,'nav-mini':d.mini,'nav-profile':d.profile};Object.entries(map).forEach(([id,text])=>{const el=document.getElementById(id);if(el)el.textContent=text});renderPages()}
function showTestPopup(){openModal('준비중','현재 테스트 버전에서는 해당 기능을 사용할 수 없습니다.')}
function openAction(type){openModal(type==='deposit'?t().deposit:t().withdraw,state.lang==='ko'?'현재 테스트 버전에서는 실제 충전/출금 기능이 연결되어 있지 않습니다.':'Real deposit and withdrawal are not connected in this test version.')}
function openRoom(url,label){state.room={url,label};state.history.push('live-room');router.show('live-room');haptic()}
function handleGame(id){const game=games.find(g=>g.id===id);if(game?.enabled)openExternal(game.url);else showTestPopup()}
function confirmBet(){if(!totalBet())return;const detail=`${summary()}\n\n총 베팅 ${totalBet().toLocaleString()}P\n\nTEST MODE: 실제 잔액은 차감되지 않습니다.`;openModal('베팅 확인',detail,()=>{const done=summary();state.betAmounts={};state.selectedBet=null;closeModal();closeBetting();updateBetUI();openModal('✓',`베팅 완료: ${done.replaceAll('\n',', ')}`)})}

document.addEventListener('click',e=>{const nav=e.target.closest('[data-page]');if(nav&&nav.closest('#bottom-nav')){router.navigate(nav.dataset.page);return}const pageLink=e.target.closest('[data-page-link]');if(pageLink){router.navigate(pageLink.dataset.pageLink);return}const game=e.target.closest('[data-game]');if(game){handleGame(game.dataset.game);return}const stream=e.target.closest('[data-stream]');if(stream){openRoom(stream.dataset.stream,stream.dataset.label);return}if(e.target.closest('[data-back]')){router.back();return}if(e.target.closest('[data-action="deposit"]')){openAction('deposit');return}if(e.target.closest('[data-action="withdraw"]')){openAction('withdraw');return}if(e.target.closest('[data-disabled]')){showTestPopup();return}if(e.target.closest('[data-support]')){openSupport('https://t.me/asd2567');return}if(e.target.closest('[data-language]')){state.lang=state.lang==='ko'?'cn':state.lang==='cn'?'en':'ko';applyLang();return}if(e.target.closest('[data-open-bet]')){openBetting();return}if(e.target.closest('[data-bet-close]')){closeBetting();return}if(e.target.closest('[data-bet-max]')){document.querySelector('#bet-amount-input').value=10000;state.selectedChip=1000;if(state.selectedBet)addBet(state.selectedBet,10000);updateBetUI();return}if(e.target.closest('[data-bet-confirm]')){confirmBet();return}if(e.target.closest('[data-modal-close]')){closeModal();return}if(e.target.closest('[data-chat-focus]')){document.querySelector('#chat-input')?.focus();return}if(e.target.closest('#bet-grid')||e.target.closest('#chip-row'))handleBetClick(e)});
document.addEventListener('submit',e=>{if(e.target.id==='chat-form'){e.preventDefault();const input=document.querySelector('#chat-input');if(input?.value.trim()){addChat('You',input.value.trim());input.value=''}}});
document.querySelector('#bet-overlay').addEventListener('click',e=>{if(e.target.id==='bet-overlay')closeBetting()});
tg.BackButton.onClick(()=>router.back());
renderPages();applyLang();
