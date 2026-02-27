const SW_VERSION = 'v3';
const STATIC_CACHE = `joey-notes-static-${SW_VERSION}`;
const PAGE_CACHE = `joey-notes-pages-${SW_VERSION}`;
const ASSET_CACHE = `joey-notes-assets-${SW_VERSION}`;
const CACHE_WHITELIST = [STATIC_CACHE, PAGE_CACHE, ASSET_CACHE];

const STATIC_ASSETS = ['/', '/tags/', '/manifest.json', '/offline/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!CACHE_WHITELIST.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isCacheableResponse(response) {
  return response && response.status === 200 && response.type === 'basic';
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/sw.js') return;

  // HTML documents should prefer network to keep content fresh after deploys.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (isCacheableResponse(response)) {
            const cloned = response.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match('/offline/');
          })
        )
    );
    return;
  }

  // Static assets use stale-while-revalidate for fast repeat loads.
  const isStaticAsset = ['style', 'script', 'image', 'font'].includes(request.destination);
  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            if (isCacheableResponse(response)) {
              const cloned = response.clone();
              caches.open(ASSET_CACHE).then((cache) => cache.put(request, cloned));
            }
            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      })
    );
    return;
  }

  // Fallback: network first.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (isCacheableResponse(response)) {
          const cloned = response.clone();
          caches.open(ASSET_CACHE).then((cache) => cache.put(request, cloned));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
