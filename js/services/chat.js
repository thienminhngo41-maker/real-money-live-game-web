const users=['TestUser01','TestUser02','TestUser03','TestUser04'];
let active=false;let timer=null;
function escapeHtml(v){return String(v).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]))}
export function addChat(user,text){const list=document.querySelector('#chat-list');if(!list)return;const msg=document.createElement('div');msg.className='chat-msg';const time=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});msg.innerHTML=`<div class="chat-avatar">${escapeHtml(user.slice(-1))}</div><div class="chat-bubble"><div class="chat-name">${escapeHtml(user)}<span class="chat-time">${time}</span></div><div class="chat-text">${escapeHtml(text)}</div></div>`;list.appendChild(msg);while(list.children.length>50)list.removeChild(list.firstChild);list.scrollTop=list.scrollHeight}
export function seedChat(){const list=document.querySelector('#chat-list');if(list)list.innerHTML='';['TestUser01','TestUser03','TestUser02','TestUser04'].forEach((u,i)=>setTimeout(()=>{if(active)addChat(u,'test')},i*220))}
export function startChat(){stopChat();active=true;seedChat();const loop=()=>{if(!active)return;addChat(users[Math.floor(Math.random()*users.length)],'test');timer=setTimeout(loop,2200+Math.random()*3200)};timer=setTimeout(loop,1200)}
export function stopChat(){active=false;if(timer)clearTimeout(timer);timer=null}
