/* Kala Art Wrap — light / dark theme.
   Load this synchronously in <head> so the saved theme applies before first paint. */
(function () {
  var KEY = 'kala-theme';
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var theme = saved === 'light' || saved === 'dark' ? saved : 'dark'; // brand default: dark
  root.setAttribute('data-theme', theme);

  function metaColor(t) {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#f7efe9' : '#12090b');
  }
  function syncButtons(t) {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(t === 'light'));
      btns[i].setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      btns[i].title = t === 'light' ? 'Dark theme' : 'Light theme';
    }
  }
  function set(t) {
    root.classList.add('theme-swap');
    root.setAttribute('data-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    metaColor(t);
    syncButtons(t);
    setTimeout(function () { root.classList.remove('theme-swap'); }, 450);
    window.dispatchEvent(new CustomEvent('kala:theme', { detail: t }));
  }
  window.KalaTheme = {
    get: function () { return root.getAttribute('data-theme'); },
    set: set,
    toggle: function () { set(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'); }
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (b) { e.preventDefault(); window.KalaTheme.toggle(); }
  });
  document.addEventListener('DOMContentLoaded', function () { metaColor(theme); syncButtons(theme); });
})();
