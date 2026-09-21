const CACHE='orbita-app-v4-baked';
self.addEventListener('install', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  e.respondWith(fetch(req, {cache:'no-store'}).catch(()=>caches.match(req)));
});
