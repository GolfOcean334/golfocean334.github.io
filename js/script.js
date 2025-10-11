document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".carousel").forEach(carousel => {
        let images = [
            "images/image1.jpg", "images/image2.jpg", "images/image3.jpg"
        ];
        let imgElement = carousel.querySelector(".carousel-image");
        let currentIndex = 0;

        carousel.querySelector(".next").addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % images.length;
            imgElement.src = images[currentIndex];
        });

        carousel.querySelector(".prev").addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            imgElement.src = images[currentIndex];
        });
    });
});

// Change la classe de la navbar après défilement
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Change la couleur du mot "highlight" au clic sur l'image de profil
document.addEventListener("DOMContentLoaded", () => {
    const profilePicture = document.getElementById("profile-picture");
    const highlightWord = document.getElementById("highlight-word");

    // Sécurise si l'élément n'existe pas sur cette page
    if (!profilePicture || !highlightWord) return;

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    profilePicture.addEventListener("click", () => {
        highlightWord.style.color = getRandomColor();
    });
});

// CTA Projets: toggle filtre + gestion de l’animation de la barre
document.addEventListener('DOMContentLoaded', () => {
  const projectsLink = document.getElementById('nav-projects-link');
  const filterContainer = document.getElementById('filter-container');
  if (!projectsLink || !filterContainer) return;

  projectsLink.classList.add('cta-pulse');
  projectsLink.setAttribute('aria-controls', 'filter-container');
  projectsLink.setAttribute('aria-expanded', 'false');

  projectsLink.addEventListener('click', (e) => {
    e.preventDefault();

    const isOpening = !filterContainer.classList.contains('open');
    if (isOpening) {
      // Ouvre: barre sous Projets pleine largeur
      filterContainer.classList.add('open');
      projectsLink.setAttribute('aria-expanded', 'true');
      projectsLink.classList.remove('is-closing');
      projectsLink.classList.add('is-open');
      projectsLink.classList.remove('cta-pulse');
    } else {
      // Ferme: barre se rétracte vers la droite
      projectsLink.classList.remove('is-open');
      projectsLink.classList.add('is-closing');
      projectsLink.setAttribute('aria-expanded', 'false');
      filterContainer.classList.remove('open');
      projectsLink.classList.add('cta-pulse');

      // Nettoie la classe après l’animation (durée CSS 0.35s)
      setTimeout(() => projectsLink.classList.remove('is-closing'), 400);
    }
  });
});

// Drawer détails projet (ouvre la page de détail dans un iframe)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.projects-container');
  const overlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('project-drawer');
  const iframe = document.getElementById('project-drawer-iframe');
  const closeBtn = drawer ? drawer.querySelector('.drawer-close') : null;
  if (!container || !overlay || !drawer || !iframe || !closeBtn) return;

  function openDrawer(url) {
    iframe.src = url;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // vider l’iframe après l’anim pour libérer la page
    setTimeout(() => { iframe.src = 'about:blank'; }, 350);
  }

  // Délégation de clic: n’importe où sur la carte ouvre les détails
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.project');
    if (!card) return;
    e.preventDefault();

    // Récupère le lien "Voir plus" existant comme URL cible
    const link = card.querySelector('a.btn[href]');
    const url = link ? link.getAttribute('href') : null;
    if (url) openDrawer(url);
  });

  // Fermetures
  overlay.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
});