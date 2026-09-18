/* Pilar Gottert portfolio — shared theme & language toggle logic.
   Loaded on every page alongside theme.css. */

(function () {
  // ---- Dark / light theme ----
  // (The actual attribute is set earlier, inline in <head>, to avoid a
  // flash of the wrong theme before this file loads. This just wires
  // up the button.)
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function initThemeToggle() {
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  }

  // ---- Language toggle (EN / ES) ----
  function applyLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var text = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
      if (text !== null) el.textContent = text;
    });
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-current').forEach(function (el) {
      el.textContent = lang.toUpperCase();
    });
  }

  function initLanguageToggle() {
    var saved = localStorage.getItem('lang') || 'en';
    applyLanguage(saved);
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = localStorage.getItem('lang') || 'en';
        applyLanguage(current === 'en' ? 'es' : 'en');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initLanguageToggle();

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Puzzle-carousel arrows (harmless no-op on pages without any)
    document.querySelectorAll('.car-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var track = document.getElementById(btn.dataset.target);
        if (!track) return;
        var slideWidth = track.clientWidth;
        track.scrollBy({ left: btn.classList.contains('next') ? slideWidth : -slideWidth, behavior: 'smooth' });
      });
    });
  });
})();
