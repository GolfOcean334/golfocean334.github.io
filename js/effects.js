/* ============================================================
   effects.js — effets visuels de l'accueil et de la liste de projets
     1. cartes qui s'épinglent à l'apparition
     2. ficelle rouge entre les punaises
     3. aperçu animé au survol des cartes
     4. chiffres qui comptent au scroll
     5. décor dessiné autour du hero (config : js/decor.js)
   À charger APRÈS render.js et rotations.js.
   ============================================================ */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasIO = "IntersectionObserver" in window;
  const raf = window.requestAnimationFrame.bind(window);
  const isShown = el => !el.closest("[hidden]");

  /* ============ 1. CARTES QUI S'ÉPINGLENT ============
     Au premier affichage, chaque carte tombe, rebondit et sa punaise
     s'enfonce (voir @keyframes pin-drop / pin-press dans styles.css).
     L'état « en attente » est posé ici : sans JS, les cartes restent visibles. */
  (function pinCards() {
    const cards = Array.from(document.querySelectorAll(".project"));
    if (!cards.length || !hasIO || reduced) return;

    cards.forEach(c => c.classList.add("pin-wait"));
    const io = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      visible.forEach((e, i) => {
        const card = e.target;
        card.style.setProperty("--pin-delay", (i * 0.12) + "s");
        card.classList.remove("pin-wait");
        card.classList.add("is-pinned");
        io.unobserve(card);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    cards.forEach(c => io.observe(c));
  })();

  /* ============ 2. FICELLE ROUGE ============
     Deux calques SVG par grille :
       - « front » : relie les cartes d'une même rangée, par-dessus les cartes
       - « back »  : relie une rangée à la suivante, passe derrière les cartes
     Chaque fil se dessine quand la carte d'arrivée entre à l'écran. */
  (function strings() {
    const containers = Array.from(document.querySelectorAll(".projects-container, .projects-list"));
    if (!containers.length) return;

    const NS = "http://www.w3.org/2000/svg";
    const drawn = new Set();          // fils déjà dessinés (clé « idA>idB »)
    const states = new Map();
    const scheduled = new Set();

    function makeLayer(container, cls) {
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "strings " + cls);
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      container.prepend(svg);
      return svg;
    }

    function setup(container) {
      const st = {
        back: makeLayer(container, "strings--back"),
        front: makeLayer(container, "strings--front"),
        pending: new Map(),
        io: null
      };
      if (hasIO && !reduced) {
        st.io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            st.io.unobserve(entry.target);
            const paths = st.pending.get(entry.target) || [];
            st.pending.delete(entry.target);
            // on attend que les deux cartes soient épinglées
            setTimeout(() => paths.forEach(p => {
              if (!p.isConnected) return;
              p.classList.add("drawn");
              drawn.add(p.dataset.key);
            }), 550);
          });
        }, { threshold: 0.25 });
      }
      states.set(container, st);
    }

    function pathEl(d, key) {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      p.setAttribute("pathLength", "1");
      p.dataset.key = key;
      return p;
    }

    function knot(x, y) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", x.toFixed(1));
      c.setAttribute("cy", y.toFixed(1));
      c.setAttribute("r", "3");
      c.setAttribute("class", "knot");
      return c;
    }

    function rebuild(container) {
      const st = states.get(container);
      if (!st) return;
      st.back.replaceChildren();
      st.front.replaceChildren();
      st.pending.clear();
      if (st.io) st.io.disconnect();

      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      [st.back, st.front].forEach(s => s.setAttribute("viewBox", `0 0 ${w} ${h}`));

      // centre de la punaise : -0.7rem + 10px sous le haut de la carte (voir .project-info::before)
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const pinDy = -0.7 * rem + 10;

      const pts = Array.from(container.querySelectorAll(":scope > .project"))
        .filter(isShown)
        .map(card => ({ card, x: card.offsetLeft + card.offsetWidth / 2, y: card.offsetTop + pinDy }));

      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const sameRow = Math.abs(a.y - b.y) < a.card.offsetHeight * 0.5;
        const dist = Math.hypot(b.x - a.x, b.y - a.y);
        const sag = sameRow ? Math.min(30, 8 + dist * 0.03) : Math.min(90, 24 + dist * 0.06);
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2 + sag * 2;       // contrôle d'une quadratique : creux = sag
        const d = `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
        const key = a.card.dataset.id + ">" + b.card.dataset.id;
        const path = pathEl(d, key);
        const layer = sameRow ? st.front : st.back;
        layer.appendChild(path);
        if (sameRow) { layer.appendChild(knot(a.x, a.y)); layer.appendChild(knot(b.x, b.y)); }

        if (!st.io || drawn.has(key)) {
          path.classList.add("drawn");
        } else {
          const list = st.pending.get(b.card) || [];
          list.push(path);
          st.pending.set(b.card, list);
          st.io.observe(b.card);
        }
      }
    }

    function schedule(container) {
      if (scheduled.has(container)) return;
      scheduled.add(container);
      raf(() => { scheduled.delete(container); rebuild(container); });
    }

    containers.forEach(c => { setup(c); schedule(c); });

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(entries => entries.forEach(e => schedule(e.target)));
      containers.forEach(c => ro.observe(c));
    }
    window.addEventListener("load", () => containers.forEach(schedule));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => containers.forEach(schedule));

    // pendant le filtrage animé : on masque les fils puis on les redessine
    document.addEventListener("portfolio:filter", e => {
      if (e.detail.phase === "start") {
        containers.forEach(c => c.classList.add("strings-off"));
      } else {
        containers.forEach(c => { rebuild(c); });
        raf(() => raf(() => containers.forEach(c => c.classList.remove("strings-off"))));
      }
    });
  })();

  /* ============ 3. APERÇU ANIMÉ AU SURVOL ============
     La carte porte data-preview="images/.../preview.webm" (champ `preview`
     dans projects.js). Le fichier est sondé quand la carte devient visible :
     s'il existe, un badge « ▶ Aperçu » apparaît et la vidéo joue au survol
     (souris/clavier) ou quand la carte est bien visible (écran tactile). */
  (function previews() {
    const thumbs = Array.from(document.querySelectorAll(".thumb[data-preview]"));
    if (!thumbs.length) return;
    const VIDEO = /\.(mp4|webm|ogv|mov)(\?.*)?$/i;
    const items = new Map();

    thumbs.forEach(thumb => {
      const src = thumb.dataset.preview;
      const isVideo = VIDEO.test(src);
      let media = null;
      let failed = false;

      function create() {
        if (media || failed) return;
        if (isVideo) {
          media = document.createElement("video");
          media.muted = true;
          media.loop = true;
          media.playsInline = true;
          media.preload = "metadata";
          media.tabIndex = -1;
          media.addEventListener("loadedmetadata", () => thumb.classList.add("has-preview"));
        } else {
          media = new Image();
          media.alt = "";
          media.decoding = "async";
          media.addEventListener("load", () => thumb.classList.add("has-preview"));
        }
        media.className = "project-preview";
        media.setAttribute("aria-hidden", "true");
        media.addEventListener("error", () => {
          failed = true;
          if (media) media.remove();
          media = null;
          thumb.classList.remove("has-preview", "is-playing");
        });
        media.src = src;
        thumb.appendChild(media);
      }

      function play() {
        create();
        if (!media) return;
        if (isVideo) { const p = media.play(); if (p && p.catch) p.catch(() => {}); }
        thumb.classList.add("is-playing");
      }

      function stop() {
        if (!media) return;
        if (isVideo) { media.pause(); media.currentTime = 0; }
        thumb.classList.remove("is-playing");
      }

      items.set(thumb, { create, play, stop });

      const card = thumb.closest(".project");
      if (card && canHover) {
        card.addEventListener("mouseenter", play);
        card.addEventListener("mouseleave", stop);
        card.addEventListener("focusin", play);
        card.addEventListener("focusout", stop);
      }
    });

    if (hasIO) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const it = items.get(entry.target);
          if (!it) return;
          if (entry.isIntersecting) it.create();
          // écran tactile : lecture quand la carte est bien visible
          if (!canHover && !reduced) (entry.intersectionRatio >= 0.6 ? it.play() : it.stop());
        });
      }, { threshold: [0, 0.6], rootMargin: "150px 0px" });
      thumbs.forEach(t => io.observe(t));
    }
  })();

  /* ============ 4. CHIFFRES QUI COMPTENT ============
     Les valeurs sont calculées depuis PROJECTS : elles se mettent à jour
     toutes seules quand tu ajoutes ou retires un projet. */
  (function counters() {
    const box = document.querySelector(".stats");
    if (!box || typeof PROJECTS === "undefined") return;

    const list = PROJECTS.filter(p => p.visible !== false);
    const values = {
      projects: { n: list.length, one: "projet réalisé", many: "projets réalisés" },
      techs:    { n: new Set(list.flatMap(p => p.tech || [])).size, one: "technologie", many: "technologies" },
      jams:     { n: list.filter(p => p.category === "jam").length, one: "game jam", many: "game jams" },
      pro:      { n: list.filter(p => p.category === "pro").length, one: "projet en entreprise", many: "projets en entreprise" }
    };

    const targets = [];
    box.querySelectorAll(".stat[data-stat]").forEach(stat => {
      const v = values[stat.dataset.stat];
      if (!v || v.n === 0) { stat.hidden = true; return; }
      stat.querySelector(".stat-label").textContent = v.n > 1 ? v.many : v.one;
      const num = stat.querySelector(".stat-num");
      num.textContent = (hasIO && !reduced) ? "0" : String(v.n);
      targets.push({ num, n: v.n });
    });
    box.classList.add("is-ready");
    if (!hasIO || reduced) return;

    function countUp(el, target) {
      const start = performance.now();
      const duration = 1300;
      const step = now => {
        const t = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf(step);
      };
      raf(step);
    }

    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      targets.forEach((t, i) => setTimeout(() => countUp(t.num, t.n), i * 120));
    }, { threshold: 0.4 });
    io.observe(box);
  })();

  /* ============ 5. DÉCOR DESSINÉ DU HERO ============
     Les dessins sont décrits dans js/decor.js. Une image introuvable est
     simplement ignorée. Léger parallaxe à la souris + flottement. */
  (function decor() {
    const root = document.getElementById("hero-decor");
    if (!root || typeof DECOR === "undefined") return;
    const dir = typeof DECOR_DIR !== "undefined" ? DECOR_DIR : "";
    const rand = (min, max) => min + Math.random() * (max - min);

    DECOR.forEach((d, i) => {
      const wrap = document.createElement("span");
      wrap.className = "deco";
      wrap.dataset.mobile = d.mobile ? "true" : "false";
      if (d.mobile && typeof d.mobile === "object") {
        wrap.style.setProperty("--mx0", d.mobile.x);
        wrap.style.setProperty("--my0", d.mobile.y);
      }
      wrap.style.setProperty("--x", d.x);
      wrap.style.setProperty("--y", d.y);
      wrap.style.setProperty("--size", d.size || 100);
      wrap.style.setProperty("--rot", d.rot || 0);
      wrap.style.setProperty("--depth", d.depth == null ? 14 : d.depth);
      wrap.style.setProperty("--in", (0.25 + i * 0.1) + "s");
      wrap.style.setProperty("--dur", rand(5, 8).toFixed(1) + "s");
      wrap.style.setProperty("--delay", (-rand(0, 6)).toFixed(1) + "s");

      const body = document.createElement("span");
      body.className = "deco-body";
      const img = new Image();
      img.alt = "";
      img.decoding = "async";
      img.addEventListener("error", () => wrap.remove(), { once: true });
      img.src = dir + d.src;
      body.appendChild(img);
      wrap.appendChild(body);
      root.appendChild(wrap);
    });

    if (!canHover || reduced) return;
    const hero = root.parentElement;
    let px = 0, py = 0, ticking = false;
    const apply = () => {
      root.style.setProperty("--mx", px.toFixed(3));
      root.style.setProperty("--my", py.toFixed(3));
      ticking = false;
    };
    hero.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!ticking) { ticking = true; raf(apply); }
    });
    hero.addEventListener("pointerleave", () => { px = 0; py = 0; raf(apply); });
  })();
})();
