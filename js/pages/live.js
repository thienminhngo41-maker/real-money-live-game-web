import { watchStreams } from '../firebase/database.js';

export let streams = [];

const STREAM_DEFINITIONS = [
  { id: 'LIVE 01', key: 'live01' },
  { id: 'LIVE 02', key: 'live02' }
];

function cleanUrl(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeStreams(data) {
  return STREAM_DEFINITIONS.map(({ id, key }) => ({
    id,
    key,
    boardUrl: cleanUrl(data?.[key]?.boardUrl),
    tableUrl: cleanUrl(data?.[key]?.tableUrl)
  }));
}

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

export function renderLive(t) {
  return `<section id="page-live" class="page"><div class="page-title">${t.live}</div><div class="live-note">${t.liveNote}</div>${streams.map(s => `<div class="live-card" data-stream="${escapeHtml(s.key)}" data-label="${escapeHtml(s.id)}" role="button" tabindex="0" aria-label="${escapeHtml(s.id)}"><span class="live-card-label">${escapeHtml(s.id)}</span>${s.boardUrl ? `<iframe src="${escapeHtml(withPlaybackParams(s.boardUrl))}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="eager"></iframe>` : `<div class="live-empty">STREAM OFFLINE</div>`}<div class="live-overlay"></div></div>`).join('')}</section>`;
}

export function initLiveStreams(onChange) {
  return watchStreams((data) => {
    streams = normalizeStreams(data);
    onChange?.();
  }, (error) => {
    console.error('[Live] Stream configuration unavailable:', error);
  });
}

export function getStreamByKey(key) {
  return streams.find((stream) => stream.key === key) || null;
}

export { withPlaybackParams };
