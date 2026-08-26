import { watchStreams } from '../firebase/database.js';

export let streams = [];

const STREAM_DEFINITIONS = [
  { id: 'LIVE 01', key: 'live01' },
  { id: 'LIVE 02', key: 'live02' }
];

function normalizeStreams(data) {
  return STREAM_DEFINITIONS.map(({ id, key }) => ({
    id,
    url: typeof data?.[key]?.url === 'string' ? data[key].url.trim() : ''
  }));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderLive(t) {
  return `<section id="page-live" class="page"><div class="page-title">${t.live}</div><div class="live-note">${t.liveNote}</div>${streams.map(s => `<div class="live-card" data-stream="${escapeHtml(s.url)}" data-label="${escapeHtml(s.id)}" role="button" tabindex="0" aria-label="${escapeHtml(s.id)}"><span class="live-card-label">${escapeHtml(s.id)}</span>${s.url ? `<iframe src="${escapeHtml(s.url)}&autoplay=1&muted=1" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="eager"></iframe>` : `<div class="live-empty">STREAM OFFLINE</div>`}<div class="live-overlay"></div></div>`).join('')}</section>`;
}

export function initLiveStreams(onChange) {
  return watchStreams((data) => {
    streams = normalizeStreams(data);
    onChange?.();
  }, (error) => {
    // Keep the page usable if Firebase is unavailable or rules reject the read.
    console.error('[Live] Stream configuration unavailable:', error);
  });
}
