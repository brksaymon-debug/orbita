const CACHE='orbita-app-v7-perf';
self.addEventListener('install', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  // video Range requests stall if the worker rewrites them
  if (req.headers.has('range')) return;
  var dest = req.destination;
  if (dest === 'video' || dest === 'audio' || dest === 'image' || dest === 'font') return;
  // pages: always fresh from the network; other files use normal HTTP caching (versioned with ?v=)
  if (req.mode === 'navigate') e.respondWith(fetch(req, {cache:'no-store'}).catch(()=>caches.match(req)));
});
