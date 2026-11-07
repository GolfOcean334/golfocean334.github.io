/* ============================================================
   decor.js — dessins affichés autour du titre de l'accueil.

   1. Range tes images dans  images/dessins/
      (PNG ou WebP à fond transparent, ~400 px de large suffisent)
   2. Une ligne par dessin ci-dessous :
        src    : nom du fichier dans images/dessins/
        x, y   : position du CENTRE en % de la zone d'en-tête (0 à 100)
        size   : largeur en pixels sur ordinateur
        rot    : inclinaison en degrés
        depth  : force du léger déplacement à la souris (0 = immobile)
        mobile : false = masqué sur téléphone ; true = affiché au même endroit ;
                 { x, y } = affiché à cette position sur téléphone (le texte occupe
                 tout l'écran : place-les dans la bande libre en haut, y entre 4 et 9,
                 ou tout en bas, y entre 94 et 98 ; garde-en 2 ou 3 max)
   3. Un fichier introuvable est ignoré : tu peux garder des lignes en avance
      ou supprimer celles dont tu n'as pas l'image.

   ============================================================ */
const DECOR_DIR = "images/dessins/";

const DECOR = [
  { src: "controller.png",  x: 15,  y: 26, size: 130, rot: -12, depth: 22, mobile: { x: 15, y: 6 } },
  { src: "rolling-dices.png",      x: 90, y: 20, size: 105, rot: 14,  depth: 16, mobile: { x: 85, y: 6 } },
  { src: "star.png",   x: 21, y: 80, size: 85,  rot: 8,   depth: 30, mobile: false },
  { src: "arrow.png",   x: 75, y: 78, size: 85, rot: -6,  depth: 12, mobile: false },
  { src: "helmet.png",   x: 4,  y: 60, size: 115, rot: 10,  depth: 20, mobile: false },
  { src: "light-bulb.png",  x: 96, y: 52, size: 95,  rot: -10, depth: 26, mobile: false },
  { src: "sword.png",     x: 31, y: 12, size: 90,  rot: 18,  depth: 18, mobile: false },
  { src: "game-console.png",    x: 70, y: 10, size: 80,  rot: -16, depth: 24, mobile: false },
  { src: "gamepad-cross.png",    x: 82, y: 40, size: 90,  rot: 16, depth: 15, mobile: false }
];
