const CACHE_NAME = 'local478-ideas-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './manifest.json'
];

const EXTERNAL_ASSETS = [
  'https://cdn.tailwindcss.com'
];

// Install - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets');
      // Cache local assets
      cache.addAll(STATIC_ASSETS);
      // Try to cache external assets (may fail due to CORS)
      EXTERNAL_ASSETS.forEach(url => {
        fetch(url, { mode: 'cors' })
          .then(response => {
            if (response.ok) {
              cache.put(url, response);
            }
          })
          .catch(() => console.log('[SW] Could not cache:', url));
      });
      return Promise.resolve();
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For JSONBin API requests - network first, cache response for offline
  if (url.hostname === 'api.jsonbin.io') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone and cache successful GET responses
          if (response.ok && event.request.method === 'GET') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached data if offline
          return caches.match(event.request).then(cached => {
            if (cached) {
              console.log('[SW] Serving cached API data');
              return cached;
            }
            // Return offline JSON response
            return new Response(
              JSON.stringify({ offline: true, message: 'You are offline' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // For static assets - cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Return cached, but also update cache in background
        fetch(event.request)
          .then(response => {
            if (response.ok) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, response);
              });
            }
          })
          .catch(() => {});
        return cached;
      }

      // Not in cache, fetch from network
      return fetch(event.request)
        .then(response => {
          // Cache successful responses for same-origin or CORS-enabled
          if (response.ok && (url.origin === self.location.origin || response.type === 'cors')) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});

// Listen for messages from the app
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
