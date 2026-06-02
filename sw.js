const CACHE_NAME = 'sai-agro-v18';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/product.html',
  '/blog.html',
  '/calculator.html',
  '/faq.html',
  '/certifications.html',
  '/certificates.html',
  '/privacy-policy.html',
  '/terms-conditions.html',
  '/thank-you.html',
  '/offline.html',
  '/css/styles.css',
  '/js/script.js',
  '/js/product-data.js',
  '/js/supabase-client.js',
  '/docs/SAI_Import_Export_Catalog.pdf',
  '/images/sai_logo_full.webp',
  '/images/sai_logo_icon.webp'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
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
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Network-first for HTML and JS (always get fresh code)
  if (event.request.url.endsWith('.html') || event.request.url.endsWith('.js') || event.request.url === event.request.referrer) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      }).catch(() => {
        return caches.match(event.request).then(cached => cached || caches.match('/offline.html'));
      })
    );
    return;
  }

  // Cache-first for images and CSS
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
