const CACHE='orbita-app-v3-intro';
self.addEventListener('install', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  // always network for HTML/JS/CSS
  e.respondWith(fetch(req, {cache:'no-store'}).catch(()=>caches.match(req)));
});
