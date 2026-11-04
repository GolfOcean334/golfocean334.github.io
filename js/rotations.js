/**
 * rotations.js
 * - Rotation initiale aléatoire sur chaque carte (.card)
 * - Au survol : balancier de pendule autour de la punaise
 * Désactivé si l'utilisateur préfère moins de mouvement,
 * et pas de balancier sur les écrans sans survol (tactile).
 */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  document.querySelectorAll('.card').forEach(card => {
    // Rotation initiale aléatoire entre -2.5° et +2.5°
    const initRot = (Math.random() * 5 - 2.5).toFixed(2);
    card.style.transform = `rotate(${initRot}deg)`;

    if (reduceMotion || !canHover) return;

    const direction  = Math.random() < 0.5 ? -1 : 1;            // sens du premier balancement
    const amplitude  = Math.random() + 1;                        // 1° à 2°
    const halfPeriod = Math.floor(Math.random() * 290 + 360);    // 360 à 650 ms
    const swings     = Math.floor(Math.random() * 3 + 3);        // 3 à 5 demi-oscillations

    let frame = null;
    let swingCount = 0;
    let startTime = null;

    function swing(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Amortissement : l'amplitude diminue à chaque demi-oscillation
      const decay = Math.pow(0.65, swingCount);
      const angle = amplitude * decay * direction *
                    (swingCount % 2 === 0 ? 1 : -1) *
                    Math.sin((elapsed / halfPeriod) * Math.PI);

      card.style.transform = `rotate(${angle}deg) translateY(-6px)`;

      if (elapsed >= halfPeriod) {
        swingCount++;
        startTime = timestamp;
        if (swingCount >= swings) {
          card.style.transform = 'rotate(0deg) translateY(-6px)';
          frame = null;
          return;
        }
      }
      frame = requestAnimationFrame(swing);
    }

    card.addEventListener('mouseenter', () => {
      if (frame) cancelAnimationFrame(frame);
      // Pas de transition CSS pendant l'animation JS (sinon conflit)
      card.style.transition = 'box-shadow 0.3s ease';
      swingCount = 0;
      startTime = null;
      frame = requestAnimationFrame(swing);
    });

    card.addEventListener('mouseleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      // Retour en douceur à la rotation initiale
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
      card.style.transform = `rotate(${initRot}deg)`;
    });
  });
});
