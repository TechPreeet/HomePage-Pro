/* -----------------------------------------------------------
   HomePage-Pro Service Worker
   Version: 12  (bump this when you change anything here)
   Features:
   - Minimal precache “app shell” (never breaks install)
   - Offline fallback to index.html for navigations
   - Runtime caching with Stale-While-Revalidate
     * MEDIA (wallpapers, video wallpapers, images)
     * ICONS (favicons/bookmark icons)
     * RUNTIME (css/js/json/fonts/etc.)
   - LRU-style cache trimming
   - Message API: SKIP_WAITING, CACHE_MEDIA, CLEAR_CACHE
------------------------------------------------------------ */

const VERSION        = 12;
const PRECACHE       = `hpp-precache-v${VERSION}`;
const RUNTIME        = `hpp-runtime-v${VERSION}`;
const MEDIA_CACHE    = `hpp-media-v${VERSION}`;
const ICONS_CACHE    = `hpp-icons-v${VERSION}`;

const MAX_RUNTIME_ITEMS = 120;  // css/js/json/fonts etc.
const MAX_MEDIA_ITEMS   = 60;   // wallpapers / videos
const MAX_ICON_ITEMS    = 120;  // favicons / bookmark icons

// Auto-detect base path (GitHub Pages subfolder safe)
const ROOT = new URL(self.registration.scope).pathname.replace(/\/+$/, '/') || '/';

// Core shell you ALWAYS want offline. Keep short to avoid 404 breaking install.
const PRECACHE_URLS = [
  `${ROOT}`,                   // GH Pages often serves index here
  `${ROOT}index.html`,
  `${ROOT}manifest.json`,
  `${ROOT}serviceworker.js`,   // or service-worker.js — match your real filename!
];

// Fallback HTML when offline navigation fails
const OFFLINE_FALLBACK = `${ROOT}index.html`;

/* ----------------------- INSTALL ----------------------- */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE);
    for (const url of PRECACHE_URLS) {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        await cache.put(url, res.clone());
      } catch (err) {
        console.warn('❌ Precache failed:', url, err);
      }
    }
    await self.skipWaiting();
  })());
});

/* ----------------------- ACTIVATE ---------------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(k => ![PRECACHE, RUNTIME, MEDIA_CACHE, ICONS_CACHE].includes(k))
        .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* ------------------------ FETCH ------------------------ */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Page navigations (address bar / SPA routes)
  if (req.mode === 'navigate') {
    event.respondWith(handlePageRequest(req));
    return;
  }

  if (sameOrigin) {
    // Media (wallpapers, videos)
    if (/\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm|ogg)$/i.test(url.pathname)) {
      event.respondWith(staleWhileRevalidate(req, MEDIA_CACHE, MAX_MEDIA_ITEMS));
      return;
    }
    // Favicons / bookmark icons (google s2, your /icons folder, etc.)
    if (/\/(icons?|favicons?)\/|favicon|s2\/favicons/i.test(url.pathname)) {
      event.respondWith(staleWhileRevalidate(req, ICONS_CACHE, MAX_ICON_ITEMS));
      return;
    }
    // Default: css/js/json/fonts/etc.
    event.respondWith(staleWhileRevalidate(req, RUNTIME, MAX_RUNTIME_ITEMS));
    return;
  }

  // Cross-origin (CDNs, fonts, etc.): network first, fallback to cache
  event.respondWith(networkFirst(req, RUNTIME, MAX_RUNTIME_ITEMS));
});

/* ---------------------- MESSAGE API -------------------- */
self.addEventListener('message', async (event) => {
  const data = event.data;
  if (!data) return;

  switch (data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    // Cache a specific media URL on demand
    // { type: 'CACHE_MEDIA', url: 'https://...' }
    case 'CACHE_MEDIA': {
      const port = event.ports[0];
      if (!data.url) {
        port?.postMessage({ ok: false, error: 'Missing url' });
        return;
      }
      try {
        const res = await fetch(data.url, { cache: 'no-store' });
        if (!res.ok) throw new Error(res.status);
        const cache = await caches.open(MEDIA_CACHE);
        await cache.put(data.url, res.clone());
        await enforceLimit(MEDIA_CACHE, MAX_MEDIA_ITEMS);
        port?.postMessage({ ok: true });
      } catch (e) {
        port?.postMessage({ ok: false, error: String(e) });
      }
      break;
    }

    // Clear caches via message: { type:'CLEAR_CACHE', name:'media'|'runtime'|'icons'|'all' }
    case 'CLEAR_CACHE': {
      const port = event.ports[0];
      let targets = [];
      switch (data.name) {
        case 'media':   targets = [MEDIA_CACHE]; break;
        case 'runtime': targets = [RUNTIME];     break;
        case 'icons':   targets = [ICONS_CACHE]; break;
        case 'all':     targets = [MEDIA_CACHE, RUNTIME, ICONS_CACHE]; break;
        default: break;
      }
      await Promise.all(targets.map(n => caches.delete(n)));
      port?.postMessage({ ok: true });
      break;
    }
  }
});

/* ---------------------- HELPERS ----------------------- */

async function handlePageRequest(request) {
  const cache = await caches.open(PRECACHE);
  try {
    const networkRes = await fetch(request);
    cache.put(request, networkRes.clone());
    return networkRes;
  } catch {
    return (await cache.match(request)) ||
           (await cache.match(OFFLINE_FALLBACK));
  }
}

async function staleWhileRevalidate(request, cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const network = fetch(request).then(res => {
    if (res && res.status === 200) {
      cache.put(request, res.clone());
      enforceLimit(cacheName, maxItems);
    }
    return res;
  }).catch(() => null);

  return cached || network || Response.error();
}

async function networkFirst(request, cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res && res.status === 200) {
      cache.put(request, res.clone());
      enforceLimit(cacheName, maxItems);
    }
    return res;
  } catch {
    return (await cache.match(request)) || Response.error();
  }
}

// Basic LRU: delete oldest entries when over limit
async function enforceLimit(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxItems) return;
  const extra = keys.length - maxItems;
  for (let i = 0; i < extra; i++) {
    await cache.delete(keys[i]);
  }
}
