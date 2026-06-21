const LIST_PROJECTS = [
  {
    id: "midnight-marathon",
    title: "Midnight Marathon !",
    language: "Unity",
    thumbnail: "images/Project1/img1.png",
    description: "Ce jeu mobile a été réalisé en 40 heures...",
    images: ["images/Project1/img1.png", "images/Project1/img2.png"],
    links: {
      itch: "https://ninikow.itch.io/midnight-marathon",
      github: "https://github.com/GolfOcean334/Midnight-Marathon"
    }
  },
  {
    id: "duo-rl",
    title: "IA Five-Card — Reinforcement Learning",
    language: "Python",
    thumbnail: "images/duo/img1.png",
    description: "Agent RL entraîné par DQN et PPO...",
    hasGame: true,        // ← flag spécial pour afficher le bouton Jouer
    images: [],
    links: {
      github: "https://github.com/GolfOcean334/IA-RL-Duo"
    }
  },
  // ... tous tes autres projets
]