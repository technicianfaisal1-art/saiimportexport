const CACHE_NAME = 'sai-agro-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/product.html',
  '/blog.html',
  '/css/styles.css',
  '/js/script.js',
  '/js/product-data.js',
  '/images/sai_logo_full.webp',
  '/images/sai_logo_icon.webp'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim()) // Take control of all pages immediately
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first for HTML and JS (always get fresh code)
  if (event.request.url.endsWith('.html') || event.request.url.endsWith('.js') || event.request.url === event.request.referrer) {
    event.respondWith(
      fetch(event.request).then((response) => {
        // Cache the fresh response for offline use
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      }).catch(() => {
        // Fallback to cache only if network fails
        return caches.match(event.request);
      })
    );
    return;
  }

  // Cache-first for images and CSS (rarely change)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});
