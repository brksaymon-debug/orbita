/*! Orbita mobile TikTok conversion enhance */
(function () {
  try {
    if (!(window.matchMedia && window.matchMedia('(max-width:760px)').matches)) return;
  } catch (e) {
    return;
  }

  /* Contacts: calls +7 913 763-77-47, MAX messenger (the only messenger). The order button opens the request form,
     whose «Связь» card carries the MAX / call buttons. */

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function openContactPanel(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (typeof window.ORBITA_openContact === 'function') {
      window.ORBITA_openContact(e, true);
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

  function openOrder(e) {
    openContactPanel(e);
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

    window.ORBITA_openOrder = openOrder;
  });
})();
