/**
 * rotations.js
 * - Rotation initiale aléatoire sur chaque card
 * - Hover : balancier pendule autour du pin (transform-origin top center)
 *   direction et amplitude aléatoires mais bornées
 */
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.card').forEach(card => {

    // ── Rotation initiale aléatoire entre -2.5° et +2.5° ──
    const initRot = (Math.random() * 5 - 2.5).toFixed(2);
    card.style.transform = `rotate(${initRot}deg)`;
    card.dataset.initRot  = initRot;

    // ── Paramètres du balancier ──
    // Direction : -1 (commence à gauche) ou +1 (commence à droite)
    const direction = Math.random() < 0.5 ? -1 : 1;

    // Amplitude max du balancier : entre 1° et 2°
    const amplitude = (Math.random() * 1 + 1).toFixed(2);

    // Durée d'un demi-balancier en ms : entre 360ms et 650ms
    const halfPeriod = Math.floor(Math.random() * 290 + 360);

    // Nombre de balancements avant de s'arrêter : 3 à 5
    const swings = Math.floor(Math.random() * 3 + 3);

    let animFrame = null;
    let swingCount = 0;
    let startTime  = null;
    let isSwinging = false;

    function swing(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Amortissement exponentiel : l'amplitude diminue à chaque balancement
      const decay    = Math.pow(0.65, swingCount);
      const angle    = amplitude * decay *
                       Math.sin((elapsed / halfPeriod) * Math.PI) *
                       direction * (swingCount % 2 === 0 ? 1 : -1);

      card.style.transform = `rotate(${angle}deg) translateY(-6px)`;
      card.style.boxShadow = '6px 14px 30px rgba(44, 24, 16, 0.35)';

      // Un demi-cycle écoulé → on passe au swing suivant
      if (elapsed >= halfPeriod) {
        swingCount++;
        startTime = timestamp;

        if (swingCount >= swings) {
          // Balancier terminé → stabilisation à 0°
          card.style.transform  = `rotate(0deg) translateY(-6px)`;
          isSwinging = false;
          return;
        }
      }

      animFrame = requestAnimationFrame(swing);
    }

    card.addEventListener('mouseenter', () => {
      if (isSwinging) cancelAnimationFrame(animFrame);
      isSwinging = true;
      swingCount = 0;
      startTime  = null;
      animFrame  = requestAnimationFrame(swing);
    });

    card.addEventListener('mouseleave', () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      isSwinging = false;
      // Retour en douceur à la rotation initiale via transition CSS
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
      card.style.transform  = `rotate(${card.dataset.initRot}deg)`;
      card.style.boxShadow  = '';
      // On retire la transition après pour ne pas interférer avec le prochain balancier
      setTimeout(() => {
        card.style.transition = 'box-shadow 0.3s ease';
      }, 420);
    });
  });
});