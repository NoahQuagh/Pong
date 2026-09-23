# Solo Pong

https://noahquagh.github.io/Pong/

**Solo Pong** est une application web interactive développée en JavaScript. Le but du jeu est de maintenir la balle en jeu le plus longtemps possible à l'aide d'une raquette. Le score correspond au temps de survie exprimé en secondes.

---

## Fonctionnalités

### Version de base (V1)
- **Lancement / Réinitialisation :** Un bouton dédié permet de démarrer ou relancer une partie à tout moment.
- **Déplacement automatique :** La balle s'élance avec une trajectoire et une orientation initiales aléatoires (en évitant les angles strictement verticaux à 90°).
- **Contrôles modulaires :** Déplacement de la raquette au clavier (flèches `Gauche` / `Droite`) ou via des boutons tactiles adaptés aux écrans mobiles.
- **Gestion des collisions :** Rebond de la balle sur les bordures supérieure, gauche et droite, ainsi que sur la raquette.
- **Conditions de fin :** La partie s'arrête si la balle franchit la limite inférieure (Game Over) et un message récapitulatif s'affiche.
- **Score en temps réel :** Chronomètre de survie calculé et affiché en secondes.

### Version avancée (V2)
- **Accélération progressive :** La vitesse de la balle augmente légèrement à chaque rebond (jusqu'à un maximum de 5 fois sa vitesse initiale).
- **Sauvegarde du meilleur score :** Le record de survie est conservé localement dans le `localStorage` du navigateur.

---

##  Technologies & Notions Utilisées

- **HTML5 :**  `<canvas>`.
- **CSS3 :** Mise en page responsive.
- **JavaScript:**
    - Animation via `requestAnimationFrame` et synchronisation temporelle avec `performance.now()`.
    - Architecture modulaire (`import` / `export`).
    - Manipulation de l'API Canvas 2D pour le rendu graphique (balle, raquette).
    - Gestion de la persistance des données avec `localStorage`.

---


##  Structure du Projet

```text
SoloPong/
├── index.html          
├── assets/
│   ├── style/
│   │   └── palette.css
│   │   └── stylePongPage.css
│   │   └── stylePongGame.css
│   └── js/
│       ├── actions/
│       │   └── paddleMove.js
│       └── gamePong.js 
└── README.md           
