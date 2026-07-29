/**
 * Bella Essence — Service Worker (PWA)
 * Cache-first strategy for static assets
 */

const CACHE_NAME = 'bella-essence-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/data/services.json',
  '/data/professionals.json',
  '/data/products.json',
  '/data/gallery.json',
  '/data/testimonials.json',
  '/data/blog.json',
  '/data/faq.json',
  '/data/packages.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          if (response.status === 200 && response.type === 'basic') {
            cache.put(event.request, clone);
          }
        });
        return response;
      }).catch(() => cached);
    })
  );
});
