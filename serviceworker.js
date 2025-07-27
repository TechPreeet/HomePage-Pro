/* service-worker.js */
/// --- CONFIG --------------------------------------------------------------
const CACHE_VERSION = 'hpp-v10';          // bump when you change anything
const PRECACHE = `precache-${CACHE_VERSION}`;
const RUNTIME  = `runtime-${CACHE_VERSION}`;

// Auto-detect base path (works for GitHub Pages subfolders)
const ROOT = new URL(self.registration.scope).pathname;

// List ALL core files you need offline the first time
const PRECACHE_URLS = [
  `${ROOT}`,                 // GitHub Pages often serves index at the folder root
  `${ROOT}index.html`,
  `${ROOT}manifest.json`,
  `${ROOT}service-worker.js`, // keep THIS file cached too
  // Icons
  `${ROOT}icons/icon-72.png`,
  `${ROOT}icons/icon-96.png`,
  `${ROOT}icons/icon-128.png`,
  `${ROOT}icons/icon-144.png`,
  `${ROOT}icons/icon-152.png`,
  `${ROOT}icons/icon-192.png`,
  `${ROOT}icons/icon-384.png`,
  `${ROOT}icons/icon-512.png`,
  // Add any standalone CSS/JS/JSON/background images/videos you host
  // `${ROOT}css/style.css`,
  // `${ROOT}js/app.js`,
  // `${ROOT}backgrounds/wallpaper1.jpg`,
  // `${ROOT}videos/bg.mp4`,
];

/// --- INSTALL -------------------------------------------------------------
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

/// --- ACTIVATE ------------------------------------------------------------
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== PRECACHE && k !== RUNTIME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/// --- FETCH ---------------------------------------------------------------
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET
  if (request.method !== 'GET') return;

  // Handle navigation requests (page loads / SPA routes)
  if (request.mode === 'navigate') {
    event.respondWith(handlePageRequest(request));
    return;
  }

  // For everything else: runtime caching
  event.respondWith(handleAssetRequest(request));
});

async function handlePageRequest(request) {
  const cache = await caches.open(PRECACHE);

  // Try network first (so you always get newest HTML), fall back to cache
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    // offline: try the cached request OR fallback to cached index.html
    return (await cache.match(request)) ||
           (await cache.match(`${ROOT}index.html`));
  }
}

async function handleAssetRequest(request) {
  // Same-origin? Use Stale-While-Revalidate
  if (new URL(request.url).origin === self.location.origin) {
    return staleWhileRevalidate(request, RUNTIME);
  }

  // Cross-origin (favicons, fonts, CDNs) → network first, fallback to cache
  try {
    const netRes = await fetch(request);
    if (netRes && netRes.status === 200) {
      const cache = await caches.open(RUNTIME);
      cache.put(request, netRes.clone());
    }
    return netRes;
  } catch {
    const cached = await caches.match(request);
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then(res => {
      if (res && res.status === 200) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);

  // Return cached immediately if present, else wait for network
  return cached || networkFetch || Response.error();
}

/// --- OPTIONAL: Message API to skip waiting ------------------------------
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
