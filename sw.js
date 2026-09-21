const CACHE='orbita-app-v3-intro-cta';
const ENHANCE_V='20260921215000';
self.addEventListener('install', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e=>{
  e.waitUntil(
    self.clients.claim().then(function(){
      return self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(clients){
        clients.forEach(function(c){ try { c.navigate(c.url); } catch(_){ } });
      });
    })
  );
});
self.addEventListener('fetch', e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  const isHtml = url.pathname.endsWith('.html') || url.pathname.endsWith('/') || /\/orbita(\/)?$/.test(url.pathname);
  if(!isHtml){
    e.respondWith(fetch(req, {cache:'no-store'}).catch(()=>caches.match(req)));
    return;
  }
  e.respondWith(
    fetch(req, {cache:'no-store'}).then(function(res){
      const ct=(res.headers.get('content-type')||'');
      if(!ct.includes('text/html')) return res;
      return res.text().then(function(body){
        if(body.indexOf('mobile-tiktok-enhance.js')>=0) return new Response(body,{status:res.status,statusText:res.statusText,headers:res.headers});
        const inj='<link rel="stylesheet" href="mobile-tiktok-enhance.css?v='+ENHANCE_V+'">'+'<script src="mobile-tiktok-enhance.js?v='+ENHANCE_V+'"><\/script></body>';
        const out=body.replace(/<\/body>/i, inj);
        const headers=new Headers(res.headers);
        headers.set('cache-control','no-store');
        return new Response(out,{status:res.status,statusText:res.statusText,headers:headers});
      });
    }).catch(()=>caches.match(req))
  );
});
