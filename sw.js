const CACHE_NAME = 'vanya-2026-7fe430b5fc2b';
const CORE_ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {return cache.addAll(CORE_ASSETS);}).then(function() {return self.skipWaiting();}));
});
self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(names) {return Promise.all(names.filter(function(n){return n.startsWith('vanya-2026-') && n !== CACHE_NAME;}).map(function(n) {return caches.delete(n);}));}).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch', function(event) {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(function(){return caches.match('./index.html');}));
  } else {
    event.respondWith(caches.match(req).then(function(cached){return cached || fetch(req);}));
  }
});
