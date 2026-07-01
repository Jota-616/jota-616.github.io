// ═══════════════════════════════════════
//  EUTIROX MANAGER — SERVICE WORKER v2
//  Cache: tiroide-v1
// ═══════════════════════════════════════
const CACHE = "tiroide-v1";

const STATIC = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
];

const CDN = [
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js",
];

// ── Install ──
self.addEventListener("install", (e) => {
  console.log("[SW] Install:", CACHE);
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

// ── Activate: remove old caches ──
self.addEventListener("activate", (e) => {
  console.log("[SW] Activate:", CACHE);
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // CDN: cache-first (libraries are versioned, don't change)
  if (
    url.hostname === "cdn.jsdelivr.net" ||
    url.hostname === "cdnjs.cloudflare.com" ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    e.respondWith(cdnStrategy(e.request));
    return;
  }

  // Local: cache-first, fallback to network then index.html
  if (url.origin === self.location.origin) {
    e.respondWith(localStrategy(e.request));
    return;
  }
});

async function localStrategy(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const c = await caches.open(CACHE);
      c.put(req, res.clone());
    }
    return res;
  } catch {
    return caches.match("./index.html");
  }
}

async function cdnStrategy(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const c = await caches.open(CACHE);
      c.put(req, res.clone());
    }
    return res;
  } catch {
    return new Response("", { headers: { "Content-Type": "text/javascript" } });
  }
}

// ── Skip waiting on message ──
self.addEventListener("message", (e) => {
  if (e.data?.type === "SKIP_WAITING") self.skipWaiting();
});
