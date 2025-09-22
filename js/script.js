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