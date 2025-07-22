// Increment your version here
const CACHE_NAME = 'homepagepro-v3';

// Add all your static assets here
const STATIC_ASSETS = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icons/icon-72.png',
  'icons/icon-96.png',
  'icons/icon-128.png',
  'icons/icon-144.png',
  'icons/icon-152.png',
  'icons/icon-192.png',
  'icons/icon-384.png',
  'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🔨 Precaching assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())         // activate worker immediately
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // delete any old caches that don't match our current name
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    ).then(() => self.clients.claim())       // take control of pages ASAP
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1) App shell: stale-while-revalidate for navigations
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then(cached => {
        const network = fetch(request).then(res => {
          caches.open(CACHE_NAME).then(cache =>
            cache.put('index.html', res.clone())
          );
          return res;
        });
        return cached || network;
      })
    );
    return;
  }

  // 2) Cache-first for your static assets
  if (STATIC_ASSETS.includes(url.pathname) || STATIC_ASSETS.includes(url.pathname + '/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(res => {
          caches.open(CACHE_NAME).then(cache =>
            cache.put(request, res.clone())
          );
          return res;
        });
      })
    );
    return;
  }

  // 3) Runtime caching example (e.g. weather API)
  if (url.origin === 'https://api.openweathermap.org') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          const network = fetch(request).then(res => {
            cache.put(request, res.clone());
            return res;
          });
          return cached || network;
        })
      )
    );
    return;
  }

  // 4) Network-first for everything else, fallback to cache
  event.respondWith(
    fetch(request)
      .then(res => res)
      .catch(() => caches.match(request))
  );
});
