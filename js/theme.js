/* ============================================================
   theme.js — mode nuit
   - bouton lune/soleil injecté dans la navbar (toutes les pages)
   - choix mémorisé (localStorage) ; le script en <head> l'applique
     avant l'affichage pour éviter un flash de la mauvaise couleur
   - en mode nuit, une « lampe » suit la souris (ordinateur uniquement)
   ============================================================ */
(function () {
  "use strict";

  const KEY = "portfolio-theme";
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const raf = window.requestAnimationFrame.bind(window);

  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const save = v => { try { localStorage.setItem(KEY, v); } catch (e) { /* stockage indisponible */ } };
  const isNight = () => root.getAttribute("data-theme") === "night";

  /* ---------- Lampe torche ---------- */
  let lamp = null;
  let tx = window.innerWidth / 2, ty = window.innerHeight * 0.35;
  let cx = tx, cy = ty, running = false;

  function paintLamp() {
    lamp.style.setProperty("--lx", cx.toFixed(1) + "px");
    lamp.style.setProperty("--ly", cy.toFixed(1) + "px");
  }

  function loop() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    paintLamp();
    if ((Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) && isNight()) raf(loop);
    else running = false;
  }

  function ensureLamp() {
    if (lamp || !finePointer) return;
    lamp = document.createElement("div");
    lamp.className = "night-light";
    lamp.setAttribute("aria-hidden", "true");
    document.body.appendChild(lamp);
    paintLamp();
    window.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!isNight()) return;
      if (reduced) { cx = tx; cy = ty; paintLamp(); return; }
      if (!running) { running = true; raf(loop); }
    }, { passive: true });
  }

  /* ---------- Bouton ---------- */
  let btn = null;
  const list = document.querySelector(".navbar ul");
  if (list) {
    const li = document.createElement("li");
    li.className = "nav-tool";
    li.innerHTML =
      '<button type="button" class="theme-toggle" aria-pressed="false" aria-label="Mode nuit" title="Activer le mode nuit">' +
        '<svg class="icon-moon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a.6.6 0 0 0-.8-.7A9.5 9.5 0 1 0 21.2 15a.6.6 0 0 0-.7-.8z"/></svg>' +
        '<svg class="icon-sun" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7"/></g></svg>' +
      '</button>';
    list.appendChild(li);
    btn = li.firstElementChild;
    btn.addEventListener("click", () => {
      const next = isNight() ? "day" : "night";
      apply(next, true);
      save(next);
    });
  }

  let animTimer = null;
  function apply(theme, animate) {
    if (animate && !reduced) {
      root.classList.add("theme-anim");
      clearTimeout(animTimer);
      animTimer = setTimeout(() => root.classList.remove("theme-anim"), 650);
    }
    const night = theme === "night";
    if (night) { root.setAttribute("data-theme", "night"); ensureLamp(); }
    else root.removeAttribute("data-theme");

    if (btn) {
      btn.setAttribute("aria-pressed", String(night));
      btn.title = night ? "Revenir au mode jour" : "Activer le mode nuit";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", night ? "#2B1E14" : "#A0784A");
  }

  apply(read() === "night" ? "night" : "day", false);
})();
