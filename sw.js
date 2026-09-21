const CACHE='orbita-app-v2';
self.addEventListener('install', e=>{ e.waitUntil(self.skipWaiting()); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  // network-first for HTML, cache-first optional offline shell
  const req=e.request;
  if(req.method!=='GET') return;
  e.respondWith(fetch(req).catch(()=>caches.match(req)));
});
