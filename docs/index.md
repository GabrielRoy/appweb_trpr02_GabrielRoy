# Travail Pratique 2

## Contenu

- ### components
  - ActionController.vue
  - EnemyTrainerInfo.vue
  - GameChat.vue
  - HealContainer.vue
  - PlayerActivePokemon.vue
  - PlayerInfo.vue
  - RankingScore.vue
  - TeamContainer.vue

- ### router
  - index.ts
  - routes.ts

- ### scripts
  - gameScript.ts

- ### types
  - gamePokemon.ts
  - pokemon.ts
  - ranking.ts
  - trainer.ts

- ### views
  - GameView.vue
  - LeaderboardView.vue
  - MainMenuView.vue

## Components

### ActionController.vue

Permet l'affichage des bouttons pour attaquer, envoyer le score au leaderboard et de changer de dresseur à combatre dans GameView.vue.

### EnemyTrainerInfo.vue

Permet d'afficher le nom du pokémon adverse, la maitrise, le score qui sera récompensé et la vie dans GameView.vue.

### GameChat.vue

Permet d'afficher le nom du dresseur battue et la récompense offerte dans GameView.vue.

### HealContainer.vue

Permet lorsque qu'un combat est terminer d'afficher et de donner la possibilité au joueur de soigner le pokémon présentement actif avant qu'il ne doit continuer de se battre GameView.vue.

### PlayerActivePokemon.vue

Permet d'afficher les information du pokémon présentement actif du joueur comme son nom et sa vie dans GameView.vue.

### RankingScore.vue

Permet un affichage plus clair pour les scores singulier du leaderboard dans Leaderboard.vue

### TeamContainer.vue

Permet d'afficher les pokémons que le joueur a choisie et la possibilité de changer le pokémon actif dans GameView.vue.

### PlayerInfo.vue

Permet de voir facilement le score nom et combats restant du joueur.

## router

### index.ts

Permet l'utilisation des routes et de changer la route.

### routes.ts

Détient toutes les routes que le jeu a besoin.

## scripts

### gameScript.ts

Contient toutes les fonctions que le jeu a besoin pour bien fonctionner.

## types

### gamePokemon.ts

Permet la faciliter de copier les informations de pokémons dans le jeu au lieu d'utiliser et modifier les données de la bd sans faire exprès.

### pokemom.ts

Permet d'afficher facilement dans le menu déroulant et de choisir et envoyé au jeu les bonnes données de pokémon choisie.

### ranking.ts

Permet la faciliter à fetch les données du classement et de les afficher facilement.

### trainer.ts

Permet de créer les ennemies pour ne pas impacter les données de la base de données.

## views

### GameView.vue

Détient tous les composants nécessaires pour afficher les jeu en son entièreté.

### LeaderboardView.vue

Affiche le classement et tous les composants nécessaire pour le faire.

### MainMenuView.vue

Affiche le 'formulaire' de sélection de l'équipe et le choix du nom du dresseur pour l'envoyer au jeu.

---

# TP2 - Revue de code séance 3 et 4

## Components

### ActionController.vue

Le code est en général bien fait. Toute fois les composant de boutton pourrait être améliorer et/ou séparer de se composant pour avoir un plus grande faciliter d'update le composants.

### EnemyTrainerInfo.vue

Il est bien fait en général. Le barre de vie est un bonne idée. Je rajouterai par contre un conteur d'hp au lieu de devoir se baser sur le visuel de la barre.

### GameChat.vue

C'est un compossant assez simple. Il fait se qu'il lui est demandé.

### HealContainer.vue

Il aurait du devoir séparer les inputs et button du composant pour en faire un autre et le rendre plus simple.

### PlayerActivePokemon.vue

Le composant est assez simple et fait ce qu'il lui est demandé et c'est clair.

### RankingScore.vue

Affiche le score et le nom et le rang dans le classement. Le css facilite de savoir qui est premier, deuxième et troisième.

### TeamContainer.vue

Le component est bon. Mais les pokémons aurait pu avoir un composant différent pour facilier la lecture et la séparation.

### PlayerInfo.vue

Affiche bien clairement et facilement les données du joueur.

## scripts

### gameScript.ts

Les méthodes du script de jeu sont majoritairement correcte. Cepandant, certain bout de code aurait pu être un autre fonction à eux tous seule pour facilier la lecture et l'adaptation dans le future.

## views

### GameView.vue

Le css est un peu lourd pur le composant. Le onMounted pourait utiliser des fonction au lieu de seulement mettre le code brut.

### LeaderboardView.vue

Le css est légèrement lourd mais sinon le reste est simple et correct.

### MainMenuView.vue

Le css est bien fait en générale. C'est clair et visible. Les méthodes sont assez simple. Aucun bug. Le texte est par contre peut-être un peu inutile.
