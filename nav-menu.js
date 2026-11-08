// Phone menu (< 640px): the header's links live in a full-screen overlay
// opened by the menu button. From 640px up the button is hidden by CSS and
// the links sit in the header as usual, so none of this is ever triggered.
// Shared by index_work, terms-of-use and privacy-policy (same header).
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
  if (!nav) return;

  var root = document.documentElement;
  // Everything outside the header is made inert while the menu is open, so
  // Tab and screen readers stay inside the menu.
  var outside = Array.prototype.filter.call(document.body.children, function (el) {
    return el.tagName !== 'HEADER' && el.tagName !== 'SCRIPT';
  });

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(open, focusToggle) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    root.classList.toggle('nav-open', open);
    outside.forEach(function (el) { el.inert = open; });
    if (!open && focusToggle) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen(), false);
  });

  // A link closes the menu before the page's own anchor handler (added
  // later, on load) scrolls to the section — so the scroll lock and the
  // inert page are already gone by then. Registered on each link, not on
  // the nav, so it runs first.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (isOpen()) setOpen(false, false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) setOpen(false, true);
  });

  // Rotating a phone or widening the window past 640px closes it.
  window.matchMedia('(min-width: 640px)').addEventListener('change', function (e) {
    if (e.matches && isOpen()) setOpen(false, false);
  });
})();
