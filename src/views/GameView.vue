<script setup lang="ts">
import type { GamePokemon } from "../types/gamePokemon";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useGame } from "../scripts/gameScript";
import GameChat from "../components/GameChat.vue";
import TeamContainer from "../components/TeamContainer.vue";
import HealContainer from "../components/HealContainer.vue";
import ActionController from "../components/ActionController.vue";
import EnemyTrainerInfo from "../components/EnemyTrainerInfo.vue";
import PlayyerActivePokemon from "../components/PlayerActivePokemon.vue";
import PlayerInfo from "../components/PlayerInfo.vue";

const props = defineProps<{
  name: string;
  team: string;
}>();

const hpPercentAskToHeal = ref(0);

const {
  player,
  currentBattle,
  totalBattles,
  currentTrainer,
  chatMessages,

  setPlayer,
  setTrainers,
  playTurn,
  nextBattle,
  switchPokemon,
  pushToLeaderboard,
  checkIfAllPokemonKO,
  healActivePokemon,
} = useGame();

const route = useRoute();

//IA: ChatGPT - pour facilier le développement du onMounted pour ne pas qu'il prende trop de temps à être fait.
onMounted(async () => {
  const ids = (route.query.team as string).split(",").map(Number);

  const response = await fetch(
    `http://127.0.0.1:3000/pokemons?id=${ids.join("&id=")}`,
  );

  const data = await response.json();

  const team: GamePokemon[] = [];

  // On parcourt les ids pour construire l'équipe du joueur avec les données récupérées
  for (const id of ids) {
    const basePokemon = data.find((p: any) => p.id === id);

    if (basePokemon) {
      team.push({
        ...basePokemon,
        hp: 100,
        maxHp: 100,
      });
    }
  }

  setPlayer(route.query.name as string, team);

  const responseTrainer = await fetch("http://127.0.0.1:3000/trainers");
  const dataTrainer = await responseTrainer.json();

  // Shuffle the trainers array
  for (let i = dataTrainer.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataTrainer[i], dataTrainer[j]] = [dataTrainer[j], dataTrainer[i]];
  }

  // Take the first 5 trainers after shuffling
  setTrainers(dataTrainer.slice(0, 5));
});

function getExperienceLabel(exp: number): string {
  switch (exp) {
    case 1:
      return "Débutant";
    case 2:
      return "Confirmé";
    case 3:
      return "Expert";
    case 4:
      return "Maître";
    default:
      return "Inconnu";
  }
}
</script>

<!-- IA: ChatGPT - à noter que le html a été fait avant d'être touché par L'ia pour le css -->
<template>
  <div class="container" v-if="player">
    <h1>⚔️ Combat Pokémon</h1>

    <PlayerInfo
      :player="player"
      :currentBattle="currentBattle"
      :totalBattles="totalBattles"
    />

    <PlayyerActivePokemon :player="player" />

    <EnemyTrainerInfo
      :currentTrainer="currentTrainer"
      :getExperienceLabel="getExperienceLabel"
    />

    <ActionController
      :checkIfAllPokemonKO="checkIfAllPokemonKO"
      :playTurn="playTurn"
      :nextBattle="nextBattle"
      :pushToLeaderboard="pushToLeaderboard"
      :currentTrainer="currentTrainer"
      :currentBattle="currentBattle"
      :totalBattles="totalBattles"
    />

    <HealContainer
      :player="player"
      v-model:hpPercentAskToHeal="hpPercentAskToHeal"
      :healActivePokemon="healActivePokemon"
      :currentTrainer="currentTrainer"
      :currentBattle="currentBattle"
      :totalBattles="totalBattles"
    />

    <TeamContainer :player="player" :switchPokemon="switchPokemon" />
  </div>
  <GameChat :chatMessages="chatMessages" />
</template>
<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
}

/* cartes */
.card {
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  margin: 10px 0;
  background: #f9f9f9;
}

/* titres */
h1 {
  text-align: center;
}

h3 {
  margin-bottom: 5px;
}

/* barre de vie */
.hp-bar {
  width: 100%;
  height: 12px;
  background: #ddd;
  border-radius: 6px;
  overflow: hidden;
  margin: 5px 0;
}

.hp-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}

/* couleurs selon HP */
.hp-low {
  background: #f44336;
}

.hp-mid {
  background: #ff9800;
}

/* boutons */
button {
  margin: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #1976d2;
  color: white;
}

button:hover {
  background: #1565c0;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

/* chat */
.chat {
  margin-top: 20px;
  background: #111;
  color: #0f0;
  padding: 10px;
  font-family: monospace;
  max-height: 150px;
  overflow-y: auto;
}
.card {
  background: #1e1e2f; /* fond sombre */
  color: white; /* texte blanc */
}
</style>
