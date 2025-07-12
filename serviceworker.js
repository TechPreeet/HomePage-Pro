// serviceworker.js

const CACHE_NAME = 'homepagepro-v2';
const STATIC_ASSETS = [
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/main.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// 1) Install + precache (graceful: logs but won’t fail if one asset 404s)
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        STATIC_ASSETS.map(url =>
          fetch(url)
            .then(res => {
              if (!res.ok) throw new Error(`${url} returned ${res.status}`);
              return cache.put(url, res);
            })
            .catch(err => {
              console.warn(`SW: failed to cache ${url}:`, err);
            })
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// 2) Activate + clean old caches
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 3) Fetch handler
self.addEventListener('fetch', evt => {
  const req = evt.request;
  const url = new URL(req.url);

  // a) API calls → network-first
  if (url.pathname.startsWith('/api/')) {
    evt.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // b) Static assets → cache-first
  if (STATIC_ASSETS.includes(url.pathname)) {
    evt.respondWith(
      caches.match(req).then(cached =>
        cached || fetch(req).then(fresh => {
          caches.open(CACHE_NAME).then(c => c.put(req, fresh.clone()));
          return fresh;
        })
      )
    );
    return;
  }

  // c) HTML pages → network-first with offline fallback
  if (req.headers.get('accept')?.includes('text/html')) {
    evt.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // d) Other requests → network
  // (You can add image/font caching here if desired)
});
