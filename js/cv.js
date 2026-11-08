/* ============================================================
   cv.js — bouton « CV » dans la navbar (toutes les pages)

   - « CV »         : affiche le CV dans une fenêtre (ordinateur : le PDF est
                      intégré ; téléphone : boutons Afficher / Télécharger,
                      car les PDF intégrés s'y affichent mal)
   - icône ⬇        : télécharge directement le fichier (ordinateur)

   Pour changer de fichier : modifie CV.file / CV.downloadName ci-dessous.
   Place ton PDF dans le dossier  cv/  à la racine du site.
   ============================================================ */
(function () {
  "use strict";

  const CV = {
    file: "cv/CV_Axel_Gathelier.pdf",          // chemin du PDF
    downloadName: "CV_Axel_Gathelier.pdf"      // nom proposé au téléchargement
  };

  const list = document.querySelector(".navbar ul");
  if (!list) return;

  const root = document.documentElement;
  const canEmbed =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    navigator.pdfViewerEnabled !== false;
  const hasDialog = typeof HTMLDialogElement === "function";

  /* ---------- Boutons de la navbar ---------- */
  const li = document.createElement("li");
  li.className = "nav-cv";
  li.innerHTML =
    `<a class="cv-view" href="${CV.file}" target="_blank" rel="noopener" aria-haspopup="dialog">CV</a>` +
    `<a class="cv-dl" href="${CV.file}" download="${CV.downloadName}" aria-label="Télécharger mon CV" title="Télécharger mon CV">` +
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>' +
    "</a>";
  list.appendChild(li);

  if (!hasDialog) return;   // anciens navigateurs : le lien ouvre simplement le PDF dans un onglet

  /* ---------- Fenêtre d'affichage ---------- */
  const dlg = document.createElement("dialog");
  dlg.className = "cv-dialog";
  dlg.setAttribute("aria-labelledby", "cv-title");
  dlg.innerHTML =
    '<div class="cv-head">' +
      '<h2 id="cv-title">Mon CV</h2>' +
      '<div class="cv-actions">' +
        `<a class="btn" href="${CV.file}" download="${CV.downloadName}">Télécharger</a>` +
        `<a class="btn" href="${CV.file}" target="_blank" rel="noopener">Nouvel onglet</a>` +
        '<button type="button" class="btn cv-close" aria-label="Fermer">✕</button>' +
      "</div>" +
    "</div>" +
    '<div class="cv-body"></div>';
  document.body.appendChild(dlg);

  const body = dlg.querySelector(".cv-body");
  let built = false;

  async function fileExists() {
    try {
      const r = await fetch(CV.file, { method: "HEAD", cache: "no-store" });
      return r.ok;
    } catch (e) {
      return true;
    }
  }

  async function build() {
    if (built) return;
    built = true;
    if (!(await fileExists())) {
      dlg.classList.add("is-compact");
      body.innerHTML = '<p class="cv-missing">Mon CV sera bientôt disponible ici.</p>';
      dlg.querySelector(".cv-actions").querySelectorAll(".btn:not(.cv-close)").forEach(a => { a.hidden = true; });
      return;
    }
    if (canEmbed) {
      const frame = document.createElement("iframe");
      frame.title = "Aperçu du CV";
      frame.src = CV.file + "#view=FitH";
      body.appendChild(frame);
      // les boutons sont déjà dans l'en-tête de la fenêtre
    } else {
      dlg.classList.add("is-compact");
      body.innerHTML =
        '<div class="cv-mobile">' +
          "<p>Choisis comment consulter mon CV :</p>" +
          `<a class="btn btn-accent" href="${CV.file}" target="_blank" rel="noopener">Afficher le CV</a>` +
          `<a class="btn" href="${CV.file}" download="${CV.downloadName}">Télécharger (PDF)</a>` +
        "</div>";
      dlg.querySelectorAll(".cv-actions .btn:not(.cv-close)").forEach(a => { a.hidden = true; });
    }
  }

  function open() {
    build();
    root.classList.add("modal-open");
    dlg.showModal();
  }

  li.querySelector(".cv-view").addEventListener("click", e => {
    // clic « spécial » (nouvel onglet, etc.) : comportement normal du navigateur
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    open();
  });

  dlg.querySelector(".cv-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => root.classList.remove("modal-open"));
})();
