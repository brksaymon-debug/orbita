/*! Orbita mobile TikTok conversion enhance */
(function () {
  try {
    if (!(window.matchMedia && window.matchMedia('(max-width:760px)').matches)) return;
  } catch (e) {
    return;
  }

  /* Empty = disabled. Prefer contact form until real links exist. */
  var ORBITA_WA = '';
  var ORBITA_TG = '';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function openContactPanel(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (typeof window.ORBITA_openContact === 'function') {
      window.ORBITA_openContact(e);
      return;
    }
    var contact = document.getElementById('contact');
    var prices = document.getElementById('prices');
    var sheet = document.getElementById('appSvcSheet');
    if (sheet) sheet.hidden = true;
    if (prices) prices.classList.remove('app-panel-open');
    if (contact) {
      contact.classList.add('app-panel-open');
      contact.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      try { history.replaceState(null, '', '#contact'); } catch (_) {}
      setTimeout(function () {
        var phone = contact.querySelector('input[name="phone"]');
        if (phone) phone.focus();
      }, 200);
    } else {
      try { location.hash = '#contact'; } catch (_) {}
    }
  }

  function waReady() {
    return !!(ORBITA_WA && /^https:\/\/(wa\.me|api\.whatsapp\.com)\/\d{10,15}/.test(ORBITA_WA));
  }
  function tgReady() {
    return !!(ORBITA_TG && /^https:\/\/t\.me\/[A-Za-z0-9_]+/.test(ORBITA_TG));
  }

  function openOrder(e) {
    if (!waReady() && !tgReady()) {
      openContactPanel(e);
      return;
    }
    if (e) { e.preventDefault(); e.stopPropagation(); }
    var orderSheet = document.getElementById('appOrderSheet');
    if (orderSheet) orderSheet.hidden = false;
  }

  ready(function () {
    document.documentElement.classList.add('is-app-mobile');

    /* Soft price line under intro cover lead (no-op if already baked) */
    var cover = document.getElementById('ttIntroCover');
    if (cover) {
      var lead = cover.querySelector('.tt-intro-lead');
      if (lead && !cover.querySelector('.tt-intro-meta')) {
        var meta = document.createElement('p');
        meta.className = 'tt-intro-meta';
        meta.textContent = '\u043e\u0442 12 000 \u20bd \u00b7 \u043e\u0442 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0434\u043d\u0435\u0439';
        lead.insertAdjacentElement('afterend', meta);
      }
    }

    /* Order sheet only when real WA/TG exist \u2014 otherwise contact form */
    if (waReady() || tgReady()) {
      var orderSheet = document.getElementById('appOrderSheet');
      if (!orderSheet) {
        orderSheet = document.createElement('div');
        orderSheet.className = 'app-order-sheet';
        orderSheet.id = 'appOrderSheet';
        orderSheet.hidden = true;
        var opts = '';
        if (waReady())
          opts += '<a class="app-order-opt is-wa" id="orbitaWaLink" href="'+ORBITA_WA+'" target="_blank" rel="noopener">WhatsApp<span>\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 WhatsApp</span></a>';
        if (tgReady())
          opts += '<a class="app-order-opt is-tg" id="orbitaTgLink" href="'+ORBITA_TG+'" target="_blank" rel="noopener">Telegram<span>\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 Telegram</span></a>';
        orderSheet.innerHTML =
          '<div class="app-order-sheet-card">'+
          '<div class="app-order-sheet-head">\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c</div>'+
          opts +
          '<button type="button" class="app-order-close" id="appOrderClose">\u0417\u0430\u043a\u0440\u044b\u0442\u044c</button>'+
          '</div>';
        document.body.appendChild(orderSheet);
      }
      var orderClose = document.getElementById('appOrderClose');
      if (orderClose) orderClose.addEventListener('click', function () { orderSheet.hidden = true; });
      orderSheet.addEventListener('click', function (e) { if (e.target === orderSheet) orderSheet.hidden = true; });
    }

    window.ORBITA_openOrder = openOrder;
  });
})();
