/* ============================================================
   render.js — génère l'accueil (vedettes), la liste et les fiches
   à partir de PROJECTS (js/projects.js). Rien à modifier ici
   pour ajouter ou retirer un projet.
   ============================================================ */
(function () {
  "use strict";
  if (typeof PROJECTS === "undefined") return;

  const CATS = {
    pro:   { label: "Expérience professionnelle", badge: "Pro" },
    ecole: { label: "Projets d'école",            badge: "École" },
    jam:   { label: "Game jams",                  badge: "Game jam" },
    perso: { label: "Projets personnels",         badge: "Perso" }
  };
  const CAT_ORDER = ["pro", "ecole", "jam", "perso"];
  const TECH_LABEL = { Unity: "Unity", Unreal: "Unreal Engine", CSharp: "C#", "C++": "C++", Python: "Python" };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const projects = PROJECTS.filter(p => p.visible !== false);

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const detailUrl = p => "projet.html?id=" + encodeURIComponent(p.id);
  const isShown = el => !el.closest("[hidden]");

  function tagsHtml(p) {
    const tech = (p.tech || []).map(t => `<span class="scotch" data-lang="${esc(t)}">${esc(TECH_LABEL[t] || t)}</span>`);
    const extra = (p.extra || []).map(t => `<span class="scotch">${esc(t)}</span>`);
    const all = tech.concat(extra);
    return all.length ? `<div class="tags">${all.join("")}</div>` : "";
  }

  /* Retire une image introuvable au lieu d'afficher une icône cassée */
  function dropBrokenImages(root) {
    root.querySelectorAll("img").forEach(img => {
      const remove = () => {
        const thumb = img.closest(".thumb");
        if (thumb) { thumb.remove(); return; }
        const media = img.closest(".project-media");
        img.remove();
        if (media && !media.querySelector("img, video")) {
          media.closest(".project-details")?.classList.add("project-details--solo");
          media.remove();
        }
      };
      img.addEventListener("error", remove, { once: true });
      if (img.complete && img.naturalWidth === 0) remove();
    });
  }

  /* ---------- Carte projet (liste + accueil) ---------- */
  function cardHtml(p, level) {
    const h = level || "h2";
    const company = p.category === "pro" && p.pro
      ? `<p class="project-company">${esc(p.pro.type || "Pro")} · ${esc(p.pro.company)}</p>` : "";
    const thumb = p.cover
      ? `<div class="thumb"${p.preview ? ` data-preview="${esc(p.preview)}"` : ""}>
           <img src="${esc(p.cover)}" alt="${esc(p.title)}" class="project-thumbnail" loading="lazy">
         </div>` : "";
    return `
      <article class="project card" data-id="${esc(p.id)}" data-cat="${esc(p.category)}" data-tech="${esc((p.tech || []).join(","))}">
        <div class="project-info">
          <${h} class="project-title"><a href="${detailUrl(p)}">${esc(p.title)}</a></${h}>
          <div><span class="badge" data-cat="${esc(p.category)}">${esc((CATS[p.category] || CATS.perso).badge)}</span></div>
          ${company}
          ${tagsHtml(p)}
          ${thumb}
          <p>${esc(p.summary)}</p>
          <a href="${detailUrl(p)}" class="btn">Voir le projet</a>
        </div>
      </article>`;
  }

  /* ---------- Décalages "à la main" des cartes visibles ---------- */
  function stagger(container) {
    const visible = Array.from(container.querySelectorAll(".project")).filter(c => !c.hidden);
    visible.forEach((c, i) => {
      c.classList.remove("is-s1", "is-s2", "is-s3");
      if (i % 3 === 0) c.classList.add("is-s1");
      else if (i % 3 === 1) c.classList.add("is-s2");
      if ((i + 1) % 5 === 0) c.classList.add("is-s3");
    });
  }

  /* ============ ACCUEIL : projets en vedette ============ */
  const featuredRoot = document.getElementById("featured-list");
  if (featuredRoot) {
    const featured = projects.filter(p => p.featured);
    featuredRoot.innerHTML = featured.map(p => cardHtml(p, "h3")).join("");
    dropBrokenImages(featuredRoot);
  }

  /* ============ LISTE : groupes par catégorie + filtres ============ */
  const listRoot = document.getElementById("projects-root");
  if (listRoot) {
    const catFilter = document.getElementById("category-filter");
    const techFilter = document.getElementById("language-filter");
    const empty = document.getElementById("no-result");

    listRoot.innerHTML = CAT_ORDER
      .map(cat => {
        const items = projects.filter(p => p.category === cat);
        if (!items.length) return "";
        return `
          <section class="project-group reveal" data-cat="${cat}" aria-labelledby="g-${cat}">
            <h2 class="group-title" id="g-${cat}">${esc(CATS[cat].label)}</h2>
            <div class="projects-container">${items.map(p => cardHtml(p, "h3")).join("")}</div>
          </section>`;
      })
      .join("");
    dropBrokenImages(listRoot);

    const wait = ms => new Promise(r => setTimeout(r, ms));
    const canAnimate = typeof Element.prototype.animate === "function";
    let firstRun = true;
    let token = 0;
    let running = [];

    /* Filtrage avec réorganisation animée (technique FLIP) :
       1. les cartes qui partent s'estompent
       2. la grille est recalculée
       3. les cartes restantes glissent de leur ancienne à leur nouvelle place
       4. les nouvelles cartes s'épinglent
       On anime la propriété `translate`, indépendante de `transform`
       (utilisée par rotations.js), donc aucun conflit. */
    async function applyFilters() {
      const cat = catFilter ? catFilter.value : "all";
      const tech = techFilter ? techFilter.value : "all";
      const wants = card =>
        (cat === "all" || card.dataset.cat === cat) &&
        (tech === "all" || card.dataset.tech.split(",").includes(tech));

      const cards = Array.from(listRoot.querySelectorAll(".project"));
      const animate = !firstRun && !reduced && canAnimate;
      const mine = ++token;

      running.forEach(a => a.cancel());
      running = [];

      const before = new Map();
      if (animate) cards.forEach(c => { if (isShown(c)) before.set(c, c.getBoundingClientRect()); });

      document.dispatchEvent(new CustomEvent("portfolio:filter", { detail: { phase: "start" } }));

      /* 1. sortie en fondu */
      const leaving = animate ? cards.filter(c => before.has(c) && !wants(c)) : [];
      if (leaving.length) {
        const outs = leaving.map(c => c.animate(
          [{ opacity: 1, scale: "1" }, { opacity: 0, scale: "0.92" }],
          { duration: 200, easing: "ease-in", fill: "forwards" }
        ));
        running = outs;
        await Promise.all(outs.map(a => a.finished.catch(() => {})));
        if (mine !== token) return;
        outs.forEach(a => a.cancel());
        running = [];
      }

      /* 2. nouvelle disposition */
      let total = 0;
      listRoot.querySelectorAll(".project-group").forEach(group => {
        let shown = 0;
        group.querySelectorAll(".project").forEach(card => {
          const ok = wants(card);
          card.hidden = !ok;
          if (ok) shown++;
        });
        group.hidden = shown === 0;
        if (shown) group.classList.add("is-visible");
        total += shown;
        stagger(group.querySelector(".projects-container"));
      });
      if (empty) empty.hidden = total > 0;

      /* 3 + 4. glissement des cartes restantes, entrée des nouvelles */
      let entering = 0;
      if (animate) {
        cards.forEach(card => {
          if (card.hidden) return;
          const first = before.get(card);
          if (first) {
            const last = card.getBoundingClientRect();
            const dx = first.left - last.left;
            const dy = first.top - last.top;
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
              running.push(card.animate(
                [{ translate: `${dx}px ${dy}px` }, { translate: "0px 0px" }],
                { duration: 520, easing: "cubic-bezier(.22,.8,.24,1)" }
              ));
            }
          } else {
            card.classList.remove("pin-wait", "is-pinned");
            void card.offsetWidth;
            card.style.setProperty("--pin-delay", (entering++ * 0.07) + "s");
            card.classList.add("is-pinned");
          }
        });
        await wait(540 + entering * 70);
        if (mine !== token) return;
      }

      firstRun = false;
      document.dispatchEvent(new CustomEvent("portfolio:filter", { detail: { phase: "end" } }));
    }

    [catFilter, techFilter].forEach(sel => sel && sel.addEventListener("change", () => { applyFilters(); }));
    applyFilters();
  }

  /* ============ FICHE : projet.html?id=... ============ */
  const detailRoot = document.getElementById("project-detail");
  if (detailRoot) {
    const id = new URLSearchParams(location.search).get("id");
    const index = projects.findIndex(p => p.id === id);
    const p = projects[index];

    if (!p) {
      document.title = "Projet introuvable - Mon Portfolio";
      detailRoot.innerHTML = `
        <a class="back-link" href="list_projects.html">← Tous les projets</a>
        <div class="project-details project-details--solo">
          <div class="structure">
            <h1 id="title-project">Projet introuvable</h1>
            <p class="text-center">Ce projet n'existe pas ou n'est plus affiché.</p>
            <div class="project-buttons mt-2"><a class="btn" href="list_projects.html">Voir tous les projets</a></div>
          </div>
        </div>`;
    } else {
      document.title = p.title + " - Mon Portfolio";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", p.summary);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", p.title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", p.summary);

      const pro = p.category === "pro" && p.pro ? `
        <div class="pro-meta">
          <p><strong>Entreprise</strong> : ${esc(p.pro.company)}</p>
          <p><strong>Rôle</strong> : ${esc(p.pro.role)}</p>
          <p><strong>Contexte</strong> : ${esc(p.pro.type)}</p>
        </div>` : "";

      const sections = (p.sections || []).map(s => {
        const texts = s.text ? [].concat(s.text).map(t => `<p>${t}</p>`).join("") : "";
        const list = s.list ? `<ul>${s.list.map(li => `<li>${li}</li>`).join("")}</ul>` : "";
        return `<section class="info-card"><h2>${esc(s.title)}</h2>${texts}${list}</section>`;
      }).join("");

      const L = p.links || {};
      const buttons = [
        L.play   ? `<a class="btn btn-accent" href="${esc(L.play)}">▶ Jouer</a>` : "",
        L.itch   ? `<a class="btn" href="${esc(L.itch)}" target="_blank" rel="noopener">Itch.io</a>` : "",
        L.github ? `<a class="btn" href="${esc(L.github)}" target="_blank" rel="noopener">GitHub</a>` : ""
      ].join("");
      const linksCard = buttons
        ? `<section class="info-card"><h2>Liens</h2><div class="project-buttons">${buttons}</div></section>` : "";

      const media = (p.media || []).map((m, i) => {
        if (typeof m === "string") {
          return `<img src="${esc(m)}" alt="${esc(p.title)} - capture ${i + 1}" loading="lazy">`;
        }
        return `<video controls preload="metadata"><source src="${esc(m.video)}" type="video/mp4">Votre navigateur ne supporte pas la lecture des vidéos.</video>`;
      }).join("");

      const prev = projects[index - 1];
      const next = projects[index + 1];
      const nav = `
        <nav class="project-nav" aria-label="Navigation entre projets">
          ${prev ? `<a class="btn" href="${detailUrl(prev)}">← ${esc(prev.title)}</a>` : ""}
          ${next ? `<a class="btn next" href="${detailUrl(next)}">${esc(next.title)} →</a>` : ""}
        </nav>`;

      detailRoot.innerHTML = `
        <a class="back-link" href="list_projects.html">← Tous les projets</a>
        <div class="project-details${media ? "" : " project-details--solo"}">
          <div class="structure">
            <h1 id="title-project">${esc(p.title)}</h1>
            <div class="project-meta">
              <span class="badge" data-cat="${esc(p.category)}">${esc((CATS[p.category] || CATS.perso).label)}</span>
              ${tagsHtml(p)}
            </div>
            ${pro}
            <div class="info-grid">${sections}${linksCard}</div>
          </div>
          ${media ? `<div class="project-media">${media}</div>` : ""}
        </div>
        ${nav}`;
      dropBrokenImages(detailRoot);

      /* Lightbox au clic sur une capture */
      detailRoot.addEventListener("click", e => {
        const img = e.target.closest(".project-media > img");
        if (!img) return;
        const box = document.createElement("div");
        box.className = "lightbox";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-label", "Image agrandie");
        box.innerHTML = `<img src="${esc(img.src)}" alt="${esc(img.alt)}">`;
        const close = () => { box.remove(); document.removeEventListener("keydown", onKey); };
        const onKey = ev => { if (ev.key === "Escape") close(); };
        box.addEventListener("click", close);
        document.addEventListener("keydown", onKey);
        document.body.appendChild(box);
      });
    }
  }
})();
