const CACHE_NAME = 'homepagepro-v2'; // Increment the version
// Add your new CSS and JS files to this list
const STATIC_ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icons/icon-512.png',
  'icons/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  // For navigation requests (like the main HTML page), use Stale-While-Revalidate
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          // Return cached version immediately, while fetching update in background
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // For other requests (CSS, JS, images), use a Cache First strategy
  event.respondWith(
    caches.match(event.request).then(response => {
      // If it's in the cache, return it. Otherwise, fetch from network.
      return response || fetch(event.request);
    })
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});