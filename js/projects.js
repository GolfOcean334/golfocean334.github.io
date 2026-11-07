/* ============================================================
   projects.js — LA SEULE source de vérité de tes projets.

   Pour AJOUTER un projet :
     1. dépose ses images dans  images/<dossier>/
     2. copie un bloc ci-dessous, change les valeurs, c'est tout.
        (la liste, l'accueil et la fiche se mettent à jour seuls)

   Pour RETIRER un projet sans le supprimer : visible: false
   Pour le mettre en avant sur l'accueil     : featured: true

   category : "pro" | "ecole" | "jam" | "perso"
   tech     : clés de filtre parmi "Unity", "Unreal", "CSharp", "C++", "Python"
   extra    : autres étiquettes libres (SFML, OpenGL, "Équipe de 5"...)
   cover    : image de la carte (facultatif — sans image, la carte s'affiche sans miniature)
   preview  : aperçu animé joué au survol de la carte (facultatif).
              Vidéo muette courte (.webm ou .mp4, 3 à 6 s, ~1 Mo) ou GIF.
              Convention : images/<dossier>/preview.webm. Si le fichier n'existe pas,
              la carte reste simplement statique (rien ne casse).
   media    : captures (chaîne) ou vidéos ({ video: "chemin.mp4" })
              les images introuvables sont retirées automatiquement de la page
   sections : blocs de la fiche. text = chaîne ou tableau de chaînes (HTML autorisé),
              list = liste à puces
   links    : github, itch, play (démo jouable) — mets seulement ceux qui existent
   pro      : uniquement si category === "pro" (entreprise, rôle, type)

   L'ORDRE du tableau = l'ordre d'affichage (le plus récent en premier).
   ============================================================ */
const PROJECTS = [
  {
    id: "procedural-fish",
    title: "Procedural Fish Animation",
    category: "perso",
    featured: true,
    visible: true,
    tech: ["Python"],
    extra: ["Pygame"],
    summary: "Simulation de poissons procéduraux explorant le principe de Body Shape Based Animation.",
    cover: "images/Project12/Img2.png",
    preview: "images/Project12/videofish.mp4",
    media: [
      "images/Project12/Img1.png",
      "images/Project12/Img2.png",
      "images/Project12/Img3.png",
      "images/Project12/Img4.png",
      { video: "images/Project12/videofish.mp4" }
    ],
    sections: [
      {
        title: "Présentation",
        text: [
          "<strong>Projet personnel expérimental</strong> visant à explorer et illustrer le principe de <strong>Body Shape Based Animation</strong> à travers une simulation visuelle relaxante de poissons procéduraux.",
          "Les poissons ne sont pas animés avec un rig classique ou des animations keyframes : leur forme de corps influence directement leur mouvement et leur comportement. Chaque poisson est composé de segments circulaires dont la morphologie dicte la déformation ondulatoire, les oscillations et les variations de nage. Le rendu est naturel, organique et entièrement généré par code.",
          "L'objectif principal est d'obtenir une <strong>esthétique apaisante</strong> : un rendu doux, pastel, avec un fond aquatique animé qui simule la profondeur, des micro-particules flottantes et une atmosphère sous-marine légère."
        ]
      },
      {
        title: "Réalisation",
        list: [
          "Conception et implémentation du système Body Shape Based Animation",
          "Génération procédurale de poissons 2D segmentés",
          "Animation dynamique des nageoires et de la queue basée sur la morphologie",
          "Direction artistique / style visuel (fond animé, couleurs pastels)",
          "UI avec menu interactif (Fish design / Background)"
        ]
      },
      { title: "Technologies", list: ["Python", "Pygame"] }
    ],
    links: { github: "https://github.com/GolfOcean334/Procedural-Animation-Python/releases/tag/RELEASE" }
  },

  {
    id: "minecraft-engine",
    title: "Minecraft Game Engine",
    category: "perso",
    featured: true,
    visible: true,
    tech: ["CSharp"],
    extra: ["OpenGL"],
    summary: "Mon propre moteur de jeu voxel inspiré de Minecraft : monde infini, chunks et multithreading.",
    cover: "images/Projet11/Minecraft1.png",
    preview: "images/Project11/MoteurMinecraftDemo.gif",
    media: [
      "images/Projet11/Minecraft1.png",
      "images/Projet11/Minecraft2.png",
      "images/Projet11/Minecraft3.png",
      { video: "images/Project11/MoteurMinecraftDemo.mp4" }
    ],
    sections: [
      {
        title: "Présentation",
        text: "Un moteur de jeu sandbox inspiré de Minecraft, développé en <strong>C#</strong> avec <strong>OpenGL</strong>, capable de générer un monde infini basé sur des chunks et des blocs, avec du multithreading pour de bonnes performances. Le joueur se déplace librement et interagit avec l'environnement."
      },
      {
        title: "Objectifs",
        text: "Créer un moteur de jeu personnalisé pour explorer <strong>la génération procédurale</strong>, <strong>la gestion de chunks</strong>, <strong>les collisions</strong> et <strong>les optimisations de rendu temps réel</strong>."
      },
      { title: "Génération de terrain", list: ["Seed + Simplex Noise (biomes, montagnes, plaines…)", "Monde infini, découpé en chunks."] },
      { title: "Chunks & multithreading", list: ["Génération/mise à jour en arrière-plan.", "Chunks éloignés désactivés pour économiser les ressources."] },
      { title: "Rendu OpenGL", list: ["Pipeline simple pour les blocs.", "Base prête pour textures et éclairage."] },
      { title: "Interaction joueur", list: ["Caméra libre, exploration.", "Collisions activables.", "Placement/destruction de blocs."] },
      { title: "Sauvegarde", list: ["Persistance des chunks générés."] },
      { title: "Optimisations", list: ["Multithreading pour la génération.", "Base meshing : suppression des faces invisibles."] },
      { title: "Outils & debug", list: ["HUD : coordonnées et infos utiles."] }
    ],
    links: {}
  },

  {
    id: "metro-fix-up",
    title: "Metro Fix Up",
    category: "pro",
    featured: true,
    visible: true,
    tech: ["Unity", "CSharp"],
    extra: ["Android"],
    pro: { company: "RATP", role: "Développeur Unity (C#)", type: "Projet commandé" },
    summary: "Jeu mobile éducatif commandé par la RATP pour faire découvrir les métiers « cachés » de la maintenance du métro.",
    cover: null,
    media: [],
    sections: [
      {
        title: "Présentation",
        text: "Metro Fix Up est un jeu mobile éducatif commandé par la RATP, conçu pour initier les jeunes aux métiers « cachés » de la maintenance du métro. Présenté lors de conventions et d'événements, le jeu plonge les joueurs dans les coulisses du réseau où ils doivent diagnostiquer et réparer différentes installations."
      },
      {
        title: "Objectifs pédagogiques",
        text: "Sensibiliser les jeunes aux enjeux de la maintenance du métro en leur faisant découvrir les métiers et compétences nécessaires. À travers des missions ludiques, les joueurs apprennent à résoudre des problèmes techniques et comprennent l'importance de la sécurité dans le transport public."
      },
      {
        title: "Mon rôle",
        text: "Participation à la conception et à l'intégration des systèmes techniques clés du jeu."
      },
      {
        title: "Ce que j'ai réalisé",
        list: [
          "<strong>Système de dialogue modulable</strong> : intégrer et modifier facilement les dialogues dans différentes scènes.",
          "<strong>Vision expert</strong> : mode spécial qui met en évidence tous les éléments interactifs d'une scène pour guider le joueur.",
          "<strong>Implémentation audio</strong> : effets sonores et ambiances pour renforcer l'immersion.",
          "<strong>Écrans de chargement dynamiques</strong> : système adaptable pour créer rapidement des écrans thématiques selon les scènes.",
          "<strong>Système d'interaction universel</strong> : gestion unifiée de toutes les interactions (ouverture de porte, ramassage, appui sur bouton…)."
        ]
      },
      { title: "Technologies", text: "Unity, C#" },
      { title: "Plateforme", text: ["Jeu mobile Android.", "Utilisation prévue lors d'événements et salons RATP."] }
    ],
    links: {}
  },

  {
    id: "portal-dash",
    title: "Portal Dash",
    category: "ecole",
    featured: false,
    visible: true,
    tech: ["Unreal"],
    extra: [],
    summary: "Endless runner 2.5D où chaque portail transforme l'univers et le gameplay.",
    cover: null,
    media: [],
    sections: [
      {
        title: "Présentation",
        text: "Portal Dash est un endless runner 2.5D innovant où chaque portail transforme complètement l'univers et le gameplay. Les joueurs enchaînent des expériences variées : surfer sur des pentes enneigées façon Alto, piloter un vaisseau futuriste type Geometry Dash, ou courir sur des voies ferrées dans une mine façon Little Big Planet. Chaque transition surprend et relance le défi."
      },
      {
        title: "Mécaniques",
        list: [
          "<strong>Type de jeu</strong> : runner infini",
          "<strong>Déplacement</strong> : automatique vers la droite",
          "<strong>Contrôles</strong> : swipe haut/bas et tap",
          "<strong>Obstacles</strong> : différents selon le monde traversé",
          "<strong>Collectibles</strong> : pièces dispersées, utilisables pour acheter ou améliorer des boosts"
        ]
      },
      {
        title: "Système de portails",
        list: [
          "<strong>Apparition</strong> : selon un intervalle de temps prédéfini.",
          "<strong>Impact gameplay</strong> : chaque portail modifie la mécanique de jeu et la difficulté."
        ]
      },
      {
        title: "Différents environnements",
        list: [
          "<strong>Neige</strong> : gameplay de surf, saut proportionnel à la durée d'appui pour esquiver les obstacles.",
          "<strong>Western</strong> : gameplay à la Subway Surfers, avec des obstacles à éviter et des pièces à collecter.",
          "<strong>Futuriste</strong> : gameplay spatial, avec des obstacles à haute vitesse et des collectibles à attraper."
        ]
      }
    ],
    links: { github: "https://github.com/GamingCampus-MillieBourgois-24-25/grand-projet-commun-portal-dash" }
  },

  {
    id: "midnight-marathon",
    title: "Midnight Marathon !",
    category: "jam",
    featured: false,
    visible: true,
    tech: ["Unity", "CSharp"],
    extra: ["Game jam 40h", "Mobile"],
    summary: "Jeu mobile réalisé en 40 heures : enchaîne les mini-jeux sans te faire surprendre par ta mère !",
    cover: "images/Project1/img1.png",
    media: [
      "images/Project1/img1.png",
      "images/Project1/img2.png",
      "images/Project1/img3.png",
      "images/Project1/img4.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "Ce jeu mobile a été réalisé en 40 heures lors d'une game jam. De nombreux mini-jeux apparaissent en bas de l'écran, et il faut aussi surveiller le haut de l'écran car, de temps en temps, la mère du personnage entre dans la chambre pour vérifier si on dort. Si elle nous attrape, on perd."
      },
      { title: "Objectif", text: "Compléter un maximum de mini-jeux tout en évitant d'être attrapé par la mère de votre personnage." },
      { title: "Contrôles", text: "Utilisez les contrôles tactiles pour interagir avec les mini-jeux en bas de l'écran." },
      { title: "Défi", text: "Surveillez le haut de l'écran et réagissez rapidement pour éviter d'être attrapé." }
    ],
    links: {
      itch: "https://ninikow.itch.io/midnight-marathon",
      github: "https://github.com/GolfOcean334/Midnight-Marathon"
    }
  },

  {
    id: "astroshift",
    title: "AstroShift",
    category: "perso",
    featured: false,
    visible: true,
    tech: ["Unity", "CSharp"],
    extra: ["Mobile"],
    summary: "Pilote un vaisseau spatial, change de ligne et évite les météores qui foncent sur toi.",
    cover: "images/Project2/img1.png",
    media: ["images/Project2/img1.png"],
    sections: [
      {
        title: "Présentation",
        text: "AstroShift est un jeu où vous contrôlez un vaisseau spatial qui se déplace latéralement sur différentes lignes pour éviter les météores entrants."
      },
      {
        title: "Fonctionnalités",
        list: [
          "Contrôlez un vaisseau spatial avec un mouvement latéral.",
          "Évitez les météores qui vous foncent dessus.",
          "Différentes lignes pour un défi accru."
        ]
      },
      { title: "Contrôles", text: "Glissez à gauche/droite pour changer de ligne et éviter les obstacles." }
    ],
    links: {
      itch: "https://golfocean33.itch.io/astroshift",
      github: "https://github.com/GolfOcean334/Astro-Shift-Unity"
    }
  },

  {
    id: "idle-ages",
    title: "Idle Ages",
    category: "perso",
    featured: false,
    visible: true,
    tech: ["Unity", "CSharp"],
    extra: ["Gestion"],
    summary: "Dirige un territoire de la préhistoire à l'ère futuriste : recherche, équipement et armée.",
    cover: "images/Project3/img1.png",
    media: [
      "images/Project3/img1.png",
      "images/Project3/img2.png",
      "images/Project3/img3.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "Idle Ages est un jeu de gestion où vous dirigez un territoire à travers plusieurs époques, de la préhistoire à l'ère futuriste. Gérez vos troupes, développez des technologies et menez vos armées à la victoire."
      },
      {
        title: "Objectifs",
        list: [
          "Progresser à travers les époques historiques.",
          "Optimiser l'économie, la recherche et le militaire.",
          "Remporter des batailles via des choix d'équipement et de stratégie."
        ]
      },
      {
        title: "Arbre de recherche",
        list: [
          "Débloquez des technologies militaires, économiques et stratégiques.",
          "Choisissez des axes prioritaires selon votre style de jeu."
        ]
      },
      {
        title: "Équipement des troupes",
        list: [
          "Améliorez l'armement et la défense pour augmenter l'efficacité.",
          "Adaptez l'équipement aux ennemis rencontrés."
        ]
      },
      {
        title: "Armée & stratégie",
        list: [
          "Augmentez le nombre de troupes pour diversifier les approches.",
          "Composez des unités adaptées aux objectifs de chaque bataille."
        ]
      }
    ],
    links: { github: "https://github.com/GolfOcean334/Idle-Ages" }
  },

  {
    id: "kitchen-project",
    title: "Kitchen Project",
    category: "ecole",
    featured: false,
    visible: false,
    tech: ["Unity", "CSharp"],
    extra: ["FPS"],
    summary: "Prototype de jeu de cuisine 3D en vue FPS : interactions, stockage d'ingrédients et recettes.",
    cover: "images/Project4/img3.png",
    media: [
      "images/Project4/img1.png",
      "images/Project4/img2.png",
      "images/Project4/img3.png",
      "images/Project4/img4.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "Kitchen Project est un prototype de jeu de cuisine 3D en vue FPS réalisé avec <strong>Unity</strong> et <strong>C#</strong>. Il propose des interactions naturelles (ramasser/poser), un système de stockage d'ingrédients, la sauvegarde et la création de recettes, ainsi que les déplacements de base du joueur."
      },
      {
        title: "Fonctionnalités",
        list: [
          "Ramasser et poser des objets dans des conteneurs ou à l'endroit visé.",
          "Système de stockage d'ingrédients.",
          "Sauvegarde et création de recettes.",
          "Déplacements de base du joueur."
        ]
      },
      {
        title: "Technologies",
        list: ["Unity (C#)", "Systèmes d'interaction FPS", "Gestion de données (sauvegarde)"]
      }
    ],
    links: { github: "https://github.com/GolfOcean334/Kitchen-Project" }
  },

  {
    id: "podracer",
    title: "PodRacer",
    category: "ecole",
    featured: false,
    visible: true,
    tech: ["Unreal"],
    extra: ["Unreal Engine 5"],
    summary: "Jeu de course futuriste sous Unreal Engine 5 : pilote un vaisseau antigravité à travers des circuits nerveux et bourrés d'obstacles destructibles, dans l'esprit de Trackmania.",
    cover: "images/Project5/img4.png",
    media: [
      "images/Project5/img4.png",
      "images/Project5/img1.png",
      "images/Project5/img2.png",
      "images/Project5/img3.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "PodRacer est un jeu de course et de parcours futuriste développé sous Unreal Engine 5. Pilotez un vaisseau antigravité à travers des circuits rapides et dynamiques, avec des obstacles destructibles et un gameplay inspiré de Trackmania."
      },
      {
        title: "Fonctionnalités",
        list: [
          "<strong>Vaisseau antigravité</strong> pour une maniabilité fluide et précise à haute vitesse.",
          "<strong>Sauts contrôlés</strong> avec un bref <em>slow motion</em> pour des manœuvres stylées et stratégiques.",
          "<strong>Rotation libre</strong> du vaisseau pendant les sauts pour optimiser l'atterrissage et l'esquive.",
          "<strong>Environnements dynamiques</strong> avec des objets <strong>destructibles</strong> pour ouvrir de nouvelles trajectoires.",
          "<strong>Level design</strong> court et rejouable, inspiré de Trackmania."
        ]
      },
      {
        title: "Objectif",
        text: "Terminer chaque circuit le plus rapidement possible, maîtriser trajectoires, sauts et rotations pour battre vos records."
      }
    ],
    links: { github: "https://github.com/GolfOcean334/PodRacer" }
  },

  {
    id: "jeu-catapulte-educatif",
    title: "Jeu de catapulte éducatif",
    category: "ecole",
    featured: false,
    visible: true,
    tech: ["Unity", "CSharp"],
    extra: ["Éducatif"],
    summary: "Jeu éducatif inspiré des jeux de catapulte pour étudier les trajectoires en physique et en mathématiques.",
    cover: "images/Project6/img1.png",
    media: [
      "images/Project6/img1.png",
      "images/Project6/img2.png",
      "images/Project6/img3.png",
      { video: "images/Project6/AngryBirds.mp4" }
    ],
    sections: [
      {
        title: "Présentation",
        text: "Jeu éducatif inspiré des célèbres jeux de catapulte (type Angry Birds), conçu pour étudier les trajectoires en physique et en mathématiques à travers une expérience ludique et interactive."
      },
      {
        title: "Objectif pédagogique",
        text: "Explorer concrètement les notions de <strong>trajectoire parabolique</strong>, <strong>vitesse initiale</strong>, <strong>angle de tir</strong>, <strong>gravité</strong> et <strong>forces appliquées</strong>, tout en détruisant des structures."
      },
      {
        title: "Types d'oiseaux",
        list: [
          "<strong>Oiseau de base</strong> — trajectoire parabolique classique.",
          "<strong>Oiseau dash</strong> — dash en vol (accélération instantanée).",
          "<strong>Oiseau double saut</strong> — bond supplémentaire modifiant la trajectoire.",
          "<strong>Oiseau explosif</strong> — explosion à la demande pour de gros dégâts."
        ]
      }
    ],
    links: { github: "https://github.com/GolfOcean334/AngryBird" }
  },

  {
    id: "chess-game",
    title: "Chess Game",
    category: "ecole",
    featured: false,
    visible: true,
    tech: ["C++"],
    extra: ["SFML", "IA MinMax"],
    summary: "Jeu d'échecs en C++ avec SFML : Joueur contre Joueur, ou contre une IA MinMax.",
    cover: "images/Project7/img1.png",
    media: [
      "images/Project7/img1.png",
      "images/Project7/img2.png",
      "images/Project7/img3.png",
      { video: "images/Project7/video1.mp4" }
    ],
    sections: [
      {
        title: "Présentation",
        text: "Chess Game est un jeu d'échecs 2D développé en <strong>C++</strong> avec <strong>SFML</strong>, proposant deux modes : <strong>Joueur vs Joueur</strong> et <strong>Joueur vs IA</strong> (algorithme <strong>MinMax</strong>)."
      },
      {
        title: "Modes de jeu",
        list: [
          "<strong>Joueur vs Joueur</strong> — deux joueurs se partagent le même ordinateur.",
          "<strong>Joueur vs IA</strong> — le joueur joue les blancs contre une IA (MinMax) jouant les noirs."
        ]
      },
      {
        title: "IA MinMax",
        text: "L'IA évalue les positions via l'algorithme MinMax pour choisir le meilleur coup selon une profondeur donnée."
      },
      {
        title: "Fonctionnalités principales",
        list: [
          "Multijoueur local (tour par tour sur le même PC).",
          "IA avec prise de décision via <strong>MinMax</strong>.",
          "Rendu 2D avec <strong>SFML</strong>.",
          "Affichage clair de l'échiquier et des pièces.",
          "Gestion du tour par tour et des déplacements valides."
        ]
      }
    ],
    links: { github: "https://github.com/GolfOcean334/Chess-Game-SFML-AI" }
  },

  {
    id: "zorya-sisters",
    title: "Zorya Sisters",
    category: "ecole",
    featured: false,
    visible: true,
    tech: ["C++"],
    extra: ["SFML", "Projet de 3 semaines"],
    summary: "Platformer/puzzle 2D où deux sœurs poupées russes combinent leurs pouvoirs pour s'échapper de la maison de leur propriétaire.",
    cover: "images/Project8/img1.png",
    media: [
      "images/Project8/img1.png",
      "images/Project8/img2.png",
      "images/Project8/img3.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "Zorya Sisters est un platformer/puzzle 2D développé avec <strong>SFML</strong>. Incarnez deux sœurs-poupées russes déterminées à s'échapper de la maison de leur propriétaire. Combinez leurs pouvoirs complémentaires pour franchir des obstacles et résoudre des énigmes. Projet réalisé en trois semaines dans le cadre de nos études."
      },
      {
        title: "Gameplay",
        text: "Alternez entre les deux sœurs, chacune disposant de capacités uniques. Le niveau introduit progressivement les mécaniques : empilement « poupées gigognes », activation de boutons/leviers et manipulation d'objets pour débloquer des passages."
      },
      {
        title: "Fonctionnalités principales",
        list: [
          "Deux personnages jouables aux capacités complémentaires.",
          "Progression basée sur l'alternance et la coopération.",
          "Niveau d'introduction aux mécaniques clés.",
          "Énigmes variées inspirées des puzzles 2D.",
          "Direction artistique minimaliste et immersive."
        ]
      },
      {
        title: "Et ensuite ?",
        text: "Avec plus de temps, chaque pièce de la maison aurait été un monde contenant plusieurs niveaux, à la manière des jeux Mario. Faute de temps, nous avons livré un seul niveau qui introduit les différentes mécaniques."
      }
    ],
    links: { github: "https://github.com/GolfOcean334/vertical-slice-Zorya-Sisters" }
  },

  {
    id: "shoot-io",
    title: "Shoot.io",
    category: "ecole",
    featured: false,
    visible: false,
    tech: ["C++"],
    extra: ["Survie 2D"],
    summary: "Jeu de survie 2D en vue du dessus : affronte des vagues de monstres de plus en plus puissants.",
    cover: "images/Project9/img1.png",
    media: [
      "images/Project9/img1.png",
      "images/Project9/img2.png",
      "images/Project9/img3.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "Jeu d'action/survie 2D en vue du dessus. Vous incarnez un humain qui affronte des vagues de monstres de plus en plus puissants dans une arène dynamique."
      },
      {
        title: "Gameplay",
        text: "Le joueur se déplace librement dans un environnement semi-ouvert et doit utiliser l'espace à son avantage pour esquiver, attaquer et survivre. Chaque vague augmente la difficulté et demande de s'adapter en continu."
      },
      {
        title: "Fonctionnalités principales",
        list: [
          "Vagues d'ennemis avec difficulté progressive.",
          "Variété de monstres aux comportements distincts.",
          "Contrôles précis et lisibilité top-down."
        ]
      }
    ],
    links: { github: "https://github.com/GolfOcean334/Jeu-.io-C-" }
  },

  {
    id: "tower-defense",
    title: "Tower Defense",
    category: "ecole",
    featured: false,
    visible: false,
    tech: ["C++"],
    extra: ["Tower Defense"],
    summary: "Base de Tower Defense : place des tours le long d'un chemin et laisse-les tirer sur les ennemis.",
    cover: "images/Project10/img1.png",
    media: [
      "images/Project10/img1.png",
      "images/Project10/img2.png",
      "images/Project10/img3.png"
    ],
    sections: [
      {
        title: "Présentation",
        text: "Base de Tower Defense offrant une expérience stratégique : placez des tours le long d'un chemin prédéfini pendant qu'elles tirent automatiquement sur les ennemis. Le projet est pensé pour évoluer avec des fonctionnalités additionnelles et une personnalisation des mécaniques."
      },
      {
        title: "Gameplay",
        text: [
          "Empêchez des vagues d'ennemis d'atteindre la fin du parcours en positionnant des tours à des emplacements clés. Chaque tour attaque les ennemis à portée.",
          "Les ennemis avancent le long d'un chemin fixe : maximisez l'efficacité des tours pour ralentir et éliminer les vagues successives."
        ]
      },
      {
        title: "Fonctionnalités principales",
        list: [
          "Placement de tours le long du chemin.",
          "Tir automatique de projectiles sur les ennemis à portée.",
          "Ennemis avec points de vie et progression dynamique."
        ]
      }
    ],
    links: { github: "https://github.com/GolfOcean334/Tower-Defense-C-" }
  },

  {
    id: "stryge",
    title: "Stryge",
    category: "pro",
    featured: true,
    visible: true,
    tech: ["Unreal"],
    extra: ["Jeu d'horreur"],
    pro: { company: "Violet Whale Studios", role: "Développeur Unreal Engine", type: "Projet commandé" },
    summary: "Jeu d'horreur en développement par Violet Whale Studios",
    cover: "",
    media: [
    ],
    sections: [
      {
        title: "Présentation",
        text: "Jeu d'horreur en développement par Violet Whale Studios. Le projet vise à créer une expérience immersive en offrant la possibilté d'utilisé un capteur de battement cardiaque pour augmenter l'intensité de l'expérience."
      },
      {
        title: "Gameplay",
        text: [
          "Le joueur doit explorer un environnement sombre et inquiétant, résoudre des énigmes et éviter des ennemis terrifiants. L'utilisation du capteur de battement cardiaque permet d'adapter l'expérience en fonction de la peur ressentie par le joueur."
        ]
      },
      {
        title: "Fonctionnalités principales",
        list: [
          "Exploration d'un environnement sombre et inquiétant.",
          "Résolution de puzzles pour progresser.",
          "Évitement d'ennemis terrifiants."
        ]
      }
    ],
    links: { github: "" }
  }
];
