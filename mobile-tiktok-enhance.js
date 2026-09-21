/*! Orbita mobile TikTok conversion enhance */
(function(){
  try {
    if (!(window.matchMedia && window.matchMedia('(max-width:760px)').matches)) return;
  } catch (e) { return; }

  /* Easy to edit — no public WA/TG on site yet */
  var ORBITA_WA = 'https://wa.me/79000000000'; // TODO: реальный номер
  var ORBITA_TG = 'https://t.me/orbita_agency'; // TODO: реальный @ник

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function(){
    document.documentElement.classList.add('is-app-mobile');

    /* 1) Soft price line under intro cover lead */
    var cover = document.getElementById('ttIntroCover');
    if (cover) {
      var lead = cover.querySelector('.tt-intro-lead');
      if (lead && !cover.querySelector('.tt-intro-meta')) {
        var meta = document.createElement('p');
        meta.className = 'tt-intro-meta';
        meta.textContent = 'от 12 000 ₽ · от нескольких дней';
        lead.insertAdjacentElement('afterend', meta);
      }
    }

    /* 2) Order sheet (WA + TG) */
    var orderSheet = document.getElementById('appOrderSheet');
    if (!orderSheet) {
      orderSheet = document.createElement('div');
      orderSheet.className = 'app-order-sheet';
      orderSheet.id = 'appOrderSheet';
      orderSheet.hidden = true;
      orderSheet.innerHTML =
        '<div class="app-order-sheet-card">'+
          '<div class="app-order-sheet-head">Заказать</div>'+
          '<a class="app-order-opt is-wa" id="orbitaWaLink" href="'+ORBITA_WA+'" target="_blank" rel="noopener">WhatsApp<span>Написать в WhatsApp</span></a>'+
          '<a class="app-order-opt is-tg" id="orbitaTgLink" href="'+ORBITA_TG+'" target="_blank" rel="noopener">Telegram<span>Написать в Telegram</span></a>'+
          '<button type="button" class="app-order-close" id="appOrderClose">Закрыть</button>'+
        '</div>';
      document.body.appendChild(orderSheet);
    } else {
      var wa = document.getElementById('orbitaWaLink');
      var tg = document.getElementById('orbitaTgLink');
      if (wa) wa.href = ORBITA_WA;
      if (tg) tg.href = ORBITA_TG;
    }

    function closeOrderSheet(){ if (orderSheet) orderSheet.hidden = true; }
    function openOrderSheet(e){
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (orderSheet) orderSheet.hidden = false;
    }
    window.ORBITA_openOrder = openOrderSheet;

    var orderClose = document.getElementById('appOrderClose');
    if (orderClose) orderClose.addEventListener('click', closeOrderSheet);
    orderSheet.addEventListener('click', function(e){ if (e.target === orderSheet) closeOrderSheet(); });

    /* Dock: order opens sheet; do not break other items */
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('.app-dock-item[data-dock="order"]');
      if (!a) return;
      openOrderSheet(e);
    }, true);

    /* 3) Mid-feed CTA: convert 3rd video slide in-place (keeps slides[] in sync) */
    var feed = document.getElementById('ttFeed');
    if (!feed) return;

    function applyCta(){
      if (feed.querySelector('[data-cta="1"]')) return;
      var vids = [];
      feed.querySelectorAll('.tt-slide').forEach(function(s){
        if (s.dataset.intro === '1') return;
        if (s.classList.contains('tt-cta')) return;
        if (s.querySelector('video')) vids.push(s);
      });
      if (feed.querySelector('[data-cta="1"]')) return;
      if (vids.length < 3) return;
      var target = vids[2];
      try { var v = target.querySelector('video'); if (v) v.pause(); } catch(_){}
      target.className = 'tt-slide tt-cta';
      target.dataset.intro = '1';
      target.dataset.cta = '1';
      target.innerHTML =
        '<div class="tt-cta-title">Нужен такой же ролик?</div>'+
        '<p class="tt-cta-sub">Соберём под ваш бренд — от брифа до мастера</p>'+
        '<button type="button" class="tt-cta-btn">Заказать</button>';
    }

    var obs = new MutationObserver(function(){ applyCta(); });
    obs.observe(feed, { childList: true, subtree: false });
    applyCta();
    setTimeout(applyCta, 400);
    setTimeout(applyCta, 1200);

    feed.addEventListener('click', function(e){
      var slide = e.target.closest && e.target.closest('.tt-slide.tt-cta, .tt-slide[data-cta="1"]');
      if (!slide) return;
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
      if (e.target.closest && e.target.closest('.tt-cta-btn')) openOrderSheet(e);
    }, true);
  });
})();
