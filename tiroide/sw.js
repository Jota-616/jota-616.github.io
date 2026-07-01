// ═══════════════════════════════════════════════
//  EUTIROX MANAGER — SERVICE WORKER
//  Estrategia: Cache-first para shell local
//              Network-first para CDN (con fallback a cache)
// ═══════════════════════════════════════════════

const CACHE_VERSION  = 'eutirox-v1.2';
const CACHE_STATIC   = `${CACHE_VERSION}-static`;
const CACHE_CDN      = `${CACHE_VERSION}-cdn`;

// Recursos locales del app shell (siempre disponibles offline)
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-144.png',
  './icons/icon-96.png',
  './icons/icon-72.png',
];

// Recursos CDN a cachear en primera visita
const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
];

// ── INSTALL: precachear shell ──
self.addEventListener('install', event => {
  console.log('[SW] Install:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())       // activa inmediatamente
  );
});

// ── ACTIVATE: limpiar versiones antiguas ──
self.addEventListener('activate', event => {
  console.log('[SW] Activate:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_STATIC && k !== CACHE_CDN)
          .map(k => { console.log('[SW] Removing old cache:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia por tipo de recurso ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo manejar GET
  if (event.request.method !== 'GET') return;

  // Google Fonts CSS → network-first (actualiza estilos) con fallback
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(networkFirstCDN(event.request));
    return;
  }

  // CDN de librerías → cache-first (son versionadas, no cambian)
  if (url.hostname === 'cdn.jsdelivr.net' || url.hostname === 'cdnjs.cloudflare.com') {
    event.respondWith(cacheFirstCDN(event.request));
    return;
  }

  // App shell local → cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstStatic(event.request));
    return;
  }
});

// ════ ESTRATEGIAS ════

async function cacheFirstStatic(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Offline fallback: devolver index.html para cualquier ruta del app
    return caches.match('./index.html');
  }
}

async function cacheFirstCDN(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_CDN);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('/* offline */', { headers: { 'Content-Type': 'text/javascript' } });
  }
}

async function networkFirstCDN(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_CDN);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('', { headers: { 'Content-Type': 'text/css' } });
  }
}

// ── MENSAJE: forzar actualización desde el cliente ──
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
