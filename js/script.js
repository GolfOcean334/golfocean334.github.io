/* ============================================================
   script.js — comportements communs à toutes les pages
   ============================================================ */

// Navbar : ombre plus marquée après défilement
(function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const update = () => navbar.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// Accueil : un clic sur la photo change la couleur du mot « Divertir »
document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.getElementById("profile-picture");
  const highlightWord = document.getElementById("highlight-word");
  if (!profilePicture || !highlightWord) return;

  const randomColor = () =>
    "#" + Array.from({ length: 6 }, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("");

  profilePicture.addEventListener("click", () => {
    highlightWord.style.color = randomColor();
  });
});

// Apparition en fondu des sections au scroll
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(el => observer.observe(el));
});
