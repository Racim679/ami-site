/* Service worker minimal : compatible Vite (assets hashés). L’ancien SW mettait en cache
   index + URLs CRA (/static/js/bundle.js) → après deploy les anciens index.html
   pointaient vers des .js inexistants → écran blanc. */

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Toujours réseau d'abord : évite d’afficher un index.html obsolète avec d’anciens /assets/index-xxx.js
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
