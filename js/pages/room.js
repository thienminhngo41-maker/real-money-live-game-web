function withPlaybackParams(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url, window.location.href);
    parsed.searchParams.set('autoplay', '1');
    parsed.searchParams.set('muted', '1');
    return parsed.toString();
  } catch {
    return url;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderStreamCard(label, url, emptyText = 'STREAM OFFLINE') {
  return `<div class="room-stream"><div class="live-card"><span class="live-card-label">${escapeHtml(label)}</span>${url ? `<iframe src="${escapeHtml(withPlaybackParams(url))}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="eager"></iframe>` : `<div class="live-empty">${escapeHtml(emptyText)}</div>`}</div></div>`;
}

export function renderRoom(room){
  const boardUrl = room?.boardUrl || room?.url || '';
  const tableUrl = room?.tableUrl || '';
  return `<section id="page-live-room" class="page"><div class="room-head"><button class="room-back" data-back>‹</button><div class="room-title-wrap"><div class="room-title">${escapeHtml(room?.label)} • Live Room</div><div class="room-sub">LIVE • TEST MODE</div></div></div>${renderStreamCard('BOARD LIVE', boardUrl)}${renderStreamCard('TABLE LIVE', tableUrl)}<div class="vote-panel"><div class="vote-head"><span class="vote-title">PLAYER / BANKER</span><span class="vote-test">TEST VOTE</span></div><div class="vote-grid"><button class="vote-side"><span class="vote-name">PLAYER</span><div class="vote-pct" id="player-pct">50%</div><span class="vote-fill" id="player-fill" style="width:50%"></span></button><button class="vote-side"><span class="vote-name">BANKER</span><div class="vote-pct" id="banker-pct">50%</div><span class="vote-fill" id="banker-fill" style="width:50%"></span></button></div></div><div class="chat-panel"><div class="chat-head"><span class="chat-title">Live Chat</span><span class="chat-status">TEST MODE</span></div><div id="chat-list" class="chat-list"></div><form id="chat-form" class="chat-input"><input id="chat-input" type="text" maxlength="120" placeholder="메시지를 입력하세요..." autocomplete="off"></form></div></section>`;
}
