// Kauai Goatscaping: Pidgin mode toggle
(function () {
  'use strict';
  var KEY = 'pidgin-mode';

  function isOn() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  // Inject styles
  var s = document.createElement('style');
  s.textContent =
    '#pidgin-badge{position:fixed;top:68px;right:12px;background:#E07B39;color:#fff;' +
    'font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;z-index:9997;' +
    'letter-spacing:.04em;pointer-events:none;box-shadow:0 2px 8px rgba(0,0,0,.22);display:none;' +
    'font-family:Inter,sans-serif}' +
    '#pidgin-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
    'background:#2D6A4F;color:#fff;font-weight:700;padding:12px 26px;border-radius:999px;' +
    'z-index:9999;font-size:15px;box-shadow:0 4px 20px rgba(0,0,0,.28);' +
    'pointer-events:none;opacity:0;transition:opacity .4s ease;white-space:nowrap;' +
    'font-family:Inter,sans-serif}';
  document.head.appendChild(s);

  var badge = document.createElement('div');
  badge.id = 'pidgin-badge';
  badge.textContent = '🤙 Pidgin Mode';

  var toastEl = document.createElement('div');
  toastEl.id = 'pidgin-toast';

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.style.opacity = '0'; }, 2600);
  }

  function apply(on, showToast) {
    document.querySelectorAll('[data-pidgin]').forEach(function (el) {
      if (!el._std) el._std = el.innerHTML;
      el.innerHTML = on ? el.getAttribute('data-pidgin') : el._std;
    });

    document.body.classList.toggle('pidgin-mode', on);
    badge.style.display = on ? 'block' : 'none';

    ['pidgin-toggle', 'pidgin-toggle-mob', 'pidgin-hero-btn'].forEach(function (id) {
      var b = document.getElementById(id);
      if (!b) return;
      if (on) {
        b.innerHTML = '🇺🇸 Speak Proper';
        b.title = 'Switch back to standard English';
        if (id !== 'pidgin-hero-btn') b.style.cssText = 'border-color:#E07B39;color:#E07B39;';
      } else {
        b.innerHTML = '🤙 Speak Pidgin';
        b.title = 'What, you no unda stand those words? How dis!';
        if (id !== 'pidgin-hero-btn') b.style.cssText = '';
      }
    });

    if (showToast) {
      toast(on
        ? '🤙 Shoots! Now you talking like one local!'
        : '😄 Ok ok, back to talking all proper now');
    }
  }

  function toggle() {
    var next = !isOn();
    try { localStorage.setItem(KEY, next ? '1' : '0'); } catch (e) {}
    apply(next, true);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(badge);
    document.body.appendChild(toastEl);
    apply(isOn(), false);
    ['pidgin-toggle', 'pidgin-toggle-mob', 'pidgin-hero-btn'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener('click', toggle);
    });
  });
})();
