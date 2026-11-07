/* ============================================================
   transitions.js — transitions entre les pages

   Navigateurs récents (Chrome, Edge, Safari 18.2+) : transition native
   (règle @view-transition dans styles.css), rien à faire ici.

   Autres navigateurs (ex. Firefox) : repli en fondu — la page s'estompe
   au clic sur un lien interne, la suivante apparaît en fondu (CSS :
   classe .no-vt posée dans le <head>).
   ============================================================ */
(function () {
  "use strict";

  if (!document.documentElement.classList.contains("no-vt")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;

    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // ancre ou même page

    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { location.href = url.href; }, 220);
  });

  // retour arrière (cache du navigateur) : on réaffiche la page
  window.addEventListener("pageshow", e => {
    if (e.persisted) document.body.classList.remove("is-leaving");
  });
})();
