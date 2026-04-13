# Revue Code séance 1 et 2

Il manque encore BEACOUP DE CHOSE, le projet peut être considérer comme un squelette de projet en ce moment.


> .github\workflows\deploy.yml

Il manque encore un peu de chose pour bien le déployé. Le fichier est présent mais il n'est pas lié avec github page pour qu'il soit accessible.


> Game.vue

Cette classe est vide. Je vais mettre le jeu à l'intérieur. La classe va recevoir l'équipe de pokémon choisi et les dresseurs à vaincre. Je ne sais toujours pas dans quelle direction le jeu va fonctionner par contre.


> Leaderboard.vue

Il manque encore le visuel à faire avec bootstrap ou du css. La classe est TRÈS médiocre en ce moment visuellement mais la classe va afficher permettre à la classe RankingScore d'être appelé plusieur fois avec les données triés pour qu'elle affiche les score. Il manque encore à créer et remplir le tableau avec les données du backend pour le moment.


> MainMenu.vue

La classe est vide. Je vise de faire le menu de création de l'équipe dans cette class. Elle va avoir les inputs nécessaires pour créer les équipes de pokémon et le nom du dresseur et permettre l'entré du jeu.


> RankingScore.vue

Cette classe permet l'affichage d'un score singulier dans la classe Leaderboard.vue. Elle reçois la position du score (premier, deuxième, etc), le nom du dresseur et le score qu'il a fait. Il manque encore cepandant tous ce que est le css et bootstrap de la classe.


> App.vue

Cela va être la base du site. Il va afficher la navigation et le RouterView reçu. Le css et bootstrap n'est pas présent. Il va aussi s'occuper d'intégrer les scores au backend.


> index.ts

Ce fichier contient les deux seules routes présentes pour le moment, / -> MainMenu.vue et /game -> Game.vue.


> trainer.ts

Ce type contient les données nécessaire pour créer un dresseur (id, nom, reward, experience, pokemon). Elle pourrait être simplifé en sous type pour être plus simple.


> pokemon.ts

Ce type contient les informations nécessaire pour créer un pokémon (id et nom).


> ranking.ts

Ce type contient les informations nécessaires pour créer un score pour le leaderboard au lieu d'envoyer plusieurs variables (id, nom du dresseur, score obtenue).
